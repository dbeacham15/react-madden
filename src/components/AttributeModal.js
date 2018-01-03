import React from 'react';
import { Line } from 'react-chartjs-2';
import '../styles/AttributeModal.css';

export default (props) => (
    <div className="attribute-modal">
        <div className="attribute-modal__content">
            <label>{ props.label }</label>
        </div>
    </div>
);