import {
    REQUEST_CATEGORIES,
    RECEIVE_CATEGORIES,
} from '../actions/categoryActions';

export function categories(
    state = {
        isFetching: false,
        didInvalidate: false,
        items: [],
    },
    action
) {
    switch (action.type) {
        case REQUEST_CATEGORIES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            });
        case RECEIVE_CATEGORIES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.categories,
                lastUpdated: action.receivedAt,
            });
        default:
            return state;
    }
}
