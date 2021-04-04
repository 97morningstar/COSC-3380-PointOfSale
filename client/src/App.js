import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import ResetPage from "./components/ResetPassword/ResetPage";
import Signup from "./components/Signup/Signup";
import AccountInfo from "./components/AccountInfo/AccountInfo";
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import ReportBug from "./pages/ReportBug/ReportBug";
/* Categories Routes */
import Categories from "./pages/Categories/Categories";
import Women from "./pages/Categories/women";
import Men from "./pages/Categories/men";
import Sportswear from "./pages/Categories/sportwear";
import Electronics from "./pages/Categories/electronics";
import Shoes from "./pages/Categories/shoes";
import Groceries from "./pages/Categories/groceries";


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
        <Route path="/women" component={Women} />
        <Route path="/men" component={Men} />
        <Route path="/sportswear" component={Sportswear} />
        <Route path="/electronics" component={Electronics} />
        <Route path="/shoes" component={Shoes} />
        <Route path="/groceries" component={Groceries} />



        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
