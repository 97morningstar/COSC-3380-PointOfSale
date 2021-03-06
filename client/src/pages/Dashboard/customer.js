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
/* Categories Images */

import Footer from "../../components/Footer/Footer";

import back from "../../assets/background1.jpg";
import { useHistory } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
    marginBottom: "20px",
  },
Text1:{
  marginTop: "30px"
}
}));

function DenseTable({rows}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>employee id</TableCell>
                <TableCell align="right">first name</TableCell>
                <TableCell align="right">middle initial</TableCell>
                <TableCell align="right">last name</TableCell>
                <TableCell align="right">employment date</TableCell>
                <TableCell align="right">date of birth</TableCell>
                <TableCell align="right">email</TableCell>
                <TableCell align="right">password</TableCell>
                <TableCell align="right">salary</TableCell>
                <TableCell align="right">street number</TableCell>
                <TableCell align="right">street name</TableCell>
                <TableCell align="right">city</TableCell>
                <TableCell align="right">zip code</TableCell>
                <TableCell align="right">phone number</TableCell>
                <TableCell align="right">store id</TableCell>
                <TableCell align="right">store name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.employee_id}
              </TableCell>
              <TableCell align="right">{row.first_name}</TableCell>
              <TableCell align="right">{row.middle_initial}</TableCell>
              <TableCell align="right">{row.last_name}</TableCell>
              <TableCell align="right">{row.employment_date}</TableCell>
              <TableCell align="right">{row.date_of_birth}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.password}</TableCell>
              <TableCell align="right">{row.salary}</TableCell>
              <TableCell align="right">{row.street_number}</TableCell>
              <TableCell align="right">{row.street_name}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.zip_code}</TableCell>
              <TableCell align="right">{row.phone_number}</TableCell>
              <TableCell align="right">{row.store_store_id}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  );
  
}
function Home() {
  const classes = useStyles();
  const theme = createMuiTheme();
  const data = {
    jwtToken: localStorage.getItem("token"),
    user_id: localStorage.getItem("user_id"),
    is_employee: localStorage.getItem("is_employee")
  }
const [rows, setRows] = useState([]);
let history = useHistory();
  useEffect(() => {
    if (data.is_employee === "true"){
      axios.post("/api/view_all_employee",data)
      .then((res) => {
      
      console.log("RESDATA",res.data[0].employee_id)
      setRows(res.data);
      console.log(res.data);
      console.log(rows);
      })
      .catch((err) => {
        console.log(err.response.data);
        history.push("/login");
      });
      
    }
    else{
      history.push("/login");
    }
    
 

  },[]);


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
          <Grid>
          </Grid>
          <Grid>
          {rows ? (<DenseTable rows={rows} />) : (null)}
          
          </Grid>
         
         
  
     


      
      
          <Footer />
        </Grid>
      </React.Fragment>
    </div>
  );
}
export default Home;
