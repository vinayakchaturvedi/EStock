import React from "react";
import Pdf from "react-to-pdf";

class BuyStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockName: this.props.location.stockName,
            isLoading: false,
            companyOverview: {},
            currentStockPrice: 0,
            //prevStockPrice: 0,
            quantity: 0,
            commission: 5,
            serialNumber: "#1234",
            accountNumber: "VSA4567",
            customer: this.props.location.customer,
            errorMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.onBuyStock =this.onBuyStock.bind(this);
        this.updateCustomerID = this.updateCustomerID.bind(this)
        this.onSellStock = this.onSellStock.bind(this)
    }
    async onBuyStock(event){
        event.preventDefault();
        event.stopPropagation();


        let response= await fetch('/trade/book',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                customerId:this.state.customerID,
                stockName:this.state.stockName,
                price:(this.state.currentStockPrice + this.state.commission) * this.state.quantity,
                side: 'BUY',
                quantity:this.state.quantity
            })
        });
        let status=response.status;
        if(status==200)
        {
            this.props.history.push({
                pathname:'/DashBoard',
                trade: await response.json()
            })
        }else {
            this.setState({
                errorMessage: true
            })
        }


    }

    async onSellStock(event){
        event.preventDefault();
        event.stopPropagation();


        let response= await fetch('/trade/book',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify({
                customerId:this.state.customerID,
                stockName:this.state.stockName,
                price:(this.state.currentStockPrice + this.state.commission) * this.state.quantity,
                side: 'SELL',
                quantity:this.state.quantity
            })
        });
        let status=response.status;
        if(status==200)
        {
            this.props.history.push({
                pathname:'/DashBoard',
                trade: await response.json()
            })
        }else {
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

    handleClick(event) {
        alert("Money money")

    }

    async callAPIs(event) {
        this.setState({
            currentStockPrice: await require('../data_and_config/CurrentDay/' + this.state.stockName + '.json').c,
            isLoading: true
        })

        this.setState({
                companyOverview: await require('../data_and_config/Company_Overview/' + this.state.stockName + '.json'),
                isLoading: true
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
            this.setState({
                customer: JSON.parse(localStorage.getItem('customer'))
            }, () => this.updateCustomerID())
        } else {
            localStorage.setItem('customer', JSON.stringify(this.state.customer));  ///where // maybe because of this, even without logging in, my
            this.updateCustomerID(); //name is still visible
        }


        // if (localStorage.getItem('prevStockPrice') === null) {
        //     this.setState({
        //         prevStockPrice: this.state.currentStockPrice
        //     })
        // } else {
        //     this.setState({
        //         prevStockPrice: JSON.parse(localStorage.getItem('prevStockPrice'))
        //     })
        // }

    }

    updateCustomerID() {
        this.setState({
            customerID: this.state.customer.customerId
            // customerName: this.state.customer.customerId
        })
    }

    render() {
        const date = new Date()
        const extendedTime = date.getTime() + 2 * 24 * 60 * 60 * 1000;
        const newDate = new Date(extendedTime);
        const tradingDate = date.getDate().toString() + "-" + date.getMonth().toString() + "-" + date.getFullYear().toString()
        const settlementDate = newDate.getDate().toString() + "-" + newDate.getMonth().toString() + "-" + newDate.getFullYear().toString()
        const netAmount = (this.state.currentStockPrice + this.state.commission) * this.state.quantity
        const ref = React.createRef();

        return (
            <div className="buy-stock-page">
                <div className="buy-stock-container">
                    <div className="stock-view-card">
                        <div>
                            <h3 className="companyDetails"> Serial number:</h3>
                            <p className="companyDetails">{this.state.serialNumber} </p>
                        </div>
                        <div>
                            <h3 className="companyDetails"> Account number:</h3>
                            <p className="companyDetails">{this.state.accountNumber} </p>
                        </div>

                    </div>
                </div>
                <div className="buy-stock-container">
                    <div className="stock-view-card">
                        <div ref={ref}>
                            <div>
                                {/*<h3>Hello {this.state.customerID}</h3>*/}
                                <h3 className="companyDetails"> Stock Name:</h3>
                                <p className="companyDetails"> {this.state.stockName} </p>
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
                                    defaultValue={0}
                                    min={0}
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
                        </div>
                        {/*<Pdf targetRef={ref} filename="code-example.pdf">*/}
                        {/*    {({toPdf}) => <button name="buy" onClick={toPdf}>Buy Stock</button>}*/}
                        {/*</Pdf>*/}
                        <div>
                            <button name="buy2" onClick={this.onBuyStock}>BUY STOCK</button>
                        </div>
                        <div>
                            <button name="sell" onClick={this.onSellStock}>SELL STOCK</button>
                        </div>
                        <h3 style={{display: this.state.errorMessage ? "block" : "none"}}>Not Enough Stocks!</h3>

                    </div>
                </div>
            </div>
        )
    }
}


export default BuyStock