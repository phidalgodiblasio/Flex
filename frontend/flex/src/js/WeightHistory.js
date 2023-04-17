import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';
import styles from '../style/WeightHistory.module.css';
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
                <div id = {styles.graph}>
                    <Plot
                        data={[
                            trace1,
                            trace2
                        ]}
                        layout={
                            {
                                width: 1080, height: 600, title: 'Your Weight Entries',
                                xaxis: { 
                                    title: 'date',
                                    //showgrid: false
                                },
                                yaxis: { 
                                    range: [yMin, yMax], 
                                    title: 'Weight',
                                    //showgrid: false
                                }
                            }
                        }
                        config={{
                            displaylogo: false,
                            displayModeBar: false,
                            responsive: true,
                          }}
                    />
                </div>
            </>
        )

    }
}

export default withRouter(WithErrorMessage(WeightHistory));