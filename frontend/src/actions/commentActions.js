export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REQUEST_VOTE_COMMENT = 'REQUEST_VOTE_COMMENT';
export const RECEIVE_VOTE_COMMENT = 'RECEIVE_VOTE_COMMENT';
export const REQUEST_POST_COMMENT = 'REQUEST_POST_COMMENT';
export const RECEIVE_POST_COMMENT = 'RECEIVE_POST_COMMENT';
export const REQUEST_DELETE_COMMENT = 'REQUEST_DELETE_COMMENT';
export const RECEIVE_DELETE_COMMENT = 'RECEIVE_DELETE_COMMENT';
export const REQUEST_UPDATE_COMMENT = 'REQUEST_UPDATE_COMMENT';
export const RECEIVE_UPDATE_COMMENT = 'RECEIVE_UPDATE_COMMENT';

function requestComments() {
    return {
        type: REQUEST_COMMENTS,
    };
}

function requestVoteComment() {
    return {
        type: REQUEST_VOTE_COMMENT,
    };
}

function requestPostComment() {
    return {
        type: REQUEST_POST_COMMENT,
    };
}

function requestDeleteComment() {
    return {
        type: REQUEST_DELETE_COMMENT,
    };
}

function requestUpdateComment() {
    return {
        type: REQUEST_UPDATE_COMMENT,
    };
}

function receiveVoteComment(json) {
    return {
        type: RECEIVE_VOTE_COMMENT,
        comment: json,
        receivedAt: Date.now()
    };
}

function receiveComments(json) {
    return {
        type: RECEIVE_COMMENTS,
        comments: json,
        receivedAt: Date.now()
    };
}

function receivePostComment(json) {
    return {
        type: RECEIVE_POST_COMMENT,
        comment: json,
        receivedAdt: Date.now()
    };
}

function receiveDeleteComment(json) {
    return {
        type: RECEIVE_DELETE_COMMENT,
        comment: json,
        receivedAt: Date.now()
    };
}

function receiveUpdateComment(json) {
    return {
        type: RECEIVE_UPDATE_COMMENT,
        comment: json,
        receivedAt: Date.now()
    };
}

export function voteComment(id, payload) {
    return dispatch => {
        dispatch(requestVoteComment);
        return fetch(`http://localhost:3001/comments/${id}`, {
            method: 'POST',
            headers: {
                Authorization: 'something',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(json => dispatch(receiveVoteComment(json)))
            .catch(json => { console.error(json) });
    };
}

export function postComment(payload) {
    return dispatch => {
        dispatch(requestPostComment);
        return fetch(`http://localhost:3001/comments`, {
            method: 'POST',
            headers: {
                Authorization: 'something',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(json => dispatch(receivePostComment(json)))
            .catch(json => { console.error(json) });
    };
}

export function updateComment(id, payload) {
    return dispatch => {
        dispatch(requestUpdateComment);
        return fetch(`http://localhost:3001/comments/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: 'something',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(json => dispatch(receiveUpdateComment(json)))
            .catch(json => { console.error(json) });
    };
}

export function deleteComment(id) {
    return dispatch => {
        dispatch(requestDeleteComment);
        return fetch(`http://localhost:3001/comments/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'something',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(json => dispatch(receiveDeleteComment(json)))
            .catch(json => { console.error(json) });
    };
}

export function fetchComments(id) {
    return dispatch => {
        dispatch(requestComments);
        return fetch(`http://localhost:3001/posts/${id}/comments`, {
            headers: {
                Authorization: 'something'
            }
        })
            .then(response => response.json())
            .then(json => dispatch(receiveComments(json)))
            .catch(json => { console.error(json) });
    };
}
