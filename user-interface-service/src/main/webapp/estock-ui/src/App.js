import React, {Component} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import HomePage from "./component/HomePage";
import Welcome from "./component/Welcome";
import SignIn from "./component/SignIn";

class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path='/' component={Welcome}>
                </Route>
                <Route exact path="/signIn" component={SignIn}>
                </Route>
                <Route exact path="/homePage" component={HomePage}>
                </Route>
            </Router>
        )
    }
}

export default App;
