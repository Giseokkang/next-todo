import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
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

  const onAddTodo = useCallback(
    async (content: string, level: string) => {
      const addData = { content, level };
      try {
        await axios.post('http://localhost:3000/api/todo', addData);

        dispatch(todoActions.addTodo(addData));
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  const onDeleteTodo = useCallback(
    async (id: number) => {
      try {
        await axios.delete('http://localhost:3000/api/todo', {
          data: {
            id,
          },
        });
        dispatch(todoActions.deleteTodo(id));
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  const onChangeDone = useCallback(
    async (id: number) => {
      try {
        await axios.patch('http://localhost:3000/api/todo', {
          id,
        });
        dispatch(todoActions.changeDone(id));
      } catch (err) {
        console.log(err);
      }
    },
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
