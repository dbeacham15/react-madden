import React, { Component } from 'react';
import { connect } from 'react-redux';

class Compare extends Component {
    render() {
        return  (
            <section>
                <h1>Compare STUFF</h1>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentPlayers: state.currentPlayers
    };
};
const mapDispatchToProps = dispatch => {
    return {
        //retrievePlayers: () => dispatch()
    }
}

export default connect()(Compare);