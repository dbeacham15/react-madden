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

export default connect()(Compare);