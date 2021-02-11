import React, {Component} from "react";
import GenerateGraph from "./GenerateGraph";

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
    }

    async componentDidMount() {

        console.log("Inside component did mount")
        this.setState({
                stocksToShow: await require('../data_and_config/StockToShow.json')["Stocks"],
                numberOfDays: await require('../data_and_config/StockToShow.json')["NumberOfDays"],
                isLoading: false
            }
        )
        if (this.state.customer === undefined) {
            this.setState({
                customer: JSON.parse(localStorage.getItem('customer'))
            }, () => this.updateCustomerName())
        } else {
            localStorage.setItem('customer', JSON.stringify(this.state.customer));
            this.updateCustomerName();
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

    render() {
        console.log("Inside Render")
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
            <div className="stock">
                {this.state.isLoading ? this.setStateToFalse() :
                    <div>
                        <h1 style={{display: this.state.customer === undefined ? "none" : "block"}}>
                            Welcome {this.state.customerName}</h1>
                        {currCanvas}
                    </div>}
            </div>
        );
    }

}

export default Dashboard