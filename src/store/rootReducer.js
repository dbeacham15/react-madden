import { combineReducers } from 'redux';
import hub from './reducers/hub';
import player from './reducers/player';
import filter from './reducers/filter';
import pagination from './reducers/pagination';

export default combineReducers({
    hub,
    player,
    filter,
    pagination
});