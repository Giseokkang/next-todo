import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '.';

const configureStore = (initialState: any) => {
  const enhancer: any = composeWithDevTools();
  const store = createStore(rootReducer, initialState, enhancer);
  return store;
};

export default configureStore;
