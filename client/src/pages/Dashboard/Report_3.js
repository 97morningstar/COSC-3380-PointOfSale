import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import Navbarnavigation from "../../components/NavbarNavigation/Navbar";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Select, MenuItem } from "@material-ui/core";
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
import SearchIcon from '@material-ui/icons/Search';

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

    },
    selectStore:{
        width: "50%"
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
                    {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.brand}</StyledTableCell>
                <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                <StyledTableCell align="right">{row.selling_price}</StyledTableCell>
                <StyledTableCell align="right">{row.total_cost}</StyledTableCell>
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
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Brand</StyledTableCell>
                        <StyledTableCell align="right">Quantity</StyledTableCell>
                        <StyledTableCell align="right">Selling Price</StyledTableCell>
                        <StyledTableCell align="right">Total Cost</StyledTableCell>
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
        is_employee: localStorage.getItem("is_employee")
    }
    const [valueRow, setValue] = useState(null);
    const [top_10_by_quantityChart, setTop_10_by_quantityChart] = useState([]);
    const [top_10_by_quantityTable, setTop_10_by_quantityTable] = useState([]);

    const [top_10_by_total_costChart, setTop_10_by_total_costChart] = useState([]);
    const [top_10_by_total_costRadial, setTop_10_by_total_costRadial] = useState([]);

    const [top_10_by_total_costTable, setTop_10_by_total_costTable] = useState([]);

    let history = useHistory();
    useEffect(() => {
        if (data.is_employee === "true") {
            axios.post("/get_top_10_items_by_quantity", data)
                .then((res) => {


                    const row = res.data.map((index, i) => {

                        return { x: index.name, y: parseInt(index.quantity) };
                    })
                    setTop_10_by_quantityChart(row);
                    setTop_10_by_quantityTable(res.data)

                    // console.log("first", res.data);
                })
                .catch((err) => {
                    console.log(err.response);
                });


            axios.post("/get_top_10_items_by_total_cost", data)
                .then((res) => {


                    const row = res.data.map((index, i) => {

                        return { x: index.name, y: parseFloat(index.total_cost) };
                    })
                    const rowRadial = res.data.map((index, i) => {

                        return { label: index.name, angle: parseFloat(index.total_cost) };
                    })
                    setTop_10_by_total_costChart(row);
                    setTop_10_by_total_costRadial(rowRadial);
                    setTop_10_by_total_costTable(res.data);

                    // console.log("oh", res.data);
                })
                .catch((err) => {
                    console.log(err.response);
                });


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

    const [top_10_by_categoryChart, setTop_10_by_categoryChart] = useState([]);
    const [top_10_by_categoryTable, setTop_10_by_categoryTable] = useState([]);
    const [category, setCategory] = useState({value: "", label: ""});

    const categories = [
        { label: "Groceries", value: 1 },
        { label: "Clothing", value: 2 },
        { label: "Electronics", value: 3 },
        { label: "Pets", value: 4 },
        { label: "Toys and Games", value: 4 },
        { label: "Miscellaneous", value: 5 },

    ]


    const searchCategoryReport = () => {

        const data2 = {
            jwtToken: localStorage.getItem("token"),
            user_id: localStorage.getItem("user_id"),
            is_employee: localStorage.getItem("is_employee"),
            category: category.value
        }

        console.log("e",category.value)

        axios.post("/get_top_10_items_sales_by_Category", data2)
            .then((res) => {

                const row = res.data.map((index, i) => {
                    return { x: index.name, y: parseFloat(index.total_cost) };
                })
                console.log(res.data);
                setTop_10_by_categoryChart(row);
                setTop_10_by_categoryTable(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
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
                    <Grid container item xs={12} className={classes.space} direction="row">
                        <Grid direction="row" item container xs={12} className={classes.space} justify="center"
                              alignItems="center">
                            <Typography variant="h4" component="div" gutterBottom className={classes.text}>
                                Top 10 Items By Quantity Sold
                            </Typography>
                            {top_10_by_quantityChart.length !== 0 ? (
                                <>

                                    <XYPlot color="#ff6358" height={500} width={1300} xType="ordinal" style={{ width: "100%" }} margin={{ left: 100 }}>
                                        <VerticalBarSeries data={top_10_by_quantityChart}

                                        />
                                        <XAxis />
                                        <YAxis title="Quantity Of Items" />

                                    </XYPlot>

                                    <CollapsibleTable rows={top_10_by_quantityTable} />

                                </>
                            ) : (<></>)}
                        </Grid>

                        <Grid container item xs={12} className={classes.space} justify="center"
                              alignItems="center">
                            <Typography variant="h4" component="h4" gutterBottom>
                                Top 10 Items By Total Cost Sold
                          </Typography>
                            {top_10_by_total_costChart.length !== 0 ? (
                                <>
                                    <XYPlot color="#aa46be" height={500} width={1500} xType="ordinal" margin={{ left: 100 }} >
                                        <VerticalBarSeries data={top_10_by_total_costChart}
                                        />

                                        <XAxis />
                                        <YAxis title="Total Cost Of Items" />


                                    </XYPlot>

                                    <RadialChart
                                        data={top_10_by_total_costRadial}
                                        width={300}
                                        height={300}
                                        onValueMouseOver={v => handleSet(v)}
                                        onSeriesMouseOut={v => handleSet2(false)}
                                    >
                                        {valueRow &&
                                            <Hint className={classes.circle} value={valueRow}>
                                                <div style={{ background: 'blue' }}>
                                                    <h3 style={{ color: 'white' }}>Item</h3>
                                                    <p style={{ color: 'white' }}>{valueRow.label}</p>
                                                </div>
                                            </Hint>
                                        }
                                    </RadialChart>

                                    <CollapsibleTable rows={top_10_by_total_costTable} />

                                </>
                            ) : (<></>)}
                        </Grid>

                        <Grid item container xs={12} className={classes.space} justify="center"
                alignItems="center">
                            <Typography variant="h4" component="h4" gutterBottom>
                                Generate Report Sales by Category (Please select a category from the dropdown)
                          </Typography>
                        
                            <Select
                            displayEmpty
                                autoFocus
                                className={`${classes.selectStore} ${classes.information}`}
                                closeMenuOnSelect={true}

                                value={category.value}
                                name="category"
                                onChange={(e) => {
                                    setCategory({value: e.target.value, label: e.target.value });
                                    console.log(e.target.value)
                                }}
                            >
                                <MenuItem value="Electronics">Electronics</MenuItem>
                                <MenuItem value="Clothing">Clothing</MenuItem>
                                <MenuItem value="Groceries">Groceries</MenuItem>
                                <MenuItem value="Toys and Games">Toys and Games</MenuItem>
                                <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
                                <MenuItem value="Pets">Pets</MenuItem>

                            </Select>
                            <Button variant="contained" color="primary" className={classes.button} disableElevation onClick={searchCategoryReport} startIcon={<SearchIcon />}>
                                SEARCH
                             </Button>

                       



                            {top_10_by_categoryChart.length !== 0 ? (
                                <>
                                    <XYPlot height={500} width={1500} xType="ordinal" margin={{ left: 100 }} >
                                        <VerticalBarSeries data={top_10_by_categoryChart}
                                        />

                                        <XAxis />
                                        <YAxis title="Total Cost Of Items" />


                                    </XYPlot>

                                    <CollapsibleTable rows={top_10_by_categoryTable} />

                                </>
                            ) : (<></>)}
                        </Grid>
                    </Grid>

                    <Footer />
                </Grid>
            </React.Fragment>
        </div>
    );
}
export default Home;
