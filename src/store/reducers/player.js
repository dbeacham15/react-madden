import * as actionTypes from '../actions/actionTypes';

const initialState = {
    playerInfo: {},
    attributeModalData: [],
    attributeModalTitle: ''
};

export default function currentPlayer(state = initialState, action) {
    switch(action.type) {
        case actionTypes.ATTRIBUTE_MODAL_TITLE :
            return {
                ...state,
                attributeModalTitle: action.payload
            };
        case actionTypes.GET_SINGLE_PLAYER :
            return {
                ...state,
                playerInfo: action.payload
            };
        case actionTypes.ATTRIBUTE_MODAL_DATA :
            return {
                ...state,
                attributeModalData: action.payload
            };
        default : 
            return state;
    }
}