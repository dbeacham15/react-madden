import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import App from '../App';
import Hub from '../containers/Hub';
import Compare from '../containers/Compare';

export default () => {
    return (
        <header className="header">
            <div className="header__content">
                <label className="header__eyebrow">Madden Nfl 18</label>
                <h1>Ratings Hub</h1>
            </div>
            <nav className="navigation">
                <Link 
                    to="/" 
                    className="navigation__link" 
                >
                    Home
                </Link>
                <Link 
                    to="/hub" 
                    className="navigation__link" 
                >
                    Database
                </Link>
                <Link 
                    to="/compare"
                    className="navigation__link" 
                >
                    Compare Players
                </Link>
            </nav>
        </header>
    )
}