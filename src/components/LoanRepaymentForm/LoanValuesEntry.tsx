import * as React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";


type LoanValuesEntryProps = {
  loanAmount: number,
  interestRate: number,
  loanTermInYear: number,
  expectedPaymentsPerYear: number,
  startDate: Date,
  extraLoanPaymentAmount: number 
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    avatar: { m: 1, bgcolor: "secondary.main" },
    box: {
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%", // Fix IE11 issue.
      mt: 3,
    },
    botton_submit: { mt: 3, mb: 2 },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

export default function LoanValuesEntry(initialProps : LoanValuesEntryProps) {
  const classes = useStyles();

  const [loanValues, setLoanValues] = React.useState<LoanValuesEntryProps>(initialProps);

  const loanValuesOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event.target.name, event.target.value);    
    setLoanValues({
      ...loanValues,
      [event.target.name]: event.target.value
    });
  };

  
  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Box className={classes.box}>
        <Avatar className={classes.avatar}>
          <MonetizationOnIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          LOAN VALUES
        </Typography>
        <Box
          component="form"
          // noValidate          
        >
          {/* entry fields */}
          <form  className={classes.form} noValidate autoComplete="off">
          <Grid container spacing={0}>           
            <Grid item xs={8}>
              <TextField
                name="loanAmount"
                required
                fullWidth
                id="loanAmount"
                label="Loan amount"
                defaultValue={loanValues.loanAmount}
                onChange={loanValuesOnChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                id="interestRate"
                label="Interest rate"
                name="interestRate"
                defaultValue={loanValues.interestRate}
                onChange={loanValuesOnChange}
              />
            </Grid>
            <Grid item xs={4} container justify="flex-end">
              <Grid item>
                <Link
                  href="https://www.finder.com.au/bank-interest-rates"
                  variant="body2"
                >
                  Compare Bank Interest Rates
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                id="loanTermInYear"
                label="Loan term in years"
                name="loanTermInYear"
                defaultValue={loanValues.loanTermInYear}
                onChange={loanValuesOnChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                id="expectedPaymentsPerYear"
                label="Payments made per year"
                name="expectedPaymentsPerYear"
                defaultValue={loanValues.expectedPaymentsPerYear}
                onChange={loanValuesOnChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                required
                fullWidth
                id="startDate"
                label="Loan repayment start date"
                name="startDate"
                defaultValue={loanValues.startDate}
                onChange={loanValuesOnChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="extraLoanPaymentAmount"
                label="Optional extra payments"
                name="extraLoanPaymentAmount"
                defaultValue={loanValues.extraLoanPaymentAmount}
                onChange={loanValuesOnChange}
              />
            </Grid>            
          </Grid>
          </form>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
}
