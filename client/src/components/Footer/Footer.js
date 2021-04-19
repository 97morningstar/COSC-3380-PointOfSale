import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" style={{ color: "white", fontWeight: "bold" }}>
      {"Copyright © "}
      <Link color="inherit" href="https://www.uh.edu/">
        COSC 3380 Databases Project Team 4 |
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // minHeight: "60vh",
    width: "100%",
    flex: "1 0 auto",
  },
  rootGrid: {
    flexGrow: 1,
  },
  footer: {
    padding: "1em",
    marginTop: "auto",
    backgroundColor: "#444444",
  },
  footerRelated: {
    color: "#fff",
  },
  footerText: {
    color: "#fff",
  },
  image: {
    width: "50%",
    float: "left",
    objectFit: "contain",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={4}
          className={classes.rootGrid}
        >
          <Grid item xs={3}>
            <img
              className={classes.image}
              alt=""
              src="https://uh.edu/marcom/_images/brand/logo-uh-primary-black.svg"
            ></img>
          </Grid>
          <Grid item xs={3}>
            <Link
              to="/developers"
              href="/developers"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body1" className={classes.footerText}>
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link
              to="/report-bug"
              href="/report-bug"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="body1" className={classes.footerRelated}>
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Copyright />
          </Grid>
        </Grid>
      </footer>
    </div>
  );
}
