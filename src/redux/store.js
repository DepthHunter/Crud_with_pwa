import { createStore, applyMiddleware, compose } from 'redux'; 
import {thunk} from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('expenses');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('expenses', serializedState);
  } catch {
  }
};

const persistedState = loadState();

const middleware = [thunk, logger];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);

store.subscribe(() => {
  saveState({
    expenses: store.getState().expenses
  });
});

export default store;
