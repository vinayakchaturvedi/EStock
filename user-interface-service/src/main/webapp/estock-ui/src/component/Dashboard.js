import React, {Component} from "react";
import GenerateGraph from "./GenerateGraph";

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            stocksToShow: [],
            numberOfDays: 0,
            isLoading: true
        }
        this.handleClick = this.handleClick.bind(this)
        this.setStateToFalse = this.setStateToFalse.bind(this)
    }

    async componentDidMount() {

        this.setState({
                stocksToShow: await require('../data_and_config/StockToShow.json')["Stocks"],
                numberOfDays: await require('../data_and_config/StockToShow.json')["NumberOfDays"],
                isLoading: false
            }
        )
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
                        {currCanvas}
                    </div>}
            </div>
        );
    }

}

export default Dashboard