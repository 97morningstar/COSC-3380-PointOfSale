import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { getConfig } from "../../authConfig";

import Navbar from "../../components/Navbar/Navbar";
import Navbarnavigation from "../../components/NavbarNavigation/Navbar";

import { Link, useRouteMatch, router } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Divider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import Carousel from 'react-material-ui-carousel'



import { Chip } from "@material-ui/core";
import { Button, LinearProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
/* Images */
import slogan from "../../assets/_Logo (1).png";
import food from "../../assets/food.png";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import placeholder from "../../assets/placeholder.png";

import Select from "react-select";


import back from "../../assets/background1.jpg";


import Footer from "../../components/Footer/Footer";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    width: "90%"
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
    marginTop: "50px"

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
    width: "100%",
    paddingLeft: "40px",
    paddingRight: "10px",
    height: "440px",
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
  }
}));


function Item({ match }) {
  const classes = useStyles();
  const theme = createMuiTheme();
  let history = useHistory();

  /* Recommended Items 15 */
  const data = {
    searchText: 'dog',
    amount: 4,
    apiUrl: 'https://pixabay.com/api',
    apiK: '20983112-12d43bcb17250999b789e998a',
    images: []
  }

  const [imageArray, setimageArray] = useState([]);

  const [numberOfItems, setNumberOfItems] = useState(0);

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);

  const handleCloseUpdateSucess = () => {
    setUpdateSuccess(false);
  };
  const handleCloseUpdateFailed = () => {
    setUpdateFailed(false);
  };

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

  const [invoice, setInvoice] = useState([]);

  const [imageArrayCategory, setimageArrayCategory] = useState([]);


 

 

  const handleAddCart = () => {

    const cart_data = {
      quantity: numberOfItems,
      item_id_fk: imageArray[0].item_id,
      invoice_id_fk: invoice.invoice_id,
      jwtToken: localStorage.getItem("token"),
      user_id: localStorage.getItem("user_id"),
      is_employee: localStorage.getItem("is_employee")
    }

    if(numberOfItems !== 0){

  
    axios.post("http://localhost:4000/add_to_cart", cart_data)
      .then((res) => {
        setUpdateSuccess(true);
       })
      .catch((err) => {
        console.log(err);
        history.push("/login");
      });
    }else{
      setUpdateFailed(true);
    }


  }


  useEffect(() => {

    const data2 = {
      jwtToken: localStorage.getItem("token"),
      user_id: localStorage.getItem("user_id"),
      is_employee: localStorage.getItem("is_employee")
    }


    axios.post("http://localhost:4000/get_cart", data2)
      .then((res) => {
        setInvoice(res.data[0]);
        console.log("res.data",res.data)
      })
      .catch((err) => {
        console.log(err.response);
        history.push("/login")
      });



    axios.get("http://localhost:4000/api/item/" + match.params.name)
      .then((res) => {

        console.log("item", res.data);


        res.data[0].name = res.data[0].name.replace(" ", "+");

        axios    .get(
            `${data.apiUrl}/?key=${data.apiK}&q=${res.data[0].name}&image_type=photo&per_page=${data.amount}&safesearch=true`
            ,
            { crossdomain: true }
          )
          .then((response) => {

            console.log(response.data.hits);


            const image = {
              images: response.data.hits,
              name: res.data[0].name.replace("+", " "),
              price: res.data[0].selling_price,
              category: res.data[0].category,
              brand: res.data[0].brand,
              item_id: res.data[0].item_id
            }

            console.log(image);


            setimageArray(imageArray => [...imageArray, image]);


            /* SHOP ITEMS IN THE SAME CATEGORY */

            axios        .get("/api/item/category/" + res.data[0].category)
              .then((res) => {

                console.log(res.data);

                res.data.map((index) => {
                  index.name = index.name.replace(" ", "+");
                  axios              .get(
                      `${data.apiUrl}/?key=${data.apiK}&q=${index.name}&image_type=photo&per_page=${data.amount}&safesearch=true`
                      ,
                      { crossdomain: true }
                    )
                    .then((response) => {

                      console.log(response.data.hits);


                      const image = {
                        images: response.data.hits,
                        name: index.name.replace("+", " "),
                        price: index.selling_price,
                        item_id: index.item_id
                      }

                      console.log(image);


                      setimageArrayCategory(imageArrayCategory => [...imageArrayCategory, image]);

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
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [match.params.project]);

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
              <Link href="/" className={classes.logoContainer} justify="center">
                <img alt="uh logo" className={classes.logo} src={slogan} />
              </Link>
            </Grid>


          </Grid>
          <Navbarnavigation />


          {imageArray.length !== 0 ? (
            <Grid xs={12} item container className={classes.wrapper}>
              {imageArray[0].images.length !== 0 ? (
                <>
                  <Grid xs={2} item>
                    {imageArray[0].images[0] ? (<img src={imageArray[0].images[0].largeImageURL} className={classes.thumbnail} />) : (<img src={placeholder} className={classes.thumbnail} />)}
                    {imageArray[0].images[1] ? (<img src={imageArray[0].images[1].largeImageURL} className={classes.thumbnail} />) : (<img src={placeholder} className={classes.thumbnail} />)}
                    {imageArray[0].images[2] ? (<img src={imageArray[0].images[2].largeImageURL} className={classes.thumbnail} />) : (<img src={placeholder} className={classes.thumbnail} />)}

                  </Grid>
                  <Grid xs={4} item>
                    {imageArray[0].images[3] ? (<img src={imageArray[0].images[3].largeImageURL} className={classes.image} />) : (<img src={placeholder} className={classes.image} />)}

                  </Grid>
                </>
              ) : (
                <>
                  <Grid xs={2} item>
                    <img src={placeholder} className={classes.thumbnail} />
                    <img src={placeholder} className={classes.thumbnail} />
                    <img src={placeholder} className={classes.thumbnail} />
                  </Grid>
                  <Grid xs={4} item>
                    <img src={placeholder} className={classes.image} />
                  </Grid>
                </>
              )}
              <Grid xs={6} item container>
                <Grid xs={12} item container>
                  <Grid xs={12} item >
                    <Typography gutterBottom variant="h4" component="h2">
                      {imageArray[0].name}
                    </Typography>
                  </Grid>
                  <Grid xs={12} item >
                    <Divider
                      variant="inset"
                      component="li"
                      className={classes.divider}
                    />
                  </Grid>
                  <Grid xs={12} item >
                    <Typography gutterBottom variant="h5" component="h2">
                      Price: ${imageArray[0].price}
                    </Typography>
                  </Grid>

                  <Grid xs={12} item >
                    <Divider
                      variant="inset"
                      component="li"
                      className={classes.divider}
                    />
                  </Grid>

                  <Grid xs={12} item >
                    <Typography gutterBottom variant="h5" component="h2">
                      Brand: {imageArray[0].brand}
                    </Typography>
                  </Grid>

                  <Grid xs={12} item >
                    <Divider
                      variant="inset"
                      component="li"
                      className={classes.divider}
                    />
                  </Grid>

                  <>
                    <Grid xs={12} item >
                      <Typography gutterBottom variant="body" component="h2">
                        Select Number of Items
                   </Typography>
                      <Typography gutterBottom variant="body3" component="body">
                        You need to have an account to be able to buy
                   </Typography>

                  
                    <Grid xs={12} item >
                      <Select
                        autoFocus
                        className={`${classes.selectStore} ${classes.information}`}
                        closeMenuOnSelect={true}
                        options={items}
                        value={{
                          label: numberOfItems,
                          value: numberOfItems,
                        }}
                        name="store_id_fk"
                        onChange={(e) => {
                          setNumberOfItems(e.value);
                          console.log(e.value)
                        }}
                      />
                    </Grid>
                    </Grid>
                    <Divider
                      variant="inset"
                      component="li"
                      className={classes.divider}
                    />
                    <Grid xs={12} item >
                      <Typography gutterBottom variant="h5" component="h2">
                        Total Cost: ${parseFloat(imageArray[0].price) * numberOfItems}
                      </Typography>
                      <Typography gutterBottom variant="body3" component="body">
                        Taxes will be calculated during checkout
                   </Typography>

                    </Grid>
                  </>
                  <Grid container xs={12}>
                    <Grid items xs={12}>
                      <Button onClick={handleAddCart} size="medium" variant="contained" color="primary" className={classes.botton}>
                        Add to Cart
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>



              </Grid>
            </Grid>
          ) : (null)}


          <Grid xs={12} item container className={classes.wrapper}>
            <Typography gutterBottom variant="h4" component="h2" className={classes.botton}>
              More articles in this category you may like
          </Typography>
            {imageArrayCategory.length !== 0 ? (
              <Grid container justify="center" alignItems="center" >

                {imageArrayCategory.map((index, i) => {
                  return (<>
                    <Grid xs={12} md={2}>


                      <Card className={classes.rootCard}>
                        <CardActionArea>
                          <Carousel animation="fade" navButtonsAlwaysInvisible="true">


                            {index.images.map((a, b) => {
                              return (<>

                                <CardMedia
                                  component="img"
                                  alt="Photo"
                                  height="140"
                                  image={a.largeImageURL}
                                  title="Photo"
                                />



                              </>
                              )
                            })
                            }

                          </Carousel>

                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                              {index.name}
                            </Typography>
                            <Chip
                              label={index.price} />
                          </CardContent>
                        </CardActionArea>
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={{
                            pathname: `/item/${index.item_id}`,
                          }}>
                          <CardActions>
                            <Grid item xs={12} className={classes.nameOfItem} >
                              <Button size="small" variant="contained" color="primary">
                                Learn More
                              </Button>
                            </Grid>
                          </CardActions>
                        </Link>

                      </Card>







                    </Grid>

                  </>
                  )



                })


                }
              </Grid>

            ) : null}



          </Grid>


          <Footer />
        </Grid>
        <Snackbar
        open={updateSuccess}
        autoHideDuration={6000}
        onClose={handleCloseUpdateSucess}>
        <Alert onClose={handleCloseUpdateSucess} severity="success">
          Item was added to cart!
        </Alert>
      </Snackbar>
      <Snackbar
        open={updateFailed}
        autoHideDuration={6000}
        onClose={handleCloseUpdateFailed}>
        <Alert onClose={handleCloseUpdateFailed} severity="error">
          There was a problem when adding this item to your cart. Please check that you have set at least one item or if you are logged in into the site
        </Alert>
      </Snackbar>
      </React.Fragment>
    </div>
  );
}
export default Item;
