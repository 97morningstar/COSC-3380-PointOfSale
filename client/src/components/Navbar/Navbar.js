import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UHLogo from "../../assets/UHLogo.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

//Icons
import slogan from "../../assets/_Logo (1).png";

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import HistoryIcon from '@material-ui/icons/History';
import DashboardIcon from '@material-ui/icons/Dashboard';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  logo: {
    objectFit: "contain",
    width: "70px",
    float: "left",
    height: "50px",
  },
  AppBar: {
    background: "#112232",
    display: "flex",
    width: "100%"
  },
  Login: {
    objectFit: "contain",
  },
  SignUp: {
    objectFit: "contain",
  },
  Logout: {
    objectFit: "contain",
  },
  icon: {
    margin: "10px"
  },
  menu: {
    color: "#fff"
  }
}));

export default function Navbar({ user }) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOrderHistory = () => {
    setAnchorEl(null);
    history.push("/order-history");
  }

  const handleProfile = () => {
    setAnchorEl(null);
    history.push("/profile");
  }

  const handleCart = () => {
    setAnchorEl(null);
    history.push("/cart");
  }

  const handleDashboard = () => {
    setAnchorEl(null);
    history.push("/dash");
  }

  const handleAccount = () => {
    setAnchorEl(null);
    history.push("/account");
  }

  const [userType, setUserType] = useState(null);

  const data2 = {
    jwtToken: localStorage.getItem("token"),
    user_id: localStorage.getItem("user_id"),
    is_employee: localStorage.getItem("is_employee")
  }

  //Check if token exists
  const isLoggedIn = () => {
    if (localStorage.getItem("token")) {
      console.log("token exists");
      axios.post("/auth/verify", data2)
        .then((res) => {
          //Got new access token.
          console.log("res", res);
          console.log("jwt", localStorage.getItem("is_employee"));
          // localStorage.setItem("token", res.data.jwtToken);
          // setTimeout(isLoggedIn, 17900 * 1000);

          setIsAuthenticated(true);

          const employee = localStorage.getItem("is_employee");



          if (employee === "true") {
            setUserType(true);
            console.log("is_employee")

            axios.get("/api/employee/" + localStorage.getItem("user_id"))
              .then((res) => {


                setUserName(res.data[0].first_name)

                console.log("Employee Firstname:", res.data[0].first_name);

              })
              .catch((err) => {
                console.log(err);
              });
          }
          else if (employee === "false") {
            setUserType(false);
            console.log("custoemr")
            axios.get("/api/customer/" + localStorage.getItem("user_id"))
              .then((res) => {


                setUserName(res.data[0].first_name)

                console.log(res.data[0].first_name);

              })
              .catch((err) => {
                console.log(err);
              });


          }



        })
        .catch((err) => {
          console.log("error");
          console.log(err.response);

          console.log(err.response);
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          localStorage.removeItem("is_employee");
          history.push("/login");
          // history.push("/login");
        });
    } else {
      console.log("no token x");

    }
  };

  const routeChange = () => {
    console.log("login attempt");
    let path = `/login`;
    history.push(path);
  }
  const logoutButton = () => {
    localStorage.clear();
    history.go(0);
  }
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <div>
      <React.Fragment>
        <AppBar className={classes.AppBar}>
          <Toolbar>
            <Grid item xs={11}>
              <Link href="/" className={classes.logo}>
              <img alt="uh logo" className={classes.logo} src={slogan} />
              </Link>
            </Grid>




            {!isAuthenticated ? (
              <>
                <Grid item className={classes.icon}>
                  <AccountCircleIcon />
                </Grid>
                <Grid item>
                  <Button
                    size="small"
                    color="inherit"
                    onClick={routeChange}
                    className={classes.Login}
                  >
                    Login
              </Button>
                </Grid>
                <Grid item>
                  <Button
                    size="small"
                    color="inherit"
                    className={classes.SignUp}
                    href="/signup"
                  >
                    Sign Up
               </Button>
                </Grid>
              </>

            ) :
              (
                <> Welcome {userName ? (userName) : (null)}

                  <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.menu}>
                    Menu <KeyboardArrowDownIcon />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    


                    {userType==false ? (<>
                      <MenuItem onClick={handleAccount}> <SupervisorAccountIcon className={classes.icon} /> Account</MenuItem>
                      <MenuItem onClick={handleProfile}> <AccountCircleIcon className={classes.icon} /> View Profile</MenuItem>
                    </>) : (
                      <></>
                    )
                    }

                    {userType ? (<>
                      <MenuItem onClick={handleDashboard}> <DashboardIcon className={classes.icon} /> Dashboard</MenuItem>
                    </>) : (
                      <>
                        <MenuItem onClick={handleCart}> <ShoppingCartIcon className={classes.icon} /> Cart</MenuItem>
                      </>
                    )
                    }

                    {userType==false ? (<>
                      <MenuItem onClick={handleOrderHistory}> <HistoryIcon className={classes.icon} /> Order History</MenuItem>
                    </>) : (
                      <></>
                    )
                    }


                    {/* Check if the user is an employee, if yes, show employee dashboard */}
                   



                    <MenuItem onClick={logoutButton}> <ExitToAppIcon className={classes.icon} /> Logout</MenuItem>

                  </Menu>

                </>
              )}






          </Toolbar>
        </AppBar>
      </React.Fragment>
    </div>
  );
}
