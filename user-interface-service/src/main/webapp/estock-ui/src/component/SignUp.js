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

    handleSubmit(event) {
        this.props.history.push('/HomePage');
        event.preventDefault()
    }

    render() {
        return (
            <div className="SignUp">
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
            </div>
        );
    }
}

export default SignUp