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

import { Chip, Box, TextField } from "@material-ui/core";
import { Button, 
  LinearProgress, 
  IconButton, 
  Divider,  
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup, } from "@material-ui/core";

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
grid:{
  marginTop: "15px",
  marginBottom: "15px"
},
divider: {
  listStyle: "none",
  margin: "10px",
},
check:{
  textAlign: "center",
},
grid2: {
  marginLeft: "15px"
},
alignStart:{
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

const arrayImages = ['Dog','Peach','Apple', 'Cup', 'Laptop'];
  


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
  date_of_birth: false,
  email: false,
  first_name: false,
  is_member: false,
  last_name: false,
  middle_initial: false,
  store_id_fk: false,
  street_name: false,
  street_number: false,
  zip_code: false,
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

    userInput.date_of_birth = userInput.date_of_birth.substring(0, 10);


    
    const data = {
      date_of_birth: userInput.date_of_birth || "",
      email: userInput.email || "",
      first_name: userInput.first_name || "",
      is_member: userInput.is_member,
      last_name: userInput.last_name || "",
      middle_initial: userInput.middle_initial || "",
      store_id_fk: myStore.value || "",
      street_name: userInput.street_name || "",
      street_number: userInput.street_number,
      zip_code: userInput.zip_code || "",
      user_id: localStorage.getItem("user_id")
    };

    console.log("data",data);

    axios
    .put(
      "http://localhost:4000/api/customer/" +
      localStorage.getItem("user_id") + "/" + data.store_id_fk,
      data
    )
    .then((res) => {
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




  }

    //not saving the edited data if the user does not want to change
    const handleCancel = (key) => {
      setUserInput(userInfo);
      handleCloseEdit(key);
    };
  

    const [store, setStore] = useState({});
    const [myStore, setMyStore] = useState({});


  useEffect(() => {
    
    setIsLoading(true);
    
  const data = {
      jwtToken: localStorage.getItem("token"),
      user_id: localStorage.getItem("user_id"),
      is_employee: localStorage.getItem("is_employee")
  }

  console.log("data",data);

    axios
    .post("http://localhost:4000/get_profile", data)
    .then((res) => {
      setIsLoading(false);
    console.log("e",res)

    res.data[0].date_of_birth = res.data[0].date_of_birth.substring(0, 10);

      setUserInfo(res.data[0]);
      setUserInput(res.data[0]);

    

      axios
      .get("http://localhost:4000/api/view_all_stores")
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
       });

       console.log("id",res.data[0].store_id_fk)

       axios
       .get("http://localhost:4000/api/store/" + res.data[0].store_id_fk)
       .then((res) => {
         setMyStore({
           label: res.data[0].store_name,
           value: res.data[0].store_id
          })
         console.log("store",res.data[0].store_name);
        })
       .catch((err) => {
          console.log(err);
        });


    
      
    
    })
    .catch((err) => {
      console.log(err.response);
      history.push("/login")
    });
    





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
    <>
        <Grid
        style={{    overflowX: "hidden" }}
          container
          xs={12}
          item
          className={classes.root}
          component="main">
          <Navbar />
          <Grid container item xs={12} className={classes.design}   alignItems="center"  justify="center">
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
          <>
           <Grid  container item xs={12}  spacing={0}   direction="column" >
                <Grid  container item xs={12}  spacing={0}   direction="column" className={classes.grid2}  alignItems="flex-start"  justify="flex-start">
                    <Grid xs={12} item className={classes.text} >
                      <Typography variant="h4" className={classes.Text1} >
                            Profile Of {userInfo.first_name} {userInfo.last_name} 
                      </Typography>
                  </Grid>
          </Grid>
                <Grid container item direction="row" spacing={3} className={classes.grid}>
                  <Grid item xs={1} className={classes.iconList}>
                    <AccountCircleIcon />
                  </Grid>
                  <Grid item xs={9} className={classes.alignStart}>
                    <Box component={"span"} className={classes.sectionHeader}>
                      First Name
                  </Box>
                    {customerEdit.first_name === false ? (
                      <Box
                        component="div"
                        variant="body2"
                        className={classes.information}
                        color="textPrimary">
                        {userInfo.first_name}
                     
                        {updateError.first_name ? (
                          <Typography className={classes.error} color="error">
                            {updateError.first_name} First name not saved. Please
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
                          name="first_name"
                          inputProps={{
                            maxLength: 50,
                          }}
                          helperText={`${userInput.first_name.length}/50`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSave("first_name");
                            }
                          }}
                          onChange={(e) => {
                            setUserInput({
                              ...userInput,
                              first_name: e.target.value,
                            });
                          }}
                          value={userInput.first_name}
                        />
                      )}
                  </Grid>
                  <Grid item xs={2} className={classes.iconListGrid}>
                    {customerEdit.first_name === false ? (
                      <IconButton
                        className={classes.icon}
                        onClick={() => {
                          handleOpenEdit("first_name");
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
                                  handleCancel("first_name");
                                }}>
                                <ClearRoundedIcon />
                              </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                              <IconButton
                                className={classes.icon}
                                onClick={() => {
                                  handleSave("first_name");
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
                    <AccountCircleIcon />
                  </Grid>
                  <Grid item xs={9} className={classes.alignStart}>
                    <Box component={"span"} className={classes.sectionHeader}>
                      Last Name
                  </Box>
                    {customerEdit.last_name === false ? (
                      <Box
                        component="div"
                        variant="body2"
                        className={classes.information}
                        color="textPrimary">
                        {userInfo.last_name}
                     
                        {updateError.last_name ? (
                          <Typography className={classes.error} color="error">
                            {updateError.last_name} Last name not saved. Please
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
                          name="last_name"
                          inputProps={{
                            maxLength: 50,
                          }}
                          helperText={`${userInput.last_name.length}/50`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSave("last_name");
                            }
                          }}
                          onChange={(e) => {
                            setUserInput({
                              ...userInput,
                              last_name: e.target.value,
                            });
                          }}
                          value={userInput.last_name}
                        />
                      )}
                  </Grid>
                  <Grid item xs={2} className={classes.iconListGrid}>
                    {customerEdit.last_name === false ? (
                      <IconButton
                        className={classes.icon}
                        onClick={() => {
                          handleOpenEdit("last_name");
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
                                  handleCancel("last_name");
                                }}>
                                <ClearRoundedIcon />
                              </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                              <IconButton
                                className={classes.icon}
                                onClick={() => {
                                  handleSave("last_name");
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
                    <AccountCircleIcon />
                  </Grid>
                  <Grid item xs={9} className={classes.alignStart}>
                    <Box component={"span"} className={classes.sectionHeader}>
                      Middle Intitial
                  </Box>
                    {customerEdit.middle_initial === false ? (
                      <Box
                        component="div"
                        variant="body2"
                        className={classes.information}
                        color="textPrimary">
                        {userInfo.middle_initial}
                     
                        {updateError.middle_initial ? (
                          <Typography className={classes.error} color="error">
                            {updateError.middle_initial} Middle Initial not saved. Please
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
                          name="middle_initial"
                          inputProps={{
                            maxLength: 2,
                          }}
                          helperText={`${userInput.middle_initial.length}/2`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSave("middle_initial");
                            }
                          }}
                          onChange={(e) => {
                            setUserInput({
                              ...userInput,
                              middle_initial: e.target.value,
                            });
                          }}
                          value={userInput.middle_initial}
                        />
                      )}
                  </Grid>
                  <Grid item xs={2} className={classes.iconListGrid}>
                    {customerEdit.middle_initial === false ? (
                      <IconButton
                        className={classes.icon}
                        onClick={() => {
                          handleOpenEdit("middle_initial");
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
                                  handleCancel("middle_initial");
                                }}>
                                <ClearRoundedIcon />
                              </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                              <IconButton
                                className={classes.icon}
                                onClick={() => {
                                  handleSave("middle_initial");
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
                    <RoomIcon  />
                  </Grid>
                  <Grid item xs={9} className={classes.alignStart}>
                    <Box component={"span"} className={classes.sectionHeader}>
                    Street Number
                  </Box>
                    {customerEdit.street_number === false ? (
                      <Box
                        component="div"
                        variant="body2"
                        className={classes.information}
                        color="textPrimary">
                        {userInfo.street_number}
                     
                        {updateError.street_number ? (
                          <Typography className={classes.error} color="error">
                            {updateError.street_number} Street Number not saved. Please
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
                          name="street_number"
                          inputProps={{
                            maxLength: 11,
                          }}
                          helperText={`${String(userInput.street_number).length}/11`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSave("street_number");
                            }
                          }}
                          onChange={(e) => {
                            setUserInput({
                              ...userInput,
                              street_number: e.target.value,
                            });
                          }}
                          value={userInput.street_number}
                        />
                      )}
                  </Grid>
                  <Grid item xs={2} className={classes.iconListGrid}>
                    {customerEdit.street_number === false ? (
                      <IconButton
                        className={classes.icon}
                        onClick={() => {
                          handleOpenEdit("street_number");
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
                                  handleCancel("street_number");
                                }}>
                                <ClearRoundedIcon />
                              </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                              <IconButton
                                className={classes.icon}
                                onClick={() => {
                                  handleSave("street_number");
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
                    <RoomIcon  />
                  </Grid>
                  <Grid item xs={9} className={classes.alignStart}>
                    <Box component={"span"} className={classes.sectionHeader}>
                    Street Name
                  </Box>
                    {customerEdit.street_name === false ? (
                      <Box
                        component="div"
                        variant="body2"
                        className={classes.information}
                        color="textPrimary">
                        {userInfo.street_name}
                     
                        {updateError.street_name ? (
                          <Typography className={classes.error} color="error">
                            {updateError.street_name} Street Name not saved. Please
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
                          name="street_name"
                          inputProps={{
                            maxLength: 100,
                          }}
                          helperText={`${userInput.street_name.length}/100`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSave("street_name");
                            }
                          }}
                          onChange={(e) => {
                            setUserInput({
                              ...userInput,
                              street_name: e.target.value,
                            });
                          }}
                          value={userInput.street_name}
                        />
                      )}
                  </Grid>
                  <Grid item xs={2} className={classes.iconListGrid}>
                    {customerEdit.street_name === false ? (
                      <IconButton
                        className={classes.icon}
                        onClick={() => {
                          handleOpenEdit("street_name");
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
                                  handleCancel("street_name");
                                }}>
                                <ClearRoundedIcon />
                              </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                              <IconButton
                                className={classes.icon}
                                onClick={() => {
                                  handleSave("street_name");
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
                    <RoomIcon  />
                  </Grid>
                  <Grid item xs={9} className={classes.alignStart}>
                    <Box component={"span"} className={classes.sectionHeader}>
                    Zip Code
                  </Box>
                    {customerEdit.zip_code === false ? (
                      <Box
                        component="div"
                        variant="body2"
                        className={classes.information}
                        color="textPrimary">
                        {userInfo.zip_code}
                     
                        {updateError.zip_code ? (
                          <Typography className={classes.error} color="error">
                            {updateError.zip_code} Zip Code not saved. Please
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
                          name="zip_code"
                          inputProps={{
                            maxLength: 5,
                          }}
                          helperText={`${String(userInput.zip_code).length}/5`}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSave("zip_code");
                            }
                          }}
                          onChange={(e) => {
                            setUserInput({
                              ...userInput,
                              zip_code: e.target.value,
                            });
                          }}
                          value={userInput.zip_code}
                        />
                      )}
                  </Grid>
                  <Grid item xs={2} className={classes.iconListGrid}>
                    {customerEdit.zip_code === false ? (
                      <IconButton
                        className={classes.icon}
                        onClick={() => {
                          handleOpenEdit("zip_code");
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
                                  handleCancel("zip_code");
                                }}>
                                <ClearRoundedIcon />
                              </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                              <IconButton
                                className={classes.icon}
                                onClick={() => {
                                  handleSave("zip_code");
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
                    <DateRangeRoundedIcon />
                  </Grid>
                  <Grid item xs={9} className={classes.alignStart}>
                    <Box component={"span"} className={classes.sectionHeader}>
                      Date Of Birth
                  </Box>
                    {customerEdit.date_of_birth === false ? (
                      <Box
                        component="div"
                        variant="body2"
                        className={classes.information}
                        color="textPrimary">
                        {userInfo.date_of_birth}
                      </Box>
                    ) : (
                        <TextField
                          autoFocus

                          className={`${classes.textForm} ${classes.information}`}
                          type="date"
                          name="date_of_birth"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSave("date_of_birth");
                            }
                          }}
                          onChange={(e) => {
                            setUserInput({
                              ...userInput,
                              date_of_birth: e.target.value,
                            });
                          }}
                          value={userInput.date_of_birth}
                        />
                      )}
                  </Grid>
                  <Grid item xs={2} className={classes.iconListGrid}>
                    {customerEdit.date_of_birth === false ? (
                      <IconButton
                        className={classes.icon}
                        onClick={() => {
                          handleOpenEdit("date_of_birth");
                        }}
                      >
                        <EditTwoToneIcon />
                      </IconButton>
                    ) : (
                        <>
                          <Grid container item direction="row">
                            <Grid item xs={6}>
                              <IconButton
                                className={classes.icon}
                                onClick={() => {
                                  handleCancel("date_of_birth");
                                }}>
                                <ClearRoundedIcon />
                              </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                              <IconButton
                                className={classes.icon}
                                onClick={() => {
                                  handleSave("date_of_birth");
                                }}
                              >
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
                        <StorefrontIcon />
                  </Grid>
                  <Grid item xs={9} className={classes.alignStart}>
                    <Box component={"span"} className={classes.sectionHeader}>
                      Is Member of this store
                  </Box>
                    {customerEdit.is_member === false ? (
                      <Box
                        component="div"
                        variant="body2"
                        className={`${classes.inline} ${classes.sectionContent}`}
                        color="textPrimary">
                        {userInfo.is_member === true ? (
                          <>
                            <Typography
                            className={classes.grid}
                              variant="body1"
                              color="textSecondary"
                              component="div">
                                You are a member of this store
                          </Typography>
                          </>
                        ) : (
                            <>
                              <Typography
                              className={classes.grid}
                                variant="body1"
                                color="textSecondary"
                                component="div">
                                 
                              You are not a member of this store. Update this field to become a member and receive awesome discounts. 
                          </Typography>
                            </>
                          )}
                      </Box>
                    ) : (
                        <FormControl
                          component="fieldset"
                          style={{
                            width: "100%",
                            paddingRight: "10px",
                            paddingLeft: "10px"
                           
                          }}
                          className={classes.check}>
                          <FormGroup className={classes.check} aria-label="position" row>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={userInput.is_member || false}
                                  value={userInfo.is_member}
                                  style={{ color: "#005E86" }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleSave("is_member");
                                    }
                                  }}
                                  onChange={(e) => {
                                    setUserInput({
                                      ...userInput,
                                      is_member: e.target.checked,
                                    });
                                  }}
                                />
                              }
                              label={
                                <Typography style={{ fontSize: 15 }}>
                                  Check if you want to be member of this store
                            </Typography>
                              }
                            />
                          </FormGroup>
                        </FormControl>
                      )}
                  </Grid>
                  <Grid container item xs={2} className={classes.iconListGrid}>
                    {customerEdit.is_member === false ? (
                      <IconButton
                        className={classes.icon}
                        onClick={() => {
                          handleOpenEdit("is_member");
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
                                  handleCancel("is_member");
                                }}>
                                <ClearRoundedIcon />
                              </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                              <IconButton
                                className={classes.icon}
                                onClick={() => {
                                  handleSave("is_member");
                                }}
                              >
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


                <Grid container direction="row" spacing={3} className={classes.grid}>
                  <Grid item xs={1} className={classes.iconList}>
                    <StorefrontIcon />
                  </Grid>
                  <Grid item xs={9} className={classes.alignStart}>
                    <Box component={"span"} className={classes.sectionHeader}>
                      My Store
                  </Box>
                    {customerEdit.store_id_fk === false ? (
                      <Box
                        component="div"
                        variant="body2"
                        className={classes.information}
                        color="textPrimary">
                        {myStore.label}
                      </Box>
                    ) : (
                        <>
                          <Select
                            autoFocus
                            className={`${classes.selectStore} ${classes.information}`}
                            closeMenuOnSelect={true}
                            options={store}
                            value={{
                              label: myStore.label,
                              value: myStore.value,
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleSave("store_id_fk");
                              }
                            }}
                            name="store_id_fk"
                            onChange={(e) => {
                              setMyStore(
                                {
                               label: e.label,
                              value: e.value
                              });
                              console.log(e.value)
                            }}
                          />
                        </>
                      )}
                  </Grid>
                  <Grid item xs={2} className={classes.iconListGrid}>
                    {customerEdit.store_id_fk === false ? (
                      <IconButton
                        className={classes.icon}
                        onClick={() => {
                          handleOpenEdit("store_id_fk");
                        }}>
                        <EditTwoToneIcon />
                      </IconButton>
                    ) : (
                        <>
                          <Grid container direction="row">
                            <Grid item xs={6}>
                              <IconButton
                                className={classes.icon}
                                onClick={() => {
                                  handleCancel("store_id_fk");
                                }}>
                                <ClearRoundedIcon />
                              </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                              <IconButton
                                className={classes.icon}
                                onClick={() => {
                                  handleSave("store_id_fk");
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
          </>)}

      
      
          <Footer />
          <Snackbar
        open={updateSuccess}
        autoHideDuration={6000}
        onClose={handleCloseUpdateSucess}>
        <Alert onClose={handleCloseUpdateSucess} severity="success">
          User {userInfo.first_name} was saved!
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
        </>
  );
}
export default Home;
