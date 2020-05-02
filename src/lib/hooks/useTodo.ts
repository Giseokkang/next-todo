import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Todo } from '../../../types/todo';
import { todoActions } from '../../modules/todo';
import { RootState } from '../../modules';

const useTodo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const remainTodos = useMemo(() => todos.filter(todo => todo.done === false), [
    todos,
  ]);

  const onSetTodo = useCallback(
    (todos: Todo[]) => dispatch(todoActions.setTodo(todos)),
    [dispatch]
  );

  return {
    todos,
    remainTodos,
    onSetTodo,
  };
};

export default useTodo;
