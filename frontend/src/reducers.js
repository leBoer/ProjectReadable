import { combineReducers } from 'redux'
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES,
} from './actions'
import { posts, newPost } from './reducers/postReducers'

function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}


// function postsBySubreddit(state = {}, action) {
//   switch (action.type) {
//     case INVALIDATE_SUBREDDIT:
//     case RECEIVE_POSTS:
//     case REQUEST_POSTS:
//       return Object.assign({}, state, {
//         [action.subreddit]: posts(state[action.subreddit], action)
//       })
//     default:
//       return state
//   }
// }

function categories(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
  },
  action
) {
  switch(action.type) {
    case REQUEST_CATEGORIES:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false,
    })
    case RECEIVE_CATEGORIES:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.categories,
        lastUpdated: action.receivedAt,
      })
    default:
      return state
  }
}


const rootReducer = combineReducers({
  // postsBySubreddit,
  selectedSubreddit,
  categories,
  posts,
  newPost,
})

export default rootReducer