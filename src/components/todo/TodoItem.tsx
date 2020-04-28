import React, { useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import palette from '../../styles/palette';
import { Todo } from '../../../types/todo.d';

const TodoItemBlock = styled.li<{ color: string }>`
  position: relative;

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

  .delete-btn {
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
    .delete-btn {
      opacity: 1;
    }
  }
`;

interface IProps {
  id: number;
  level: string;
  title: string;
  done: boolean;
  renderTodos: (todos: Todo[]) => void;
}

const TodoItem: React.FC<IProps> = ({
  id,
  level,
  title,
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
      throw new Error(err);
    }
  }, []);

  const toggleDone = useCallback(async (id: number) => {
    try {
      const { data } = await axios.patch('http://localhost:3000/api/todo', {
        id,
      });
      renderTodos(data);
    } catch (err) {
      throw new Error(err);
    }
  }, []);

  return (
    <TodoItemBlock color={level}>
      <label htmlFor={`todo${id}`}>
        <input
          id={`todo${id}`}
          type='checkbox'
          defaultChecked={done}
          onChange={() => toggleDone(id)}
        />
        <span>{title}</span>
      </label>
      <button
        type='button'
        className='delete-btn'
        onClick={() => deleteTodo(id)}
      >
        <img src='/static/svg/delete.svg' alt='삭제하기' />
      </button>
    </TodoItemBlock>
  );
};

export default TodoItem;
