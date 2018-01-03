import React from 'react';

export default (props) => (
    <div className="player-page__demo">
        <div className="player-page__demo-column">
            <label>Height</label>
            <h4 className="player-page__demo-attribute">{ props.height }</h4>
        </div>
        <div className="player-page__demo-column">
            <label>Weight</label>
            <h4 className="player-page__demo-attribute">{ props.weight }<small>lbs</small></h4>
        </div>
        <div className="player-page__demo-column">
            <label>Experience</label>
            <h4 className="player-page__demo-attribute">{ props.experience }<small>years</small></h4>
        </div>
        <div className="player-page__demo-column">
            <label>College</label>
            <h4 className="player-page__demo-attribute">{props.college }</h4>
        </div>
    </div>
)