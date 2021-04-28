import React, {Component} from "react";
import {Link} from "react-router-dom";

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        let response = await fetch('/customer/validateLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                emailId: this.state.email,
                password: this.state.password
            })
        });
        let status = response.status;
        if (status === 200) {
            this.props.history.push({
                pathname: '/DashBoard',
                customer: await response.json()
            });
        } else if (status === 404) {
            this.setState({
                errorMessage: true
            })
        } else {
            this.props.history.push({
                pathname: '/Error404',
                message: 'Backend server is down'
            });
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    render() {
        return (
            <div>
                <div className="NAV">
                    <nav>
                        <input type="checkbox" id="check"/>
                        <label htmlFor="check" className="checkBtn">
                            <i className="fas fa-bars"/>
                        </label>
                        <label className="logo">EStock</label>
                        <ul>
                            <li><Link to="/">Welcome</Link></li>
                            <li><Link to="/About">About</Link></li>
                            <li><Link to="/Contact">Contact</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="SignUp">
                    <div className="register">
                        <h1>Enter your Credentials</h1>
                        <p>New at the portal?<Link to="/SignUp"> Sign Up</Link></p>
                    </div>
                    <div className="main">
                        <form onSubmit={this.handleSubmit}>
                            <h2 className="name">Email Address</h2>
                            <input
                                type="email"
                                name="email"
                                required="True"
                                className="email"
                                placeholder="Email address"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            <br/>
                            <h2 className="name">Password</h2>
                            <input
                                type="password"
                                name="password"
                                required="True"
                                className="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            <h3 style={{display: this.state.errorMessage ? "block" : "none", color: "white"}}>Incorrect
                                Username/Password</h3>
                            <button className="registerButton" disabled={!this.validateForm}>Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

export default SignIn