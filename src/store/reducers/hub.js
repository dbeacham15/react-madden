import * as actionTypes from '../actions/actionTypes';

const initialState = {
    activeFilter: false,
    currentSortKey: 'ovr',
    currentSortOrder: 'desc',
    loading: true,
    attrOrder: [
        'ovr',
        'awr',
        'acc',
        'spd',
        'agi',
        'str',
        'inj',
        'bcv',
        'car',
        'cit',
        'cth',
        'elu',
        'fmv',
        'pow',
        'ibl',
        'jkm',
        'jmp',
        'kpw',
        'ret',
        'prc',
        'pmv',
        'prs',
        'pur',
        'rte',
        'rbk',
        'spc'
    ],
    players:[]
}

export default function hub(state = initialState, action) {
    switch(action.type) {
        case actionTypes.DISPLAY_FILTER :
            return {
                ...state,
                activeFilter: action.payload
            }
        case actionTypes.GET_PLAYERS :
            return {
                ...state,
                players: action.payload,
                loading: false
            }
        case actionTypes.UPDATE_SORT_ORDER :
            return {
                ...state,
                currentSortOrder: action.payload,
                loading: true
            }
        case actionTypes.UPDATE_SORT_KEY :
            return {
                ...state,
                currentSortKey: action.payload,
                loading: true
            }
        case actionTypes.UPDATE_HUB_LOADING :
            return {
                ...state,
                loading: action.payload
            }
    default :
        return state;
    }
}