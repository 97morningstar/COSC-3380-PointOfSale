import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import loginbackground from "../../assets/LoginBackground.jpg";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${loginbackground})`,
    backgroundSize: "cover",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  loginAlert: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

const getNewToken = () => {
  let token = localStorage.getItem("token");
  if (token) {
    axios
      .post("http://18.213.74.196:8000/api/token/refresh/", {
        refresh: localStorage.getItem("refresh"),
      })
      .then((res) => {
        localStorage.setItem("token", res.data.access);
        setTimeout(getNewToken, 17900 * 1000); //Get new token approxiamtey every 4 hrs and 58 min.
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

function Login() {
  const classes = useStyles();
  let history = useHistory();
  const [error, setError] = useState("");

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();


    axios
      .post("/auth/login", loginInfo)
      .then((res) => {

        localStorage.setItem("email", res.data.email);
 
          console.log("Inside Login: ", res);
        
        
         history.push("/");
       
      })
      .catch((err) => {
        console.log(err);
        setError(
            "Make sure your email and password is correct."
        );
      });



  };

  return (
    <>
      <Grid container xs={12} component="main" className={classes.root}  direction="column"   alignItems="center"  justify="center"> 
        <CssBaseline />
        
        <Grid item xs={12} sm={6} md={6}   >
          <div className={classes.paper}>
            {error ? (
              <Alert
                className={classes.loginAlert}
                variant="filled"
                severity="error">
                {error}
              </Alert>
            ) : null}
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={login}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}>
                Sign In
              </Button>
              <Grid container justify="space-between">
                {/* <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid> */}
                <Grid item>
                  <Link to="/signup" href="signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    to="/lost-password"
                    href="lost-password"
                    variant="body2">
                    {"Forgot Password?"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}></Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
export default Login;
