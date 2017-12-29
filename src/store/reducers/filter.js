import * as actionTypes from '../actions/actionTypes';

const initialState = {
    positions: [],
    teams: []
};

export default function filter(state = initialState, action) {
    switch (action.type) {
        case actionTypes.UPDATE_FILTER_POSITIONS :
            return {
                ...state,
                positions: action.payload
            };
        case actionTypes.UPDATE_FILTER_TEAMS :
            return {
                ...state,
                teams: action.payload
            };
    default : 
        return state
    }
}