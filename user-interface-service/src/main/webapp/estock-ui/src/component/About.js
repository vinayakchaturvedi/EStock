import React, {Component} from "react";
import {Link} from "react-router-dom";

class About extends Component {

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
                    <h2>EStock is an online resource where you can can create an account and then can analyze the stock
                        trend of various
                        NYSE registered stocks and based on the analysis you can buy/sell the stock. For analyzing
                        the stock or company
                        performance various visualizations are available.</h2>
                    <div className="container">
                        <div className="item">
                            <h1>Shubhi Maheshwari</h1>
                            <br/>
                            <p>
                                Shubhi is currently pursuing MTech in CSE at International Institute of Information
                                Technology, Bangalore. She completed her BTech, CSE in the year 2019 at Medi-Caps Institute
                                of Technology and Management Rau, Indore.
                            </p>
                            <br/>
                        </div>
                        <div className="item">
                            <h1>Vinayak Chaturvedi</h1>
                            <br/>
                            <p>
                                Vinayak is currently pursuing MTech in CSE at International Institute of Information
                                Technology, Bangalore. He has 2 years of industry experience, worked as a Java developer
                                at Goldman Sachs and involved in various Financial Institution projects with hands on
                                experience on various devops tools including Docker, Ansible, Kafka, JMS, Jenkins,
                                Gradle, Maven, Version Control (Git, Subversion) and worked on various frameworks
                                including React, Spring rest, Hibernate, and worked on Oracle, Sybase, DB2 RDBMS.
                            </p>
                        </div>
                        <div className="item">
                            <h1>Ankita Paul</h1>
                            <br/>
                            <p>
                                Ankita is currently pursuing MTech in CSE at International Institute of Information
                                Technology, Bangalore. She completed her BTech, CSE in the year 2020 at B.P Poddar
                                Institute of Management and Technology, Kolkata.
                            </p>
                            <br/>
                        </div>
                    </div>
                </div>
                </body>
            </div>
        )
    }
}

export default About