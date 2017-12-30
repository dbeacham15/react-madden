import { combineReducers } from 'redux';
import hub from './reducers/hub';
import currentPlayer from './reducers/currentPlayer';
import filter from './reducers/filter';
import pagination from './reducers/pagination';

export default combineReducers({
    hub,
    currentPlayer,
    filter,
    pagination
});