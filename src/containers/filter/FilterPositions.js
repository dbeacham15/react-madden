import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateFilterPositions } from '../../store/actions/filter';

import positions from '../../maps/positions';

import '../../styles/filter/positions.css';

class FilterPositions extends Component {
    constructor() {
        super();

        this.state = {
            activeFilter: 'all'
        };
    }

    /**
     * Gets ClassName for indivisual positions and determines if they are filtered or not
     * 
     * @param {*} sideOfBall 
     */
    _getClassName(sideOfBall, abbr) {
        let baseName = 'filter-position';
        let clsName = baseName;

        if (sideOfBall === this.state.activeFilter || this.state.activeFilter === 'all') {
            clsName = `${clsName} ${baseName}--filtered`;
        }

        if (this.props.activePositions.includes(abbr)) {
            clsName = `${clsName} ${baseName}--active`;
        }

        return clsName;
    }

    _handlePositionClick(evt) {
        const abbr = evt.currentTarget.dataset.position;

        this.props.updateFilterPositions(abbr);
    }

    /**
     * Renders the positions based on supplied Arrays
     */
    _renderFilterPositions() {
       return positions.map(position => (
            <div 
                className={ this._getClassName(position.type, position.abbreviation) } 
                data-position={ position.abbreviation} 
                key={ position.abbreviation }
                onClick={ this._handlePositionClick.bind(this) }>
                <h4 className="filter-position__abbreviation">
                    { position.abbreviation }
                </h4>
                <div className="filter-position__add-icon">
                    <svg viewBox="0 0 24 24">
                        <path  d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg>
                </div>
                <label className="filter-position__label">{ position.label }</label>
            </div>
        ));
        
    }

    /**
     *  Changes State for the Click Event on Filter button
     * 
     * @param {*} evt 
     */
    _toggleFilter(evt) {
        try {
            this.setState({
                activeFilter: evt.currentTarget.dataset.filter
            });
        } catch (err) {
            console.error('Toggle Filter:', err);
        }
    }

    /**
     * Allows the ClsName to change for the filter Buttons when clicked
     * 
     * @param {*} which 
     */
    _getFilterTypeClsName(which) {
        let clsName = 'filter-positions__type';

        if (which === this.state.activeFilter) {
            clsName = `${clsName} ${clsName}--active`;
        }

        return clsName;
    }


    render() {
        return (
            <div className="filter-positions">
                <div className="filter-positions__filtering">
                    <div 
                        className={ this._getFilterTypeClsName('all') }
                        data-filter="all"
                        onClick={ this._toggleFilter.bind(this) }
                    >
                        All
                    </div>
                    <div 
                        className={ this._getFilterTypeClsName('offense') }
                        data-filter="offense"
                        onClick={ this._toggleFilter.bind(this) }
                    >
                        Offense
                    </div>
                    <div 
                        className={ this._getFilterTypeClsName('defense') }
                        data-filter="defense"
                        onClick={ this._toggleFilter.bind(this) }
                    >
                        Defense
                    </div>
                    <div 
                        className={ this._getFilterTypeClsName('special teams') }
                        data-filter="special teams"
                        onClick={ this._toggleFilter.bind(this) }
                    >
                        Special Teams
                    </div>
                </div>
                <div className="filter-positions__content">
                    { this._renderFilterPositions() }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        activePositions: state.filter.positions
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateFilterPositions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPositions);