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

// input type for this component
export type LoanValuesEntryProps = {
  loanAmount: number;
  interestRate: number;
  loanTermInYear: number;
  expectedPaymentsPerYear: number;
  startDate: Date;
  extraLoanPaymentAmount?: number | undefined;
  onSubmit(loanValues: LoanValuesEntryProps): void;
};

// component stype is here
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
    botton_submit: {
      mt: 3,
      mb: 2,
      margin: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

// funtional component
export default function LoanValuesEntry(props: LoanValuesEntryProps) {
  const classes = useStyles(); // createStyles() -> makeStyles()  to be use it here e.g. useStyle() :)
  //const [loanRepayments, setloanRepayments] = React.useState("");

  /* make a copy of compument's state, consider good rule of efficient state management
   * e.g. Getter and Setter for `loanValues` variable
   * !Notes the setLoanValues() violates the `One Concern` rule because one state variable `loanValues` is responsible multiple values (e.g. in LoanValuesEntryProps)
   */
  const [loanValues, setLoanValues] = React.useState<LoanValuesEntryProps>(
    props
  );

  // define the only function to update component's state
  const loanValuesOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    // This function expect an change event from an `target` type HTMLInputElement where it is identified by `name` and hold the data in `value`
    console.log(event.target.name, event.target.value.replace(/^0+/, ""));

    /* ! This looks simple but you might want to avoid
     * Here, you need nearby the whole state e.g. `...loanValues` to be able to update just `event.target.name`
     * This is a big construction to invoke to simply increase a counter: all because the state variable is responsible for more than one concern
     *
     * Q: what if I have way too much useState() variables?
     * A: there is a good chance that you still violate the same rule e.g. Single Responsibility Principle. Perhaps the compoment will need to be splited.
     *
     * Make your own judgement or `Extract multiple state operations into a reducer.`
     *
     * Use custom hook or a reducer for update logic but do in t away that less details of how the state is updated a desirable
     *
     */    
    setLoanValues({
      ...loanValues,
      [event.target.name]: event.target.value.replace(/^0+/, ""),
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
          className={classes.form}
        >
          {/* entry fields */}

          <Grid container spacing={0}>
            <Grid item xs={8}>
              <TextField
                name="loanAmount"
                required
                fullWidth
                id="loanAmount"
                label="Loan amount"
                value={loanValues.loanAmount}
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
                value={loanValues.interestRate}
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
                value={loanValues.loanTermInYear}
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
                value={loanValues.expectedPaymentsPerYear}
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
                value={loanValues.startDate}
                onChange={loanValuesOnChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="extraLoanPaymentAmount"
                label="Optional extra payments"
                name="extraLoanPaymentAmount"
                value={loanValues.extraLoanPaymentAmount}
                onChange={loanValuesOnChange}
              />
            </Grid>
            <Grid item xs={8}>
              <Button
                variant="contained"
                color="default"
                className={classes.botton_submit}
                onClick={() => props.onSubmit(loanValues)}
                // startIcon={<CloudUploadIcon />}
              >
                Show Repayment
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
}

// IMHO, having default props is quite handy (for functional component in react one can de define as below)
LoanValuesEntry.defaultProps = {
  loanAmount: 0,
  interestRate: 0,
  loanTermInYear: 0,
  expectedPaymentsPerYear: 0,
  startDate: new Date(),
  extraLoanPaymentAmount: 0,
  //onClick: (event: React.MouseEvent<HTMLElement>) => console.log(event),
  onSubmit: (loanValues: LoanValuesEntryProps) =>
    console.log("defaultProps: onSubmit()"),
};
