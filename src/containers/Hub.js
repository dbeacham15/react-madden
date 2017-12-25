import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as hubActions from '../store/actions/hub';
import HubPlayer from './HubPlayer';
import attributes from '../maps/attributes';
import '../styles/Hub.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import SearchInput from './SearchInput';
import FilterModal from './FilterModal';

class Hub extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
      };

    constructor() {
        super();

        this.updateSort = this._updateSort.bind(this);
        this.routeToPlayer = this._routeToPlayer.bind(this);

        this.state = {
            scrolling: {
                steps: 0,
                current: 0,
                stepWidth: 55
            }
        };
    }

    componentWillMount() {
        this.props.getPlayers();
    }

    componentDidMount() {
        const attrTable = document.querySelector('.hub-table__attributes');
        const stepsVisible = Math.floor(attrTable.getBoundingClientRect().width / this.state.scrolling.stepWidth);
        const total = this.props.hub.attrOrder.length;
        const steps = total - stepsVisible; 
        
        const scrolling = {
            ...this.state.scrolling,
            steps
        };

        this.setState({
            scrolling
        });
    }

    getRatingOrderForPlayer(player) {
        const ratings = this.props.hub.attrOrder.map(key => {
            const attr = attributes[key];
            const rating = player[`${attr.ratingKey}_rating`];
            const obj = {
                key,
                rating
            };

            return JSON.stringify(obj);
        });

        return ratings;
    }

    _routeToPlayer(evt) {
        
    }

    renderRows() {
        const { players, currentSortKey, currentSortOrder } = this.props.hub;

        if (players) {
            return players.map(player => {
                const ratings = this.getRatingOrderForPlayer(player);

                return (
                    <HubPlayer 
                        key={ player.id }
                        playerId = { player.id }
                        handler={() => { this.props.history.push(`/player/${player.id}`) }}
                        ratings={ ratings }
                        currentSortKey={ currentSortKey }
                        firstName={ player.firstName } 
                        lastName={ player.lastName } 
                        portraitId={ player.portraitId }
                        position={ player.position }
                        teamId={ player.teamId } />
                );
           });
        }
    }

    _updateSort(evt) {
        const key = evt.currentTarget.dataset.abbreviation;
        
        if (key === this.props.hub.currentSortKey) {
            this.props.updateSortOrder(this.props.hub.currentSortOrder);
            //Toggle the Order
            return;
        }

        this.props.updateSortKey(key);
    }

    _renderFirstInitial(name) {
        return name.substring(0,1);
    }

    _renderPlayerCards() {
        return this.props.hub.players.map(player => {
            return (
                <div className="hub-player-card" key={`hub-player-${player.id}`}>
                    <div className="hub-player-card__logo">
                        <img 
                            alt=""
                            src={`https://madden-assets-cdn.pulse.ea.com/madden18/logos/128/${parseInt(player.teamId, 10) - 1}.png`} />
                    </div>
                    <div className="hub-player-card__portrait">
                        <img
                            alt={`${player.firstName} ${player.lastName} Portrait`}
                            src={`https://madden-assets-cdn.pulse.ea.com/madden18/portraits/128/${player.portraitId}.png`} />
                    </div>
                    <div className="hub-player-card__content">
                        <h5 className="hub-player-card__name">
                            { this._renderFirstInitial(player.firstName) }.{player.lastName}
                        </h5>
                        <h6 className="hub-player-card__demographics">
                            { player.team }
                            <span>{ player.position }</span>
                        </h6>
                    </div>
                </div>
            );
        });
    }

    _renderPlayerAttributes(player) {
        return this.props.hub.attrOrder.map(attr => {
            const ratingK = `${attributes[attr].ratingKey}_rating`;
            const diffKey = `${attributes[attr].ratingKey}_diff`;
            const diff = parseInt(player[diff], 10);
            let clsName = 'hub-table__attributes-list-item';

            if (diff > 0) {
                clsName = `${clsName} ${clsName}--positive`;
            } else if (diff < 0) {
                clsName = `${clsName} ${clsName}--negative`;
            }

            return (
                <li
                    className={ clsName }
                    key={`${player.id}-${attr}`}
                >{ player[ratingK] }</li>
            )
        });
    }

    _renderAttributesHeader() {
        return this.props.hub.attrOrder.map(attr => {
            return (
                <li key={ attr } className="hub-table__attributes-list-item">
                    { attr }
                </li>
            )
        });
    }

    _slideHubLeft() {
        let current = this.state.scrolling.current;

        if (current > 0) {
            current--;
        }

        this._setCurrent(current);
    }

    _setCurrent(current) {
        const scrolling = {
            ...this.state.scrolling,
            current
        };

        this.setState( {
            scrolling
        });
    }

    _slideHubRight() {
        let current = this.state.scrolling.current;

        if (this.state.scrolling.current < (this.state.scrolling.steps - 1)) {
            current++;
        }

        this._setCurrent(current);     
    }

    render() {
        const { attrOrder, currentSortKey, currentSortOrder } = this.props.hub;
        let clsName = 'hub rail';

        if (this.props.hub.loading) {
            clsName = `${clsName} hub--loading`;
        }

        return  (
            <section className={ clsName }>
                <div className="hub-filtering">
                    <div className="hub-filter" title="filter">
                        <svg viewBox="0 0 24 24">
                            <path d="M3,2H21V2H21V4H20.92L14,10.92V22.91L10,18.91V10.91L3.09,4H3V2Z" />
                        </svg>
                    </div>
                    <SearchInput />
                    <div className="hub-navigation">
                        <div 
                            className="hub-navigation__arrow hub-navigation__arrow--left"
                            onClick={ this._slideHubLeft.bind(this) }
                        >
                            <svg viewBox="0 0 24 24">
                                <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                            </svg>
                        </div>
                        <div 
                            className="hub-navigation__arrow hub-navigation__arrow--right"
                            onClick={ this._slideHubRight.bind(this) }
                        >
                            <svg viewBox="0 0 24 24">
                                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="hub-table">
                    <div className="hub-table__players">
                        <ul className="hub-table__attributes-list hub-table__attributes-list--header">
                            <li className="hub-table__attributes-list-item">Player</li>
                        </ul>
                        { this._renderPlayerCards() }
                    </div>
                    <div className="hub-table__attributes">
                        <div 
                            className="hub-table__attributes-scroll" 
                            style={{ transform: `translateX(-${this.state.scrolling.current * this.state.scrolling.stepWidth}px)` }}
                        >
                            <ul className="hub-table__attributes-list hub-table__attributes-list--header">
                                { this._renderAttributesHeader() }
                            </ul>
                            { this.props.hub.players.map(player => {
                                return (
                                    <ul key={ player.id } className="hub-table__attributes-list">
                                        {this._renderPlayerAttributes(player)}
                                    </ul>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <FilterModal />
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        hub: state.hub
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators( { ...hubActions }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hub));