import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { categories } from './reducers/categoryReducers';
import { posts, newPost } from './reducers/postReducers';
import { comments } from './reducers/commentsReducers';

const loggerMiddleware = createLogger()

const rootReducer = combineReducers({
  categories,
  posts,
  newPost,
  comments,
})

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}