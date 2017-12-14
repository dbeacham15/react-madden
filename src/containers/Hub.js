import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPlayers, updateSortOrder } from '../store/actions/hub';
import HubPlayer from './HubPlayer';
import attributes from '../maps/attributes';
import '../styles/Hub.css';

class Hub extends Component {
    constructor() {
        super();

        this.updateSort = this._updateSort.bind(this);
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

    renderRows() {
        const { players, currentSortKey, currentSortOrder } = this.props.hub;

        if (players) {
            return players.map(player => {
                const ratings = this.getRatingOrderForPlayer(player);

                return (
                    <HubPlayer 
                        key={ player.id }
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

        //Change the Sort Key
    }

    render() {
        const { attrOrder, currentSortKey, currentSortOrder } = this.props.hub;

        return  (
            <section className="hub rail">
                <ul className="hub-header">
                    <li className="hub-header__key">Player</li>
                    { 
                        attrOrder.map(key => {
                            let clsName = 'hub-header__key'

                            if (currentSortKey === key) {
                                clsName = `${clsName} hub-header__key--active hub-header-key--${currentSortOrder}`;
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
    return bindActionCreators( { getPlayers, updateSortOrder }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Hub);