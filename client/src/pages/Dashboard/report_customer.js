import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import Navbarnavigation from "../../components/NavbarNavigation/Navbar";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

/* Images */
import slogan from "../../assets/_Logo (1).png";
/* Categories Images */
/* Categories Images */

import Footer from "../../components/Footer/Footer";

import back from "../../assets/background1.jpg";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

/* Charts */
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesCanvas,
    LabelSeries, Hint, RadialChart
} from 'react-vis';


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
    space: {
        padding: "30px"
    },
    circle: {
   
        position: "relative !important"
    
}


}));
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment >
            <StyledTableRow className={classes.root}>
                <StyledTableCell>
                   
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                    {row.first_name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.join_date}</StyledTableCell>
                <StyledTableCell align="right">{row.store_name}</StyledTableCell>
            </StyledTableRow>
        </React.Fragment>
    );
}
Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        //name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};
function CollapsibleTable({ rows }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell />
                        <StyledTableCell>Full Name</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Join Date</StyledTableCell>
                        <StyledTableCell align="right">Store Name</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.item_id} row={row} />

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}


function Home() {
    const classes = useStyles();
    const theme = createMuiTheme();
    const data = {
        jwtToken: localStorage.getItem("token"),
        user_id: localStorage.getItem("user_id"),
        is_employee: localStorage.getItem("is_employee"),
        start_date: "2019-01-16",
        store_id_fk: "2",
        end_date: "2021-04-16"
    }
    const [valueRow, setValue] = useState(null);
    const [top_10_by_quantityChart, setTop_10_by_quantityChart] = useState([]);
    const [top_10_by_quantityTable, setTop_10_by_quantityTable] = useState([]);

    const [top_10_by_total_costChart, setTop_10_by_total_costChart] = useState([]);
    const [top_10_by_total_costRadial, setTop_10_by_total_costRadial] = useState([]);

    const [all_customers_by_timeFrame, setAll_customers_by_timeframe] = useState([]);

    let history = useHistory();
    useEffect(() => {
        if (data.is_employee === "true") {
            axios.post("http://localhost:4000/get_all_customers_by_time_frame", data)
                .then((res) => {


                    const row = res.data.map((index, i) => {

                        return { x: index.name, y: parseInt(index.quantity) };
                    })
                    setAll_customers_by_timeframe(res.data);
                    //setTop_10_by_quantityChart(row);
                    //setTop_10_by_quantityTable(res.data)

                    // console.log("first", res.data);
                })
                .catch((err) => {
                    console.log(err.response);
                });

/*
            axios.post("http://localhost:4000/get_top_10_items_by_total_cost", data)
                .then((res) => {


                    const row = res.data.map((index, i) => {

                        return { x: index.name, y: parseFloat(index.total_cost) };
                    })
                    const rowRadial = res.data.map((index, i) => {

                        return { label: index.name, angle: parseFloat(index.total_cost) };
                    })
                    //setTop_10_by_total_costChart(row);
                    //setTop_10_by_total_costRadial(rowRadial);
                    setAll_customers_by_timeframe(res.data);

                    // console.log("oh", res.data);
                })
                .catch((err) => {
                    console.log(err.response);
                });
*/


        }
        else {
            history.push("/login");
        }



    }, []);

    const handleSet = (e) => {
        setValue(e)
        console.log("w", e);
    }

    const handleSet2 = (v) => {
        setValue(null)
    }



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


                    </Grid>
                    <Navbarnavigation />
                    <Grid item xs={12} className={classes.space}>
                        Time Frame: "date" to "date" <br></br>
                        Store: "store name"<br></br>
                        Amount of New Customers: "number"<br></br>
                        Avg New customers per day: "number"<br></br>
                        Amount of Total Customers: "number"<br></br>
                        Percentage Increase in this time frame: "number"<br></br>
                        </Grid>
                    <Grid item xs={12} className={classes.space}>
                        <Grid item xs={12} className={classes.space}>
                            <Typography variant="h4" component="h4" gutterBottom>
                                New Customers
                        </Typography>

                                    <CollapsibleTable rows={all_customers_by_timeFrame} />

                        </Grid>

                        
                    </Grid>

                    <Footer />
                </Grid>
            </React.Fragment>
        </div>
    );
}
export default Home;
