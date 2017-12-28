import React, { Component } from 'react';
import { connect } from 'react-redux';
import teams from '../maps/teams';

import '../styles/FilterModal.css';

class FilterModal extends Component {
    constructor() {
        super();

        this.state = {
            currentOptions: [],
            activeCategory: 'teams',
            afcTeams: [],
            nfcTeams: []
        };
    }

    /**
     * Setup State Objects we can before Component
     */
    componentWillMount() {
        this._splitTeamConferences();
    }

    /**
     * Filters the Team Array into Conferences
     */
    _splitTeamConferences() {
        const afcTeams = [...teams].filter(team => {
            return team.conference === 'AFC';
        });

        const nfcTeams = [...teams].filter(team => {
            return team.conference === 'NFC';
        });

        // Set the State
        this.setState({
            afcTeams,
            nfcTeams
        });
    }

    _getClassName(activeFilter, filter) {
        let clsName = 'filter-modal__category';

        if (activeFilter === filter) {
            clsName = `${clsName} ${clsName}--active`;
        }

        return clsName;
    }

    _changeFilterCategory(evt) {
        this.setState({
            activeFilter: evt.currentTarget.dataset.filter
        });
    }

    _renderTeamOption() {
        if (this.state.currentOptions.length) {
            this.state.currentOptions.map(option => {

            });
        } 
    }

    render() {
        return (
            <section className="filter-modal">
                <div className="filter-modal__window">
                    <div className="filter-modal__header">
                        Advanced Filters
                        <svg 
                            className="filter-modal__close"
                            viewBox="0 0 24 24">
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </div>
                    <div className="filter-modal__content">
                        <div className="filter-modal__categories">
                            <ul className="filter-modal__categories-items">
                                <li 
                                    className={ this._getClassName(this.state.activeCategory, 'teams') } 
                                    data-filter="teams" 
                                    onClick={this._changeFilterCategory.bind(this) }>Teams</li>
                                <li 
                                    className={ this._getClassName(this.state.activeFilter, 'positions') } 
                                    onClick={this._changeFilterCategory.bind(this) }
                                    data-filter="positions">Positions</li>
                                <li 
                                    className={ this._getClassName(this.state.activeFilter, 'week') } 
                                    onClick={this._changeFilterCategory.bind(this) }
                                    data-filter="week">Week</li>
                            </ul>
                        </div>
                        <div className="filter-modal__options">
                            { this._renderTeamOption() }
                        </div>
                    </div>
                    <div className="filter-modal__actions">
                        <div className="filter-modal__tags"></div>
                        <div className="filter-modal__ctas">
                            <a className="cta cta--primary" >
                                Apply Filters
                            </a>
                            <a className="cta cta--secondary">
                                Reset
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default connect()(FilterModal);
