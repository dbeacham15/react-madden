import * as actionTypes from '../actions/actionTypes';

const initialState = {
    currentSortKey: 'ovr',
    currentSortOrder: 'desc',
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
        case actionTypes.GET_PLAYERS :
            return {
                ...state,
                players: action.payload
        }
    default :
        return state

    }
}