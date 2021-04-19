import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";
import Navbarnavigation from "../../components/NavbarNavigation/Navbar";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button, Select, MenuItem } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import DatePicker from "react-date-picker";
import SearchIcon from '@material-ui/icons/Search';

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

    },
    selectStore: {
        width: "50%"
    },spaceUp:{
        marginTop: "20px"
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
                    {row.invoice_id}
                </StyledTableCell>
                <StyledTableCell align="right">{row.time_of_transaction.substring(0,10)}</StyledTableCell>
                <StyledTableCell align="right">{row.total_cost_after_tax}</StyledTableCell>
                <StyledTableCell align="right">{row.total_manufacture_cost}</StyledTableCell>
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
                        <StyledTableCell>invoice id</StyledTableCell>
                        <StyledTableCell align="right">Transaction Date</StyledTableCell>
                        <StyledTableCell align="right">Total Cost</StyledTableCell>
                        <StyledTableCell align="right">Total Manufacturing Cost</StyledTableCell>
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

    const [all_invoices_by_timeFrame, setAll_invoices_by_timeframe] = useState([]);

    let history = useHistory();

    const [startDate, setStartDate] = useState(new Date);
    const [endDate, setEndDate] = useState(new Date);
    const [myStore, setMyStore] = useState({ value: "", label: "" });
    const [store, setStore] = useState([]);
    const [salesInfoByTimeFrame, setSalesInfoByTimeFrame] = useState({});
    const [totalSalesInfo, setTotalSalesInfo] = useState({});


    const handleAmountOfNewCustomers = () => {
        const data2 = {
            jwtToken: localStorage.getItem("token"),
            user_id: localStorage.getItem("user_id"),
            is_employee: localStorage.getItem("is_employee"),
            start_date: startDate.toJSON().substring(0, 10),
            store_id_fk: myStore.value,
            end_date: endDate.toJSON().substring(0, 10)
        }
        axios.post("http://localhost:4000/get_total_sales_info", data2)
        .then((res) => {

            console.log("setTotalSalesInfo", res.data)

            const row = res.data.map((index, i) => {

                return { x: index.name, y: parseInt(index.quantity) };
            })
            setTotalSalesInfo(res.data[0]);
            console.log("total", res.data);
        })
        .catch((err) => {
            console.log(err.response);
        });
        axios.post("http://localhost:4000/get_sales_info_by_time_frame", data2)
            .then((res) => {

                console.log("salesInfoByTimeFrame", res.data)

                const row = res.data.map((index, i) => {

                    return { x: index.name, y: parseInt(index.quantity) };
                })
                setSalesInfoByTimeFrame(res.data[0]);
                //setTop_10_by_quantityChart(row);
                //setTop_10_by_quantityTable(res.data)

                console.log("first", res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }

    const handleTimeFrame = () => {

        //   userInput.start_date = userInput.start_date.toJSON().substring(0, 10);
        //    userInput.end_date = userInput.end_date.toJSON().substring(0, 10);

        console.log(startDate.toJSON().substring(0, 10), endDate.toJSON().substring(0, 10))

        const data2 = {
            jwtToken: localStorage.getItem("token"),
            user_id: localStorage.getItem("user_id"),
            is_employee: localStorage.getItem("is_employee"),
            start_date: startDate.toJSON().substring(0, 10),
            store_id_fk: myStore.value,
            end_date: endDate.toJSON().substring(0, 10)
        }

        axios.post("http://localhost:4000/get_all_invoices_by_time_frame", data2)
            .then((res) => {

                console.log("setAll_invoices_by_timeframe", res.data)

                const row = res.data.map((index, i) => {

                    return { x: index.name, y: parseInt(index.quantity) };
                })
                setAll_invoices_by_timeframe(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }


    useEffect(() => {
        if (data.is_employee === "true") {
            axios.get("http://localhost:4000/api/view_all_stores")
                .then((res) => {
                    const data = res.data.map((item, index) => {
                        return {
                            label: item.store_name,
                            value: item.store_id,
                        };
                    });
                    setStore(data)
                    console.log(data)

                })
                .catch((err) => {
                    console.log(err);
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

                        <Grid item xs={6} className={classes.space} direction="row">
                            <Typography variant="h5" component="h5" gutterBottom>
                                Select Start Date
                        </Typography>
                            <DatePicker
                                calendarAriaLabel="Toggle calendar"
                                clearAriaLabel="Clear value"
                                dayAriaLabel="Day"
                                monthAriaLabel="Month"
                                nativeInputAriaLabel="Date"
                                onChange={(e) => {
                                    setStartDate(e);
                                }}
                                value={startDate}
                                yearAriaLabel="Year"
                            />
                        </Grid>
                        <Grid item xs={6} className={classes.space} direction="row">
                            <Typography variant="h5" component="h5" gutterBottom>
                                Select End Date
                        </Typography>
                            <DatePicker
                                calendarAriaLabel="Toggle calendar"
                                clearAriaLabel="Clear value"
                                dayAriaLabel="Day"
                                monthAriaLabel="Month"
                                nativeInputAriaLabel="Date"
                                onChange={(e) => {
                                    setEndDate(e);
                                }}
                                value={endDate}
                                yearAriaLabel="Year"
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.space} direction="row">
                            <Typography variant="h5" component="h5" gutterBottom>
                                Select Store
                        </Typography>
                            <Typography variant="body3" component="body3" gutterBottom>
                                (If you don't select a store you will be shown the total profit margin from every store in the time frame selected)
                        </Typography>
                            <Select
                                autoFocus
                                className={`${classes.selectStore} ${classes.information}`}
                                closeMenuOnSelect={true}

                                value={myStore.value}
                                name="store"
                                onChange={(e) => {
                                    return setMyStore({ value: e.target.value, label: e.target.value });
                                    console.log({ value: e.target.value, label: e.target.value })

                                }}
                            >
                                <MenuItem value={""}></MenuItem>
                                {store.length !== 0 ? (store.map((a) => {
                                    return (
                                        <MenuItem value={a.value}>{a.label}</MenuItem>
                                    )
                                })) : (<></>)}
                            </Select>
                        </Grid>
                        <Grid item xs={12} direction="row">
                            <Button variant="contained" color="primary" className={classes.button} disableElevation onClick={handleTimeFrame} startIcon={<SearchIcon />}>
                                SEARCH
                             </Button>
                        </Grid>








                    </Grid>
                    <Grid item xs={12} className={classes.space}>
                        <Grid item xs={12} >
                            <Typography variant="h4" component="h4" gutterBottom>
                                Calculate Sales info
                        </Typography>
                            <Button variant="contained" color="primary" className={classes.button} disableElevation onClick={handleAmountOfNewCustomers} startIcon={<SearchIcon />}>
                                CALCULATE
                             </Button>
                            {salesInfoByTimeFrame.total_cost && salesInfoByTimeFrame.diff ? (<>
                                <Typography variant="h5" component="div" gutterBottom className={classes.spaceUp}>
                                    Amount of Sales: {salesInfoByTimeFrame.amount_of_sales}
                                </Typography>
                                <Typography variant="h5" component="div" gutterBottom>
                                    Average Cost Per Sale: {(salesInfoByTimeFrame.avg_cost * 1).toFixed(2)}


                                </Typography>
                                <Typography variant="h5" component="div" gutterBottom>
                                    Total Cost of Sales: {(salesInfoByTimeFrame.total_cost * 1 ).toFixed(2)}
                                </Typography>
                                <Typography variant="h5" component="div" gutterBottom>
                                    Total Manufacturing Cost of Sales: {(salesInfoByTimeFrame.total_manufacture_cost * 1 ).toFixed(2)}
                                </Typography>
                                <Typography variant="h5" component="div" gutterBottom>
                                    Total Profit: {(salesInfoByTimeFrame.profit * 1 ).toFixed(2)}
                                </Typography>
                                <Typography variant="h5" component="div" gutterBottom>
                                    Number Of Days: {salesInfoByTimeFrame.diff}
                                </Typography>
                            </>
                            ) : (<></>)}
                        </Grid>
                        
                    </Grid>

                    <Grid item xs={12} className={classes.space}>
                        <Grid item xs={12} className={classes.space}>
                            <Typography variant="h4" component="h4" gutterBottom>
                                New Customers
                        </Typography>

                            <CollapsibleTable rows={all_invoices_by_timeFrame} />

                        </Grid>


                    </Grid>

                    <Footer />
                </Grid>
            </React.Fragment>
        </div>
    );
}
export default Home;
