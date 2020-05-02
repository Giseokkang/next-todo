import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from '.';

const configureStore = (initialState: any, options: any) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const enhancer: any =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : compose(
          applyMiddleware(...middlewares),
          !options.isServer && window.navigator.userAgent.includes('Chrome')
            ? composeWithDevTools()
            : (f: any) => f
        );
  const store = createStore(rootReducer, initialState, enhancer);

  (store as any).sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
