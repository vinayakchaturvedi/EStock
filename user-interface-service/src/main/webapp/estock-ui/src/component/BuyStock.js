import React from "react";
import {Link} from "react-router-dom";

class BuyStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockName: this.props.location.stockName,
            isLoading: false,
            companyOverview: {},
            currentStockPrice: 0,
            //prevStockPrice: 0,
            quantity: 1,
            commission: 5,
            customer: this.props.location.customer,
            errorMessage: false,
            addModalShow: false,
            open: false,
            setOpen: false,
            apiOutput: {},
        }
        this.handleChange = this.handleChange.bind(this)
        this.onBuyStock = this.onBuyStock.bind(this);
        this.updateCustomerID = this.updateCustomerID.bind(this)
        this.onSellStock = this.onSellStock.bind(this)
        this.logout = this.logout.bind(this);
    }

    async onBuyStock(event) {
        event.preventDefault();
        event.stopPropagation();
        let amount = (this.state.currentStockPrice + this.state.commission) * this.state.quantity
        amount = Math.round(amount * 100) / 100

        let response = await fetch('/trade/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                customerId: this.state.customerID,
                stockName: this.state.stockName,
                price: amount,
                side: 'BUY',
                quantity: this.state.quantity
            })
        });
        let status = response.status;

        if (status === 200) {
            this.props.history.push({
                pathname: '/GeneratePDF',
                trade: await response.json(),
                open: this.state.open,
                setOpen: this.state.setOpen,
                stockName: this.state.stockName,
                tradingAccount: this.state.tradingAccount,
                price: this.state.currentStockPrice,
                tradingDate: this.state.tradingDate,
                quantity: this.state.quantity,
                netAmount: amount,
                side: 'BUY',
                customer: this.state.customer
            })

        } else {
            this.setState({
                errorMessage: true
            })
        }


    }

    logout() {
        localStorage.removeItem('customer');
    }

    async onSellStock(event) {
        event.preventDefault();
        event.stopPropagation();

        let amount = this.state.currentStockPrice * this.state.quantity
        amount = Math.round(amount * 100) / 100
        let response = await fetch('/trade/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                customerId: this.state.customerID,
                stockName: this.state.stockName,
                price: amount,
                side: 'SELL',
                quantity: this.state.quantity
            })
        });
        let status = response.status;
        if (status === 200) {
            console.log("Redirecting to generate PDF: ", this.state.stockName);
            this.props.history.push({
                pathname: '/GeneratePDF',
                trade: await response.json(),
                stockName: this.state.stockName,
                tradingAccount: this.state.tradingAccount,
                price: this.state.currentStockPrice,
                tradingDate: this.state.tradingDate,
                quantity: this.state.quantity,
                netAmount: amount,
                side: 'SELL',
                customer: this.state.customer,
                sellAmount: Math.round(this.state.currentStockPrice * this.state.quantity * 100.0) / 100.0
            })
        } else {
            this.setState({
                errorMessage: true
            })
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async callAPIs(event) {
        this.setState({
            currentStockPrice: await require('../data_and_config/CurrentDay/' + this.state.stockName + '.json').c,
            apiOutput: await require('../data_and_config/Company_Overview/' + this.state.stockName + '.json'),
            isLoading: true
        })

        this.setState({
                companyOverview: await require('../data_and_config/Company_Overview/' + this.state.stockName + '.json'),
                isLoading: true,
            }
        )

    }

    async componentDidMount() {
        this.setState({
            isLoading: true
        })
        if (this.state.stockName === undefined) {
            this.setState({
                stockName: JSON.parse(localStorage.getItem('stockName'))
            }, () => this.callAPIs())
        } else {
            localStorage.setItem('stockName', JSON.stringify(this.state.stockName));
            this.callAPIs()
        }
        if (this.state.customer === undefined) {
            if (localStorage.getItem('customer') === null) {
                this.props.history.push({
                    pathname: '/Error404',
                    message: 'Backend server is down'
                });
            }

            this.setState({
                customer: JSON.parse(localStorage.getItem('customer'))
            }, () => this.updateCustomerID())
        } else {
            localStorage.setItem('customer', JSON.stringify(this.state.customer));  ///where // maybe because of this, even without logging in, my
            this.updateCustomerID(); //name is still visible
        }

    }

    updateCustomerID() {
        this.setState({
            customerID: this.state.customer.customerId,
            tradingAccount: this.state.customer.tradingAccount
        })
    }


    render() {
        const date = new Date()
        const extendedTime = date.getTime() + 2 * 24 * 60 * 60 * 1000;
        const newDate = new Date(extendedTime);
        const tradingDate = date.getDate().toString() + "-" + date.getMonth().toString() + "-" + date.getFullYear().toString()
        const settlementDate = newDate.getDate().toString() + "-" + newDate.getMonth().toString() + "-" + newDate.getFullYear().toString()
        let netAmount = (this.state.currentStockPrice + this.state.commission) * this.state.quantity
        netAmount = Math.round(netAmount * 100) / 100
        const ref = React.createRef()
        let sellAmount = netAmount - (this.state.commission * this.state.quantity)
        sellAmount = Math.round(sellAmount * 100) / 100

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
                <div className="buy-stock-page">
                    <div className="buy-stock-contain">
                        <div className="stock-view-card">
                            <div ref={ref}>
                                <div>
                                    {/*<h3 className="companyDetails"> Stock Name:</h3>*/}
                                    <h1 className="companyDetails"
                                        style={{color: "orange", fontSize: '30px'}}>
                                        {this.state.stockName}
                                    </h1>
                                </div>
                                <div className="test">
                                    <h3 className="companyDetails"> Account number:</h3>
                                    <p className="companyDetails">{this.state.tradingAccount} </p>
                                </div>

                                <div>
                                    <h3 className="companyDetails"> Price :</h3>
                                    <p className="companyDetails">{this.state.currentStockPrice}</p>
                                </div>
                                <div>
                                    <h3 className="companyDetails"> Trading Date:</h3>
                                    <p className="companyDetails">{tradingDate}</p>
                                </div>
                                <div>
                                    <h3 className="companyDetails"> Settlement Date:</h3>
                                    <p className="companyDetails">{settlementDate}</p>
                                </div>
                                <div>
                                    <h3 className="companyDetails"> Quantity:</h3>
                                    <input
                                        className="companyDetails"
                                        type="number" name="quantity"
                                        defaultValue={1}
                                        min={1}
                                        onChange={this.handleChange}
                                        style={{blockSize: "1%", width: "10%"}}
                                    />
                                </div>
                                <div>
                                    <h3 className="companyDetails">Commission:</h3>
                                    <p className="companyDetails">${this.state.commission} per share</p>
                                </div>
                                <div>
                                    <h3 className="companyDetails">Net Amount: </h3>
                                    <p className="companyDetails">${netAmount}</p>
                                </div>
                                <div>
                                    <h3 className="companyDetails">Net Selling Amount: </h3>
                                    <p className="companyDetails">${sellAmount}</p>
                                </div>
                                <div>
                                    <button name="buy2" onClick={this.onBuyStock}>Buy Stock</button>
                                </div>
                                <div>
                                    <button name="sell" onClick={this.onSellStock}>Sell Stock</button>
                                </div>
                                <h3 style={{display: this.state.errorMessage ? "block" : "none"}}>Not Enough
                                    Stocks!</h3>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


export default BuyStock
