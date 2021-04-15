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
  icon:{
    margin: "10px"
  }
}));

export default function Navbar({user}) {
  const classes = useStyles();
  const history = useHistory();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);

 
  //Check if token exists
  const isLoggedIn = () => {
    if (localStorage.getItem("token")) {
      console.log("token exists");
      axios
        .post("/auth/verify", {jwtToken: localStorage.getItem("token")})
        .then((res) => {
          //Got new access token.
          console.log("res", res);
          console.log("jwt", localStorage.is_employee);
         // localStorage.setItem("token", res.data.jwtToken);
         // setTimeout(isLoggedIn, 17900 * 1000);

          setIsAuthenticated(true);
          if (localStorage.is_employee == false){
            axios
            .get("/api/customer/"+localStorage.getItem("user_id"))
            .then((res) => {
         
       
               setUserName(res.data[0].first_name)
       
               console.log(res.data[0].first_name);
       
             })
            .catch((err) => {
               console.log(err);
             });
          }
          else {
            axios
               .get("/api/employee/"+localStorage.getItem("user_id"))
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
          console.log(err.response.data);
         history.push("/login");
        });
    }else{
      console.log("no token x");

    }
  };

  const routeChange = () =>{ 
    console.log("login attempt");
    let path = `/login`; 
    history.push(path);
  }
  const logoutButton = () =>{
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
                
              </Link>
            </Grid>
            <Grid item className={classes.icon}>
              <AccountCircleIcon />
            </Grid>
           


            {!isAuthenticated ? (  
           <>
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
                <>
                <Grid item>
                  <Button
                    size="small"
                    color="inherit"
                    onClick={logoutButton}
                    className={classes.Logout}
                  >
                logout
                </Button>
                </Grid>
                <Grid item>
               Welcome {userName ? (userName) : (null)}
               </Grid>
                </>
            
               
              )}
             



            
           
          </Toolbar>
        </AppBar>
      </React.Fragment>
    </div>
  );
}
