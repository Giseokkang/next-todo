import { createAction, createReducer, ActionType } from 'typesafe-actions';
import produce from 'immer';
import { Todo } from '../../types/todo';

const ADD_TODO = 'todo/ADD_TODO';
const DELETE_TODO = 'todo/DELETE_TODO';
const CHANGE_DONE = 'todo/CHANGE_DONE';

export const todoActions = {
  addTodo: createAction(ADD_TODO)<{
    content: string;
    level: string;
  }>(),
  deleteTodo: createAction(DELETE_TODO)<number>(),
  changeDone: createAction(CHANGE_DONE)<number>(),
};

type TodosAction = ActionType<typeof todoActions>;

type TodosState = {
  todos: Todo[];
};

const initialState: TodosState = {
  todos: [],
};

const todos = createReducer<TodosState, TodosAction>(initialState, {
  [ADD_TODO]: (state, { payload: { content, level } }) =>
    produce(state, draft => {
      const todosIds = draft.todos.map(todo => +todo.id);
      const nextId = Math.max(0, ...todosIds) + 1;

      draft.todos.push({
        id: nextId,
        level,
        content,
        done: false,
      });
    }),

  [DELETE_TODO]: (state, { payload: id }) =>
    produce(state, draft => {
      const index = draft.todos.findIndex(todo => todo.id === id);
      draft.todos.splice(index, 1);
    }),

  [CHANGE_DONE]: (state, { payload: id }) =>
    produce(state, draft => {
      draft.todos.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      );
    }),
});

export default todos;
