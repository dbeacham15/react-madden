import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Line } from 'react-chartjs-2';
import { displayAttributeModal } from '../store/actions/hub';
import { clearCurrentAttribute } from '../store/actions/player';
import '../styles/AttributeModal.css';
import LoadingIndicator from '../components/LoadingIndicator';

class AttributeModal extends Component {
    constructor() {
        super();
        this.state = {
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
    _handleModalClose() {
        this.props.clearCurrentAttribute();
        this.props.displayAttributeModal(false);
    }

    _renderChart() {  
        if (this.props.attributeData.length) {
            const data = {
                labels: this.props.attributeData.map((data, index) => index),
                datasets: [{
                    data: this.props.attributeData
                }]
            };
console.log(data);
            return (
                <Line data={ data } options={ this.state.options }/>
            )
        }

        return (
            <LoadingIndicator />
        )
    }

    render() {
        return (
            <div className="attribute-modal">
                <div className="attribute-modal__content">
                    <div className="attribute-modal__content-header">
                        <label>{ this.props.attributeTitle }</label>
                        <svg 
                            className="filter-modal__close"
                            onClick={ this._handleModalClose.bind(this) }
                            viewBox="0 0 24 24">
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </div>
                    <div className="attribute-modal__chart">
                        { this._renderChart() }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        attributeTitle: state.player.attributeModalTitle,
        attributeData: state.player.attributeModalData
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ displayAttributeModal, clearCurrentAttribute }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AttributeModal);