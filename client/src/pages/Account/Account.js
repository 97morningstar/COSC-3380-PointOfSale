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

    }
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

    //opening the edit field
    const handleOpenEdit = (key) => {
        showCustomerEdit({
            ...customerEdit,
            [key]: true,
        });
    };
    //closing the edit field
    const handleCloseEdit = (key) => {
        showCustomerEdit({
            ...customerEdit,
            [key]: false,
        });
    };

    const handleCloseUpdateSucess = () => {
        setUpdateSuccess(false);
    };
    const handleCloseUpdateFailed = () => {
        setUpdateFailed(false);
    };

    /* TODO */
    const handleSave = (key) => {
        setUserInfo(userInput);
        handleCloseEdit(key);





        const data = {
            email: userInput.email || "",
            password: userInput.password || "",
            card_number: userInput.card_number,
            expiration_month: userInput.expiration_month || "",
            expiration_year: userInput.expiration_year || "",
            security_code: userInput.security_code || "",
        };


        /* FIX */

        /*   axios.put(
             "/api/customer/" +
             localStorage.getItem("user_id") + "/" + data.store_id_fk,
             data
           )
           .then((res) => {
             console.log("No")
             setUpdateErrors({});
             showCustomerEdit({
               ...customerEdit,
               [key]: false,
             });
             setUpdateSuccess(true);
           })
           .catch((err) => {
             setUpdateErrors(err.response.data);
             setUpdateFailed(true);
           });
       */



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
         axios.post("http://localhost:4000/get_account", data)
         .then((res) => {
           setIsLoading(false);
        console.log("e",res)
     
       
     
           setUserInfo(res.data);
           setUserInput(res.data);
     
         /*  axios.get("http://localhost:4000/api/view_all_payment_method", data)
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
                            <Grid container item direction="row" spacing={3} className={classes.grid}>
                                <Grid item xs={1} className={classes.iconList}>
                                    <AccountCircleIcon />
                                </Grid>
                                <Grid item xs={9} className={classes.alignStart}>
                                    <Box component={"span"} className={classes.sectionHeader}>
                                        Email
                                     </Box>
                                    {customerEdit.email === false ? (
                                        <Box
                                            component="div"
                                            variant="body2"
                                            className={classes.information}
                                            color="textPrimary">
                                            email@email.com

                                            {updateError.email ? (
                                                <Typography className={classes.error} color="error">
                                                    {updateError.email} Email not saved. Please
                                                         fix all errors before saving.
                                                </Typography>
                                            ) : null}
                                        </Box>
                                    ) : (
                                        <TextField
                                            autoFocus
                                            onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                                            className={`${classes.textForm} ${classes.information}`}
                                            multiline={true}
                                            name="email"
                                            inputProps={{
                                                maxLength: 50,
                                            }}

                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleSave("email");
                                                }
                                            }}
                                            onChange={(e) => {
                                                setUserInput({
                                                    ...userInput,
                                                    email: e.target.value,
                                                });
                                            }}
                                            value={userInput.email}
                                        />
                                    )}
                                </Grid>
                                <Grid item xs={2} className={classes.iconListGrid}>
                                    {customerEdit.email === false ? (
                                        <IconButton
                                            className={classes.icon}
                                            onClick={() => {
                                                handleOpenEdit("email");
                                            }}>
                                            <EditTwoToneIcon />
                                        </IconButton>
                                    ) : (
                                        <>
                                            <Grid container item direction="row">
                                                <Grid item xs={6}>
                                                    <IconButton
                                                        className={classes.icon}
                                                        onClick={() => {
                                                            handleCancel("email");
                                                        }}>
                                                        <ClearRoundedIcon />
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <IconButton
                                                        className={classes.icon}
                                                        onClick={() => {
                                                            handleSave("email");
                                                        }}>
                                                        <CheckRoundedIcon style={{ color: "green" }} />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )}
                                </Grid>
                            </Grid>


                            <Divider
                                variant="inset"
                                component="li"
                                className={classes.divider}
                            />


                         

                          {userInfo.map((index,i) => { return(<>
                            <Typography variant="h6" gutterBottom component="div">
                                Payment Method {i+1}
              </Typography>
 <Grid container item direction="row" spacing={3} className={classes.grid}>

 <Grid item xs={1} className={classes.iconList}>
     <CreditCardIcon />
 </Grid>
 <Grid item xs={9} className={classes.alignStart}>

     <Box component={"span"} className={classes.sectionHeader}>
         Card Number
      </Box>
     {customerEdit.card_number === false ? (
         <Box
             component="div"
             variant="body2"
             className={classes.information}
             color="textPrimary">
             {index.card_number}

             {updateError.card_number ? (
                 <Typography className={classes.error} color="error">
                     {updateError.card_number} Card Number not saved. Please
                          fix all errors before saving.
                 </Typography>
             ) : null}
         </Box>
     ) : (
         <TextField
             autoFocus
             onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
             className={`${classes.textForm} ${classes.information}`}
             multiline={true}
             name="card_number"
             inputProps={{
                 maxLength: 50,
             }}

             onKeyDown={(e) => {
                 if (e.key === "Enter") {
                     handleSave("card_number");
                 }
             }}
             onChange={(e) => {
                 setUserInput({
                     ...index,
                     card_number: e.target.value,
                 });
             }}
             value={userInput.card_number}
         />
     )}
 </Grid>
 <Grid item xs={2} className={classes.iconListGrid}>
     {customerEdit.card_number === false ? (
         <IconButton
             className={classes.icon}
             onClick={() => {
                 handleOpenEdit("card_number");
             }}>
             <EditTwoToneIcon />
         </IconButton>
     ) : (
         <>
             <Grid container item direction="row">
                 <Grid item xs={6}>
                     <IconButton
                         className={classes.icon}
                         onClick={() => {
                             handleCancel("card_number");
                         }}>
                         <ClearRoundedIcon />
                     </IconButton>
                 </Grid>
                 <Grid item xs={6}>
                     <IconButton
                         className={classes.icon}
                         onClick={() => {
                             handleSave("card_number");
                         }}>
                         <CheckRoundedIcon style={{ color: "green" }} />
                     </IconButton>
                 </Grid>
             </Grid>
         </>
     )}
 </Grid>




 <Divider
     variant="inset"
     component="li"
     className={classes.divider}
 />

 <Grid container item direction="row" spacing={3} className={classes.grid}>
     <Grid item xs={1} className={classes.iconList}>
         <CreditCardIcon />
     </Grid>
     <Grid item xs={9} className={classes.alignStart}>
         <Box component={"span"} className={classes.sectionHeader}>
             Expiration Month
      </Box>
         {customerEdit.expiration_month === false ? (
             <Box
                 component="div"
                 variant="body2"
                 className={classes.information}
                 color="textPrimary">
                 {index.expiration_month}

                 {updateError.expiration_month ? (
                     <Typography className={classes.error} color="error">
                         {updateError.expiration_month} Expiration Month not saved. Please
                          fix all errors before saving.
                     </Typography>
                 ) : null}
             </Box>
         ) : (
             <TextField
                 autoFocus
                 onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                 className={`${classes.textForm} ${classes.information}`}
                 multiline={true}
                 name="expiration_month"
                 inputProps={{
                     maxLength: 50,
                 }}
                 onKeyDown={(e) => {
                     if (e.key === "Enter") {
                         handleSave("expiration_month");
                     }
                 }}
                 onChange={(e) => {
                     setUserInput({
                         ...userInput,
                         expiration_month: e.target.value,
                     });
                 }}
                 value={userInput.expiration_month}
             />
         )}
     </Grid>
     <Grid item xs={2} className={classes.iconListGrid}>
         {customerEdit.expiration_month === false ? (
             <IconButton
                 className={classes.icon}
                 onClick={() => {
                     handleOpenEdit("expiration_month");
                 }}>
                 <EditTwoToneIcon />
             </IconButton>
         ) : (
             <>
                 <Grid container item direction="row">
                     <Grid item xs={6}>
                         <IconButton
                             className={classes.icon}
                             onClick={() => {
                                 handleCancel("expiration_month");
                             }}>
                             <ClearRoundedIcon />
                         </IconButton>
                     </Grid>
                     <Grid item xs={6}>
                         <IconButton
                             className={classes.icon}
                             onClick={() => {
                                 handleSave("expiration_month");
                             }}>
                             <CheckRoundedIcon style={{ color: "green" }} />
                         </IconButton>
                     </Grid>
                 </Grid>
             </>
         )}
     </Grid>
 </Grid>

 <Divider
     variant="inset"
     component="li"
     className={classes.divider}
 />

 <Grid container item direction="row" spacing={3} className={classes.grid}>
     <Grid item xs={1} className={classes.iconList}>
         <CreditCardIcon />
     </Grid>
     <Grid item xs={9} className={classes.alignStart}>
         <Box component={"span"} className={classes.sectionHeader}>
             Expiration Year
      </Box>
         {customerEdit.expiration_year === false ? (
             <Box
                 component="div"
                 variant="body2"
                 className={classes.information}
                 color="textPrimary">
                 {index.expiration_year}

                 {updateError.expiration_year ? (
                     <Typography className={classes.error} color="error">
                         {updateError.expiration_year} Expiration Month not saved. Please
                          fix all errors before saving.
                     </Typography>
                 ) : null}
             </Box>
         ) : (
             <TextField
                 autoFocus
                 onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                 className={`${classes.textForm} ${classes.information}`}
                 multiline={true}
                 name="expiration_year"
                 inputProps={{
                     maxLength: 50,
                 }}
                 onKeyDown={(e) => {
                     if (e.key === "Enter") {
                         handleSave("expiration_year");
                     }
                 }}
                 onChange={(e) => {
                     setUserInput({
                         ...userInput,
                         expiration_year: e.target.value,
                     });
                 }}
                 value={userInput.expiration_year}
             />
         )}
     </Grid>
     <Grid item xs={2} className={classes.iconListGrid}>
         {customerEdit.expiration_year === false ? (
             <IconButton
                 className={classes.icon}
                 onClick={() => {
                     handleOpenEdit("expiration_year");
                 }}>
                 <EditTwoToneIcon />
             </IconButton>
         ) : (
             <>
                 <Grid container item direction="row">
                     <Grid item xs={6}>
                         <IconButton
                             className={classes.icon}
                             onClick={() => {
                                 handleCancel("expiration_year");
                             }}>
                             <ClearRoundedIcon />
                         </IconButton>
                     </Grid>
                     <Grid item xs={6}>
                         <IconButton
                             className={classes.icon}
                             onClick={() => {
                                 handleSave("expiration_year");
                             }}>
                             <CheckRoundedIcon style={{ color: "green" }} />
                         </IconButton>
                     </Grid>
                 </Grid>
             </>
         )}
     </Grid>
 </Grid>

 <Divider
     variant="inset"
     component="li"
     className={classes.divider}
 />

 <Grid container item direction="row" spacing={3} className={classes.grid}>
     <Grid item xs={1} className={classes.iconList}>
         <CreditCardIcon />
     </Grid>
     <Grid item xs={9} className={classes.alignStart}>
         <Box component={"span"} className={classes.sectionHeader}>
             Security Code
      </Box>
         {customerEdit.security_code === false ? (
             <Box
                 component="div"
                 variant="body2"
                 className={classes.information}
                 color="textPrimary">
                 {index.security_code}

                 {updateError.security_code ? (
                     <Typography className={classes.error} color="error">
                         {updateError.security_code} Expiration Month not saved. Please
                          fix all errors before saving.
                     </Typography>
                 ) : null}
             </Box>
         ) : (
             <TextField
                 autoFocus
                 onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                 className={`${classes.textForm} ${classes.information}`}
                 multiline={true}
                 name="security_code"
                 inputProps={{
                     maxLength: 50,
                 }}
                 onKeyDown={(e) => {
                     if (e.key === "Enter") {
                         handleSave("security_code");
                     }
                 }}
                 onChange={(e) => {
                     setUserInput({
                         ...userInput,
                         security_code: e.target.value,
                     });
                 }}
                 value={userInput.security_code}
             />
         )}
     </Grid>
     <Grid item xs={2} className={classes.iconListGrid}>
         {customerEdit.security_code === false ? (
             <IconButton
                 className={classes.icon}
                 onClick={() => {
                     handleOpenEdit("security_code");
                 }}>
                 <EditTwoToneIcon />
             </IconButton>
         ) : (
             <>
                 <Grid container item direction="row">
                     <Grid item xs={6}>
                         <IconButton
                             className={classes.icon}
                             onClick={() => {
                                 handleCancel("security_code");
                             }}>
                             <ClearRoundedIcon />
                         </IconButton>
                     </Grid>
                     <Grid item xs={6}>
                         <IconButton
                             className={classes.icon}
                             onClick={() => {
                                 handleSave("security_code");
                             }}>
                             <CheckRoundedIcon style={{ color: "green" }} />
                         </IconButton>
                     </Grid>
                 </Grid>
             </>
         )}
     </Grid>


 </Grid>
</Grid>

</>)

                          })}                              


                           



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
                                There was a problem when saving the user. Please fix all errors
                                before saving.
                         </Alert>
                        </Snackbar>
                   
            </Grid>
                  )}  </Grid>

        
    );
}
export default Home;
