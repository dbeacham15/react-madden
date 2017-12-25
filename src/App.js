import React, { Component } from 'react';
import SocialBar from './containers/SocialBar';
import './styles/App.css';

import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SocialBar />
        { this.props.children }
      </div>
    );
  }
}

export default App;
