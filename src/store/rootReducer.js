import { combineReducers } from 'redux';
import hub from './reducers/hub';
import currentPlayer from './reducers/currentPlayer';

export default combineReducers({
    hub,
    currentPlayer
});