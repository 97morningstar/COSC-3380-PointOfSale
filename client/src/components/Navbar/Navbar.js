import React, {useState, useEffect} from "react";
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

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

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
  icon:{
    margin: "10px"
  },
  menu:{
    color: "#fff"
  }
}));

export default function Navbar({user}) {
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

  const handleProfile = () => {
    setAnchorEl(null);
    history.push("/profile");
  }

  const handleCart = () => {
    setAnchorEl(null);
    history.push("/cart");
  }
 
  //Check if token exists
  const isLoggedIn = () => {
    if (localStorage.getItem("token")) {
      console.log("token exists");
      axios
        .post("/auth/verify", {jwtToken: localStorage.getItem("token")})
        .then((res) => {
          //Got new access token.
          console.log("res", res);
         // localStorage.setItem("token", res.data.jwtToken);
         // setTimeout(isLoggedIn, 17900 * 1000);

          setIsAuthenticated(true);

                axios
               .get("/api/customer/"+localStorage.getItem("user_id"))
               .then((res) => {
            
          
                  setUserName(res.data[0].first_name)
          
                  console.log(res.data[0].first_name);
          
                })
               .catch((err) => {
                  console.log(err);
                });
         
      
        })
        .catch((err) => {
          console.log("error");
          console.log(err.response);
          localStorage.removeItem("token");
          localStorage.removeItem("user_id");
          localStorage.removeItem("is_employee");

         // history.push("/login");
        });
    }else{
      console.log("no token x");

    }
  };

  const routeChange = () =>{ 
    let path = `/login`; 
    history.push(path);
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
        Menu <KeyboardArrowDownIcon/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfile}> <AccountCircleIcon className={classes.icon}/> View Profile</MenuItem>
        <MenuItem onClick={handleProfile}> <SupervisorAccountIcon className={classes.icon}/> Account</MenuItem>

        <MenuItem onClick={handleCart}> <ShoppingCartIcon className={classes.icon}/> Cart</MenuItem>

        {/* Check if the user is an employee, if yes, show employee dashboard */}        

        <MenuItem onClick={handleClose}> <ExitToAppIcon className={classes.icon}/> Logout</MenuItem>

      </Menu>
               
               </>
              )}
             



            
           
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </div>
  );
}
