import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';
import attributes from '../../maps/attributes';

const RATINGS_API = 'https://www.easports.com/madden-nfl/ratings/service/data';

const _getPlayerInformation = info => {
    return {
        type: actionTypes.GET_SINGLE_PLAYER,
        payload: info
    };
}

const _setCurrentAttributeTitle = (attribute) => {
    let title = '';
    
    if (attribute) {
        title = attributes[attribute].label || '';
    }

    return {
        type: actionTypes.ATTRIBUTE_MODAL_TITLE,
        payload: title
    }
}

const _setCurrentAttribute = (attribute, docs) => {
    const key = `${attributes[attribute].ratingKey}_rating`;
    const ratings = docs.map(doc => doc[key]);
    
    return {
        type: actionTypes.ATTRIBUTE_MODAL_DATA,
        payload: ratings
    };
}

const _clearCurrentAttributes = () => {
    return {
        type: actionTypes.ATTRIBUTE_MODAL_DATA,
        payload: []
    };
}

export const getPlayerInformation = (playerId, isAttribute = false, attrName) => {
    return dispatch => {
        axios.get(RATINGS_API, {
            params: {
                entityType: 'madden18_player',
                sort: 'iteration:ASC',
                filter: `iteration:* AND primaryKey:${playerId}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                if (!isAttribute) {
                    dispatch(_getPlayerInformation(response.data.docs));       
                } else {
                    dispatch(_setCurrentAttributeTitle(attrName));
                    dispatch(_setCurrentAttribute(attrName, response.data.docs));
                }
            }
        }) 
        .catch(err => {
            console.error('Err:', err);
        });
    }
}

export const clearCurrentAttribute = () => {
    return dispatch => {
        dispatch(_setCurrentAttributeTitle(false));
        dispatch(_clearCurrentAttributes());
    }
}
