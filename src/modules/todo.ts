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

type WatchSetTodoRequestAction = ReturnType<typeof todoActions.setTodo.request>;
type WatchSetTodoSuccessAction = ReturnType<typeof todoActions.setTodo.success>;

type WatchAddTodoRequestAction = ReturnType<typeof todoActions.addTodo.request>;
type WatchAddTodoSuccessAction = ReturnType<typeof todoActions.addTodo.success>;

type WatchDeleteTodoRequestAction = ReturnType<
  typeof todoActions.deleteTodo.request
>;
type WatchDeleteTodoSuccessAction = ReturnType<
  typeof todoActions.deleteTodo.success
>;

type WatchChangeDoneRequestAction = ReturnType<
  typeof todoActions.changeDone.request
>;
type WatchChangeDoneSuccessAction = ReturnType<
  typeof todoActions.changeDone.success
>;

type TodosState = {
  todos: Todo[];
};

const initialState: TodosState = {
  todos: [],
};

const todos = createReducer<TodosState, TodosAction>(initialState, {
  [SET_TODO.SUCCESS]: (state, action: WatchSetTodoSuccessAction) =>
    produce(state, draft => {
      draft.todos = action.payload;
    }),

  [ADD_TODO.SUCCESS]: (state, action: WatchAddTodoSuccessAction) =>
    produce(state, draft => {
      draft.todos = action.payload;
    }),

  [DELETE_TODO.SUCCESS]: (state, action: WatchDeleteTodoSuccessAction) =>
    produce(state, draft => {
      draft.todos = action.payload;
    }),

  [CHANGE_DONE.SUCCESS]: (state, action: WatchChangeDoneSuccessAction) =>
    produce(state, draft => {
      draft.todos = action.payload;
    }),
});

function* WatchSetTodo() {
  yield takeLatest(SET_TODO.REQUEST, function* (
    action: WatchSetTodoRequestAction
  ) {
    try {
      yield put({ type: SET_TODO.SUCCESS, payload: action.payload });
    } catch (err) {
      console.log(err);
    }
  });
}

function* WatchAddTodo() {
  yield takeLatest(ADD_TODO.REQUEST, function* (
    action: WatchAddTodoRequestAction
  ) {
    try {
      const { data } = yield call(todoAPI.addTodo, action.payload);
      yield put({ type: ADD_TODO.SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
    }
  });
}

function* WatchDeleteTodo() {
  yield takeLatest(DELETE_TODO.REQUEST, function* (
    action: WatchDeleteTodoRequestAction
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

function* WatchChangeDone() {
  yield takeLatest(CHANGE_DONE.REQUEST, function* (
    action: WatchChangeDoneRequestAction
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
    fork(WatchSetTodo),
    fork(WatchAddTodo),
    fork(WatchDeleteTodo),
    fork(WatchChangeDone),
  ]);
}

export default todos;
