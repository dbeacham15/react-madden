import React, { Component } from 'react';
import SocialBar from './containers/SocialBar';
import Header from './components/Header';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SocialBar />
        <Header />
        { this.props.children }
      </div>
    );
  }
}

export default App;
