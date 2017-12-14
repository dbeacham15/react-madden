import React from 'react';
import '../styles/Card.css';


const card = (props) => {
    const teamId = parseInt(props.teamId, 10) - 1;
    return (
        <div className="card">
            <div className="card-content">
                <div className="card-content__front">
                    <div className="card-content__rating">
                        <h5>{ props.ratingOvr }</h5>
                    </div>
                    <img 
                        className="card-content__team-logo"
                        src={ `https://madden-assets-cdn.pulse.ea.com/madden18/logos/512/${teamId}.png` }
                        alt="" />
                    <img 
                        className="card-content__profile-asset"
                        src={ `https://madden-assets-cdn.pulse.ea.com/madden18/portraits/512/${props.portraitId}.png` }
                        alt="" />
                </div>
            </div>
            <div className="card-name">
                <h5 className="card-name__text">
                    { props.firstName }<span>{ props.lastName }</span>
                </h5>
                <h5 className="card-name__team">
                    { props.team }
                </h5>
            </div>
        </div>
    )
}

export default card;