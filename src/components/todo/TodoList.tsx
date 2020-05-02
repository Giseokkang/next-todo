import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { Todo } from '../../../types/todo.d';
import useTodo from '../../lib/hooks/useTodo';

const TodoListBlock = styled.section`
  overflow-y: auto;
  max-height: calc(100vh - 192px);
  .todo-list-title {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    background-color: transparent;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }
`;

const TodoList: React.FC = () => {
  const { todos } = useTodo();

  return (
    <TodoListBlock>
      <h2 className="todo-list-title">할 일 목록 리스트</h2>
      <ul>
        {todos.map(todo => (
          <TodoItem key={uuidv4()} {...todo} />
        ))}
      </ul>
    </TodoListBlock>
  );
};

export default React.memo(TodoList);
