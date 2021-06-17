import { combineReducers } from 'redux';
import postsReducers from './postsReducer';
import usersReducers from './usersReducers';


export default combineReducers({
    posts: postsReducers,
    users: usersReducers
});