import React, {Component} from "react";
import {Chart} from "react-chartjs-2";
import {Link} from "react-router-dom";

class GenerateGraph extends Component {

    constructor(props) {
        super();
        this.state = {
            stockName: props.name,
            numberOfDays: props.numberOfDays,
            isLoading: false,
            apiOutput: {},
        }

        this.showChart = this.showChart.bind(this)
    }

    async componentDidMount() {
        this.setState({
            isLoading: true
        })

        this.setState({
                apiOutput: await require('../data_and_config/TS_Daily/' + this.state.stockName + '.json'),
                isLoading: false
            }
        )

        Date.prototype.yyyymmdd = function () {
            let mm = this.getMonth() + 1; // getMonth() is zero-based
            let dd = this.getDate();

            return [this.getFullYear(), '-',
                (mm > 9 ? '' : '0') + mm, '-',
                (dd > 9 ? '' : '0') + dd
            ].join('');
        };

        this.showChart(this.state.numberOfDays);
    }

    showChart(numberOfDays) {
        let open = []
        let close = []
        let label = []
        let startDate = Date.parse(this.state.apiOutput["Meta Data"]["3. Last Refreshed"]) - numberOfDays * 86400000

        for (let i = 0; i <= numberOfDays; i++) {
            let curr = new Date(startDate + (i * 86400000))
            let timeSeries = this.state.apiOutput["Time Series (Daily)"]
            if (timeSeries.hasOwnProperty(curr.yyyymmdd())) {
                open.push(timeSeries[curr.yyyymmdd()]["1. open"])
                close.push(timeSeries[curr.yyyymmdd()]["4. close"])
                label.push(curr.yyyymmdd())
            }
        }

        let ctx = document.getElementById(this.state.stockName).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: label,
                datasets: [
                    {
                        label: "OPEN",
                        backgroundColor: 'rgb(227,139,65)',
                        borderColor: 'rgb(0,99,132)',
                        data: open
                    },
                    {
                        label: "CLOSE",
                        backgroundColor: 'rgb(158,230,32)',
                        borderColor: 'rgb(237,9,59)',
                        data: close
                    }
                ],
            },
            options: {
                legend: {
                    labels: {
                        fontColor: 'rgb(0,0,0)',
                    }
                },
                title: {
                    display: true,
                    fontColor: 'blue',
                    fontSize: 16,
                    text: this.state.apiOutput["Meta Data"]["2. Symbol"],
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: 'rgb(0,0,0)',
                            fontSize: 16,
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: 'rgb(0,0,0)',
                            fontSize: 16,
                        },
                    }]
                }

            }
        })
    }

    render() {
        return (
            <div style={{display: this.state.isLoading ? "none" : "block"}}>
                <canvas
                    id={this.state.stockName}
                />
                <Link to={{
                    pathname: "/ExtendedStockView",
                    stockName: this.state.stockName
                }}> View Details</Link>
            </div>
        );
    }
}

export default GenerateGraph