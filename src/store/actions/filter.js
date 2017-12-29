import * as actionTypes from '../actions/actionTypes';
import { getPlayers } from './hub';

const _updateFilterPositions = positions => {
    return {
        type: actionTypes.UPDATE_FILTER_POSITIONS,
        payload: positions
    };
}

export const updateFilterPositions = (option) => {
    return (dispatch, getState) => {
        const positions = [...getState().filter.positions];
        
        if (positions.includes(option)) {
          const index = positions.findIndex(x => x === option); 
          
          positions.splice(index, 1);
        } else {
            positions.push(option);
        }

        dispatch(_updateFilterPositions(positions));
    }
}

const _updateFilterTeams = teams => {
    return {
        type: actionTypes.UPDATE_FILTER_TEAMS,
        payload: teams
    };
}

export const updateFilterTeams = team => {
    return (dispatch, getState) => {
        const teams = [...getState().filter.teams];

        if (teams.includes(team)) {
            const index = teams.findIndex(x => x === team);
            
            teams.splice(index, 1);
        } else {
            teams.push(team);
        }

        dispatch(_updateFilterTeams(teams));
    }
}

/**
 * Resets all the Filter Selections
 */
export const resetFilter = () => {
    return dispatch => {
        dispatch(_updateFilterTeams([]));
        dispatch(_updateFilterPositions([]));
    }
}

/**
 * Action to use Filter Options to perform Search against the Hub
 */
export const applyFilters = () => {
    return (dispatch, getState) => {
        const filterOptions = getState().filter;
        let query = 'iteration:15';

        if (filterOptions.teams.length) {
            const teamOptions = filterOptions.teams.join(' OR ');
            
            query = `${query} AND teamId:((${teamOptions}))`;
        }

        if (filterOptions.positions.length) {
            const positionOptions = filterOptions.positions.join(' OR ');
            query = `${query} AND position:((${positionOptions}))`;
        }
        
        dispatch(getPlayers(undefined, query));
    }
}