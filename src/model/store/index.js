import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
/* eslint-disable */

const logger = ({ dispatch, getState }) => next => (action) => {
  // console.log('start next: ', next);
  // console.log('start dispatch: ', action);
  const result = next(action);
  if (typeof result === 'object' && typeof result.then === 'function') {
    // console.log('----->result', typeof result,)
    result.then(()=> {
      console.log('ok')
    }).catch((err) => {
      console.log('err', err)
      dispatch({type: 'ADD'});
    })
  }
  // console.log('next state: ', getState());
  return result;
};

const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const middlewares = [
  logger, thunkMiddleware,
];

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(require('redux-logger').createLogger());
// }

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
);

export default function configStore() {
  const store = createStore(rootReducer, enhancer);
  return store;
}
