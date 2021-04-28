import React, {Component} from "react";
import {Link} from "react-router-dom";
import contact_us from '../contact_us.png';
import email from '../email.png';

class Contact extends Component {

    render() {
        return (
            <div className="AboutContact">
                <body>
                <nav>
                    <input type="checkbox" id="check"/>
                    <label htmlFor="check" className="checkBtn">
                        <i className="fas fa-bars"/>
                    </label>
                    <label className="logo">EStock</label>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/About">About</Link></li>
                        <li><Link to="/Contact">Contact</Link></li>
                        <li><Link to="/SignIn">Sign in</Link></li>
                        <li className="createAccountShort"><Link to="/SignUp">Create Account</Link></li>
                    </ul>
                </nav>
                <div className="About">
                    <div className="container">
                        <div className="item">
                            <h1>Vinayak Chaturvedi</h1>
                            <br/>
                            <div className="contact">
                                <img src={contact_us}/>
                            </div>
                            <div className="contact">
                                <p>9406926901</p>
                            </div>
                            <div className="contact">
                                <img src={email}/>
                            </div>
                            <div className="contact">
                                <p>vinayak.chaturvedi96@gmail.com</p>
                            </div>
                        </div>
                        <div className="item">
                            <h1>Shubhi Maheshwari</h1>
                            <br/>
                            <div className="contact">
                                <img src={contact_us}/>
                            </div>
                            <div className="contact">
                                <p>9424542771</p>
                            </div>
                            <div className="contact">
                                <img src={email}/>
                            </div>
                            <div className="contact">
                                <p>shubhiMaheshwari@gmail.com</p>
                            </div>
                        </div>
                        <div className="item">
                            <h1>Ankita Paul</h1>
                            <br/>
                            <div className="contact">
                                <img src={contact_us}/>
                            </div>
                            <div className="contact">
                                <p>8017961092</p>
                            </div>
                            <div className="contact">
                                <img src={email}/>
                            </div>
                            <div className="contact">
                                <p>ankitaPaul@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                </body>
            </div>
        )
    }
}

export default Contact