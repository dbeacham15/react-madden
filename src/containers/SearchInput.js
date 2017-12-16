import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchPlayers } from '../store/actions/hub';

import '../styles/SearchInput.css';

class SearchInput extends Component {
    constructor() {
        super();
        
        this.state = {
            value: ''
        };
    }

    /**
     * Controls the Input State
     * 
     * @param {*} evt 
     */
    _handleValueChange(evt) {
        this.setState({
            value: evt.target.value,
            error: false
        });
    }

    /**
     *  Submits the Search Value
     * 
     * @param {*} evt 
     */
    _handleSubmit(evt) {
        evt.preventDefault();
        
        // Only search if there are legitimate Values
        if (this.state.value.length < 3) {
            this.setState({
                error: true
            });
            return;
        }

        //Call search Action
        this.props.searchPlayers(this.state.value);
        // Reset the Input on Search
        this.setState({
            error: false
        });
    }
    render() {
        let clsName = 'search-input';
        if (this.state.error) {
            clsName = `${clsName} search-input--error`;
        }

        if (this.props.loading) {
            clsName = `${clsName} search-input--loading`;
        }

        return (
            <form className={ clsName }>
                <input 
                    type="text"
                    className="search-input__text"
                    placeholder="Search Players"
                    value={ this.state.value } 
                    onChange={ this._handleValueChange.bind(this) }/>
                <a className="search-input__submit" onClick={ this._handleSubmit.bind(this) }>
                    <svg viewBox="0 0 24 24">
                        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.43,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.43C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,14C11.11,14 12.5,13.15 13.32,11.88C12.5,10.75 11.11,10 9.5,10C7.89,10 6.5,10.75 5.68,11.88C6.5,13.15 7.89,14 9.5,14M9.5,5A1.75,1.75 0 0,0 7.75,6.75A1.75,1.75 0 0,0 9.5,8.5A1.75,1.75 0 0,0 11.25,6.75A1.75,1.75 0 0,0 9.5,5Z" />
                    </svg>
                </a>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.hub.loading
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ searchPlayers }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);