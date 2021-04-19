import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { getConfig } from "../../authConfig";

import Navbar from "../../components/Navbar/Navbar";
import Navbarnavigation from "../../components/NavbarNavigation/Navbar";

import Link from "@material-ui/core/Link";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import Carousel from 'react-material-ui-carousel'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';

import { Chip } from "@material-ui/core";
import { Button, LinearProgress, IconButton } from "@material-ui/core";

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
  logoContainer: {
    textAlign: "left"
  },
  food: {
    width: "270px",
    height: "170px",
  },
  foodContainer: {
    //textAlign: "center"
  },
  text: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "10px",
  },
  carousel: {
    width: "250px",
    height: "150px",
    margin: "10px"
  },
  nameOfItem: {
    margin: "10px"
  },
  category1: {
    width: "250px",
    height: "250px",
  },
  link: {
    color: "#000",
    "&:hover": {
      textDecoration: "none",
      color: "#007EB4"
    }
  },
  categories: {
    marginBottom: "20px",
  },
  Text1: {
    marginTop: "30px"
  }
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
        <StyledTableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.first_name}
        </StyledTableCell>
        <StyledTableCell align="center">{row.middle_initial}</StyledTableCell>
        <StyledTableCell align="center">{row.last_name}</StyledTableCell>
        <StyledTableCell align="center" >{row.email}</StyledTableCell>
        <StyledTableCell align="center">{row.employee_id}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Employee information
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="center">Phone Number</StyledTableCell>
                    <StyledTableCell align="center">Date of Birth</StyledTableCell>
                    <StyledTableCell align="center">Salary</StyledTableCell>
                    <StyledTableCell align="center">Street Number</StyledTableCell>
                    <StyledTableCell align="center">Street Name</StyledTableCell>
                    <StyledTableCell align="center">City</StyledTableCell>
                    <StyledTableCell align="center">Zip code</StyledTableCell>
                    <StyledTableCell align="center" >Employment Date</StyledTableCell>
                    <StyledTableCell align="center">Store ID</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {//row.inventory.map((historyRow) => (
                    <StyledTableRow key={row.phone_number}>
                      <StyledTableCell component="th" scope="row" align="center">
                        {row.phone_number}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.date_of_birth}</StyledTableCell>
                      <StyledTableCell align="center">{row.salary}</StyledTableCell>
                      <StyledTableCell align="center">{row.street_number}</StyledTableCell>
                      <StyledTableCell align="center">{row.street_name}</StyledTableCell>
                      <StyledTableCell align="center">{row.city}</StyledTableCell>
                      <StyledTableCell align="center">{row.zip_code}</StyledTableCell>
                      <StyledTableCell align="center">{row.employment_date}</StyledTableCell>
                      <StyledTableCell align="center">
                        {row.store_store_id}
                      </StyledTableCell>
                    </StyledTableRow>
                    //))}
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

function CollapsibleTable({ rows }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell />
            <StyledTableCell >First Name</StyledTableCell>
            <StyledTableCell align="center">Middle Initial</StyledTableCell>
            <StyledTableCell align="center">Last Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>

            <StyledTableCell align="center">Employee ID</StyledTableCell>

          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.item_id} row={row} />

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
    if (data.is_employee === "true") {
      axios.post("/api/view_all_employee", data)
        .then((res) => {

          console.log("RESDATA", res.data[0].employee_id)

          setRows(res.data);
          console.log(res.data);
          console.log(rows);
          
        })
        .catch((err) => {
          console.log(err.response.data);
          history.push("/login");
        });

    }
    else {
      history.push("/login");
    }



  }, []);


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
            {rows ? (<CollapsibleTable rows={rows} />) : (null)}

          </Grid>








          <Footer />
        </Grid>
      </React.Fragment>
    </div>
  );
}

export default Home;
