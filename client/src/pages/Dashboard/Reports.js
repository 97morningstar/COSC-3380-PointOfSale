import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import Navbarnavigation from "../../components/NavbarNavigation/Navbar";

import { withStyles,makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

/* Images */
import slogan from "../../assets/_Logo (1).png";
/* Categories Images */
/* Categories Images */

import Footer from "../../components/Footer/Footer";

import back from "../../assets/background1.jpg";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="right">{row.category}</StyledTableCell>
        <StyledTableCell align="right">{row.brand}</StyledTableCell>
        <StyledTableCell align="right">{row.selling_price}</StyledTableCell>
        <StyledTableCell align="right">{row.manufacture_cost}</StyledTableCell>
        <StyledTableCell align="right">{row.discount}</StyledTableCell>
        <StyledTableCell align="right">{row.item_id}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Item Inventory
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Store Name</StyledTableCell>
                    <StyledTableCell>Store Quantity</StyledTableCell>
                    <StyledTableCell align="right">Warehouse Name</StyledTableCell>
                    <StyledTableCell align="right">Warehouse Quantity</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {row.inventory.map((historyRow) => (
                    <StyledTableRow key={historyRow.store_name}>
                      <StyledTableCell component="th" scope="row">
                        {historyRow.store_name}
                      </StyledTableCell>
                      <StyledTableCell>{historyRow.store_quantity}</StyledTableCell>
                      <StyledTableCell align="right">{historyRow.warehouse_name}</StyledTableCell>
                      <StyledTableCell align="right">
                        {historyRow.warehouse_quantity}
                      </StyledTableCell>
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
Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    //name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};
function CollapsibleTable({rows}) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell />
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Brand</StyledTableCell>
            <StyledTableCell align="right">Selling Price</StyledTableCell>
            <StyledTableCell align="right">Manufacture Cost</StyledTableCell>
            <StyledTableCell align="right">Discount Percent Off</StyledTableCell>
            <StyledTableCell align="right">Item ID</StyledTableCell>
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
var myRows = [];
  useEffect(() => {
    if (data.is_employee === "true"){
      axios.get("http://localhost:4000/api/view_all_purchases")
      .then((res) => {
      
      console.log("myData",res);
      var itemSold= 0;
      var itemsRefunded = 0;
      var totalSellingPrice = 0;
      var totalManufacturingPrice = 0;
      var profit = 0;
      var avgItemsPerOrder = 0;
      var avgOrderCost = 0;
      var myArr = [];
      var obj = {};
      console.log("res.length",res.data.length);
      console.log("res.length",res.data[0].invoice_id);
      for (var i = 0; i < res.data.length; i++){
         axios.get("http://localhost:4000/api/fullInvoice/"+[res.data[i].invoice_id]).then((invoice_items) => {
          console.log(i,invoice_items);
          obj = invoice_items.data;
          myArr.push(obj);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
        

      }
      console.log("myArr",myArr);
      console.log("myArr[0]",myArr[0]);
      var infoArr = [];
      for (var i = 0; i < res.data.length; i++){
        var information = {
          invoice_id: res.data[i].invoice_id,
          total_cost: res.data[i].total_cost,
          time_of_transaction: res.data[i].time_of_transaction,
          order_status: res.data[i].order_status,
          total_cost_after_tax: res.data[i].total_cost_after_tax,
          items: myArr[i]
        }
          infoArr.push(information);
      }
      console.log("Combined Info",infoArr);
      

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
          {rows ? (<CollapsibleTable rows={rows} />) : (null)}
          
          </Grid>
         
         
  
     


      
      
          <Footer />
        </Grid>
      </React.Fragment>
    </div>
  );
  }
export default Home;
