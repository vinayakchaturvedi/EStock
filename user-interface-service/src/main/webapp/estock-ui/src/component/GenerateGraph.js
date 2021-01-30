import React, {Component} from "react";
import {Chart} from "react-chartjs-2";

class GenerateGraph extends Component {

    constructor(props) {
        super();
        this.state = {
            stockName: props.name,
            isLoading: false,
            apiOutput: {},
            label: "",
        }
    }

    async componentDidMount() {
        console.log(this.state.stockName)
        this.setState({
            isLoading: true
        })

        await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + this.state.stockName + "&&apikey=6XAKFCNBJ16IVXO6")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    apiOutput: data,
                    label: data["Meta Data"]["2. Symbol"],
                    isLoading: false
                })
            })

        Date.prototype.yyyymmdd = function () {
            let mm = this.getMonth() + 1; // getMonth() is zero-based
            let dd = this.getDate();

            return [this.getFullYear(), '-',
                (mm > 9 ? '' : '0') + mm, '-',
                (dd > 9 ? '' : '0') + dd
            ].join('');
        };

        let open = []
        let close = []
        let label = []
        let startDate = Date.parse(this.state.apiOutput["Meta Data"]["3. Last Refreshed"]) - 2592000000

        for (let i = 0; i <= 30; i++) {
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
                    }
                ],
            },
            options: {
                legend: {
                    labels: {
                        fontColor: 'rgb(46,96,207)'
                    }
                },
                title: {
                    display: true,
                    fontColor: 'blue',
                    text: this.state.label
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: 'rgb(46,96,207)'
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: 'rgb(46,96,207)'
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
            </div>
        );
    }
}

export default GenerateGraph