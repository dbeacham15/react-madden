import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

const RATINGS_API = 'https://www.easports.com/madden-nfl/ratings/service/data';

const _getPlayerInformation = info => {
    return {
        type: actionTypes.GET_SINGLE_PLAYER,
        payload: info
    };
}

export const getPlayerInformation = playerId => {
    return dispatch => {
        //&filter=iteration:*%20AND%20primaryKey:10700
        axios.get(RATINGS_API, {
            params: {
                entityType: 'madden18_player',
                sort: 'iteration:ASC',
                filter: `iteration:* AND primaryKey:${playerId}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                dispatch(_getPlayerInformation(response.data.docs));
            }
        }) 
        .catch(err => {
            console.error('Err:', err);
        });
    }
}