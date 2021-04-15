import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { getConfig } from "../../authConfig";

import Navbar from "../../components/Navbar/Navbar";
import Navbarnavigation from "../../components/NavbarNavigation/Navbar";

import { Link, useRouteMatch, router } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Divider, Paper } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import Carousel from 'react-material-ui-carousel'

import { Chip } from "@material-ui/core";
import { Button, LinearProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
/* Images */
import slogan from "../../assets/_Logo (1).png";
import food from "../../assets/food.png";


import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import placeholder from "../../assets/placeholder.png";

import Select from "react-select";


import back from "../../assets/background1.jpg";


import Footer from "../../components/Footer/Footer";

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
  selectStore: {
    zIndex: "1000"
  },
  information: {
    zIndex: "1000"
  }
}));


function Item({ match }) {
  const classes = useStyles();
  const theme = createMuiTheme();
  let history = useHistory();

  const [numberOfItems, setNumberOfItems] = useState(0);

  /* Recommended Items 15 */
  const pixel = {
    searchText: 'dog',
    amount: 4,
    apiUrl: 'https://pixabay.com/api',
    apiK: '20983112-12d43bcb17250999b789e998a',
    images: []
  }

  const [invoice, setInvoice] = useState({});

  const [invoiceItems, setInvoiceItems] = useState([]);
  const [invoiceItemsName, setInvoiceItemsName] = useState([]);



  const items = [
    {
      label: 1,
      value: 1
    },
    {
      label: 2,
      value: 2
    },
    {
      label: 3,
      value: 3
    },
    {
      label: 4,
      value: 4
    },
    {
      label: 5,
      value: 5
    },
    {
      label: 6,
      value: 6
    },
    {
      label: 7,
      value: 7
    },
    {
      label: 8,
      value: 8
    },
    {
      label: 9,
      value: 9
    },
    {
      label: 10,
      value: 10
    },
  ]

  const [imageArray, setimageArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {

    /* WE NEED A PROTECTED ROUTE TO ACCESS THE CART */
    /* EMPLOYEE CAN'T BUY */

    setIsLoading(true);

    const data = {
      jwtToken: localStorage.getItem("token"),
      user_id: localStorage.getItem("user_id"),
      is_employee: localStorage.getItem("is_employee")
    }

    /* VERIFY USER IS LOGGED IN */
    axios
      .post("/get_cart", data)
      .then((res) => {
        setIsLoading(false);

        setInvoice(res.data[0]);
        /* GET INVOICE ITEMS */
        axios
          .get("/get_invoice_items/" + data.user_id)
          .then((response) => {
            setIsLoading(false);
            console.log("invoice items", response.data);
            setInvoiceItems(response.data);

            /* GET IMAGES */
            response.data.map((index) => {
              index.name = index.name.replace(" ", "+");
              axios
                .get(
                  `${pixel.apiUrl}/?key=${pixel.apiK}&q=${index.name}&image_type=photo&per_page=${pixel.amount}&safesearch=true`
                  ,
                  { crossdomain: true }
                )
                .then((response) => {

                  console.log(response.data.hits);
                  index.name = index.name.replace("+", " ");

                  const image = {
                    images: response.data.hits[0],
                  }

                  setimageArray(imageArray => [...imageArray, image]);

                })
                .catch((err) => {
                  console.log(err);
                });
            });


          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err.response);
        history.push("/login")
      });
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
          <Grid xs={12} item container className={classes.wrapper}>


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
            ) : (<>

              {invoiceItems.length !== 0 ? (
                <>
                  <Typography gutterBottom variant="h4" component="h2" className={classes.botton}>
                    CART
                  </Typography>
                  <Grid xs={12} item container>
                    <Grid xs={3} item>
                      <Typography gutterBottom variant="h5" component="h2" className={classes.botton}>
                        Shipping Address:
                      </Typography>
                    </Grid>
                    <Grid xs={9} item>
                      <Typography gutterBottom variant="h6" component="body" className={classes.botton}>
                        {invoiceItems[0].first_name} {invoiceItems[0].last_name}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="body" className={classes.botton}>
                        {invoiceItems[0].email}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="body" className={classes.botton}>
                        {invoiceItems[0].street_number} {invoiceItems[0].street_name}, {invoiceItems[0].zip_code}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider
                    variant="inset"
                    component="li"
                    className={classes.divider2}
                  />
                  <Grid xs={12} item container>
                    <Grid xs={3} item>
                      <Typography gutterBottom variant="h5" component="h2" className={classes.botton}>
                        Payment Method
                      </Typography>
                    </Grid>
                    <Grid xs={9} item>
                      <Typography gutterBottom variant="h5" component="h2" className={classes.botton}>
                        METHOD OF PAYMENT
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider
                    variant="inset"
                    component="li"
                    className={classes.divider2}
                  />
                  <Grid xs={12} item container>
                    <Grid xs={12} item>
                      <Typography gutterBottom variant="h5" component="h2" className={classes.botton}>
                        Review Items
                      </Typography>
                    </Grid>
                    <Grid xs={12} item container justify="space-around">
                      <Grid xs={6} item container >
                        {invoiceItems.map((index, i) => {
                          //console.log(index)
                          return (
                            <>

                              <Grid xs={6} item>
                                {imageArray[i] ? (
                                  <>
                                    {imageArray[i].images ? (<img src={imageArray[i].images.largeImageURL} className={classes.image} />) : (<img src={placeholder} className={classes.thumbnail} />)}
                                  </>
                                ) : (null)}
                              </Grid>
                              <Grid xs={6} item>
                                <Typography gutterBottom variant="h6" component="h2" className={classes.botton}>
                                  Item: {index.name}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h2" className={classes.botton}>
                                  Brand: {index.brand}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h2" className={classes.botton}>
                                  Price: ${index.selling_price}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h2" className={classes.botton}>
                                  Quantity:
                                  </Typography>
                                <Select
                                  autoFocus
                                  closeMenuOnSelect={true}
                                  options={items}
                                  value={{
                                    label: index.quantity,
                                    value: index.quantity,
                                  }}
                                  name="store_id_fk"
                                  onChange={(e) => {
                                    setNumberOfItems(e.value);
                                    index.quantity = e.value
                                    console.log(index)
                                  }}
                                />
                                <Typography gutterBottom variant="h6" component="h2" className={classes.botton}>
                                  Subtotal: ${(index.quantity * index.selling_price).toFixed(2)}
                                </Typography>
                              </Grid>
                              <Divider
                                variant="inset"
                                component="li"
                                className={classes.divider}
                              />



                            </>
                          );
                        })}
                      </Grid>
                      <Grid xs={5} item >
                        <Paper elevation={3} style={{padding: "15px"}}>
                          <Typography gutterBottom variant="h5" component="h2"  className={classes.botton}>
                            Order Summary:
                          </Typography>
                          <Divider
                            variant="inset"
                            component="li"
                            className={classes.divider}
                          />
                          <Typography gutterBottom component="body" className={classes.botton}>
                            Number Of Items: {invoiceItems.length}
                          </Typography>
                          <Divider
                            variant="inset"
                            component="li"
                            className={classes.divider}
                          />
                          {invoiceItems[0].is_discounted === 0 ? (<>
                            <Typography gutterBottom component="body" className={classes.botton}>
                              Is Discounted: Yes
                                  </Typography>
                            <Typography gutterBottom variant="caption" className={classes.botton}>
                              Thank you for being a valuable member of our store!
                                  </Typography></>) : (<>
                            <Typography gutterBottom component="body" className={classes.botton}>
                              Is Discounted: No
                                  </Typography>
                            <Typography gutterBottom variant="caption" className={classes.botton}>
                              We give all of our store members a discount of 75% off the original price. Please consider becoming a member of our store
                                  </Typography></>)}
                          <Divider
                            variant="inset"
                            component="li"
                            className={classes.divider}
                          />
                          <Typography gutterBottom component="body" className={classes.botton}>
                           Total Before Tax: ${invoiceItems.map((index) => {
                             return parseFloat(index.selling_price*index.quantity);
                           }).reduce((total, num) => {
                             return total + num
                           })}
                          </Typography>
                          <Typography gutterBottom component="body" className={classes.botton}>
                           Tax on this invoice: ${invoiceItems.map((index) => {
                             return 0.0825*parseFloat(index.selling_price*index.quantity);
                           }).reduce((total, num) => {
                             return total + num
                           }).toFixed(2)}
                          </Typography>
                          <Typography gutterBottom component="body" className={classes.botton}>
                           Total Cost: ${(invoiceItems.map((index) => {
                             return 0.0825*parseFloat(index.selling_price*index.quantity);
                           }).reduce((total, num) => {
                             return total + num
                           }) + invoiceItems.map((index) => {
                            return parseFloat(index.selling_price*index.quantity);
                          }).reduce((total, num) => {
                            return parseFloat(total + num)
                          })).toFixed(2)}
                          </Typography>

                        </Paper>
                      </Grid>

                    </Grid>
                  </Grid>

                </>
              ) : (<>No items</>)}



            </>)}



          </Grid>


          <Footer />
        </Grid>
      </React.Fragment>
    </div>
  );
}
export default Item;