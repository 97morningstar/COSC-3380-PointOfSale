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
/* Categories Images */
import Electronics from "../../assets/Electronics.png";
import Pets from "../../assets/Pets.png";
import ToysAndGames from "../../assets/ToysAndGames.png";
import Clothing from "../../assets/MensClothing.png";
import Miscellaneous from "../../assets/Miscellaneous.png";
import Groceries from "../../assets/Groceries.png";

import Footer from "../../components/Footer/Footer";

import back from "../../assets/background1.jpg";


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
    textDecoration: "none",
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
const [images, setimages] = useState([]);


  useEffect(() => {

  /*  arrayImages.map((index) => {

      axios.get(
          `${data.apiUrl}/?key=${data.apiK}&q=${index}&image_type=photo&per_page=${data.amount}&safesearch=true`
          , 
          { crossdomain: true }
        )
        .then((res) => {
          
    


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
*/


    axios.get("http://localhost:4000/api/view_all_items" , getConfig())
    .then((res) => {
    
    
      setimages([
        res.data[0],
        res.data[1],
        res.data[2],
        res.data[3],
        res.data[4],
      ]);

      console.log(res)
    
      for(let i = 0; i < 5; i++){

    let name = res.data[i].name.replace(" ", "+");

    console.log("name", name)

        axios.get(
            `${data.apiUrl}/?key=${data.apiK}&q=${name}&image_type=photo&per_page=${data.amount}&safesearch=true`
            , 
            { crossdomain: true }
          )
          .then((response) => {
            
      
            console.log("response",response)
  
            const image = {
              images: response.data.hits,
              name: res.data[i].name, // The name of the article
              price: "$" + res.data[i].selling_price,
              item_id: res.data[i].item_id,
              discount: res.data[i].discount,
                discounted_price: parseFloat(res.data[i].selling_price) * parseFloat( 1 - res.data[i].discount)
            }
  
  
            setimageArray(imageArray => [...imageArray, image]);
  
          })
          .catch((err) => {
            console.log(err);
          });
      
    }



    
    
    })
    .catch((err) => {
      console.log(err);
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
                  <Link href="/" className={classes.logoContainer} justify="center">
                      <img alt="uh logo" className={classes.logo} src={slogan} />
                    </Link>
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
       <Grid xs={12} item className={classes.text} >

    

      
        
        {imageArray.length !== 0 ? (
             <Grid container justify="center" alignItems="center" {...console.log("index", imageArray)}> 
             
               {imageArray.map((index, i) => {
                return( <>
               <Grid xs={2}>
                  <Carousel animation= "fade" > 


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
                            
                            label={(index.discount=="0.00" ?(index.price):(<>
                            <span style={{textDecoration: "line-through"}}> {index.price} </span><span>${index.discounted_price.toFixed(2)}</span>
                             </>))} 
                            />
                      <Grid item xs={12} className={classes.nameOfItem} >
                      <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={{
                            pathname: `/item/${index.item_id}`,
                          }}>
                         
                              <Button size="small" variant="contained" color="primary">
                                Learn More
                              </Button>
                           
                        </Link>
                      
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
                  <a href="/groceries" className={classes.link}>
                      <img alt="category" className={classes.category1} src={Groceries} />
                      <Typography variant="h5" className={classes.Text} >
                      Groceries
                     </Typography>
                  </a>
                </Grid>
                <Grid item xs={4}>
                  <a href="/electronics" className={classes.link} > 
                      <img alt="category" className={classes.category1} src={Electronics} />
                      <Typography variant="h5" className={classes.Text} >
                      Electronics
                     </Typography>
                  </a>
                </Grid>
                <Grid item xs={4}>
                    <a href="/clothing" className={classes.link}>
                        <img alt="category" className={classes.category1} src={Clothing} />
                        <Typography variant="h5" className={classes.Text} >
                        Clothing
                     </Typography>
                    </a>
                </Grid>
            </Grid>
            <Grid xs={12} container justify="center" alignItems="center" >
                <Grid item xs={4}>
                    <a href="/toys-and-games" className={classes.link}>
                        <img alt="category" className={classes.category1} src={ToysAndGames} />
                        <Typography variant="h5" className={classes.Text} >
                        Toys and Games
                     </Typography>
                    </a>
                </Grid>
                <Grid item xs={4}>
                    <a href="/pets" className={classes.link}>
                        <img alt="category" className={classes.category1} src={Pets} />
                        <Typography variant="h5" className={classes.Text} >
                        Pets
                     </Typography>
                    </a>
                </Grid>
                <Grid item xs={4}>
                    <a href="/miscellaneous" className={classes.link}>
                        <img alt="category" className={classes.category1} src={Miscellaneous} />
                        <Typography variant="h5" className={classes.Text} >
                        Miscellaneous
                     </Typography>
                    </a>
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
