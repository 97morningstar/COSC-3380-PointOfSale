import React,{useState} from "react";
import { AppBar, Toolbar, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import UHLogo from "../../assets/UHLogo.png";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import SearchIcon from "@material-ui/icons/Search";

import SearchBar from "material-ui-search-bar";
//import { use } from "../../../../routes/jwtAuth";

const useStyles = makeStyles((theme) => ({
  
  bar: {
    background: "#005E86",
    width: "100%",
    color: "#fff"
  },
  words:{
    margin: "10px",
    color: "#fff",
    fontSize: "20px",
    "&:hover": {
      textDecoration: "none",
      color: "#000"
  },
  keywordGrid: {
    width: "100%",
    background: "#fff !important"
  },
  keywordSearch: {
    background: "#fff",
    borderRadius: "10px",
    // objectFit:"contain",
    width: "100%",
    display: "flex-start",
    justifyContent: "center",
    margin: 10,
    marginLeft: theme.spacing(3.0),
  },
  searchButton: {
    display: "flex-start",
    justifyContent: "center",
    margin: 10,
    color: "#b0102a",
    background: "white",
  },
  aligns:{
    paddingTop: "10px",
    
  },
  search:{
    "&.ForwardRef-root-23":{
      height: "15px"
    }
  }
}
  
 
}));

export default function Navbar() {
  const classes = useStyles();
  const [newValue, setValue] = useState("");
  const setNewValue = (e) => {

    setValue({

      ...newValue,

      [e.target.name]: e.target.value,

    });


  };
 // "/search/item/" + newValue
  let history = useHistory();
  const searchValue = (e) =>{
      history.push("/search/" + e);
      history.go(0);
  }
  return (
    <div>
      <React.Fragment>
       
          <Toolbar className={classes.bar}>
        
          <Grid container direction="row"   alignItems="center"  justify="center"> 
                <Grid item xs={1}  className={classes.aligns} >
                <Link href="/" className={classes.words}>
                  Home
                  </Link> 
                  </Grid>
                  <Grid item xs={1}  className={classes.aligns} >
                  <Link href="/categories" className={classes.words}>
                  Categories
                  </Link> 
                 
                  </Grid>
                  <Grid item xs={1}  className={classes.aligns} >
                  
                  </Grid>
              

      
                <Grid item xs={8}  className={classes.search}>
                    <SearchBar
                 style={{
                  height: "40px",
                  boxShadow: "0px",
                  borderRadius: "2px",
                  background: "#ffffff"
                }}
                    value={newValue}
                    onChange={(e) => { 
                      console.log("value?",e)
                      return setNewValue
                    }}
                    onRequestSearch={(e) => {
                      
                      return searchValue(e)
                    }}
                    />
                </Grid>
            </Grid>

          </Toolbar>
    
      </React.Fragment>
    </div>
  );
}
