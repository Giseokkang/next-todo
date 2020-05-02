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
    (todos: Todo[]) => dispatch(todoActions.setTodo.request(todos)),
    [dispatch]
  );

  const onAddTodo = useCallback(
    (content: string, level: string) => {
      const addData = { content, level };
      dispatch(todoActions.addTodo.request(addData));
    },
    [dispatch]
  );

  const onDeleteTodo = useCallback(
    (id: number) => dispatch(todoActions.deleteTodo.request(id)),
    [dispatch]
  );

  const onChangeDone = useCallback(
    (id: number) => dispatch(todoActions.changeDone.request(id)),
    [dispatch]
  );

  return {
    todos,
    remainTodos,
    onSetTodo,
    onAddTodo,
    onDeleteTodo,
    onChangeDone,
  };
};

export default useTodo;
