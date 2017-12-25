import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPlayerInformation } from '../store/actions/player';
import PlayerHeader from '../components/PlayerHeader';
import { bindActionCreators } from 'redux';

class PlayerPage extends Component {
    componentWillMount() {
        const player = this.props.match.params.id;
        if (!player) {
            return;
        }

        this.props.getPlayerInformation(10852);
    }

    _renderPageContents() {
        if (!this.props.player || !this.props.player.length) {
            return (
                <div></div>
            );
        }

        const { firstName, lastName, portraitId, teamId } = this.props.player[0];

        return (
            <PlayerHeader
                firstName={ firstName }
                lastName={ lastName }
                portraitId={ portraitId }
                teamId={ teamId }
            />
        );
    }

    render() {
        return (
            <section className="player-page">
                { this._renderPageContents() }
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        player: state.currentPlayer.playerInfo
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators( { getPlayerInformation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);