import React, { useEffect, useState, useContext, memo } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import Navbarnavigation from "../../components/NavbarNavigation/Navbar";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Grid, Typography, Button, Dialog, TextField,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
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
import AddIcon from '@material-ui/icons/Add';
import CachedIcon from '@material-ui/icons/Cached';
import DeleteIcon from '@material-ui/icons/Delete';

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
    },
    space: {
      margin: "10px"
    },
    button:{
      margin: "10px",
      width: "300px"
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

export function Ting({rows}){
    

  
  function Row(props) {
    const { row } = props;
    const [rowData, setRowData] = useState(row);
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const classe = useStyles();
    const [openEdit, setOpenEdit] = useState(false);
    const history = useHistory();
  
    const handleCloseEdit = () => {
      setOpenEdit(false);
    };
  
    const handleUpdate = () => {
      setOpenEdit(true);
    }
  
    const handleDelete = () => {
      setOpenEdit(false);
  
     
  
      axios.put("/inventory/update_quantity", rowData)
        .then((res) => {
          console.log(res.data);
          history.go(0);
        })
        .catch((err) => {
        })
  
    }
    const handleRestockStore = store_id =>() => {
      setOpenEdit(false);
  
      /* FIX */
      console.log(rowData);
      console.log("item id",rowData.item_id);
      console.log("store_id", store_id);
      const neededInfo = {
        store_id: store_id,
        item_id: rowData.item_id
      }
      axios.put("/inventory/restock_store", neededInfo)
        .then((res) => {
          console.log(res.data);
          history.go(0);
        })
        .catch((err) => {
        })
  
    }
    const handleRestockWarehouse = warehouse_id =>() => {
      setOpenEdit(false);
  
      /* FIX */
      console.log(rowData);
      console.log("item id",rowData.item_id);
      console.log("warehouse_id", warehouse_id);
      const neededInfo = {
        warehouse_id: warehouse_id,
        item_id: rowData.item_id
      }
  
      axios.put("/inventory/restock_warehouse", neededInfo)
        .then((res) => {
          console.log(res.data);
          history.go(0);
        })
        .catch((err) => {
        })
  
    }
  
    const handleSave = () => {
  
      setOpenEdit(false);
  
      axios.put("/inventory/update_item", rowData)
        .then((res) => {
          console.log(res.data);
         // history.go(0);
        })
        .catch((err) => {
        })
    }
  
    /*const  handleCurrentProjectChange = (e, which) => {
         console.log(e.target.value)
    }*/
  
    const handleCurrentProjectChange = (e) => {
      setRowData({
        ...rowData,
        [e.target.name]: e.target.value,
      });
    };
  
  
  
    return (
      <React.Fragment>
        <StyledTableRow className={classes.root}>
          <StyledTableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </StyledTableCell>
          <StyledTableCell component="th" scope="row">
            {rowData.name}
          </StyledTableCell>
          <StyledTableCell align="right">{rowData.category}</StyledTableCell>
          <StyledTableCell align="right">{rowData.brand}</StyledTableCell>
          <StyledTableCell align="right">{rowData.selling_price}</StyledTableCell>
          <StyledTableCell align="right">{rowData.manufacture_cost}</StyledTableCell>
          <StyledTableCell align="right">{rowData.discount}</StyledTableCell>
          <StyledTableCell align="right">{rowData.item_id}</StyledTableCell>
          <StyledTableCell >
            <Button variant="contained" color="primary" disableElevation className={classe.space} onClick={handleUpdate} startIcon={<CachedIcon />}>
              UPDATE
          </Button>
            <Button variant="contained" color="secondary" disableElevation className={classe.space} onClick={handleDelete} startIcon={<DeleteIcon />}>
              DELETE FROM INVENTORY
          </Button>
  
          </StyledTableCell>
  
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
                      <StyledTableCell align="center">Actions</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {rowData.inventory.map((historyRow) => (
                      <StyledTableRow key={historyRow.store_name}>
                        <StyledTableCell component="th" scope="row">
                          {historyRow.store_name}
                        </StyledTableCell>
                        <StyledTableCell>{historyRow.store_quantity}</StyledTableCell>
                        <StyledTableCell align="right">{historyRow.warehouse_name}</StyledTableCell>
                        <StyledTableCell align="right">
                          {historyRow.warehouse_quantity}
                        </StyledTableCell>
                        <Button variant="contained" color="primary" disableElevation className={classe.space} onClick={handleRestockStore(historyRow.store_id) } startIcon={<CachedIcon />}>
                            Restock Store
                        </Button>
                        <Button variant="contained" color="primary" disableElevation className={classe.space} onClick={handleRestockWarehouse(historyRow.warehouse_id)} startIcon={<CachedIcon />}>
                            Restock Warehouse
                        </Button>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </StyledTableCell>
        </StyledTableRow>
  
  
        <Dialog
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle
            classes={classes.addNewTitle}
            id="form-dialog-title"
            style={{ wordBreak: "break-all" }}
          >
            EDIT {rowData.name}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              name="name"
              inputProps={{ maxLength: 200 }}
              type="string"
              fullWidth
              variant="outlined"
              value={rowData.name}
              onChange={handleCurrentProjectChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="b"
              label="Brand"
              name="brand"
              inputProps={{ maxLength: 200 }}
              type="string"
              fullWidth
              variant="outlined"
              value={rowData.brand}
              onChange={handleCurrentProjectChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="category"
              label="Category"
              name="category"
              inputProps={{ maxLength: 200 }}
              type="string"
              fullWidth
              variant="outlined"
              value={rowData.category}
              onChange={handleCurrentProjectChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="manufacture_cost"
              label="Manufacture Cost"
              name="manufacture_cost"
              inputProps={{ maxLength: 200 }}
              type="string"
              fullWidth
              variant="outlined"
              value={rowData.manufacture_cost}
              onChange={handleCurrentProjectChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="discount"
              label="Discount"
              name="discount"
              inputProps={{ maxLength: 200 }}
              type="string"
              fullWidth
              variant="outlined"
              value={rowData.discount}
              onChange={handleCurrentProjectChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="selling_price"
              label="Selling Price"
              name="selling_price"
              inputProps={{ maxLength: 200 }}
              type="string"
              fullWidth
              variant="outlined"
              value={rowData.selling_price}
              onChange={handleCurrentProjectChange}
            />
  
          </DialogContent>
          <DialogActions>
            <Button
            color="secondary" 
              onClick={handleCloseEdit}
              variant="contained" disableElevation 
            >
              CANCEL
             </Button>
            <Button
            color="primary" 
              onClick={handleSave}
              variant="contained" disableElevation 
            
            >
              SAVE
             </Button>
          </DialogActions>
        </Dialog>
  
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
  function CollapsibleTable({ rows }) {
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
              <StyledTableCell align="center">Actions</StyledTableCell>
  
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
    return(
        <CollapsibleTable rows={rows} />
    );
}

export const Table1 = React.memo(Ting);