import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { getConfig } from "../../authConfig";

import Navbar from "../../components/Navbar/Navbar";
import Navbarnavigation from "../../components/NavbarNavigation/Navbar";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Link from "@material-ui/core/Link";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid, Typography, Dialog, TextField,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import Select from "react-select";
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
import CachedIcon from '@material-ui/icons/Cached';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

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
  button: {
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
  space: {
    margin: "10px"
  }
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [openEdit, setOpenEdit] = useState(false);
  const [rowData, setRowData] = useState(row);
  const history = useHistory();

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleUpdate = () => {
    setOpenEdit(true);
  }
  
  const handleDelete = () => {

    axios.delete("/api/delete/employee/" + row.employee_id)
      .then((res) => {
        console.log(res.data);
        history.go(0);
      })
      .catch((err) => {
      })

  }

  const handleSave = () => {

    setOpenEdit(false);

    axios.put("/api/employee/" + row.employee_id, rowData)
      .then((res) => {
        console.log(res.data);
        //history.go(0);
      })
      .catch((err) => {
      })
  }

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
          {rowData.first_name}
        </StyledTableCell>
        <StyledTableCell align="center">{rowData.middle_initial}</StyledTableCell>
        <StyledTableCell align="center">{rowData.last_name}</StyledTableCell>
        <StyledTableCell align="center" >{rowData.email}</StyledTableCell>
        <StyledTableCell align="center">{rowData.employee_id}</StyledTableCell>
        <StyledTableCell >
          <Button variant="contained" color="primary" disableElevation className={classes.space} onClick={handleUpdate} startIcon={<CachedIcon />}>
            UPDATE EMPLOYEE INFORMATION
                       </Button>
          <Button variant="contained" color="secondary" disableElevation className={classes.space} onClick={handleDelete}>
            FIRE THIS EMPLOYEE
                       </Button>

        </StyledTableCell>
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
                    <StyledTableRow key={rowData.phone_number}>
                      <StyledTableCell component="th" scope="row" align="center">
                        {rowData.phone_number}
                      </StyledTableCell>
                      <StyledTableCell align="center">{rowData.date_of_birth.substring(0, 10)}</StyledTableCell>
                      <StyledTableCell align="center">{rowData.salary.toFixed(2)}</StyledTableCell>
                      <StyledTableCell align="center">{rowData.street_number}</StyledTableCell>
                      <StyledTableCell align="center">{rowData.street_name}</StyledTableCell>
                      <StyledTableCell align="center">{rowData.city}</StyledTableCell>
                      <StyledTableCell align="center">{rowData.zip_code}</StyledTableCell>
                      <StyledTableCell align="center">{rowData.employment_date.substring(0, 10)}</StyledTableCell>
                      <StyledTableCell align="center">
                        {rowData.store_store_id}
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
          EDIT {rowData.first_name}'s personal information
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="first_name"
            label="First Name"
            name="first_name"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={rowData.first_name}
            onChange={handleCurrentProjectChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="middle_initial"
            label="Middle Initial"
            name="middle_initial"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={rowData.middle_initial}
            onChange={handleCurrentProjectChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="last_name"
            label="Last Name"
            name="last_name"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={rowData.last_name}
            onChange={handleCurrentProjectChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            name="email"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={rowData.email}
            onChange={handleCurrentProjectChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone_number"
            label="Phone Number"
            name="phone_number"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={rowData.phone_number}
            onChange={handleCurrentProjectChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="salary"
            label="Salary"
            name="salary"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={rowData.salary.toFixed(2)}
            onChange={handleCurrentProjectChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="street_number"
            label="Street Number"
            name="street_number"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={rowData.street_number}
            onChange={handleCurrentProjectChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="street_name"
            label="Street Name"
            name="street_name"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={rowData.street_name}
            onChange={handleCurrentProjectChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="city"
            label="City"
            name="city"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={rowData.city}
            onChange={handleCurrentProjectChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="zip_code"
            label="Zip Code"
            name="zip_code"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={rowData.zip_code}
            onChange={handleCurrentProjectChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseEdit}
            variant="contained" color="secondary" disableElevation
          >
            CANCEL
             </Button>
          <Button
            onClick={handleSave}
            variant="contained" color="primary" disableElevation
            className={classes.projectAdd}
          >
            SAVE
             </Button>
        </DialogActions>
      </Dialog>


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
  const [store, setStore] = useState({});
  const [myStore, setMyStore] = useState({});
  const [rows, setRows] = useState([]);
  let history = useHistory();
  const handleCloseUpdateSucess = () => {
    setUpdateSuccess(false);
  };
  const handleCloseUpdateFailed = () => {
    setUpdateFailed(false);
  };
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);
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

    axios.get("/api/view_all_stores")
      .then((res) => {
        const data = res.data.map((item, index) => {
          return {
            label: item.store_name,
            value: item.store_id,
          };
        });
        console.log(data)
        setStore(data)
       })
      .catch((err) => {
         console.log(err);
       });


  }, []);

  const [openAdd, setOpenAdd] = useState(false);
  const [employee, setEmployee] = useState({});
  const [updateError, setUpdateErrors] = useState({});
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleAdd = () => {
    setOpenAdd(true);
  }

  const handleSave = () => {
   // setOpenAdd(false);

    console.log(employee)

employee.store_store_id = myStore.value;

    /* AXIOS GOES HERE */
    axios.post("/api/employee/create_employee", employee)
      .then((res) => {
        console.log(res.data)
        console.log("Success")

        history.go(0)
      })
      .catch((err) => {
        console.log(err);
        setUpdateErrors(err.response.data);
        setUpdateFailed(true);
      })
  }

  const handleCurrentProjectChange = (e) => {
    e.stopPropagation();
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
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
            <Button variant="contained" color="primary" className={classes.button} disableElevation onClick={handleAdd} startIcon={<AddIcon />}>
              ADD NEW EMPLOYEE
        </Button>
            {rows ? (<CollapsibleTable rows={rows} />) : (null)}

          </Grid>
          <Footer />
        </Grid>
      </React.Fragment>


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
          ADD new employee information
        </DialogTitle>
        
          <DialogContent>

            <TextField
              required
              autoFocus
              margin="dense"
              id="first_name"
              label="First Name"
              name="first_name"
              inputProps={{ maxLength: 200 }}
              type="string"
              fullWidth
              variant="outlined"
              value={employee.first_name}
              onChange={handleCurrentProjectChange}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="middle_initial"
              label="Middle Initial"
              name="middle_initial"
              inputProps={{ maxLength: 200 }}
              type="string"
              fullWidth
              variant="outlined"
              value={employee.middle_initial}
              onChange={handleCurrentProjectChange}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="last_name"
              label="Last Name"
              name="last_name"
              inputProps={{ maxLength: 200 }}
              type="string"
              fullWidth
              variant="outlined"
              value={employee.last_name}
              onChange={handleCurrentProjectChange}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              name="email"
              inputProps={{ maxLength: 200 }}
              type="string"
              fullWidth
              variant="outlined"
              value={employee.email}
              onChange={handleCurrentProjectChange}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              name="password"
              inputProps={{ maxLength: 200 }}
              type="password"
              fullWidth
              variant="outlined"
              value={employee.password}
              onChange={handleCurrentProjectChange}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="phone_number"
              label="Phone Number"
              name="phone_number"
              inputProps={{ maxLength: 200 }}
              type="string"
              fullWidth
              variant="outlined"
              value={employee.phone_number}
              onChange={handleCurrentProjectChange}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="salary"
              label="Salary"
              name="salary"
              inputProps={{ maxLength: 200 }}
              type="string"
              fullWidth
              variant="outlined"
              value={employee.salary}
              onChange={handleCurrentProjectChange}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="street_number"
              label="Street Number"
              name="street_number"
              inputProps={{ maxLength: 200 }}
              type="string"
              fullWidth
              variant="outlined"
              value={employee.street_number}
              onChange={handleCurrentProjectChange}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="street_name"
              label="Street Name"
              name="street_name"
              inputProps={{ maxLength: 200 }}
              type="string"
              fullWidth
              variant="outlined"
              value={employee.street_name}
              onChange={handleCurrentProjectChange}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="city"
              label="City"
              name="city"
              inputProps={{ maxLength: 200 }}
              type="string"
              fullWidth
              variant="outlined"
              value={employee.city}
              onChange={handleCurrentProjectChange}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="zip_code"
              label="Zip Code"
              name="zip_code"
              inputProps={{ maxLength: 200 }}
              type="string"
              fullWidth
              variant="outlined"
              value={employee.zip_code}
              onChange={handleCurrentProjectChange}
            />
            <Typography gutterBottom variant="body" component="body3" className={classes.space}>
              Date Of Birth
           </Typography>
            <TextField
              required
              fullWidth
              autoFocus
              type="date"
              name="date_of_birth"
              onChange={handleCurrentProjectChange}
              value={employee.date_of_birth}
            />
            <Typography gutterBottom variant="body" component="body3" className={classes.space}>
              Employment Date
           </Typography>
            <TextField
              required
              fullWidth
              autoFocus
              type="date"
              name="employment_date"
              onChange={handleCurrentProjectChange}
              value={employee.employment_date}
            />
            <Select
              autoFocus
              className={`${classes.selectStore} ${classes.information}`}
              required
              fullWidth
              closeMenuOnSelect={true}
              options={store}
              value={{
                label: myStore.label,
                value: myStore.value,
              }}
              name="store_store_id"
              onChange={(e) => {
                setMyStore(
                  {
                 label: e.label,
                value: e.value
                });
                console.log(e.value)
              }}
            />

          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              color="secondary"
              onClick={handleCloseAdd}
              variant="contained" disableElevation
            >
              CANCEL
             </Button>
            <Button
              type="submit"
              color="primary"
              onClick={handleSave}
              variant="contained" disableElevation
              className={classes.projectAdd}
            >
              SAVE
             </Button>
          </DialogActions>
        
      </Dialog>

      <Snackbar
                        open={updateFailed}
                        autoHideDuration={6000}
                        onClose={handleCloseUpdateFailed}>
                        <Alert onClose={handleCloseUpdateFailed} severity="error">
                        {updateError.validation ? (
                          <Typography className={classes.error} color="error">
                            {updateError.validation}
                          </Typography>
                        ) : null}
                        fix this error before Creating an Employee.
                         </Alert>
                    </Snackbar>
    </div>
    
  );
}

export default Home;
