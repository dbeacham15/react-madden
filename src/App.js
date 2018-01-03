import React, { Component } from 'react';
import SocialBar from './containers/SocialBar';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SocialBar />
        { this.props.children }
      </div>
    );
  }
}

export default App;
