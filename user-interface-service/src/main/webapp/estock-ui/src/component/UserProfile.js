import React, {Component} from "react"
import {Link} from "react-router-dom";
import {Chart} from "react-chartjs-2";
import Table from 'react-bootstrap/Table'

/**
 {
    "customerId": 10,
    "customerName": "Vinayak Chaturvedi",
    "password": "root",
    "emailId": "vinayak.chaturvedi96@gmail.com",
    "contactNumber": "9406926901",
    "tradingAccount": 10001,
    "tradeList": [
        {
            "tradeId": 23,
            "tradeDate": "2021-04-11T00:24:10",
            "settlementDate": "2021-04-13T00:24:10",
            "quantity": 100,
            "price": 26085.000000000004,
            "commission": 50.0,
            "netAmount": 2608550.0000000005,
            "customer": null,
            "settled": true,
            "side": "BUY"
        },
        {
            "tradeId": 24,
            "tradeDate": "2021-04-21T15:19:00",
            "settlementDate": "2021-04-23T15:19:00",
            "quantity": 2,
            "price": 4568.02,
            "commission": 50.0,
            "netAmount": 9186.04,
            "customer": null,
            "settled": false,
            "side": "BUY"
        },
        {
            "tradeId": 25,
            "tradeDate": "2021-04-21T15:19:09",
            "settlementDate": "2021-04-23T15:19:09",
            "quantity": 5,
            "price": 690.5500000000001,
            "commission": 50.0,
            "netAmount": 3502.7500000000005,
            "customer": null,
            "settled": false,
            "side": "BUY"
        },
        {
            "tradeId": 26,
            "tradeDate": "2021-04-21T15:19:17",
            "settlementDate": "2021-04-23T15:19:17",
            "quantity": 10,
            "price": 1381.1000000000001,
            "commission": 50.0,
            "netAmount": 13861.000000000002,
            "customer": null,
            "settled": false,
            "side": "BUY"
        },
        {
            "tradeId": 27,
            "tradeDate": "2021-04-21T15:19:27",
            "settlementDate": "2021-04-23T15:19:27",
            "quantity": 30,
            "price": 21719.7,
            "commission": 50.0,
            "netAmount": 651641.0,
            "customer": null,
            "settled": false,
            "side": "BUY"
        },
        {
            "tradeId": 28,
            "tradeDate": "2021-04-21T15:19:47",
            "settlementDate": "2021-04-23T15:19:47",
            "quantity": 60,
            "price": 15795.599999999999,
            "commission": 50.0,
            "netAmount": 947785.9999999999,
            "customer": null,
            "settled": false,
            "side": "SELL"
        },
        {
            "tradeId": 29,
            "tradeDate": "2021-04-21T15:20:13",
            "settlementDate": "2021-04-23T15:20:13",
            "quantity": 28,
            "price": 93511.32,
            "commission": 50.0,
            "netAmount": 2618366.96,
            "customer": null,
            "settled": false,
            "side": "BUY"
        },
        {
            "tradeId": 30,
            "tradeDate": "2021-04-21T15:20:27",
            "settlementDate": "2021-04-23T15:20:27",
            "quantity": 20,
            "price": 45680.200000000004,
            "commission": 50.0,
            "netAmount": 913654.0000000001,
            "customer": null,
            "settled": false,
            "side": "BUY"
        }
    ],
    "stockList": [
        {
            "stockId": 9,
            "stockName": "MSFT",
            "totalAvailableQuantity": 40,
            "soldQuantity": 60,
            "boughtQuantity": 100,
            "amountSpent": 2608550.0000000005,
            "amountEarned": 947785.9999999999,
            "profit": 0.0,
            "loss": 0.0,
            "customer": null
        },
        {
            "stockId": 10,
            "stockName": "GOOGL",
            "totalAvailableQuantity": 22,
            "soldQuantity": 0,
            "boughtQuantity": 22,
            "amountSpent": 922840.0400000002,
            "amountEarned": 0.0,
            "profit": 0.0,
            "loss": 0.0,
            "customer": null
        },
        {
            "stockId": 11,
            "stockName": "AAPL",
            "totalAvailableQuantity": 15,
            "soldQuantity": 0,
            "boughtQuantity": 15,
            "amountSpent": 17363.750000000004,
            "amountEarned": 0.0,
            "profit": 0.0,
            "loss": 0.0,
            "customer": null
        },
        {
            "stockId": 12,
            "stockName": "TSLA",
            "totalAvailableQuantity": 30,
            "soldQuantity": 0,
            "boughtQuantity": 30,
            "amountSpent": 651641.0,
            "amountEarned": 0.0,
            "profit": 0.0,
            "loss": 0.0,
            "customer": null
        },
        {
            "stockId": 13,
            "stockName": "AMZN",
            "totalAvailableQuantity": 28,
            "soldQuantity": 0,
            "boughtQuantity": 28,
            "amountSpent": 2618366.96,
            "amountEarned": 0.0,
            "profit": 0.0,
            "loss": 0.0,
            "customer": null
        }
    ]
}
 */
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: this.props.location.customer,
            isLoading: true,
            ownedStockName: [],
            queriedStock: "",
            queriedStockAvailableQuantity: 0,
            stockDetails: {},
            tradeDetails: [],
            topStocksOwnedChart: undefined,
            stockActivityChart: undefined,
        }
        this.logout = this.logout.bind(this);
        this.retrieveCustomer = this.retrieveCustomer.bind(this);
        this.showGraph = this.showGraph.bind(this);
        this.showStockActivity = this.showStockActivity.bind(this);
        this.updateStockOwnedName = this.updateStockOwnedName.bind(this);
    }

    componentDidMount() {
        if (this.state.customer === undefined) {
            if (localStorage.getItem('customer') === null) {
                this.props.history.push({
                    pathname: '/Error404',
                    message: 'Empty customer found'
                });
            }
            this.setState({
                customer: JSON.parse(localStorage.getItem('customer')),
            }, () => this.retrieveCustomer())
        } else {
            localStorage.setItem('customer', JSON.stringify(this.state.customer));
            this.setState({}, () => this.retrieveCustomer())
        }
    }

    async retrieveCustomer() {
        let response = await fetch('/customer/getCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                emailId: this.state.customer.emailId,
            })
        });

        let status = response.status;
        if (status === 200) {
            this.setState({
                customer: await response.json(),
                isLoading: false
            }, () => this.updateStockOwnedName());
        } else {
            this.props.history.push({
                pathname: '/Error404',
                message: 'Backend server is down'
            });
        }
    }

    updateStockOwnedName() {
        let stockOwnedNameTemp = []
        let stockDetailsTemp = {}
        let tradeDetailsTemp = []
        stockOwnedNameTemp.push("Select the stock");
        for (let i = 0; i < this.state.customer.stockList.length; i++) {
            stockOwnedNameTemp.push(this.state.customer.stockList[i].stockName);
            stockDetailsTemp[this.state.customer.stockList[i].stockName] = this.state.customer.stockList[i];
        }

        for (let i = 0; i < this.state.customer.tradeList.length; i++) {
            tradeDetailsTemp.push(this.state.customer.tradeList[i]);
        }

        this.setState({
                ownedStockName: stockOwnedNameTemp,
                stockDetails: stockDetailsTemp,
                tradeDetails: tradeDetailsTemp
            }, () => this.showGraph()
        )
    }

    showGraph() {
        let stocksOwned = []
        let availableQuantity = []

        for (let i = 0; i < Math.min(5, this.state.customer.stockList.length); i++) {
            stocksOwned.push(this.state.customer.stockList[i].stockName);
            availableQuantity.push(this.state.customer.stockList[i].totalAvailableQuantity);
        }

        let ctx = document.getElementById("top_stocks_owned").getContext('2d');
        let oldTopStocksOwnedChart = this.state.topStocksOwnedChart;
        if (oldTopStocksOwnedChart !== undefined) {
            oldTopStocksOwnedChart.destroy()
        }

        let currTopStocksOwnedChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: stocksOwned,
                datasets: [
                    {
                        label: "Available quantity",
                        data: availableQuantity,
                        backgroundColor: 'rgb(59,62,69)',
                        barThickness: 80
                    }
                ],
            },
            options: {
                legend: {
                    labels: {
                        fontColor: 'rgb(255,255,255)',
                        fontSize: 15
                    }
                },
                title: {
                    display: true,
                    fontColor: 'rgb(255,255,255)',
                    fontSize: 26,
                    text: "Top Stocks Owned",
                },

                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: 'rgb(255,255,255)',
                            fontSize: 16,
                            beginAtZero: true
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: 'rgb(255,255,255)',
                            fontSize: 16,
                        },
                    }]
                }

            }
        });

        this.setState({
            topStocksOwnedChart: currTopStocksOwnedChart
        })
        this.showStockActivity();
    }

    showStockActivity(event) {
        if (event === undefined) return;

        const {name, value} = event.target
        this.setState({
            [name]: value
        })
        if (value === "Select the stock") return;

        let queriedStock = value;
        let stock = undefined;
        let quantity = [];
        let chartColors = ["#0de368", "#e34545"];
        this.setState({
            queriedStockAvailableQuantity: this.state.stockDetails[value].totalAvailableQuantity
        });

        for (let i = 0; i < this.state.customer.stockList.length; i++) {
            if (this.state.customer.stockList[i].stockName === queriedStock) {
                stock = this.state.customer.stockList[i];
                quantity.push(this.state.customer.stockList[i].boughtQuantity)
                quantity.push(this.state.customer.stockList[i].soldQuantity)
                break;
            }
        }

        let ctx = document.getElementById("stock_activity").getContext('2d');
        let oldStockActivityChart = this.state.stockActivityChart;
        if (oldStockActivityChart !== undefined) {
            oldStockActivityChart.destroy()
        }

        let currStockActivityChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Bought Quantity", "Sold Quantity"],
                datasets: [
                    {
                        label: "Quantity",
                        data: quantity,
                        backgroundColor: chartColors,
                    }
                ],
            },
            options: {
                legend: {
                    labels: {
                        fontColor: 'rgb(255,255,255)',
                        fontSize: 15
                    }
                },
                title: {
                    display: true,
                    fontColor: 'rgb(255,255,255)',
                    fontSize: 26,
                    text: queriedStock + " Activity BreakUp",
                },

            }
        });

        this.setState({
            stockActivityChart: currStockActivityChart
        })

    }

    logout() {
        localStorage.removeItem('customer');
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div/>
            )
        }

        const stockList = this.state.ownedStockName.map(item => <option value={item}>
            {item}
        </option>)

        console.log(this.state.tradeDetails)
        const tradeList = this.state.tradeDetails.map(
            item => <tr>
                <td>{item.tradeId}</td>
                <td>{item.tradeDate}</td>
                <td>{item.settlementDate}</td>
                <td>{item.side}</td>
                <td>{item.quantity}</td>
                <td>{item.netAmount}</td>
                <td>{item.settled ? "Yes" : "No"}</td>
            </tr>
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
                            <li><Link to="/Dashboard">Home</Link></li>
                            <li><Link to="/About">About</Link></li>
                            <li><Link to="/Contact">Contact</Link></li>
                            <li><Link to="/" onClick={this.logout}>Logout</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="UserProfile">
                    <h2>Welcome back! {this.state.customer.customerName},</h2>
                    <div className="container">
                        <div className="item">
                            <canvas
                                id={"top_stocks_owned"}
                            />
                        </div>
                        <div className="item">
                            <div
                                className="stockList">
                                <select
                                    defaultValue="MSFT"
                                    name="queriedStock"
                                    value={this.state.queriedStock}
                                    onChange={this.showStockActivity}
                                >
                                    {stockList}
                                </select>
                                <br/>
                                <label
                                    style={{display: this.state.queriedStockAvailableQuantity !== 0 ? "block" : "none"}}
                                >Available Quantity: {this.state.queriedStockAvailableQuantity}</label>
                            </div>
                            <canvas
                                id={"stock_activity"}
                            />
                        </div>
                        <div className="item">
                            <div className="tradeDetails">
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Trade Id</th>
                                        <th>Trade Date</th>
                                        <th>Settlement Date</th>
                                        <th>Side</th>
                                        <th>Quantity</th>
                                        <th>NetAmount</th>
                                        <th>Is Settled</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {tradeList}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile