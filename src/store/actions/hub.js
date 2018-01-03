import * as actionTypes from '../actions/actionTypes';
import attrs  from '../../maps/attributes';
import axios from 'axios';

const _savePlayerCount = count => {
    return {
        type: actionTypes.SET_PLAYER_COUNT,
        payload: count
    };
};

const _savePlayers = ( res ) => {
    return {
        type: actionTypes.GET_PLAYERS,
        payload: res
    };
}
/**
 * Retrieve Players based on User Directives
 */
export const getPlayers = () => {
    return (dispatch, getState) => { 
        const { currentSortKey, currentSortOrder, entityType, iteration, userFilter } = getState().hub;
        const { numberRows, currentPage } = getState().pagination;
        
        const params = {
            entityType,
            offset: (currentPage -1) * numberRows,
            filter: `iteration:${iteration}${userFilter}`,
            limit: numberRows,
            sort: `${currentSortKey}_rating:${currentSortOrder}`
        };

        axios.get(' https://www.easports.com/madden-nfl/ratings/service/data', {
            params
        })
        .then((response) => { 
            if (response.status === 200) {
                dispatch(_savePlayers(response.data.docs));
                dispatch(_savePlayerCount(response.data.count));
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
        dispatch(_triggerLoading());
        dispatch(getPlayers(ratingKey));
        dispatch(_updateSortKey(key));
    }
}

const _updateIsSearch = val => {
    return {
        type: actionTypes.UPDATE_IS_SEARCH,
        payload: val
    };
}
/**
 *  Action Creator for Searching Player Hub
 * 
 * @param {*} searchValue 
 */
export const searchPlayers = searchValue => {
    return dispatch => {
        dispatch(_triggerLoading());
        let filter = '';
       
        if (searchValue) {
            filter = ` AND ((firstName: ${searchValue}* OR lastName: ${searchValue}*))`;
            dispatch(_updateIsSearch(true));
        } else {
            dispatch(_updateIsSearch(false));
        }
        
        dispatch(_setUserFilter(filter));
        dispatch(getPlayers());
    }
}

export const _triggerLoading = () => {
    return {
        type: actionTypes.UPDATE_HUB_LOADING,
        payload: true
    };
}

/** Update Filter Displays  */
const _displayFilter = val => {
    return {
        type: actionTypes.DISPLAY_FILTER,
        payload: val
    };
};

export const displayFilter = val => {
    return dispatch => {
        dispatch(_displayFilter(val));
    }
}

/** Update Entity Type  */
const _setEntityType = entityType =>{
    return {
        type: actionTypes.SET_ENTITY_TYPE,
        payload: entityType
    };
}

export const setEntityType = entityType => {
    return dispatch => {
        dispatch(_setEntityType(entityType));
    }
}

/** UPDATE ITERATION */

const _setIteration = iteration => {
    return {
        type: actionTypes.SET_ITERATION,
        payload: iteration
    };
}

export const setIteration = iteration => {
    return dispatch => {
        dispatch(_setIteration(iteration));
    }
}

/** UPDATE THE USER FILTER */
const _setUserFilter = filter => {
    return {
        type: actionTypes.SET_USER_FILTER,
        payload: filter
    };
}

/** Display Attribute Modal  */
const _displayAttributeModal = isDisplayed => {
    return {
        type: actionTypes.DISPLAY_ATTRIBUTE_MODAL,
        payload: isDisplayed
    };
}

export const displayAttributeModal = isDisplayed => {
    return dispatch => {
        dispatch(_displayAttributeModal(isDisplayed));
    };
}