import React from 'react';
import '../styles/Hero.css';

export default ({ props }) => {
    return (
        <div className="hero">
            <div className="hero__bg">
                <img 
                    src="//media.contentapi.ea.com/content/dam/ea/easports/madden/home/hero-images/2017/oct/17/potw/weekly-plays_tout_medium-lg-2x.jpg" 
                    className="hero__bg-img" />
            </div>
            <div className="hero__content">
                <label>Madden NFL: Week 13</label>
                <h1>Ratings Hub</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac sapien sed enim vehicula molestie. Proin vestibulum, elit et tincidunt facilisis, lacus nibh luctus nunc, ut sollicitudin sem nisl lacinia nunc.</p>
            </div>
        </div>
    );
}