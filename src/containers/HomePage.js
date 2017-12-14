import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Card from '../components/Card';

import '../styles/Homepage.css';

class HomePage extends Component {
    componentWillMount() {
       // this.props.getTopPlayers();
    }

    renderCards() {
        if (this.props.topPlayers.players) {
           return this.props.topPlayers.players.map( player => 
                <Card 
                    experience={ player.yearsPro }
                    firstName={ player.firstName }
                    key={ player.primaryKey}
                    id={ player.primaryKey }
                    lastName={ player.lastName }
                    position={ player.position }
                    portraitId={ player.portraitId }
                    ratingOvr={ player.ovr_rating }
                    teamId={ player.teamId }
                    team={ player.team } />
            );
        }
    }

    render() {
        return (
            <section>
                <div className="top-players">
                    <div className="top-players__header">
                        <h2>Top Players</h2>
                        <div className="top-players__filter">
                            <label className="top-players__filter-selected">
                            Overall
                            <svg viewBox="0 0 24 24">
                                <path fill="#000000" d="M7,10L12,15L17,10H7Z" />
                            </svg>
                            </label>
                        </div>
                    </div>
                    <div className="top-players__stream">
                        { this.renderCards() }
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        topPlayers: state.topPlayers
    };
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators( {  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);