import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import ResetPage from "./components/ResetPassword/ResetPage";
import Signup from "./components/Signup/Signup";
import NotFound from "./pages/NotFound/NotFound";
/* Categories Routes */
import Categories from "./pages/Categories/Categories";
import Miscellaneous from "./pages/Categories/miscellaneous";
import ToysAndGames from "./pages/Categories/toysandgames";
import Clothing from "./pages/Categories/clothing";
import Electronics from "./pages/Categories/electronics";
import Pets from "./pages/Categories/pets";
import Groceries from "./pages/Categories/groceries";
import Search from "./pages/Categories/search";
import Dash from "./pages/Dashboard/empDash";
import empTables from "./pages/Dashboard/EmployeeTable"
import inventoryDash from "./pages/Dashboard/inventory"
import customerDash from "./pages/Dashboard/customer"
import reportsDash from "./pages/Dashboard/reports"
import supportDash from "./pages/Dashboard/support"
import transactionDash from "./pages/Dashboard/transaction"

import Profile from "./pages/CustomerProfile/CustomerProfile";
import Item from "./pages/Item/Item";
import Cart from "./pages/Cart/cart";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import Account from "./pages/Account/Account";


import Report_3 from "./pages/Dashboard/Report_3"
import Report_customer from "./pages/Dashboard/report_customer"
import Report_profit from "./pages/Dashboard/report_profit"
import Report_dash from "./pages/Dashboard/report_dash"





import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/lost-password" component={ResetPage} />
        <Route path="/signup" component={Signup} />

        <Route path="/categories" component={Categories} />
        <Route path="/miscellaneous" component={Miscellaneous} />
        <Route path="/toys-and-games" component={ToysAndGames} />
        <Route path="/clothing" component={Clothing} />
        <Route path="/electronics" component={Electronics} />
        <Route path="/pets" component={Pets} />
        <Route path="/groceries" component={Groceries} />
        <Route path="/profile" component={Profile} />
        <Route path="/search/:name" component={Search} />
        <Route path="/dash" component={Dash} />
        <Route path="/employee" component={empTables} />
        <Route path="/customer" component={customerDash} />
        <Route path="/inventory" component={inventoryDash} />
        <Route path="/reports" component={reportsDash} />
        <Route path="/transaction" component={transactionDash} />
        <Route path="/support" component={supportDash} />
        <Route path="/account" component={Account} />


        <Route path="/item/:name" render={(props) => <Item {...props} key={Date.now()}/>} />
        <Route path="/cart" component={Cart} />
        <Route path="/order-history" component={OrderHistory} />


        <Route path="/report_3" component={Report_3} />
        <Route path="/report_customer" component={Report_customer} />
        <Route path="/report_profit" component={Report_profit} />
        <Route path="/report_dash" component={Report_dash} />


        



        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
