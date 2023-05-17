import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import listings from './listings';
import auth from './auth';
import users from './users';

const reducer = combineReducers({
  auth,
  listings,
  users,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './listings';
export * from './users';
