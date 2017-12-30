import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentPage: 1,
    numberRows: 20
};

export default function pagination(state = initialState, action) {
    switch(action.type) {
        case actionTypes.SET_CURRENT_PAGE :
            return {
                ...state,
                currentPage: action.payload
            }
        case actionTypes.UPDATE_NUMBER_ROWS :
            return {
                ...state,
                numberRows: action.payload
            };
        default :
            return state;
    }
}