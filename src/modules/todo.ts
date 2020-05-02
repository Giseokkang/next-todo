import { createAsyncAction, createReducer, ActionType } from 'typesafe-actions';
import { call, put, all, fork, takeLatest } from 'redux-saga/effects';
import produce from 'immer';
import { Todo } from '../../types/todo';
import { createAction } from './../lib/utils';
import * as todoAPI from '../pages/api/todo';

const SET_TODO = createAction('todo', 'SET_TODO');
const ADD_TODO = createAction('todo', 'ADD_TODO');
const DELETE_TODO = createAction('todo', 'DELETE_TODO');
const CHANGE_DONE = createAction('todo', 'CHANGE_DONE');

export const todoActions = {
  setTodo: createAsyncAction(
    SET_TODO.REQUEST,
    SET_TODO.SUCCESS,
    SET_TODO.FAILURE
  )<Todo[] | [], Todo[] | [], any>(),
  addTodo: createAsyncAction(
    ADD_TODO.REQUEST,
    ADD_TODO.SUCCESS,
    ADD_TODO.FAILURE
  )<{ content: string; level: string }, Todo[] | [], any>(),
  deleteTodo: createAsyncAction(
    DELETE_TODO.REQUEST,
    DELETE_TODO.SUCCESS,
    DELETE_TODO.FAILURE
  )<number, Todo[] | [], any>(),
  changeDone: createAsyncAction(
    CHANGE_DONE.REQUEST,
    CHANGE_DONE.SUCCESS,
    CHANGE_DONE.FAILURE
  )<number, Todo[] | [], any>(),
};

type TodosAction = ActionType<typeof todoActions>;

type watchSetTodoRequestAction = ReturnType<typeof todoActions.setTodo.request>;
type watchSetTodoSuccessAction = ReturnType<typeof todoActions.setTodo.success>;

type watchAddTodoRequestAction = ReturnType<typeof todoActions.addTodo.request>;
type watchAddTodoSuccessAction = ReturnType<typeof todoActions.addTodo.success>;

type watchDeleteTodoRequestAction = ReturnType<
  typeof todoActions.deleteTodo.request
>;
type watchDeleteTodoSuccessAction = ReturnType<
  typeof todoActions.deleteTodo.success
>;

type watchChangeDoneRequestAction = ReturnType<
  typeof todoActions.changeDone.request
>;
type watchChangeDoneSuccessAction = ReturnType<
  typeof todoActions.changeDone.success
>;

type TodosState = {
  todos: Todo[];
};

const initialState: TodosState = {
  todos: [],
};

const todos = createReducer<TodosState, TodosAction>(initialState, {
  [SET_TODO.SUCCESS]: (state, action: watchSetTodoSuccessAction) =>
    produce(state, draft => {
      draft.todos = action.payload;
    }),

  [ADD_TODO.SUCCESS]: (state, action: watchAddTodoSuccessAction) =>
    produce(state, draft => {
      draft.todos = action.payload;
    }),

  [DELETE_TODO.SUCCESS]: (state, action: watchDeleteTodoSuccessAction) =>
    produce(state, draft => {
      draft.todos = action.payload;
    }),

  [CHANGE_DONE.SUCCESS]: (state, action: watchChangeDoneSuccessAction) =>
    produce(state, draft => {
      draft.todos = action.payload;
    }),
});

function* watchSetTodo() {
  yield takeLatest(SET_TODO.REQUEST, function* (
    action: watchSetTodoRequestAction
  ) {
    try {
      yield put({ type: SET_TODO.SUCCESS, payload: action.payload });
    } catch (err) {
      console.log(err);
    }
  });
}

function* watchAddTodo() {
  yield takeLatest(ADD_TODO.REQUEST, function* (
    action: watchAddTodoRequestAction
  ) {
    try {
      const { data } = yield call(todoAPI.addTodo, action.payload);
      yield put({ type: ADD_TODO.SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
    }
  });
}

function* watchDeleteTodo() {
  yield takeLatest(DELETE_TODO.REQUEST, function* (
    action: watchDeleteTodoRequestAction
  ) {
    try {
      const id = action.payload;
      const { data } = yield call(todoAPI.deleteTodo, id);
      yield put({ type: DELETE_TODO.SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
    }
  });
}

function* watchChangeDone() {
  yield takeLatest(CHANGE_DONE.REQUEST, function* (
    action: watchChangeDoneRequestAction
  ) {
    try {
      const id = action.payload;
      const { data } = yield call(todoAPI.changeDone, id);
      yield put({ type: CHANGE_DONE.SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
    }
  });
}

export function* todoSaga() {
  yield all([
    fork(watchSetTodo),
    fork(watchAddTodo),
    fork(watchDeleteTodo),
    fork(watchChangeDone),
  ]);
}

export default todos;
