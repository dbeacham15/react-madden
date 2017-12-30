import * as actionTypes from '../actions/actionTypes';

const initialState = {
    activeFilter: false,
    currentSortKey: 'ovr',
    currentSortOrder: 'DESC',
    entityType: 'madden18_player',
    userFilter: '',
    isSearch: false,
    iteration: '15',
    loading: true,
    playerCount: 0,
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
        case actionTypes.UPDATE_IS_SEARCH :
            return {
                ...state,
                isSearch: action.payload
            };
        case actionTypes.SET_ITERATION :
            return {
                ...state,
                iteration: action.payload
            };
        case actionTypes.SET_ENTITY_TYPE :
            return {
                ...state,
                entityType: action.payload
            };
        case actionTypes.SET_USER_FILTER :
            return {
                ...state,
                userFilter: action.payload
            };
        case actionTypes.SET_PLAYER_COUNT :
            return {
                ...state,
                playerCount: action.payload
            };
        case actionTypes.DISPLAY_FILTER :
            return {
                ...state,
                activeFilter: action.payload
            };
        case actionTypes.GET_PLAYERS :
            return {
                ...state,
                players: action.payload,
                loading: false
            };
        case actionTypes.UPDATE_SORT_ORDER :
            return {
                ...state,
                currentSortOrder: action.payload,
                loading: true
            };
        case actionTypes.UPDATE_SORT_KEY :
            return {
                ...state,
                currentSortKey: action.payload,
                loading: true
            };
        case actionTypes.UPDATE_HUB_LOADING :
            return {
                ...state,
                loading: action.payload
            };
    default :
        return state;
    }
}