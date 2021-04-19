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
import CachedIcon from '@material-ui/icons/Cached';
import DeleteIcon from '@material-ui/icons/Delete';

import CreditCardIcon from '@material-ui/icons/CreditCard';

import { Chip, Box, TextField } from "@material-ui/core";
import {
    Button,
    LinearProgress,
    IconButton,
    Divider,
    FormControl,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Dialog,
    DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";

import BusinessCenterRoundedIcon from "@material-ui/icons/BusinessCenterRounded";
import SubjectRoundedIcon from "@material-ui/icons/SubjectRounded";
import LaptopRoundedIcon from "@material-ui/icons/LaptopRounded";
import DateRangeRoundedIcon from "@material-ui/icons/DateRangeRounded";

import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";

import ImportContactsIcon from '@material-ui/icons/ImportContacts';

// Icons

import AccountCircleIcon from '@material-ui/icons/AccountCircle';


import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

/* Images */
import slogan from "../../assets/_Logo (1).png";
import food from "../../assets/food.png";
/* Categories Images */
/* Categories Images */

import Footer from "../../components/Footer/Footer";

import back from "../../assets/background1.jpg";
import { useHistory } from "react-router-dom";

import RoomIcon from '@material-ui/icons/Room';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Select from "react-select";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    iconList: {
        textAlign: "right",
    },
    sectionHeader: {
        fontWeight: "bold",
        color: "#606060",
    },
    information: {
        margin: "10px",
    },
    error: {
        paddingLeft: "10px",
        paddingRight: "10px",
        fontSize: "15px",
    },
    textForm: {
        width: "100%",
    },
    iconListGrid: {
        textAlign: "left",
    },
    grid: {
        marginTop: "15px",
        marginBottom: "15px"
    },
    divider: {
        listStyle: "none",
        margin: "10px",
    },
    check: {
        textAlign: "center",
    },
    grid2: {
        marginLeft: "15px"
    },
    alignStart: {
        textAlign: "start"
    },
    selectStore: {

        width: "100%",
        zIndex: 1000,
        paddingTop: "10px",
        paddingRight: "10px",
        paddingLeft: "10px",

    },
    space: {
        margin: "10px"
      },
}));


function Home() {
    const classes = useStyles();
    const theme = createMuiTheme();
    const [isLoading, setIsLoading] = useState(false);

    /* Recommended Items 15 */
    const data = {
        searchText: 'dog',
        amount: 3,
        apiUrl: 'https://pixabay.com/api',
        apiK: '20983112-12d43bcb17250999b789e998a',
        images: []
    }


    const [imageArray, setimageArray] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [userInput, setUserInput] = useState({});
    let history = useHistory();

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    //Dialog to confirm the delete operation.
    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateFailed, setUpdateFailed] = useState(false);

    const [customerEdit, showCustomerEdit] = useState({
        email: false,
        password: false,
        card_number: false,
        expiration_month: false,
        expiration_year: false,
        security_code: false,
    });

    const [updateError, setUpdateErrors] = useState({});

 
 

    const handleCloseUpdateSucess = () => {
        setUpdateSuccess(false);
    };
    const handleCloseUpdateFailed = () => {
        setUpdateFailed(false);
    };

    /* TODO */
    const handleSave = () => {
        
     





        const data = {
            card_number: payment.card_number || "",
            expiration_month: payment.expiration_month || "",
            expiration_year: payment.expiration_year || "",
            security_code: payment.security_code || "",
            id: payment.payment_id,
            jwtToken: localStorage.getItem("token"),
            user_id: localStorage.getItem("user_id"),
            is_employee: localStorage.getItem("is_employee")
        };



        let Update = userInfo.map((index, i) => {
            let item = {...index}
              if(index.payment_id === payment.payment_id){
                  item.card_number = data.card_number;
                  item.expiration_month = data.expiration_month;
                  item.expiration_year = data.expiration_year;
                  item.security_code = data.security_code
              }
              return item;
        })
        setUserInfo(Update);
          axios.put("/account/update_payment",
             data
           )
           .then((res) => {
            setUpdateSuccess(true);
            setOpenEdit(false);
           })
           .catch((err) => {
             console.log(err.response);
             setUpdateFailed(true);
           });
        
       



    }

    //not saving the edited data if the user does not want to change
    const handleCancel = (key) => {
        setUserInput(userInfo);
        handleCloseEdit(key);
    };

    useEffect(() => {

        setIsLoading(true);

        const data = {
            jwtToken: localStorage.getItem("token"),
            user_id: localStorage.getItem("user_id"),
            is_employee: localStorage.getItem("is_employee")
        }


        /* GET ACCOUNT INFO AUTHENTICATION */
        axios.post("/get_account", data)
            .then((res) => {
                setIsLoading(false);
                console.log("e", res)



                setUserInfo(res.data);
                console.log("res.data", res.data);
                setUserInput(res.data);

                /*  axios.get("/api/view_all_payment_method", data)
                  .then((res) => {
                    const data = res.data.map((item, index) => {
                      return {
                        label: item.store_name,
                        value: item.store_id,
                      };
                    });
                    setStore(data)
                   })
                  .catch((err) => {
                     console.log(err);
                   });*/

            })
            .catch((err) => {
                console.log(err.response);
                history.push("/login")
            });






    }, []);


    const [openEdit, setOpenEdit] = useState(false);
    const [payment, setPayment] = useState({
        card_number: "",
        expiration_month: "",
        expiration_year: "",
        security_code: "",
    });
    const [openAdd, setOpenAdd] = useState(false);

    const handleUpdate = (index) => {
        setOpenEdit(true);
       setPayment(index)
    }

    const handleDelete = (index) => {
       

        const data = {
            card_number: payment.card_number || "",
            expiration_month: payment.expiration_month || "",
            expiration_year: payment.expiration_year || "",
            security_code: payment.security_code || "",
            id:  parseInt(index.payment_id),
            jwtToken: localStorage.getItem("token"),
            user_id: localStorage.getItem("user_id"),
            is_employee: localStorage.getItem("is_employee")
        };

        setUserInfo((userInfo) =>
        userInfo.filter(
          (userInfo) => userInfo.payment_id !== parseInt(index.payment_id)
        )
      );

      console.log(data.id)

       axios.put("/account/delete_payment/" + parseInt(index.payment_id), data)
        .then((res) => {
            console.log(res.data)
            setUpdateSuccess(true);
          })
          .catch((err) => {
            setUpdateFailed(true);
          })





    }

    const handleCloseEdit = () => {
        setOpenEdit(false);
      };

      const handleOpenEdit = () => {
        setOpenEdit(true);
      };



    const handleCurrentProjectChange = (e) => {
        setPayment({
          ...payment,
          [e.target.name]: e.target.value,
        });
       
      };

      const handleCloseAdd = () => {
        setOpenAdd(false);
      };
    
      const handleAdd = () => {
       // setOpenAdd(true);
  
       setOpenAdd(true);
       setPayment({
        card_number: "",
        expiration_month: "",
        expiration_year: "",
        security_code: "",
       })
     
      }

      const handleSaveAdd = () => {
        const data = {
            card_number: payment.card_number || "",
            expiration_month: payment.expiration_month || "",
            expiration_year: payment.expiration_year || "",
            security_code: payment.security_code || "",
            id: payment.payment_id,
            jwtToken: localStorage.getItem("token"),
            user_id: localStorage.getItem("user_id"),
            is_employee: localStorage.getItem("is_employee")
        };

          axios.post("/account/add_payment",
             data
           )
           .then((res) => {

            console.log(res.data)

            setUserInfo(res.data);

            setUpdateSuccess(true);
            setOpenAdd(false);
           })
           .catch((err) => {
             console.log(err.response);
             setUpdateFailed(true);
           });
      }
    

    return (

        <Grid
            style={{ overflowX: "hidden" }}
            container
            xs={12}
            item
            className={classes.root}
            component="main">
            <Navbar />
            <Grid container item xs={12} className={classes.design} alignItems="center" justify="center">
                <Grid item xs={6} className={classes.logoContainer} >
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

                <Grid container item xs={12} spacing={0} direction="column" >
                    <Grid item direction="row" spacing={3} alignItems="center" justify="center" className={classes.space}>
                    <Typography variant="h3"  component="div">
                        PAYMENT METHODS
                    </Typography>
                    <Button variant="contained" color="primary" disableElevation className={classes.space} onClick={() => {return handleAdd()}} startIcon={<AddCircleOutlineIcon />}>
                                    ADD
                              </Button>
                    </Grid>


                    <Divider
                        variant="inset"
                        component="li"
                        className={classes.divider}
                    />




                    {userInfo.map((index, i) => {
                        return (<>
                            <Typography variant="h6" gutterBottom component="div">


                                <CreditCardIcon /> Payment Method {i + 1}
                                <Button variant="contained" color="primary" disableElevation className={classes.space} onClick={() => {return handleUpdate(index)}} startIcon={<CachedIcon />}>
                                    UPDATE
                              </Button>
                                <Button variant="contained" color="secondary" disableElevation className={classes.space} onClick={() => { return handleDelete(index)}} startIcon={<DeleteIcon />}>
                                    DELETE
                                </Button>

                            </Typography>
                            <Grid container item direction="row" xs={12} spacing={3} className={classes.grid} alignItems="center" justify="center">
                                <Grid item xs={2}>

                                    <Box component={"span"} className={classes.sectionHeader}>
                                        Card Number
                                     </Box>
                                    <Box
                                        component="div"
                                        variant="body2"
                                        className={classes.information}
                                        color="textPrimary">
                                        {index.card_number}
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box component={"span"} className={classes.sectionHeader}>
                                        Expiration Month
                                         </Box>

                                    <Box
                                        component="div"
                                        variant="body2"
                                        className={classes.information}
                                        color="textPrimary">
                                        {index.expiration_month}
                                    </Box>

                                </Grid>
                                <Grid item xs={2}>
                                    <Box component={"span"} className={classes.sectionHeader}>
                                        Expiration Year
                                        </Box>
                                    <Box
                                        component="div"
                                        variant="body2"
                                        className={classes.information}
                                        color="textPrimary">
                                        {index.expiration_year}
                                    </Box>
                                </Grid>
                                <Grid item xs={2}>
                                    <Box component={"span"} className={classes.sectionHeader}>
                                        Security Code
                                        </Box>

                                    <Box
                                        component="div"
                                        variant="body2"
                                        className={classes.information}
                                        color="textPrimary">
                                        {index.security_code}
                                    </Box>
                                </Grid>
                             </Grid>

                             
                    

                        </>)

                    })}


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
          UPDATE PAYMENT METHOD
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="card_number"
            label="Card Number"
            name="card_number"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={payment.card_number || ""}
            onChange={handleCurrentProjectChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="expiration_month"
            label="Expiration Month"
            name="expiration_month"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={payment.expiration_month || ""}
            onChange={handleCurrentProjectChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="expiration_year"
            label="Expiration Year"
            name="expiration_year"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={payment.expiration_year || ""}
            onChange={handleCurrentProjectChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="security_code"
            label="Security Code"
            name="security_code"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={payment.security_code || ""}
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





      <Dialog
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="form-dialog-title"
        overlayStyle={{backgroundColor: 'transparent'}}

      >
        <DialogTitle
          classes={classes.addNewTitle}
          id="form-dialog-title"
          style={{ wordBreak: "break-all" }}
        >
          ADD PAYMENT METHOD
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="card_number"
            label="Card Number"
            name="card_number"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={payment.card_number || ""}
            onChange={handleCurrentProjectChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="expiration_month"
            label="Expiration Month"
            name="expiration_month"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={payment.expiration_month || ""}
            onChange={handleCurrentProjectChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="expiration_year"
            label="Expiration Year"
            name="expiration_year"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={payment.expiration_year || ""}
            onChange={handleCurrentProjectChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="security_code"
            label="Security Code"
            name="security_code"
            inputProps={{ maxLength: 200 }}
            type="string"
            fullWidth
            variant="outlined"
            value={payment.security_code || ""}
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
            onClick={handleSaveAdd}
            style={{ backgroundColor: "#C8102E", color: "#FFFFFF" }}
            className={classes.projectAdd}
          >
            SAVE
           </Button>
        </DialogActions>
      </Dialog>






                    <Footer />
                    <Snackbar
                        open={updateSuccess}
                        autoHideDuration={6000}
                        onClose={handleCloseUpdateSucess}>
                        <Alert onClose={handleCloseUpdateSucess} severity="success">
                            Payment was saved!
                          </Alert>
                    </Snackbar>
                    <Snackbar
                        open={updateFailed}
                        autoHideDuration={6000}
                        onClose={handleCloseUpdateFailed}>
                        <Alert onClose={handleCloseUpdateFailed} severity="error">
                            There was a problem. Please try again at a later time.
                         </Alert>
                    </Snackbar>


                    

                </Grid>
            )}  </Grid>


    );
}
export default Home;
