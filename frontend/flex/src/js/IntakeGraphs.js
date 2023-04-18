import React, { useEffect, useState } from 'react';
import PageHeader from './PageHeader';
import Plot from 'react-plotly.js';
import styles from '../style/IntakeGraphs.module.css';

export default function IntakeGraphs() {
  const [xAxis, setXAxis] = useState([]);
  const [calorieHistory, setCalorieHistory] = useState([]);
  const [goals, setGoals] = useState({});
  const [proteinHistory, setProteinHistory] = useState([]);
  const [carbHistory, setCarbHistory] = useState([]);
  const [fatHistory, setFatHistory] = useState([]);
  const [yScale, setYScale] = useState([]);

  useEffect(() => {
    getAllIntakes();
    getIntakeGoals();
  }, [])

  function getAllIntakes() {
    fetch('http://localhost:8080/flex/intake-all', {
      method: 'GET',
      credentials: 'include',
    }).then(response => {
      if (response.status != 200) {
        response.text().then(body => {
          this.props.showErrorMessage(body);
        });
      }

      response.json().then(intakes => {
        mapIntakesToGraphData(intakes);
      })
    })
  }

  function getIntakeGoals() {
    fetch('http://localhost:8080/flex/intake-goal', {
      method: 'GET',
      credentials: 'include',
    }).then(response => {
      if (response.status != 200) {
        response.text().then(body => {
          this.props.showErrorMessage(body);
        });
      }

      response.json().then(goals => {
        setGoals(goals);
      })
    })
  }

  function mapIntakesToGraphData(intakes) {
    setXAxis(
      intakes.map(intake => {
        return intake.date;
      })
    );

    setCalorieHistory(
      intakes.map(intake => {
        return intake.calorieSum;
      })
    )
    setProteinHistory(
      intakes.map(intake => {
        return intake.proteinSum;
      })
    )
    setCarbHistory(
      intakes.map(intake => {
        return intake.carbSum;
      })
    )
    setFatHistory(
      intakes.map(intake => {
        return intake.fatSum;
      })
    )
    
  }

  return (
    <>
      <PageHeader title="Intake Progress" />
      <div className={`container ${styles.graphsWrapper}`}>
        <Plot
          className={styles.plot}
          data={[
            {
              x: xAxis,
              y: calorieHistory,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'rgb(87, 0, 229)'},
            },
          ]}
          layout={{
            height: 400, 
            title: {
              text: 'Calories',
              font: {
                size: 24,
              }
            },
            font: {
              family: ['Inter', 'sans-serif'],
              color: 'black'
            },
            xaxis: { fixedrange: true },
            yaxis: { range: [yScale[0],yScale[1]], title: 'Total Daily Calories' },
            autosize: true,
            shapes: [
              {
                type: 'line',
                x0: 0,
                x1: 1,
                y0: goals.calGoal,
                y1: goals.calGoal,
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
                y: goals.calGoal,
                xanchor: 'left',
                align: 'right',
              }
            ]
          }}
          config={{
            displaylogo: false,
            displayModeBar: false,
            responsive: true,
          }}
        />
      </div>
      <div className={`container ${styles.graphsWrapper}`}>
        <Plot
          className={styles.plot}
          data={[
            {
              x: xAxis,
              y: proteinHistory,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'rgb(87, 0, 229)'},
            },
          ]}
          layout={{
            height: 400, 
            title: {
              text: 'Protein Intake',
              font: {
                size: 24,
              }
            },
            font: {
              family: ['Inter', 'sans-serif'],
              color: 'black'
            },
            xaxis: { fixedrange: true },
            yaxis: { range: [yScale[2],yScale[3]], title: 'Protein (g)' },
            autosize: true,
            shapes: [
              {
                type: 'line',
                x0: 0,
                x1: 1,
                y0: goals.proteinGoal,
                y1: goals.proteinGoal,
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
                y: goals.proteinGoal,
                xanchor: 'left',
                align: 'right',
              }
            ]
          }}
          config={{
            displaylogo: false,
            displayModeBar: false,
            responsive: true,
          }}
        />
      </div>
      <div className={`container ${styles.graphsWrapper}`}>
        <Plot
          className={styles.plot}
          data={[
            {
              x: xAxis,
              y: carbHistory,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'rgb(87, 0, 229)'},
            },
          ]}
          layout={{
            height: 400, 
            title: {
              text: 'Carbohydrate Intake',
              font: {
                size: 24,
              }
            },
            font: {
              family: ['Inter', 'sans-serif'],
              color: 'black'
            },
            xaxis: { fixedrange: true },
            yaxis: { range: [yScale[4],yScale[5]], title: 'Carbs (g)' },
            autosize: true,
            shapes: [
              {
                type: 'line',
                x0: 0,
                x1: 1,
                y0: goals.carbGoal,
                y1: goals.carbGoal,
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
                y: goals.carbGoal,
                xanchor: 'left',
                align: 'right',
              }
            ]
          }}
          config={{
            displaylogo: false,
            displayModeBar: false,
            responsive: true,
          }}
        />
      </div>
      <div className={`container ${styles.graphsWrapper}`}>
        <Plot
          className={styles.plot}
          data={[
            {
              x: xAxis,
              y: fatHistory,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'rgb(87, 0, 229)'},
            },
          ]}
          layout={{
            height: 400, 
            title: {
              text: 'Fat Intake',
              font: {
                size: 24,
              }
            },
            font: {
              family: ['Inter', 'sans-serif'],
              color: 'black'
            },
            xaxis: { fixedrange: true },
            yaxis: { range: [yScale[6],yScale[7]], title: 'Fat (g)' },
            autosize: true,
            shapes: [
              {
                type: 'line',
                x:xAxis,
                y0: goals.fatGoal,
                y1: goals.fatGoal,
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
                y: goals.fatGoal,
                xanchor: 'left',
                align: 'right',
              }
            ]
          }}
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
