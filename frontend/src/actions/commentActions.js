export const REQUEST_COMMENTS = 'REQUEST_COMMENTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const REQUEST_VOTE_COMMENT = 'REQUEST_VOTE_COMMENT';
export const RECEIVE_VOTE_COMMENT = 'RECEIVE_VOTE_COMMENT';

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
