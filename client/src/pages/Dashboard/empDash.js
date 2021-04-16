import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { getConfig } from "../../authConfig";

import Navbar from "../../components/Navbar/Navbar";
import Navbarnavigation from "../../components/NavbarNavigation/Navbar";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import Carousel from 'react-material-ui-carousel'

import { Chip } from "@material-ui/core";
import { Button, LinearProgress } from "@material-ui/core";

/* Images */
import slogan from "../../assets/_Logo (1).png";
import food from "../../assets/food.png";
/* Categories Images */
import Electronics from "../../assets/Electronics.png";
import Pets from "../../assets/Pets.png";
import ToysAndGames from "../../assets/ToysAndGames.png";
import Clothing from "../../assets/MensClothing.png";
import Miscellaneous from "../../assets/Miscellaneous.png";
import Groceries from "../../assets/Groceries.png";

import back from "../../assets/background1.jpg";
import Footer from "../../components/Footer/Footer";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto"
  },
  text: {
    position: "relative",
    paddingTop: "100px"
  },
  title_1: {
    color: "black",
    letterSpacing: "1px"
  },
  title_2: {
    color: "#fff",
    letterSpacing: "1px"
  },
  content: {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "900",
    color: "white"
  },
  design: {
    backgroundImage: `url(${back})`,
    backgroundColor: "#007EB4",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: "150px !important",
    paddingTop: "60px"
  },
  logo: {
    width: "170px",
    height: "170px",
  },
  logoContainer:{
      textAlign: "left"
  },
   food: {
    width: "270px",
    height: "170px",
  },
  foodContainer:{
    //textAlign: "center"
  },
  text:{
    display: "flex", 
    justifyContent: "flex-start" ,
    padding: "10px",
  },
  carousel:{
      width: "250px",
      height: "150px",
      margin: "10px"
  },
  nameOfItem:{
    margin: "10px"
  },
  category1:{
    width: "250px",
    height: "250px",
  },
  link:{
    color: "#000",
    "&:hover": {
    textDecoration: "none",
    color: "#007EB4"
    }
  },
  categories:{
    marginBottom: "40px",
  },
Text1:{
  marginTop: "70px",
  marginBottom: "70px"
},
categoryItem:{
 marginBottom: "100px"
}
}));


function Home() {
  const classes = useStyles();
  const theme = createMuiTheme();

  /* Recommended Items 15 */
  const history = useHistory();
 

const arrayImages = ['Dog','Peach','Apple', 'Cup', 'Laptop'];
  

useEffect(() => {

  const data = {
    jwtToken: localStorage.getItem("token"),
    user_id: localStorage.getItem("user_id"),
    is_employee: localStorage.getItem("is_employee")
  }

  /* VERIFY USER IS LOGGED IN */
  axios.post("http://localhost:4000/get_dashboard", data)
  .then((res) => {
  })
  .catch((err) => {
    console.log(err);
    history.push("/");
  })
},[]);


const [imageArray, setimageArray] = useState([]);


  theme.typography.h3 = {
    fontSize: "1.4rem",
    "@media (min-width:400px)": {
      fontSize: "1.4rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  };
  return (
    <div>
      <React.Fragment>
        <Grid
          container
          xs={12}
          className={classes.root}
          component="main">
          <Navbar />
          <Grid container xs={12} className={classes.design}>
            <Grid container xs={6} className={classes.logoContainer} justify="center">
                  <img alt="uh logo" className={classes.logo} src={slogan} />
            </Grid>
          
       
          </Grid>
          <Navbarnavigation />

         
       
     
       <Grid  container  xs={12}  spacing={5}   direction="column"   alignItems="center"  justify="center">
            <Grid xs={12} item className={classes.text} >
                <Typography variant="h3" className={classes.Text1} >
                      Employee Dashboard
                </Typography>
            </Grid>
        </Grid>

        <Grid xs={12}    container justify="center" alignItems="center"  spacing={1} className={classes.categories} >
            <Grid xs={12} container justify="center" alignItems="center"  >
                <Grid item xs={4} className={classes.categoryItem}>
                  <Link href="/employeeTable" className={classes.link}>
                      <img alt="category" className={classes.category1} src={Groceries} />
                      <Typography variant="h5" className={classes.Text} >
                      Employees
                     </Typography>
                  </Link>
                </Grid>
                <Grid item xs={4} className={classes.categoryItem}>
                  <Link href="/inventory" className={classes.link} > 
                      <img alt="category" className={classes.category1} src={Electronics} />
                      <Typography variant="h5" className={classes.Text} >
                      Inventory
                     </Typography>
                  </Link>
                </Grid>
                <Grid item xs={4} className={classes.categoryItem}>
                    <Link href="/customer" className={classes.link}>
                        <img alt="category" className={classes.category1} src={Clothing} />
                       <Typography variant="h5" className={classes.Text} >
                        Customers
                     </Typography>
                    </Link>
                </Grid>
            </Grid>
            <Grid xs={12} container justify="center" alignItems="center" >
                <Grid item xs={4} className={classes.categoryItem}>
                    <Link href="/transaction" className={classes.link}>
                        <img alt="category" className={classes.category1} src={Miscellaneous} />
                        <Typography variant="h5" className={classes.Text} >
                        Customer Transactions
                     </Typography>
                    </Link>
                </Grid>
                <Grid item xs={4} className={classes.categoryItem}>
                    <Link href="/support" className={classes.link}>
                        <img alt="category" className={classes.category1} src={ToysAndGames} />
                        <Typography variant="h5" className={classes.Text} >
                        Support Ticket
                     </Typography>
                    </Link>
                </Grid>
                <Grid item xs={4} className={classes.categoryItem}>
                    <Link href="/reports" className={classes.link}>
                        <img alt="category" className={classes.category1} src={Pets} />
                        <Typography variant="h5" className={classes.Text} >
                          Reports
                     </Typography>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
       
      
          <Footer />
        </Grid>
      </React.Fragment>
    </div>
  );
}
export default Home;
