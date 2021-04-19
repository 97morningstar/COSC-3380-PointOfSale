import React, { useState,useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";

import DatePicker from "react-date-picker";
import {
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  FormHelperText,
  RadioGroup,
  FormGroup,
  Checkbox
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Select from "react-select";

import { getConfig } from "../../authConfig";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    marginBottom: theme.spacing(2),
  },
  alert: {
    marginTop: theme.spacing(2),
  },
  grid: {
    width: "50%"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(6),
    justifyContent: "center",
  },
  formControl: {
    width: "100%",
  },
  checkLabel: {
    color: theme.palette.secondary,
  },
  submit: {
    marginTop: theme.spacing(4),
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    role_id: "",
    password1: "",
    password2: "",
  });

  const [myStore, setMyStore] = useState("");

  const [error, setError] = useState("");
  const [errorsFirst, setErrorsFirst] = useState({});
  const [valueDateOfBirth, setDateOfBirth] = useState(new Date());
  const [studentFirst, setStudentFirst] = useState({
    first_name: "",
    middle_initial: "",
    last_name: "",
    password: "",
    date_of_birth: "",
    email: "",
    street_number: "",
    street_name: "",
    zip_code: "",
    is_member: "0",
    store_id_fk: null
  });

  const handleChange = (e) => {
    setStudentFirst({ ...studentFirst, [e.target.name]: e.target.value });
  };

  let history = useHistory();


  const handleChangeFirst = (e) => {
    setStudentFirst({
      ...studentFirst,
      [e.target.name]: e.target.value,
    });
  };

  const [store, setStore] = useState({});
  useEffect(() => {

    axios.get("/api/view_all_stores")
      .then((res) => {
        const data = res.data.map((item, index) => {
          return {
            label: item.store_name,
            value: item.store_id,
          };
        });
        setStore(data)
      })
      .catch((err) => {
        console.log(err);
      });


  }, []);

  const isLoggedIn = () => {
    if (localStorage.getItem("token")) {
      console.log("token exists");
      axios.post("/auth/verify", {jwtToken: localStorage.getItem("token")})
        .then((res) => {
          //Got new access token.
          console.log("res", res);
          console.log("jwt", localStorage.getItem("is_employee"));
          history.push("/");

        })
        .catch((err) => {
          console.log("error");
          console.log(err.response.data);
         
          console.log(err.response);
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          localStorage.removeItem("is_employee");
          history.push("/login");
         // history.push("/login");
        });
    }else{
      console.log("no token x");

    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
 

  const signUp = (e) => {

    studentFirst.date_of_birth = valueDateOfBirth.toJSON()
      .substring(0, 10);;
  
    studentFirst.store_id_fk = myStore.value;

    axios.post("/auth/create_customer", studentFirst, getConfig())
      .then((res) => {
        console.log("SUCCESS");
        console.log(res);

        if (res.data.error) {
          setError(res.data.error);
        } else {
          history.push("/");
        }
      })
      .catch((err) => console.log(err));

    e.preventDefault();
  };

  return (
    <Container component="main">


      {error ? (
        <Alert className={classes.alert} variant="filled" severity="error">
          {error}
        </Alert>
      ) : null}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={signUp}>
          <Grid container spacing={2} >
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChangeFirst}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChangeFirst}
              />
            </Grid>

          </Grid>
          <Grid container spacing={2} xs={12}>
            <Grid item xs={12} >
              <TextField
                error={
                  errorsFirst.first_name && studentFirst.first_name === ""
                }
                variant="outlined"
                id="first_name"
                label="First Name"
                name="first_name"
                onChange={handleChangeFirst}
                fullWidth
                value={studentFirst.first_name}
                required={true}
                inputProps={{ maxLength: 25 }}
              />
              {errorsFirst.first_name &&
                studentFirst.first_name === "" ? (
                <FormHelperText
                  error={
                    errorsFirst.first_name &&
                    studentFirst.first_name === ""
                  }
                >
                  {errorsFirst.first_name}
                </FormHelperText>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  errorsFirst.middle_initial && studentFirst.middle_initial === ""
                }
                variant="outlined"
                id="middle_initial"
                label="Middle Initial"
                name="middle_initial"
                onChange={handleChangeFirst}
                value={studentFirst.middle_initial}
                fullWidth
                required={true}
                inputProps={{ maxLength: 24 }}
              />
              {errorsFirst.middle_initial && studentFirst.middle_initial === "" ? (
                <FormHelperText
                  error={
                    errorsFirst.middle_initial && studentFirst.middle_initial === ""
                  }
                >
                  {errorsFirst.middle_initial}
                </FormHelperText>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  errorsFirst.last_name && studentFirst.last_name === ""
                }
                variant="outlined"
                id="last_name"
                label="Last Name"
                name="last_name"
                onChange={handleChangeFirst}
                value={studentFirst.last_name}
                fullWidth
                required={true}
                inputProps={{ maxLength: 24 }}
              />
              {errorsFirst.last_name && studentFirst.last_name === "" ? (
                <FormHelperText
                  error={
                    errorsFirst.last_name && studentFirst.last_name === ""
                  }
                >
                  {errorsFirst.last_name}
                </FormHelperText>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  errorsFirst.street_number && studentFirst.street_number === ""
                }
                variant="outlined"
                id="street_number"
                label="Street Number"
                name="street_number"
                onChange={handleChangeFirst}
                value={studentFirst.street_number}
                fullWidth
                required={true}
                inputProps={{ maxLength: 24 }}
              />
              {errorsFirst.street_number && studentFirst.street_number === "" ? (
                <FormHelperText
                  error={
                    errorsFirst.street_number && studentFirst.street_number === ""
                  }
                >
                  {errorsFirst.street_number}
                </FormHelperText>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  errorsFirst.street_name && studentFirst.street_name === ""
                }
                variant="outlined"
                id="street_number"
                label="Street Name"
                name="street_name"
                onChange={handleChangeFirst}
                value={studentFirst.street_name}
                fullWidth
                required={true}
                inputProps={{ maxLength: 24 }}
              />
              {errorsFirst.street_name && studentFirst.street_name === "" ? (
                <FormHelperText
                  error={
                    errorsFirst.street_name && studentFirst.street_name === ""
                  }
                >
                  {errorsFirst.street_name}
                </FormHelperText>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  errorsFirst.zip_code && studentFirst.zip_code === ""
                }
                variant="outlined"
                id="street_number"
                label="Zip Code"
                name="zip_code"
                onChange={handleChangeFirst}
                value={studentFirst.zip_code}
                fullWidth
                required={true}
                inputProps={{ maxLength: 24 }}
              />
              {errorsFirst.zip_code && studentFirst.zip_code === "" ? (
                <FormHelperText
                  error={
                    errorsFirst.zip_code && studentFirst.zip_code === ""
                  }
                >
                  {errorsFirst.zip_code}
                </FormHelperText>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <Typography component="p">Date Of Birth</Typography>
              <DatePicker
                calendarAriaLabel="Toggle calendar"
                clearAriaLabel="Clear value"
                dayAriaLabel="Day"
                monthAriaLabel="Month"
                nativeInputAriaLabel="Date"
                onChange={(valueDateOfBirth) => {
                  setDateOfBirth(valueDateOfBirth);
                }}
                value={valueDateOfBirth}
                yearAriaLabel="Year"
                defaultValue={valueDateOfBirth}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                component="fieldset"
                style={{
                  width: "100%",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                }}>
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="end"
                    control={
                      <Checkbox
                        style={{ color: "#C8102E" }}
                        onChange={(e) => {
                          setStudentFirst({
                            ...studentFirst,
                            is_member: e.target.checked,
                          });
                        }}
                      />
                    }
                    label={
                      <Typography style={{ fontSize: 15 }}>
                        Check if you want to become a member of "The OUTLET"
                  </Typography>
                    }
                  />
                </FormGroup>
              </FormControl>
              <Select
                autoFocus
                className={`${classes.selectStore} ${classes.information}`}
                closeMenuOnSelect={true}
                options={store}
                value={{
                  label: myStore.label,
                  value: myStore.value,
                }}
                name="store_id_fk"
                onChange={(e) => {
                  setMyStore(
                    {
                   label: e.label,
                  value: e.value
                  });
                  console.log(e.value)
                }}
              />
            </Grid>




          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
