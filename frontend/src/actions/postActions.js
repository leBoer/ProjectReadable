export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const POST_NEW_POST = 'POST_NEW_POST';
export const RECEIVE_NEW_POST = 'RECEIVE_NEW_POST';
export const REQUEST_POST = 'REQUEST_POST';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REQUEST_DELETE_POST = 'REQUEST_DELETE_POST';
export const REQUEST_DELETE_POST_SUCCESS = 'REQUEST_DELETE_POST_SUCCESS';
export const REQUEST_UPDATE_POST = 'REQUEST_UPDATE_POST';
export const REQUEST_VOTE_POST = 'REQUEST_VOTE_POST';
export const RECEIVE_VOTE_POST = 'RECEIVE_VOTE_POST';
export const RECEIVE_POST_FAILED = 'RECEIVE_POST_FAILED';

function requestPosts() {
    return {
        type: REQUEST_POSTS,
    }
}

function requestPost() {
    return {
        type: REQUEST_POST,
    };
}

function requestDeletePost() {
    return {
        type: REQUEST_DELETE_POST,
    };
}

function requestUpdatePost() {
    return {
        type: REQUEST_UPDATE_POST,
    };
}

function requestVotePost() {
    return {
        type: REQUEST_VOTE_POST,
    };
}

function requestPostDeletePostSuccess() {
    return {
        type: REQUEST_DELETE_POST_SUCCESS,
        receivedAt: Date.now()
    };
}

function receivePosts(json) {
    return {
        type: RECEIVE_POSTS,
        posts: json,
        receivedAt: Date.now()
    };
}

function receivePost(json) {
    if (json.id) {
        return {
            type: RECEIVE_POST,
            post: json,
            receivedAt: Date.now()
        };
    }
    return {
        type: RECEIVE_POST_FAILED
    }
}

function postNewPosts() {
    return {
        type: POST_NEW_POST,
    };
}

function receiveNewPost(json) {
    return {
        type: RECEIVE_NEW_POST,
        post: json,
        receivedAt: Date.now()
    };
}

function receiveVotePost(json) {
    return {
        type: RECEIVE_VOTE_POST,
        post: json,
        receivedAt: Date.now()
    };
}

export function updatePost(id, payload) {
    return dispatch => {
        dispatch(requestUpdatePost);
        return fetch(`http://localhost:3001/posts/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: 'something',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(json => dispatch(receivePost(json)))
            .catch(json => { console.error(json) });
    };
}

export function votePost(id, payload) {
    return dispatch => {
        dispatch(requestVotePost);
        return fetch(`http://localhost:3001/posts/${id}`, {
            method: 'POST',
            headers: {
                Authorization: 'something',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(json => dispatch(receiveVotePost(json)))
            .catch(json => { console.error(json) });
    };
}

export function postNewPost(payload) {
    return dispatch => {
        dispatch(postNewPosts);
        return fetch(`http://localhost:3001/posts`, {
            method: 'POST',
            headers: {
                Authorization: 'something',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(json => dispatch(receiveNewPost(json)))
            .catch(json => { console.error(json) });
    };
}

function fetchPosts(dispatch) {
    return dispatch => {
        dispatch(requestPosts);
        return fetch(`http://localhost:3001/posts`, {
            headers: {
                Authorization: 'something'
            }
        })
            .then(response => response.json())
            .then(json => dispatch(receivePosts(json)))
            .catch(json => { console.error(json) });
    };
}

export function fetchPost(id) {
    return dispatch => {
        dispatch(requestPost);
        return fetch(`http://localhost:3001/posts/${id}`, {
            headers: {
                Authorization: 'something'
            }
        })
            .then(response => response.json())
            .then(json => dispatch(receivePost(json)))
            .catch(json => { console.error(json)} );
    };
}

export function deletePost(id) {
    return dispatch => {
        dispatch(requestDeletePost);
        return  fetch(`http://localhost:3001/posts/${id}`, {
            headers: {
                Authorization: 'something'
            },
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(json => dispatch(requestPostDeletePostSuccess(json)))
            .catch(json => { console.error(json) });
    };
}

function shouldFetchPosts(posts) {
    if (!posts) {
        return true;
    } else if (posts.items.length <= 1) {
        return true;
    } else if (posts.isFetching) {
        return false;
    } else {
        return posts.didInvalidate
    }
}

export function fetchPostsIfNeeded(posts) {
    return dispatch => {
        if (shouldFetchPosts(posts)) {
            dispatch(fetchPosts(dispatch));
        }
    }
}