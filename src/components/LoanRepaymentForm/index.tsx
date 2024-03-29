import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography, Grid, Paper, Box, CssBaseline } from "@material-ui/core";
import LoanValuesEntry from "./LoanValuesEntry";

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

export default function LoanEntryForm() {
  const classes = useStyles();

  const time = new Date().toLocaleString();

  return (
    <Box className={classes.root}>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
          {/* <LoanValuesEntry loanAmount={250000} interestRate={3} loanTermInYear={30} expectedPaymentsPerYear={12} startDate={new Date()} extraLoanPaymentAmount={25000}/> */}
          <LoanValuesEntry />
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