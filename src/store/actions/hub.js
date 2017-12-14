import * as actionTypes from '../actions/actionTypes';
import attrs  from '../../maps/attributes';
import axios from 'axios';

const _savePlayers = ( res ) => {
    return {
        type: actionTypes.GET_PLAYERS,
        payload: res
    };
}
/**
 * Retrieve All the Players for Hub
 */
export const getPlayers = (attr = 'ovr_rating', limit = 25, offset = 0, sort = 'DESC') => {
    return dispatch => {
        axios.get(' https://www.easports.com/madden-nfl/ratings/service/data', {
            params: {
                'entityType': 'madden18_player',
                'filter': 'iteration:15',
                'sort': `${attr}:${sort}`,
                limit
            }
        })
        .then((response) => {
            if (response.status === 200) {
                dispatch(_savePlayers(response.data.docs));
            }
        })
        .catch((err) => {
            console.log('Error', err);
        });
    };
}

const _updateSortOrder = (order) => {
    return {
        type: actionTypes.UPDATE_SORT_ORDER,
        payload: order
    }
}

export const updateSortOrder = (current) => {
    return (dispatch, getState) => {
        const newVal = (current === 'desc') ? 'asc' : 'desc';

        dispatch(_updateSortOrder(newVal));
        getPlayers();
    };
}