import React, {Component} from "react";
import GenerateGraph from "./GenerateGraph";
import {Link} from "react-router-dom";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: this.props.location.customer,
            stocksToShow: [],
            numberOfDays: 0,
            isLoading: true
        }
        this.handleClick = this.handleClick.bind(this)
        this.setStateToFalse = this.setStateToFalse.bind(this)
        this.updateCustomerName = this.updateCustomerName.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {

        console.log("Inside component did mount")
        this.setState({
                stocksToShow: await require('../data_and_config/StockToShow.json')["Stocks"],
                numberOfDays: await require('../data_and_config/StockToShow.json')["NumberOfDays"]
            }
        )
        if (this.state.customer === undefined) {
            if (localStorage.getItem('customer') === null) {
                this.props.history.push({
                    pathname: '/Error404',
                    message: 'Backend server is down'
                });
            }

            this.setState({
                customer: JSON.parse(localStorage.getItem('customer')),
                isLoading: false
            }, () => this.updateCustomerName())
        } else {
            localStorage.setItem('customer', JSON.stringify(this.state.customer));  ///where // maybe because of this, even without logging in, my
            this.setState({
                isLoading: false
            }, () => this.updateCustomerName()) //name is still visible
        }
    }

    updateCustomerName() {
        this.setState({
            customerName: this.state.customer.customerName
        })
    }

    handleClick(event) {
        const {value} = event.target
        this.setState({
            isLoading: true,
            numberOfDays: value
        })
    }

    setStateToFalse() {
        this.setState({
            isLoading: false
        })
    }

    logout() {
        localStorage.removeItem('customer');
    }

    render() {
        console.log("Inside Render")
        if (this.state.isLoading) {
            return (
                <div/>
            )
        }
        let currCanvas = this.state.stocksToShow.map(
            (stock, index) =>
                <div>
                    <GenerateGraph
                        name={stock}
                        numberOfDays={this.state.numberOfDays}
                        key={index}
                    />
                </div>
        )


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
                            <li><Link to="/About">About</Link></li>
                            <li><Link to="/Contact">Contact</Link></li>
                            <li><Link to={{
                                pathname: '/UserProfile',
                                customer: this.state.customer
                            }}>Profile</Link></li>
                            <li><Link to="/" onClick={this.logout}>Logout</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="stock">
                    {this.state.isLoading ? this.setStateToFalse() :
                        <div>
                            <h1 style={{display: this.state.customer === undefined ? "none" : "block"}}>
                                Welcome {this.state.customerName}</h1>
                            {currCanvas}
                        </div>}
                </div>
            </div>
        );
    }

}

export default Dashboard
