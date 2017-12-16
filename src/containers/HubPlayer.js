import React, { Component } from 'react';

export default class HubPlayer extends Component {
    renderRatings() {
        return this.props.ratings.map(rating => {
            let clsName = 'hub-player__rating';
            const parsedRating = JSON.parse(rating);

            if (parsedRating.key === this.props.currentSortKey) {
                clsName = `${clsName} hub-player__rating--current`;
            }

            return (
                <div className={ clsName } key={ parsedRating.key }>
                    { parsedRating.rating }
                </div>
            );
        });
    }

    render() {
        const teamId = parseInt(this.props.teamId, 10) - 1;
        return (
            <div className="hub-player" onClick={ this.props.handler } data-id={ this.props.playerId }>
                <div className="hub-player__card">
                    <img 
                        className="hub-player__card-team-logo"
                        src={ `https://madden-assets-cdn.pulse.ea.com/madden18/logos/128/${teamId}.png` }
                        alt="" />
                    <div className="hub-player__card-portrait">
                        <img 
                            src={ `https://madden-assets-cdn.pulse.ea.com/madden18/portraits/64/${this.props.portraitId}.png` }
                            alt="" />
                
                    </div>
                    <h4 className="hub-player__card-name">
                        <span>{ this.props.firstName }</span>
                        <span className="hub-player__card-name--last">{ this.props.lastName }</span>
                    </h4>
                </div>
                { this.renderRatings() }
            </div>
        );
    }
}
