import React, { Component } from 'react';

import '../styles/PlayerHeader.css';

class PlayerHeader extends Component {
    render() {
        return (
            <div className="player-header">
                <img 
                    className="player-header__team-logo"
                    src={`https://madden-assets-cdn.pulse.ea.com/madden18/logos/512/${this.props.teamId}.png`} alt="team logo" 
                />
                <div className="player-header__portrait">
                    <img 
                        src={`https://madden-assets-cdn.pulse.ea.com/madden18/portraits/512/${this.props.portraitId}.png`} 
                        alt="" 
                    />
                    <div className="player-header__ovr">
                        <label>OVR</label>
                        { this.props.ovrRating }
                    </div>
                </div>
                <div className="player-header__content">
                    <h2 className="player-header__name">
                        <span>{ this.props.firstName } { this.props.lastName }</span>
                    </h2>
                    <ul className="player-header__demographics">
                        <li>{ this.props.teamName }</li>
                        <li>{ this.props.position }</li>
                        <li>#{ this.props.jerseyNumber }</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default PlayerHeader;