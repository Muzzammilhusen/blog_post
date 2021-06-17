import _ from 'lodash';
import jsonplaceholder from '../apis/jsonPlaceholder';

export const fetchPostAndUsers = () => async (dispatch, getState) => {        // getState is for get state data from store
    // console.log("About to fetch!");// first consolelog before api call
    await dispatch(fetchPosts());
    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // console.log(userIds);
    userIds.forEach(id => dispatch(fetchUser(id)));

    // console.log(getState().posts); // post data object
    // console.log("Fetched posts!");//after all data get from api then this wil consolelog(that's async-await works)
};

export const fetchPosts = () => async dispatch => {
    const response = await jsonplaceholder.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response.data })
};

export const fetchUser = (id) => async dispatch => {
    const response = await jsonplaceholder.get(`/users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data });
};


//refactored version is above its non  memoize, below one is memoize version
// export const fetchUser = (id) => dispatch => {
//     _fetchUser(id, dispatch);
// };
// const _fetchUser = _.memoize(async (id, dispatch) => {         // here library "lodash" used for reduce network request offetch user from 100 times to 10 time.effectively qorking
//     const response = await jsonplaceholder.get(`/users/${id}`);
//     dispatch({ type: 'FETCH_USER', payload: response.data });
// });




//refactored code is above as ES6, and below one is original
 //export const fetchPosts = () => {
//     return async function (dispatch, getState) {                   // we are not using getState right now so not include in above code
//         const response = await jsonplaceholder.get('/posts');

//         dispatch({ type: 'FETCH_POSTS', payload: response })
//     }

// };