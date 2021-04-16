import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { getConfig } from "../../authConfig";
import { withStyles } from '@material-ui/core/styles';
import Navbar from "../../components/Navbar/Navbar";
import Navbarnavigation from "../../components/NavbarNavigation/Navbar";
import ShopIcon from '@material-ui/icons/Shop';
import { Link, useRouteMatch, router } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Divider, Paper, IconButton } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import Carousel from 'react-material-ui-carousel'

import { Chip } from "@material-ui/core";
import { Button, LinearProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
/* Images */
import slogan from "../../assets/_Logo (1).png";


import back from "../../assets/background1.jpg";

import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto",

  },
  divider: {
    listStyle: "none",
    margin: "10px",
    width: "100%"
  },
  divider2: {
    listStyle: "none",
    margin: "10px",
    width: "99%"
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
    paddingTop: "50px"
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
    marginBottom: "40px",
  },
  Text1: {
    marginTop: "70px",
    marginBottom: "70px"
  },
  wrapper: {
    marginBottom: "40px",
    marginTop: "100px"

  },
  rootCard: {
    margin: "20px"
  },
  thumbnail: {
    width: "100%",
    height: "150px",
    paddingBottom: "20px",
    paddingLeft: "10px",
    paddingRight: "10px",

  },
  image: {
    width: "250px",
    paddingLeft: "40px",
    paddingRight: "10px",
    paddingBottom: "20px",

    height: "200px",
  },
  selectStore: {

    width: "99%",
    zIndex: 1000,
    paddingTop: "10px",
    paddingRight: "10px",
    paddingLeft: "10px",

  },
  botton: {
    width: "90%",
    margin: "10px"
  },
  botton2: {
    width: "200px",
    margin: "10px"
  },
  selectStore: {
    zIndex: "1000"
  },
  information: {
    zIndex: "1000"
  },
  space: {
    margin: "35px"
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#112232",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    }
  },
});


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <StyledTableRow key={row.store_name}>
        <StyledTableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">{row.order_status}</StyledTableCell>
        <StyledTableCell align="right">{row.store_name}</StyledTableCell>
        <StyledTableCell align="right">${row.total_cost}</StyledTableCell>
        <StyledTableCell align="right">${row.total_cost_after_tax}</StyledTableCell>
        <StyledTableCell align="right">{(row.time_of_transaction).substring(0, 10)}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Quantity</StyledTableCell>
                    <StyledTableCell>Brand</StyledTableCell>
                    <StyledTableCell>Category</StyledTableCell>
                    <StyledTableCell>Discount</StyledTableCell>
                    <StyledTableCell>Selling Price</StyledTableCell>
                    <StyledTableCell align="right">Total Cost</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {row.array.map((historyRow) => (
                    <StyledTableRow key={historyRow.name}>
                      <StyledTableCell>{historyRow.name}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">{historyRow.quantity}</StyledTableCell>
                      <StyledTableCell scope="row">{historyRow.brand}</StyledTableCell>
                      <StyledTableCell >{historyRow.category}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">${historyRow.discount}</StyledTableCell>
                      <StyledTableCell >${historyRow.selling_price}</StyledTableCell>
                      <StyledTableCell align="right">${historyRow.total_cost}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}






function Item(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);

  let history = useHistory();

  useEffect(() => {

    /* WE NEED A PROTECTED ROUTE TO ACCESS THE CART */
    /* EMPLOYEE CAN'T BUY */
    setIsLoading(true);

    const data = {
      jwtToken: localStorage.getItem("token"),
      user_id: localStorage.getItem("user_id"),
      is_employee: localStorage.getItem("is_employee")
    }

    /* VERIFY USER IS LOGGED IN - THIS CALLS A INNER JOIN TABLE - ALSO IT CALCULATES A REPORT FOR THE USER*/
    axios.post("http://localhost:4000/order_history", data)
      .then((res) => {

        setIsLoading(false);
        setRows(res.data);

      })
      .catch((err) => {
        console.log(err.response);
        history.push("/login");
      });
  }, []);

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
              <Link href="/" className={classes.logoContainer} justify="center">
                <img alt="uh logo" className={classes.logo} src={slogan} />
              </Link>
            </Grid>
          </Grid>
          <Navbarnavigation />

          {isLoading ? (
            <>
              <Grid
                container
                item
                justify="center"
                alignItems="center"
                direction="row">
                <Grid item md={12}>
                  <LinearProgress color="secondary" />
                </Grid>
              </Grid>
            </>
          ) : (
            <>
            {rows.length !== 0 ? (
              <Grid item md={12} className={classes.space}>
                <TableContainer component={Paper}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell />
              
                        <StyledTableCell >Order Status</StyledTableCell>
                        <StyledTableCell align="right">Store</StyledTableCell>
                        <StyledTableCell align="right">Total Cost</StyledTableCell>
                        <StyledTableCell align="right">Total Cost After Tax</StyledTableCell>
                        <StyledTableCell align="right">Time Of Transaction</StyledTableCell>


                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <Row key={row.name} row={row} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              ) : (<></>)} 

            </>
          )}
        </Grid>
      </React.Fragment>
    </div>
  );
}
export default Item;
