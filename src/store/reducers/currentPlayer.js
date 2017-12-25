import * as actionTypes from '../actions/actionTypes';

const initialState = {
    playerInfo: {}
};

export default function currentPlayer(state = {}, action) {
    switch(action.type) {
        case actionTypes.GET_SINGLE_PLAYER :
            return {
                ...state,
                playerInfo: action.payload
            }
        default : 
            return state;
    }
}