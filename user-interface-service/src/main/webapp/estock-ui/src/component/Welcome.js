import React, {Component} from "react";

class Welcome extends Component {

    render() {
        return (
            <div>
                <nav>
                    <input type="checkbox" id="check"/>
                    <label for="check" className="checkBtn">
                        <i className="fas fa-bars"/>
                    </label>
                    <label className="logo">EStock</label>
                    <ul>
                        <li><a href="https://www.w3schools.com">Home</a></li>
                        <li><a href="https://www.w3schools.com">About</a></li>
                        <li><a href="https://www.w3schools.com">Services</a></li>
                        <li><a href="https://www.w3schools.com">Contact</a></li>
                        <li><a href="https://www.w3schools.com">Sign in</a></li>
                    </ul>
                </nav>
                <div className="content">
                    <h2>A New Way to Invest</h2>
                    <p>EStock is the best platform to help you analyse the latest stock trends
                        and decide the stock through which you can grow your wealth.</p>

                    <button className="createAccount">Create Account ></button>
                </div>
            </div>
        );
    }
}

export default Welcome