import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography, Grid, Paper, Box, CssBaseline } from "@material-ui/core";
import LoanValuesEntry, { LoanValuesEntryProps }  from "./LoanValuesEntry";

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

const PMT = (ir: number,np: number, pv: number, fv: number = 0): number => {   
  // PMT() is the periodical amount to be paid / received) e.g. Scheduled payment	
  // ir: interest rate
  // np: number of payment
  // pv: present value or loan amount
  // fv: future value. default is 0

  var presentValueInterstFactor = Math.pow((1 + ir), np);
  console.log('presentValueInterstFactor', presentValueInterstFactor);
  console.log('presentValueInterstFactor + fv', presentValueInterstFactor + fv);
  console.log('presentValueInterstFactor - 1', presentValueInterstFactor - 1);
  var pmt = ir * pv  * (presentValueInterstFactor + fv)/(presentValueInterstFactor-1); 
  return pmt;
}

const scheduledNumberOfPayments = (np: number, lt: number): number => {
  // np: number of payment
  // lt: loan terms in year
  return np * lt; 
};	
// =IFERROR(IF(LoanIsGood,IF(PaymentsPerYear=1,1,MATCH(0.01,End_Bal,-1)+1)),"")
const loanIsGood = (ir: number,np: number, pv: number, sd: Date): boolean =>
{
  // loanIsGood() is to check if loan values are ready (e.g. > 0)
  // ir: interest rate
  // np: number of payment
  // pv: present value or loan amount
  // sd: start date
  return (ir>0) 
          && (np>0) 
          && (pv>0) 
          && (sd instanceof Date && sd > new Date(Date.now() - 86400000)); // that is: 24 * 60 * 60 * 1000);
}

export default function LoanEntryForm() {
  const classes = useStyles();

  //const [loanValues, setLoanValues] = React.useState<LoanValuesEntryProps>();    

  const getLoanValues = (loanValues: LoanValuesEntryProps) => {

    if(loanIsGood(loanValues.interestRate, loanValues.expectedPaymentsPerYear, loanValues.loanAmount, loanValues.startDate))
    {
      console.log('Loan is good');

      let numberOfPayments = scheduledNumberOfPayments(loanValues.expectedPaymentsPerYear, loanValues.loanTermInYear);
      console.log('numberOfPayments:', numberOfPayments);
      
      let scheduledPayment = PMT(loanValues.interestRate, numberOfPayments, loanValues.loanAmount, loanValues.extraLoanPaymentAmount);
      console.log('scheduledPayment', scheduledPayment);
    }
    else
      console.log('Loan is NOT good');

   
    // for (let value of Object.values(loanValues)) {
    //   console.log(value);
    // }
  }

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>          
          <LoanValuesEntry onSubmit={getLoanValues} />
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