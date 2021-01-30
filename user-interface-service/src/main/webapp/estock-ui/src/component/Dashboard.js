import React, {Component} from "react";
import GenerateGraph from "./GenerateGraph";

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            stocksToShow: [],
        }
    }

    async componentDidMount() {

        this.setState({
            isLoading: true
        })
        this.setState({
                stocksToShow: await require('./StockToShow.json')["Stocks"]
            }
        )
    }

    render() {

        let i = 0;
        const currCanvas = this.state.stocksToShow.map(
            stock =>
                <div>
                    <GenerateGraph
                        name={stock}
                        key={i++}
                    />
                </div>
        )

        return (
            <div className="stock">
                {currCanvas}
            </div>
        );
    }
}

export default Dashboard