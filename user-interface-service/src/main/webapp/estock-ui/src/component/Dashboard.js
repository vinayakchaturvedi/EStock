import React, {Component} from "react";
import {Chart} from "react-chartjs-2";

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            labels: [],
            label: "",
        }
    }

    async componentDidMount() {

        this.setState({
            isLoading: true
        })

        await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE:TATASTEEL&&apikey=6XAKFCNBJ16IVXO6")
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

        let data = []
        let label = []
        let startDate = Date.parse(this.state.apiOutput["Meta Data"]["3. Last Refreshed"]) - 2592000000

        for (let i = 0; i <= 30; i++) {
            let curr = new Date(startDate + (i * 86400000))
            let timeSeries = this.state.apiOutput["Time Series (Daily)"]
            if(timeSeries.hasOwnProperty(curr.yyyymmdd())) {
                data.push(timeSeries[curr.yyyymmdd()]["1. open"])
                label.push(curr.yyyymmdd())
            }
        }

        let ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',

            data: {
                labels: label,
                datasets: [{
                    label: this.state.label,
                    backgroundColor: 'rgb(227,139,65)',
                    borderColor: 'rgb(0,99,132)',
                    data: data
                }]
            }
        })
    }

    render() {
        return (
            <div style={{display: this.state.isLoading ? "none" : "block"}}>
                <div className="stock">
                    <canvas
                        id="myChart"
                    />
                </div>
            </div>
        );
    }
}

export default Dashboard