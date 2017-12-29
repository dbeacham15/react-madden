import React, { Component } from 'react';
import { connect } from 'react-redux';

import teams from '../../maps/teams';
import { bindActionCreators } from 'redux';

import { updateFilterTeams } from '../../store/actions/filter';

import '../../styles/filter/team.css';
import '../../styles/filter/team-conference.css';

class FilterTeams extends Component {
    constructor() {
        super();

        this.state = {
            afcTeams: [],
            nfcTeams: []
        };
    }

    /**
     * Setup State Objects we can before Component
     */
    componentWillMount() { 
        const teamArray = Object.keys(teams).map(key => teams[key]);

        this._setupTeamIntoConferences(teamArray);
    }

    /**
     * Allows us to split thhe conferences into divisions
     * 
     * @param {*} teams 
     * @param {*} division 
     */
    _splitDivision(teams, division) { 
        return teams.filter(team => {
            return team.division.toLowerCase() === division.toLowerCase()
        });
    }

    /**
     * Filters the Team Array into Conferences
     */
    _setupTeamIntoConferences(teams) {
        const divisions = ['east', 'west', 'north', 'south'];
        let afcTeams = {};
        let nfcTeams = {};

        const afcTeamsFiltered = teams.filter(team => {
            return team.conference === 'AFC';
        });

        const nfcTeamsFiltered = teams.filter(team => {
            return team.conference === 'NFC';
        });
        
        divisions.forEach(division => {
            afcTeams[division] = this._splitDivision(afcTeamsFiltered, division);
            nfcTeams[division] = this._splitDivision(nfcTeamsFiltered, division);
        });

        this.setState({
            afcTeams,
            nfcTeams
        });
    }

    /**
     * Updates the Team Filter State based on Team ID
     * 
     * @param {*} evt 
     */
    _handleFilterTeamClick(evt) {
        this.props.updateFilterTeams(evt.currentTarget.dataset.id);
    }

    /**
     * Builds Team Class Based on User Selections
     * 
     * @param {*} id 
     */
    _getFilterTeamClassName(id) {
        const baseName = 'filter-team';
        let clsName = baseName;

        if (this.props.activeTeams.includes(id.toString())) {
            clsName = `${clsName} ${baseName}--active`;
        }

        return clsName;
    }

    _renderDivisionTeams(divisionTeams) {  
        return divisionTeams.map(team => (
            <div 
                className={ this._getFilterTeamClassName(team.id) } 
                data-id={ team.id } 
                key={ team.id }
                onClick={ this._handleFilterTeamClick.bind(this) }>
                <img 
                    alt=""
                    className="filter-team__logo"
                    src={ `https://madden-assets-cdn.pulse.ea.com/madden18/logos/64/${team.id}.png` }
                />
                <label className="filter-team__name">
                    { team.mascot }
                </label>
                <div className="filter-team__add-icon">
                    <svg viewBox="0 0 24 24">
                        <path  d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                    </svg>
                </div>
            </div>
        ))
    }

    _renderDivisions(teams) {
        return Object.keys(teams).map(division => (
            <div className="filter-team-division" key={ division }>
                { this._renderDivisionTeams(teams[division]) }
            </div>
        ));
    }

    render() { console.log(this.props.activeTeams);
        return (
            <div className="filter-teams">
                <div className="filter-team-conference">
                    <h5 className="filter-team-conference__name">
                        AFC
                    </h5>
                    <div className="filter-team-conference__divisions">
                        { this._renderDivisions(this.state.afcTeams) }
                    </div>
                </div>
                <div className="filter-team-conference">
                    <h5 className="filter-team-conference__name">
                        NFC
                    </h5>
                    <div className="filter-team-conference__divisions">
                        { this._renderDivisions(this.state.nfcTeams) }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => { 
    return {
        activeTeams: state.filter.teams
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateFilterTeams }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterTeams);