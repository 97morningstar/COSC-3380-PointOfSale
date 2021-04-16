import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import ResetPage from "./components/ResetPassword/ResetPage";
import Signup from "./components/Signup/Signup";
import AccountInfo from "./components/AccountInfo/AccountInfo";
import NotFound from "./pages/NotFound/NotFound";
import ReportBug from "./pages/ReportBug/ReportBug";
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



import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/lost-password" component={ResetPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/accountInfo" component={AccountInfo} />
        <Route path="/report-bug" component={ReportBug} />

        <Route path="/categories" component={Categories} />
        <Route path="/miscellaneous" component={Miscellaneous} />
        <Route path="/toys-and-games" component={ToysAndGames} />
        <Route path="/clothing" component={Clothing} />
        <Route path="/electronics" component={Electronics} />
        <Route path="/pets" component={Pets} />
        <Route path="/groceries" component={Groceries} />
        <Route path="/profile" component={Profile} />
        <Route path="/search" component={Search} />
        <Route path="/dash" component={Dash} />
        <Route path="/employeeTable" component={empTables} />
        <Route path="/customer" component={customerDash} />
        <Route path="/inventory" component={inventoryDash} />
        <Route path="/reports" component={reportsDash} />
        <Route path="/transaction" component={transactionDash} />
        <Route path="/support" component={supportDash} />

        <Route path="/item/:name" render={(props) => <Item {...props} key={Date.now()}/>} />
        <Route path="/cart" component={Cart} />
        



        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
