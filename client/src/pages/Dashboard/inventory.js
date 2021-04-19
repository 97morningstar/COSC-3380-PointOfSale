import React, { useEffect, useState, useContext } from "react";
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

    /* FIX */

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
        history.go(0);
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
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="right">{row.category}</StyledTableCell>
        <StyledTableCell align="right">{row.brand}</StyledTableCell>
        <StyledTableCell align="right">{row.selling_price}</StyledTableCell>
        <StyledTableCell align="right">{row.manufacture_cost}</StyledTableCell>
        <StyledTableCell align="right">{row.discount}</StyledTableCell>
        <StyledTableCell align="right">{row.item_id}</StyledTableCell>
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
          EDIT {row.name}
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
            onClick={handleCloseEdit}
            style={{ backgroundColor: "#f0f0f0", color: "#C8102E" }}
          >
            CANCEL
           </Button>
          <Button
            onClick={handleSave}
            style={{ backgroundColor: "#C8102E", color: "#FFFFFF" }}
            className={classes.projectAdd}
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

  const [openAdd, setOpenAdd] = useState(false);
  const [item, setItem] = useState({});

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleAdd = () => {
    setOpenAdd(true);
  }

const handleSave = () => {
  setOpenAdd(false);

  /* AXIOS GOES HERE */
axios.post("/api/create_item",item)
.then((res) => {
  console.log(res.data)
})
.catch((err) => {

})
}

  useEffect(() => {
    if (data.is_employee === "true") {
      axios.post("/api/view_all_inventories", data)
        .then((res) => {

          console.log("RESDATA", res.data[0].name)

          console.log(res.data);
          var currentItem = res.data[0].item_id;
          var index = 0;
          var arr = [];
          var obj = {
            item_id: res.data[0].item_id,
            name: res.data[0].name,
            category: res.data[0].category,
            brand: res.data[0].brand,
            selling_price: res.data[0].selling_price,
            manufacture_cost: res.data[0].manufacture_cost,
            discount: res.data[0].discount,
            inventory: []
          }
          console.log("obj", obj);
          var invObj = {
            store_id: res.data[0].store_id,
            warehouse_id: res.data[0].warehouse_id,
            store_name: res.data[0].store_name,
            store_quantity: res.data[0].storeQuantity,
            warehouse_name: res.data[0].warehouse_name,
            warehouse_quantity: res.data[0].warehouseQuantity
          }
          console.log("invObj", invObj);
          obj.inventory.push(invObj);
          console.log("My object", obj);
          console.log("current item", currentItem);
          arr.push(obj);
          for (var i = 1; i < res.data.length; i++) {
            invObj = {
              store_id: res.data[i].store_id,
            warehouse_id: res.data[i].warehouse_id,
              store_name: res.data[i].store_name,
              store_quantity: res.data[i].storeQuantity,
              warehouse_name: res.data[i].warehouse_name,
              warehouse_quantity: res.data[i].warehouseQuantity
            }
            if (currentItem === res.data[i].item_id) {
              arr[index].inventory.push(invObj);
            }
            else {
              obj = {
                item_id: res.data[i].item_id,
                name: res.data[i].name,
                category: res.data[i].category,
                brand: res.data[i].brand,
                selling_price: res.data[i].selling_price,
                manufacture_cost: res.data[i].manufacture_cost,
                discount: res.data[i].discount,
                inventory: []
              }
              obj.inventory.push(invObj)
              arr.push(obj);
              index = index + 1;
              currentItem = res.data[i].item_id;
            }
          }
          console.log("myArr", arr);
          setRows(arr);
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

  const handleCurrentProjectChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };



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
            <Grid item xs={6} className={classes.logoContainer} justify="center">
              <img alt="uh logo" className={classes.logo} src={slogan} />
            </Grid>


          </Grid>
          <Navbarnavigation />
          <Grid>
          </Grid>

          <Button variant="contained" color="primary" className={classes.button} disableElevation onClick={handleAdd} startIcon={<AddIcon />}>
            ADD NEW ITEM
        </Button>
          <Grid>
            {rows ? (<CollapsibleTable rows={rows} />) : (null)}

          </Grid>



          <Dialog
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          classes={classes.addNewTitle}
          id="form-dialog-title"
          style={{ wordBreak: "break-all" }}
        >
          ADD NEW ITEM
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
            value={item.name || ""}
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
            value={item.brand || ""}
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
            value={item.category || ""}
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
            value={item.manufacture_cost || ""}
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
            value={item.discount || ""}
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
            value={item.selling_price || ""}
            onChange={handleCurrentProjectChange}
          />

        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseAdd}
            style={{ backgroundColor: "#f0f0f0", color: "#C8102E" }}
          >
            CANCEL
           </Button>
          <Button
            onClick={handleSave}
            style={{ backgroundColor: "#C8102E", color: "#FFFFFF" }}
            className={classes.projectAdd}
          >
            SAVE
           </Button>
        </DialogActions>
      </Dialog>





          <Footer />
        </Grid>
      </React.Fragment>
    </div>
  );
}
export default Home;
