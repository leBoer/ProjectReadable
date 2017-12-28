import {
    RECEIVE_COMMENTS,
    RECEIVE_VOTE_COMMENT,
    RECEIVE_POST_COMMENT,
    RECEIVE_DELETE_COMMENT,
    RECEIVE_UPDATE_COMMENT,
} from '../actions/commentActions';

export function comments(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: [],
        item: [],
    },
    action
) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.comments,
                lastUpdated: action.receivedAt
            });
        case RECEIVE_VOTE_COMMENT:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                item: action.comment,
                items: state.items.map(
                    (item) => item.id === action.comment.id
                    ? {...item, voteScore: action.comment.voteScore}
                    : item
                ),
            });
        case RECEIVE_POST_COMMENT:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                lastUpdated: action.receivedAt,
                items: state.items.concat(action.comment),
            });
        case RECEIVE_DELETE_COMMENT:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: state.items.filter(
                    item => item.id !== action.comment.id
                ),
            });
        case RECEIVE_UPDATE_COMMENT:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                item: action.comment,
                items: state.items.map(
                    (item) => item.id === action.comment.id
                    ? {...item, body: action.comment.body}
                    : item
                ),
            });
        default:
            return state;
    }
}