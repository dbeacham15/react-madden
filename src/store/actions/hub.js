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
export const getPlayers = (
    entityType = 'madden18_player', 
    filter = 'iteration:15',
    attr = 'ovr_rating', 
    limit = 25, 
    offset = 0, 
    sort = 'DESC'
) => {
    return dispatch => { 
        axios.get(' https://www.easports.com/madden-nfl/ratings/service/data', {
            params: {
                'entityType': entityType,
                'filter': filter,
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
        //GetPlayers With New Sort Order
    };
}

const _updateSortKey = key => {
    return {
        type: actionTypes.UPDATE_SORT_KEY,
        payload: key
    };
}

/**
 * Action Creator for Updating Sort Key
 * 
 * @param {*} key 
 */
export const updateSortKey = key => {
    return (dispatch, getState) => {
        const ratingKey = `${attrs[key].ratingKey}_rating`;
        dispatch(getPlayers(undefined, undefined, ratingKey));
        dispatch(_updateSortKey(key));
    }
}

/**
 *  Action Creator for Searching Player Hub
 * 
 * @param {*} searchValue 
 */
export const searchPlayers = searchValue => {
    return dispatch => {
        dispatch(_triggerLoading());
        const filter = `iteration:15 AND ((firstName: ${searchValue}* OR lastName: ${searchValue}*))`;
        
        dispatch(getPlayers(undefined, filter));
        // Run Search Commands
    }
}

const _triggerLoading = () => {
    return {
        type: actionTypes.UPDATE_HUB_LOADING,
        payload: true
    };
}