import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FilterPositions from './filter/FilterPositions';
import FilterTeams from './filter/FilterTeams';

import { resetFilter, applyFilters } from '../store/actions/filter';
import { displayFilter } from '../store/actions/hub';

import '../styles/FilterModal.css';

class FilterModal extends Component {
    constructor() {
        super();

        this.state = {
            activeCategory: 'teams'
        };
    }

    /**
     * Builds Category class based on active category state
     * 
     * @param {*} filter 
     */
    _getCategoryClassName(filter) {
        let clsName = 'filter-modal__category';

        if (this.state.activeCategory === filter) {
            clsName = `${clsName} ${clsName}--active`;
        }

        return clsName;
    }

    /**
     * Event Handler for the Category Click Event
     * 
     * @param {*} evt 
     */
    _changeFilterCategory(evt) {
        this.setState({
            activeCategory: evt.currentTarget.dataset.filter
        });
    }

    /**
     * Render method for the Currernt Active Category state
     */
    _renderCurrentOptions() {
       if (this.state.activeCategory === 'teams') {
           return (
               <FilterTeams />
            );      
        }
       if (this.state.activeCategory === 'positions') {
           return (
               <FilterPositions />
           )
       }
    }

    /**
     * Renders tags in the footer based on tags that have been selected
     */
    _renderFilterTags() {

    }

    /**
     * Resets the Filter State
     */
    _resetFilter() {
        this.props.resetFilter();
    }

    /**
     * Applies the activeFilters in state to a search
     */
    _applyFilters() {
        this.props.applyFilters();
    }


    _handleCloseModalClick(evt) {
        this.props.displayFilter(false);
    }

    render() {
        return (
            <section className="filter-modal">
                <div className="filter-modal__window">
                    <div className="filter-modal__header">
                        Advanced Filters
                        <svg 
                            className="filter-modal__close"
                            onClick={ this._handleCloseModalClick.bind(this) }
                            viewBox="0 0 24 24">
                            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </div>
                    <div className="filter-modal__content">
                        <div className="filter-modal__categories">
                            <ul className="filter-modal__categories-items">
                                <li 
                                    className={ this._getCategoryClassName('teams') } 
                                    data-filter="teams" 
                                    onClick={this._changeFilterCategory.bind(this) }>Teams</li>
                                <li 
                                    className={ this._getCategoryClassName('positions') } 
                                    onClick={this._changeFilterCategory.bind(this) }
                                    data-filter="positions">Positions</li>
                               
                            </ul>
                        </div>
                        <div className="filter-modal__options">
                            { this._renderCurrentOptions() }
                        </div>
                    </div>
                    <div className="filter-modal__actions">
                        <div className="filter-modal__tags">
                            { this._renderFilterTags() }
                        </div>
                        <div className="filter-modal__ctas">
                            <a 
                                className="cta cta--primary" 
                                onClick={ this._applyFilters.bind(this) }
                            >
                                Apply Filters
                            </a>
                            <a 
                                className="cta cta--secondary" 
                                onClick={ this._resetFilter.bind(this) }
                            >
                                Reset
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ resetFilter, applyFilters, displayFilter }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
