import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as hubActions from '../store/actions/hub';
import HubPlayer from './HubPlayer';
import attributes from '../maps/attributes';
import '../styles/Hub.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import LoadingIndicator from '../components/LoadingIndicator';
import SearchInput from './SearchInput';
import FilterModal from './FilterModal';
import Header from '../components/Header';
import AttributeModal from '../components/AttributeModal';

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

    /**
     * Sets up the Scrolling Steps
     */
    componentDidMount() {
       /* const attrTable = document.querySelector('.hub-table__attributes');
        const stepsVisible = Math.floor(attrTable.getBoundingClientRect().width / this.state.scrolling.stepWidth);
        const total = this.props.hub.attrOrder.length;
        const steps = total - stepsVisible; 
        
        const scrolling = {
            ...this.state.scrolling,
            steps
        };

        this.setState({
            scrolling
        });*/
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
        const { players, currentSortKey } = this.props.hub;

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
        return this.props.hub.players.map(player => {console.log(player);
            return (
                <Link to={ `/player/${player.primaryKey}`} className="hub-player-card" key={`hub-player-${player.id}`}>
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
                </Link>
            );
        });
    }

    _handleAttributeListItemClick(evt) {
        this.props.displayAttributeModal(true);
    }

    _renderPlayerAttributes(player) {
        return this.props.hub.attrOrder.map(attr => {
        
            const ratingK = `${attributes[attr].ratingKey}_rating`;
            const diffKey = `${attributes[attr].ratingKey}_diff`;
            const diff = parseInt(player[diffKey], 10);
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
                    onClick={ this._handleAttributeListItemClick.bind(this) }
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

    _handleFilterClick(evt) {
        this.props.displayFilter(true);
    }

    _renderFilterModal() {
        if (this.props.hub.activeFilter) {
            return (
                <FilterModal />
            )
        }
    }

    _renderLoadingIndicator() {
        if (!this.props.hub.loading) {
            return; 
        }
        return (
            <div className="hub-table__loading-indicator">
                <LoadingIndicator />
            </div>
        )
    }

    _renderPlayerTable() {
        const baseClsName = 'hub-table';
        let clsName = baseClsName;

        if (this.props.hub.loading) {
            clsName = `${clsName} ${baseClsName}--loading`;

        }
        return (
            <div className={ clsName }>
                { this._renderLoadingIndicator() }
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
        )
    }

    _renderPagination() {
        if (this.props.hub.playerCount > this.props.pagination.numberRows) {
            return (
                <div className="hub-pagination">
                     <Pagination 
                        rows={ this.props.pagination.numberRows }
                        current={ this.props.pagination.currentPage }
                        count={ this.props.hub.playerCount }
                     />
                </div>
            );
        }
    }

    _scrollToTop(evt) {
        evt.preventDefault();
        const table = document.querySelector('.hub');
        const offset = table.offsetTop - 60;

        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: offset,
        });
    }

    render() {
        let clsName = 'hub rail';

        if (this.props.hub.loading) {
            clsName = `${clsName} hub--loading`;
        }

        return  (
            <div>
                <Header />
                <section className={ clsName }>
                    <div className="hub-filtering">
                        <div 
                            className="hub-filter"
                            onClick={ this._handleFilterClick.bind(this) } 
                            title="filter"
                        >
                            <svg viewBox="0 0 24 24">
                                <path d="M3,2H21V2H21V4H20.92L14,10.92V22.91L10,18.91V10.91L3.09,4H3V2Z" />
                            </svg>
                        </div>
                        <SearchInput />
                        { this._renderPagination() }
                    </div>

                    { this._renderPlayerTable() }
                    <a className="hub-to-top"  onClick={ this._scrollToTop.bind(this) }>
                        Back to Top
                        <svg viewBox="0 0 24 24">
                            <path d="M7,15L12,10L17,15H7Z" />
                        </svg>
                    </a>
                    { this._renderFilterModal() }
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        hub: state.hub,
        pagination: state.pagination
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators( { ...hubActions }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hub));