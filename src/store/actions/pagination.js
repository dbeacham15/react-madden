import * as actionTypes from '../actions/actionTypes';
import { getPlayers, _triggerLoading } from '../actions/hub';

const _setCurrentPage = (page) => {
    return {
        type: actionTypes.SET_CURRENT_PAGE,
        payload: page
    };
}

export const setCurrentPage = page => {
    return dispatch => {
        dispatch(_triggerLoading(true));
        dispatch(_setCurrentPage(page));
        dispatch(getPlayers());
    }
}

/** Upddate the Rows Displayed in Hub */
const _updateNumberRows = val => {
    return {
        type: actionTypes.UPDATE_NUMBER_ROWS,
        payload: val
    };
}

export const updateNumberRows = val => {
    return dispatch => {
        dispatch(_triggerLoading(true));
        dispatch(_setCurrentPage(1));
        dispatch(_updateNumberRows(val));
        dispatch(getPlayers());
    }
}