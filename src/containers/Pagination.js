import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateNumberRows, setCurrentPage } from '../store/actions/pagination';
import '../styles/Pagination.css';

class Pagination extends Component {
    constructor() {
        super();

        this.state = {
            rowValues: [
                20,40,60,80,100
            ],
            numberPages: 0
        }
    }

    _updatePagination() {
        const pages = Math.ceil(this.props.count / this.props.rows);
        const numberPages = [];

        for (let i = 1; i <= pages; i++) {
            numberPages.push(i);
        }

        this.setState({
            numberPages
        });
    }

    componentWillMount() {
        this._updatePagination();
    }

    componentWillReceiveProps(nextProps) {
        this._updatePagination();
    }

    _renderRowOption(val) {
        if (val === this.props.rows) {
            return (
                <option key={ val } value={ val } selected>{ val }</option>
            );
        }

        return (
            <option key={ val } value={ val }>{ val }</option>
        )
    }

    _handlePaginationRowSelectChange(evt) {
        this.props.updateNumberRows(parseInt(evt.currentTarget.value, 10));
    }

    _renderRowSelect() {
        return (
            <select 
                onChange={ this._handlePaginationRowSelectChange.bind(this) } 
                className="pagination-row-select__select">
               { this.state.rowValues.map(val =>{
                   return (
                       <option key={ val } value={ val }>{ val }</option>
                   )
               })}
            </select>
        )
    }

    _handlePageChange(evt) {
        this.props.setCurrentPage(evt.currentTarget.value);
    }

    _renderPageSelectOption(val) {
        if (val === this.props.currentPage) {
            return (
                <option key={ val } value={ val } selected>{ val }</option>
            );
        }

        return <option key={ val } value={ val }>{ val }</option>
    }

    _renderPageSelect() {
        return (
            <select onChange={ this._handlePageChange.bind(this) }>
                { this.state.numberPages.map(page=> (
                    this._renderPageSelectOption(page)
                ))}
            </select>
        )
    }

    _handlePaginationNavClick(evt) {
        const direction = evt.currentTarget.dataset.direction;
        let page = parseInt(this.props.current, 10);

        if (direction === 'next' && page < this.state.numberPages.length) {
            page++;
        }

        if (direction === 'previous' && page > 1) {
            page--;
        }

        this.props.setCurrentPage(page);
    }

    render() { console.log(this.props);
        return (
            <div className="pagination">
                <div className="pagination-pages">
                    <svg
                        className="pagination-pages__nav" 
                        data-direction="previous"
                        onClick={ this._handlePaginationNavClick.bind(this) }
                        viewBox="0 0 24 24">
                        <path d="M14,7L9,12L14,17V7Z" />
                    </svg>
                    <div className="pagination-pages__display">
                        page <span>{ this.props.current }</span> of <span>{ this.state.numberPages.length }</span>
                        { this._renderPageSelect() }
                    </div>
                    <svg
                        className="pagination-pages__nav" 
                        data-direction="next"
                        onClick={ this._handlePaginationNavClick.bind(this) }
                        viewBox="0 0 24 24">
                        <path d="M10,17L15,12L10,7V17Z" />
                    </svg>
                </div>
                <div className="pagination-row-select">
                    <label>rows:</label>
                    <span>{ this.props.rows }</span>
                    <svg viewBox="0 0 24 24" className="pagination-row-select__chevron">
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                    </svg>
                    { this._renderRowSelect() }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.hub.loading
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ updateNumberRows, setCurrentPage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);