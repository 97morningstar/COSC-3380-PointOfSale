import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { getConfig } from "../../authConfig";

import Navbar from "../../components/Navbar/Navbar";
import Navbarnavigation from "../../components/NavbarNavigation/Navbar";

import { Link, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import Carousel from 'react-material-ui-carousel'

import { Chip } from "@material-ui/core";
import { Button, LinearProgress } from "@material-ui/core";

/* Images */
import slogan from "../../assets/_Logo (1).png";
import food from "../../assets/food.png";
/* Categories Images */
import Electronics from "../../assets/Electronics.png";
import MensClothing from "../../assets/MensClothing.png";
import Shoes from "../../assets/Shoes.png";
import Sportswear from "../../assets/Sportswear.png";
import WomensClothing from "../../assets/WomensClothing.png";
import Groceries from "../../assets/Groceries.png";



import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";




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
    marginBottom: "40px",
  },
  Text1: {
    marginTop: "70px",
    marginBottom: "70px"
  },
  wrapper: {
    marginBottom: "100px"
  },
  rootCard: {
    margin: "20px"
  },
}));


function Home() {
  const classes = useStyles();
  const theme = createMuiTheme();

  /* Recommended Items 15 */
  const data = {
    searchText: 'dog',
    amount: 3,
    apiUrl: 'https://pixabay.com/api',
    apiK: '20983112-12d43bcb17250999b789e998a',
    images: []
  }

  const arrayImages = ['dresses', 'necklace', 'shoe+women', 'wedding+ring'];



  const [imageArray, setimageArray] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:4000/api/item/category/Miscellaneous")
      .then((res) => {

        console.log(res.data);

        res.data.map((index) => {
          index.name = index.name.replace(" ", "+");
          axios      .get(
              `${data.apiUrl}/?key=${data.apiK}&q=${index.name}&image_type=photo&per_page=${data.amount}&safesearch=true`
              ,
              { crossdomain: true }
            )
            .then((response) => {

              console.log(response.data.hits);


              const image = {
                images: response.data.hits,
                name: index.name.replace("+", " "),
                price: "$" + index.selling_price,
                item_id: index.item_id
              }

              console.log(image);


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
          <Grid container xs={12} className={classes.design}>
            <Grid container xs={6} className={classes.logoContainer} justify="center">
              <Link href="/" className={classes.logoContainer} justify="center">
                <img alt="uh logo" className={classes.logo} src={slogan} />
              </Link>
            </Grid>


          </Grid>
          <Navbarnavigation />




          <Grid container xs={12} spacing={5} direction="column" alignItems="center" justify="center">
            <Grid xs={12} item className={classes.text} >
              <Typography variant="h3" className={classes.Text1} >
                Miscellaneous
                </Typography>
            </Grid>
          </Grid>

          <Grid xs={12} item className={classes.wrapper}>



            {imageArray.length !== 0 ? (
              <Grid container justify="center" alignItems="center" >

                {imageArray.map((index, i) => {
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
      </React.Fragment>
    </div>
  );
}
export default Home;
