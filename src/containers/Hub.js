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

class Hub extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired
      };

    constructor() {
        super();

        this.updateSort = this._updateSort.bind(this);
        this.routeToPlayer = this._routeToPlayer.bind(this);
    }

    componentWillMount() {
        this.props.getPlayers();
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
        console.log(evt.currentTarget.dataset.id);
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

    render() {
        const { attrOrder, currentSortKey, currentSortOrder } = this.props.hub;
        let clsName = 'hub rail';

        if (this.props.hub.loading) {
            clsName = `${clsName} hub--loading`;
        }

        return  (
            <section className={ clsName }>
                <div className="hub-filtering">
                    <SearchInput />
                </div>
                <ul className="hub-header">
                    <li className="hub-header__key">Player</li>
                    { 
                        attrOrder.map(key => {
                            let clsName = 'hub-header__key'

                            if (currentSortKey === key) {
                                clsName = `${clsName} hub-header__key--active hub-header__key--${currentSortOrder}`;
                            }

                            return (
                                <li 
                                    draggable
                                    key={ key }
                                    className={ clsName }
                                    data-abbreviation={ key }
                                    onClick={ this.updateSort }
                                    title={ attributes[key].label }
                                >{ key }</li>
                            ); 
                        })
                    }
                </ul>
                <div className="hub-players">
                    { this.renderRows() }
                </div>
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