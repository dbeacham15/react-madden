import React, { Component } from 'react';
import attributes from '../../maps/attributes';
import { Bar } from 'react-chartjs-2';

class PlayerAttributesChart extends Component {
    constructor() {
        super();

        this.state ={
            data: {},
            options: {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            suggestedMin: 40,
                            stepValue: 10,
                            steps: 10,
                            max: 99
                        }
                    }]
                }
            }
        };

    }

    _renderChartData() {
        const keys = Object.keys(attributes).map(key => key);
        const points = Object.keys(attributes).map(key => {
            const ratingKey = `${attributes[key].ratingKey}_rating`;
                return {
                    key,
                    value: parseInt(this.props.iterationData[ratingKey], 10) || 0
                };
        }).sort((a,b) => {
            return b.value - a.value
        });

        let topTen = points.splice(0, 10);
        
        if (this.props.reverse) {
            topTen = points.splice(points.length - 10, 10);
        }

        const data = {
            labels: topTen.map(point => point.key),
            datasets: [{
                backgroundColor: '#0094D9',
                data: topTen.map(point => point.value)
            }]
        }; 

        this.setState({
            data
        });
    }

    componentWillReceiveProps(nextProps, oldProps) { console.log(nextProps, oldProps);
        this._renderChartData();
    }

    componentWillMount() {
       this._renderChartData();
    }

    render() {
        return (
            <Bar data={ this.state.data } options={ this.state.options } />
        );
    }
}

export default PlayerAttributesChart;