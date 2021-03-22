import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography, Grid, Paper, Box, CssBaseline } from "@material-ui/core";
import LoanValuesEntry, { LoanValuesEntryProps } from "./LoanValuesEntry";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

/**
 * Validate loan values
 *
 * @param rate_per_period       The interest rate for the loan.
 * @param number_of_payments    The total number of payments for the loan in months.
 * @param present_value         The present value, or the total amount that a series of future payments is worth now;
 *                              Also known as the principal.
 * @returns {boolean}
 */
const loanIsGood = (
  rate_per_period: number,
  number_of_payments: number,
  present_value: number,
  sd: Date
): boolean => {
  return (
    rate_per_period > 0 &&
    number_of_payments > 0 &&
    present_value > 0 &&
    sd instanceof Date &&
    sd > new Date(Date.now() - 86400000)
  ); // that is: 24 * 60 * 60 * 1000);
};

/**
 * Copy of Excel's PMT function.
 * Credit: http://stackoverflow.com/questions/2094967/excel-pmt-function-in-js
 *
 * @param rate_per_period       The interest rate for the loan.
 * @param number_of_payments    The total number of payments for the loan in months.
 * @param present_value         The present value, or the total amount that a series of future payments is worth now;
 *                              Also known as the principal.
 * @param future_value          The future value, or a cash balance you want to attain after the last payment is made.
 *                              If fv is omitted, it is assumed to be 0 (zero), that is, the future value of a loan is 0.
 * @param type                  Optional, defaults to 0. The number 0 (zero) or 1 and indicates when payments are due.
 *                              0 = At the end of period
 *                              1 = At the beginning of the period
 * @returns {number}
 */
const PMT = (
  rate_per_period: number,
  number_of_payments: number,
  present_value: number,
  future_value: number = 0,
  type: number = 0
): number => {
  future_value = typeof future_value !== "undefined" ? future_value : 0;
  type = typeof type !== "undefined" ? type : 0;

  console.log("rate_per_period", rate_per_period);
  console.log("number_of_payments", number_of_payments);
  console.log("present_value", present_value);

  if (rate_per_period !== 0.0) {
    // Interest rate exists
    console.log("Interest rate exists");
    var q = Math.pow(1 + rate_per_period, number_of_payments);  // e.g. presentValueInterestFactor
    //console.log("Math.pow(1 + rate_per_period, number_of_payments)", q);
    return (
      -(rate_per_period * (future_value + q * present_value)) /
      ((-1 + q) * (1 + rate_per_period * type))
    );
  } else if (number_of_payments !== 0.0) {
    // No interest rate, but number of payments exists
    console.log("No interest rate, but number of payments exists");
    return -(future_value + present_value) / number_of_payments;
  }

  return 0;
};

/**
 * Get Scheduled number of payments
 *
 * @param number_of_payments    The total number of payments for the loan in months.
 * @param lt
 * @returns {number}
 */
const scheduledNumberOfPayments = (
  number_of_payments: number,
  loan_term_in_year: number
): number => {
  return number_of_payments * loan_term_in_year;
};

export default function LoanEntryForm() {
  const classes = useStyles();

  /**
   * Calculate scheduled payment whhen loan values are good
   *
   * @param loanValues
   */
  const handleLoanValuesSubmit = (loanValues: LoanValuesEntryProps): void => {
    if (
      loanIsGood(
        loanValues.interestRate,
        loanValues.expectedPaymentsPerYear,
        loanValues.loanAmount,
        loanValues.startDate
      )
    ) {
      console.log("Loan is good");

      let scheduledPayment = -PMT(
        loanValues.interestRate,
        scheduledNumberOfPayments(
          loanValues.expectedPaymentsPerYear,
          loanValues.loanTermInYear
        ),
        loanValues.loanAmount      
      );

      console.log("scheduledPayment", scheduledPayment);
    } else console.log("Loan is NOT good");
  };

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <LoanValuesEntry onSubmit={handleLoanValuesSubmit} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography noWrap>LOAN SUMMARY</Typography>
            xs=12 sm=6
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography noWrap>LOAN REPAYMENT RESULTS</Typography>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
