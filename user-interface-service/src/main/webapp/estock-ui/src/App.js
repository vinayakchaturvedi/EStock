import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import HomePage from "./component/HomePage";
import Welcome from "./component/Welcome";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import DashBoard from "./component/Dashboard";
import ExtendedStockView from "./component/ExtendedStockView";
import BuyStock from "./component/BuyStock";
import Error404 from "./component/Error404";
import GeneratePDF from "./component/GeneratePDF"

class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path='/' component={Welcome}>
                </Route>
                <Route exact path="/SignIn" component={SignIn}>
                </Route>
                <Route exact path="/SignUp" component={SignUp}>
                </Route>
                <Route exact path="/HomePage" component={HomePage}>
                </Route>
                <Route exact path="/DashBoard" component={DashBoard}>
                </Route>
                <Route exact path="/ExtendedStockView" component={ExtendedStockView}>
                </Route>
                <Route exact path="/BuyStock" component={BuyStock}>
                </Route>
                <Route exact path="/Error404" component={Error404}>
                </Route>
                <Route exact path = "/GeneratePDF" component={GeneratePDF}>
                </Route>
            </Router>
        )
    }
}

export default App;
