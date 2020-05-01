import React, { useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import palette from '../../styles/palette';
import { Todo } from '../../../types/todo.d';

const TodoItemBlock = styled.li<{ color: string; done: boolean }>`
  position: relative;
  border-bottom: 1px solid #e5e5e5;

  label {
    display: block;
    position: relative;
    padding: 14px 12px 14px 24px;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 12px;
      ${({ color }) =>
        color &&
        `
        background: ${palette[color]};
      `}
    }

    span {
      display: block;
      position: relative;
      padding: 0 48px 0 0;

      ${({ done }) =>
        done &&
        `
        color: #c6c4c4;
        text-decoration: line-through;
      `}

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        width: 20px;
        height: 20px;
        background-image: url('/static/svg/check.svg');
        background-position: 0 0;
        background-repeat: no-repeat;
        transform: translateY(-50%);
      }
    }

    input[type='checkbox'] {
      position: absolute;
      top: 0;
      left: 0;
      width: 1px;
      height: 1px;
      opacity: 0;

      &:checked + span:after {
        background-position: 0 100%;
      }
    }
  }

  .todo-item-delete-btn {
    position: absolute;
    top: 50%;
    right: 44px;
    width: 14px;
    height: 16px;
    z-index: 1;
    opacity: 0;
    transform: translateY(-50%);
    transition: all 0.3s;
  }

  &:hover {
    .todo-item-delete-btn {
      opacity: 1;
    }
  }
`;

interface IProps {
  id: number;
  level: string;
  content: string;
  done: boolean;
  renderTodos: (todos: Todo[]) => void;
}

const TodoItem: React.FC<IProps> = ({
  id,
  level,
  content,
  done,
  renderTodos,
}) => {
  const deleteTodo = useCallback(async (id: number) => {
    try {
      const { data } = await axios.delete('http://localhost:3000/api/todo', {
        data: {
          id,
        },
      });
      renderTodos(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const toggleDone = useCallback(async (id: number) => {
    try {
      const { data } = await axios.patch('http://localhost:3000/api/todo', {
        id,
      });
      renderTodos(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <TodoItemBlock color={level} done={done}>
      <label htmlFor={`todo${id}`}>
        <input
          id={`todo${id}`}
          type="checkbox"
          checked={done ? true : false}
          onChange={() => toggleDone(id)}
        />
        <span>{content}</span>
      </label>
      <button
        type="button"
        className="todo-item-delete-btn"
        onClick={() => deleteTodo(id)}
      >
        <img src="/static/svg/delete.svg" alt="삭제하기" />
      </button>
    </TodoItemBlock>
  );
};

export default TodoItem;
