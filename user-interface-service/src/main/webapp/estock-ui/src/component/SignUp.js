import React, {Component} from "react";
import {Link} from "react-router-dom";

class SignUp extends Component {

    constructor(props) {
        super();

        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            contactNumber: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    async handleSubmit(event) {
        event.preventDefault(); //why
        event.stopPropagation(); //why

        let response = await fetch('/customer/registerCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': '*/*'
            },

            body: JSON.stringify({
                customerName: this.state.firstName + " " + this.state.lastName,
                password: this.state.password,
                emailId: this.state.email,
                contactNumber: this.state.contactNumber,
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
                    <body>
                    <div className="register">
                        <h1>Create an account</h1>
                        <p>Already have an account?<Link to="/SignIn"> Sign in</Link></p>
                    </div>
                    <div className="main">
                        <form onSubmit={this.handleSubmit}>
                            <div id="name">
                                <h2 className="name">Name</h2>
                                <input
                                    type="text"
                                    name="firstName"
                                    required="True"
                                    className="firstName"
                                    placeholder="First Name"
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                />
                                <br/>
                                <label className="firstLabel">First Name: </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="lastName"
                                    placeholder="Last Name"
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                />
                                <label className="lastLabel">Last Name: </label>
                            </div>
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
                            <h2 className="name">Phone</h2>
                            <input
                                type="number"
                                name="contactNumber"
                                required="True"
                                className="contactNumber"
                                placeholder="Contact Number"
                                value={this.state.contactNumber}
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
                            <button className="registerButton">Register</button>
                        </form>
                    </div>
                    </body>
                </div>
            </div>
        );
    }
}

export default SignUp