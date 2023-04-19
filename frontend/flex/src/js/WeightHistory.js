import React, { Component } from 'react';
import styles from '../style/History.module.css';
import PageHeader from './PageHeader';
import { WithErrorMessage } from './WithErrorMessage';
import { withRouter } from './withRouter';
import Plot from 'react-plotly.js';

class WeightHistory extends Component {

    componentDidMount() {
        this.getWeights();
        this.getWeightGoal();
    } 

    getWeights() {
        fetch(
            'http://localhost:8080/flex/weight',
            {
                method: 'GET',
                credentials: 'include'
            }
        ).then(response => {
            if (response.status == 200) {
                response.json().then(weights => {
                    this.setState({
                        weightEntries: weights
                    })
                });
            } else {
                response.text().then(body => {
                    this.props.showErrorMessage(body);
                })
            }
        }).catch(error => {
            this.props.showErrorMessage(error.toString());
        })
    }

    getWeightGoal() {
        fetch(
            'http://localhost:8080/flex/weight-goal',
            {
                method: 'GET',
                credentials: 'include'
            }
        ).then(response => {
            if (response.status == 200) {
                response.json().then(weights => {
                    let weightGoal = weights.weightGoal;
                    this.setState({
                        weightGoal: weightGoal
                    })
                });
            } else {
                response.text().then(body => {
                    this.props.showErrorMessage(body);
                })
            }
        }).catch(error => {
            this.props.showErrorMessage(error.toString());
        })
    }

    constructor(props) {
        super(props)

        this.state = {
            weightEntries: [],
            weightGoal: 0
        }
    }

    getXVals() {
        let xVals = []
        for (let i = 0; i < this.state.weightEntries.length; i++) {
            xVals.push(this.state.weightEntries[i].date);
        }
        return xVals;
    }
    getYVals() {
        let yVals = []
        for (let i = 0; i < this.state.weightEntries.length; i++) {
            yVals.push(this.state.weightEntries[i].weight);
        }
        return yVals;
    }

    getGoals() {
        let y = [];

        for (let i = 0; i < this.state.weightEntries.length; i++) {
            y.push(this.state.weightGoal);
        }
        return y;
    }

    render() {
        let x = this.getXVals();
        let y = this.getYVals();

        let yMax = (Math.max(Math.max(y),this.state.weightGoal)) + 15;
        let yMin = Math.max((Math.min(Math.min(y),this.state.weightGoal)) - 15,0);

        //let range = yMax - yMin;
        //let tickDist = range/100*10;

        let goalY = this.getGoals(x);

        var trace1 = {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Your Weight',
            marker: { color: 'blue' },
        };

        var trace2 = {
            x: x,
            y: goalY,
            type: 'scatter',
            mode: 'lines',
            name: 'Goal Weight',
            marker: { color: 'red' },
        };

        return (
            <>
                <PageHeader title="Weight History" />
                <div className="container">
                    <Plot
                        className={styles.plot}
                        data={[
                            trace1
                        ]}
                        layout={
                            { 
                                font: {
                                    family: ['Inter', 'sans-serif'],
                                    color: 'black'
                                },
                                paper_bgcolor:'rgba(0,0,0,0)',
                                height: 600,
                                xaxis: { 
                                    title: 'Date',
                                    //showgrid: false
                                },
                                yaxis: { 
                                    range: [yMin, yMax], 
                                    title: 'Weight',
                                    fixedrange: true
                                    //showgrid: false
                                },
                                annotations: [
                                    {
                                      xref: 'paper',
                                      yref: 'paper',
                                      x: 0.03,
                                      xanchor: 'left',
                                      y: 1.15,
                                      yanchor: 'top',
                                      text: 'Your Weight Entries',
                                      font: {
                                          size: 24
                                        },
                                      showarrow: false
                                    }
                                ],
                                shapes: [
                                    {
                                        name: "Goal",
                                        type: 'line',
                                        x0: 0,
                                        x1: 1,
                                        y0: this.state.weightGoal,
                                        y1: this.state.weightGoal,
                                        line: {
                                            color: '#0003',
                                            dash: 'dash',
                                        }
                                    }
                                ],
                                annotations: [
                                    {
                                        showarrow: false,
                                        text: 'Your Goal',
                                        x: 1,
                                        y: this.state.weightGoal,
                                        xanchor: 'left',
                                        align: 'right',
                                    },
                                ]
                            }
                        }
                        config={{
                            displaylogo: false,
                            displayModeBar: false,
                            responsive: true,
                            // options: {
                            //     plugins: {
                            //       chartAreaBorder: {
                            //         borderColor: 'red',
                            //         borderWidth: 2,
                            //         borderDash: [5, 5],
                            //         borderDashOffset: 2,
                            //       }
                            //     }   
                            // },
                            // plugins: [chartAreaBorder]
                        }
                    }
                    />
                </div>
            </>
        )

    }
}

export default withRouter(WithErrorMessage(WeightHistory));