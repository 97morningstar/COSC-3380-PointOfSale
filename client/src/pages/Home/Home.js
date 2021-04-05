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

import { Chip } from "@material-ui/core";
import { Button, LinearProgress } from "@material-ui/core";

/* Images */
import slogan from "../../assets/_Logo.gif";
import food from "../../assets/food.png";
/* Categories Images */
/* Categories Images */
import Electronics from "../../assets/Electronics.png";
import Pets from "../../assets/Pets.png";
import ToysAndGames from "../../assets/ToysAndGames.png";
import Clothing from "../../assets/MensClothing.png";
import Miscellaneous from "../../assets/Miscellaneous.png";
import Groceries from "../../assets/Groceries.png";

import Footer from "../../components/Footer/Footer";

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
    backgroundColor: "#007EB4",
    height: "150px !important",
    paddingTop: "80px"
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

const arrayImages = ['Dog','Peach','Apple', 'Cup', 'Laptop'];
  


const [imageArray, setimageArray] = useState([]);

  useEffect(() => {

    arrayImages.map((index) => {

      axios
        .get(
          `${data.apiUrl}/?key=${data.apiK}&q=${index}&image_type=photo&per_page=${data.amount}&safesearch=true`
          , 
          { crossdomain: true }
        )
        .then((res) => {
          
        //  console.log(res.data.hits);


          const image = {
            images: res.data.hits,
            name: index, // The name of the article
            price: '$24.99'
          }


          setimageArray(imageArray => [...imageArray, image]);

        })
        .catch((err) => {
          console.log(err);
        });
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
            <Grid container xs={6} className={classes.foodContainer} justify="flex-end">
                  <img alt="uh logo" className={classes.food} src={food} />
            </Grid>
       
          </Grid>
          <Navbarnavigation />

         
          <Grid  container  xs={12}  spacing={0}   direction="column"   alignItems="center"  justify="center">
            <Grid xs={12} item className={classes.text} >
              <Typography variant="h4" className={classes.Text1} >
                    Recommended Items
              </Typography>
          </Grid>
       </Grid>
       <Grid xs={12} item className={classes.text}>

      
        
        {imageArray.length !== 0 ? (
             <Grid container justify="center" alignItems="center" > 
             
               {imageArray.map((index, i) => {
                return( <>
               <Grid xs={2}>
                  <Carousel animation= "fade"> 


                 { index.images.map((a,b) => {
                   return ( <>


               
                   <img alt="uh logo" className={classes.carousel} src={a.largeImageURL}  />
                   
                   
                   
                    </>
                   )
                })
                }

                  </Carousel>
                    <Grid item xs={12}>

                    <Typography variant="body" className={classes.nameOfItem} >
                      {index.name} 
                     </Typography>
                      <Chip 
                      label={index.price}
                      />
                      <Grid item xs={12} className={classes.nameOfItem} >
                        <Button  variant="contained" color="primary">Learn More</Button>
                      </Grid>
                      
                    </Grid>
                  </Grid>
                  
                   </>
                )

              
               
              }) 
               
                
            }
              </Grid>
                    
              ) : null} 
       
    
        
       </Grid>
       <Grid  container  xs={12}  spacing={0}   direction="column"   alignItems="center"  justify="center">
            <Grid xs={12} item className={classes.text} >
                <Typography variant="h4" className={classes.Text1} >
                      Categories
                </Typography>
            </Grid>
        </Grid>

        <Grid xs={12} container justify="center" alignItems="center"  spacing={1} className={classes.categories} >
            <Grid xs={12} container justify="center" alignItems="center"  >
                <Grid item xs={4}>
                  <Link href="/groceries" className={classes.link}>
                      <img alt="category" className={classes.category1} src={Groceries} />
                      <Typography variant="h5" className={classes.Text} >
                      Groceries
                     </Typography>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                  <Link href="/electronics" className={classes.link} > 
                      <img alt="category" className={classes.category1} src={Electronics} />
                      <Typography variant="h5" className={classes.Text} >
                      Electronics
                     </Typography>
                  </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link href="/clothing" className={classes.link}>
                        <img alt="category" className={classes.category1} src={Clothing} />
                        <Typography variant="h5" className={classes.Text} >
                        Clothing
                     </Typography>
                    </Link>
                </Grid>
            </Grid>
            <Grid xs={12} container justify="center" alignItems="center" >
                <Grid item xs={4}>
                    <Link href="/toys-and-games" className={classes.link}>
                        <img alt="category" className={classes.category1} src={ToysAndGames} />
                        <Typography variant="h5" className={classes.Text} >
                        Toys and Games
                     </Typography>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link href="/pets" className={classes.link}>
                        <img alt="category" className={classes.category1} src={Pets} />
                        <Typography variant="h5" className={classes.Text} >
                        Pets
                     </Typography>
                    </Link>
                </Grid>
                <Grid item xs={4}>
                    <Link href="/miscellaneous" className={classes.link}>
                        <img alt="category" className={classes.category1} src={Miscellaneous} />
                        <Typography variant="h5" className={classes.Text} >
                        Miscellaneous
                     </Typography>
                    </Link>
                </Grid>
            </Grid>
        </Grid>
       
      
          <Footer />
        </Grid>
      </React.Fragment>
    </div>
  );
}
export default Home;
