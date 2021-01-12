import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import HomePage from "./component/HomePage";
import Welcome from "./component/Welcome";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";

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
            </Router>
        )
    }
}

export default App;
