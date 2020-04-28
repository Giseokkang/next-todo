import React from 'react';
import TodoInfomation from './TodoInfomation';
import TodoList from './TodoList';
import { Todo } from '../../../types/todo.d';

interface IProps {
  todos: Todo[];
  renderTodos: (todos: Todo[]) => void;
}

const TodoWrapper: React.FC<IProps> = ({ todos, renderTodos }) => {
  return (
    <>
      <TodoInfomation todos={todos} />
      <TodoList renderTodos={renderTodos} todos={todos} />
    </>
  );
};

export default TodoWrapper;
