import { combineReducers } from 'redux';
import hub from './reducers/hub';
import currentPlayer from './reducers/currentPlayer';
import filter from './reducers/filter';

export default combineReducers({
    hub,
    currentPlayer,
    filter
});