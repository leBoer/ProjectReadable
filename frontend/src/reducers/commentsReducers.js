import {
    RECEIVE_COMMENTS,
    RECEIVE_VOTE_COMMENT,
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
        default:
            return state;
    }
}