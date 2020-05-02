import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import todo, { todoSaga } from './todo';

const rootReducer = combineReducers({ todo });

export function* rootSaga() {
  yield all([fork(todoSaga)]);
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
