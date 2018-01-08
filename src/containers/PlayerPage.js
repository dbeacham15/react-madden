import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPlayerInformation } from '../store/actions/player';
import PlayerHeader from '../components/PlayerHeader';
import { bindActionCreators } from 'redux';
import teams from '../maps/teams';
import positions from '../maps/positions';
import LoadingIndicator from '../components/LoadingIndicator';
import Demographics from '../components/Demographics';
import PlayerAttributesChart from '../components/player/PlayerAttributesChart';
import '../styles/player/player-page.css';
import { Line } from 'react-chartjs-2';

class PlayerPage extends Component {
    constructor() {
        super();

        this.state = {
            currentIteration: 0
        };
    }

    componentWillReceiveProps(nextProps, oldProps) {
        if (oldProps.player === nextProps.player) {
            return;
        }

        this.setState({
            currentIteration: nextProps.player.length - 1
        });
    }

    componentWillMount() {
        const player = this.props.match.params.id;
        
        if (!player) {
            return;
        }

        this.props.getPlayerInformation(player);
    }

    _renderPLayerHeader() {
        const { 
            firstName, 
            lastName, 
            portraitId, 
            position,
            ovr_rating,
            teamId ,
            jerseyNum
        } = this.props.player[this.state.currentIteration];
        
        const correctTeamId = parseInt(teamId, 10) -1;
        const teamName = `${teams[correctTeamId].name} ${teams[correctTeamId].mascot }`;

        return (
            <PlayerHeader
                firstName={ firstName }
                lastName={ lastName }
                ovrRating={ ovr_rating }
                portraitId={ portraitId }
                position={ position }
                teamName={ teamName }
                jerseyNumber={ jerseyNum }
                teamId={ correctTeamId }
            />
        );
    }

    _convertHeight(height) {
        const feet = Math.floor(height / 12);
        const inches = height % 12;

        return `${feet}'${inches}"`;
    }

    _convertExperience(exp) {
        if (parseInt(exp, 10) === 0) {
            return 'rookie';
        }

        return exp;
    }

    _renderPlayerDemographics() { 

        const { 
            college,
            height,
            weight,
            yearsPro
        } = this.props.player[this.state.currentIteration];

        return (
            <Demographics
                college={ college }
                experience={ this._convertExperience(yearsPro) } 
                height={ this._convertHeight(height) }
                weight={ weight }
            />
        )
    }

    _renderIterationFilterSelect() {

       return this.props.player.map((player, index) => {
            if (parseInt(player.iteration, 10) -1 === index) {
                return (
                    <option value={ index } selected>{ player.iteration }</option>
                )
            }

            return (
                <option value={ index }>{ player.iteration }</option>
            )
        })
    }

    _handleIterationFilterChange(evt) {
        this.setState({
            currentIteration: evt.currentTarget.value
        });
    }

    render() {
        if (!this.props.player || !this.props.player.length) {
            return (
                <LoadingIndicator />
            );
        }

        return (
            <section className="player-page">
                { this._renderPLayerHeader() }
                <div className="rail">
                    { this._renderPlayerDemographics() }
                </div>
                <section className="player-chart-filter-container rail">
                    <div className="player-chart-filter">
                        <label>Week: {this.props.player[this.state.currentIteration].iteration }</label>
                        <svg viewBox="0 0 24 24">
                            <path d="M7,10L12,15L17,10H7Z" />
                        </svg>
                        <select onChange={ this._handleIterationFilterChange.bind(this) }>
                            { this._renderIterationFilterSelect() }
                        </select>
                    </div>
                </section>
                <div className="player-charts rail">
                    <div className="player-chart">
                        <div className="player-charts__header">
                            <label>Top 10 Ratings</label>
                        </div>
                    
                        <PlayerAttributesChart 
                            iterationData={ this.props.player[this.state.currentIteration] }
                        />
                    </div>
                    <div className="player-chart">
                        <div className="player-charts__header">
                            <label>Worst 10 Ratings</label>
                        </div>
                        <PlayerAttributesChart 
                            iterationData={ this.props.player[this.state.currentIteration] }
                            reverse
                        />
                    </div>
                </div>
                <div className="">
                    <div className="player-related-profiles">
                    
                    </div>
                    <div className="player-usage-stats"></div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        player: state.player.playerInfo
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators( { getPlayerInformation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);