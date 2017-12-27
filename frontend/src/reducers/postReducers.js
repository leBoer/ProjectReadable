import {
    REQUEST_POSTS,
    RECEIVE_POSTS,
    POST_NEW_POST,
    RECEIVE_NEW_POST,
    RECEIVE_POST,
    REQUEST_POST,
    REQUEST_DELETE_POST_SUCCESS,
} from '../actions/postActions'

export function posts(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: [],
        item: [],
    },
    action
) {
    switch (action.type) {
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        case REQUEST_POST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POST:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                item: action.post,
                lastUpdated: action.receivedAt
            })
        case REQUEST_DELETE_POST_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                item: [],
            })
        default:
            return state
    }
}

export function newPost(
    state = {
        isFetching: false,
        didInvalidate: false,
        post: {},
    },
    action
) {
    switch (action.type) {
        case POST_NEW_POST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            })
        case RECEIVE_NEW_POST:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                post: action.post,
                lastUpdated: action.receivedAt,
            })
        default:
            return state
    }
}