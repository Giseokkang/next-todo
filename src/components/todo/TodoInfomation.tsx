import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import { Todo } from '../../../types/todo.d';

const TodoInfomationBlock = styled.section`
  padding: 12px;
  border-bottom: 1px solid #e5e5e5;

  .section-title {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    background-color: transparent;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  .remain-information-area {
    margin: 0 0 10px;
    font-size: 0.875rem;

    p {
      display: inline-block;
    }

    em {
      display: inline-block;
      margin: 0 0 0 8px;
    }
  }

  .remain-count-area {
    overflow: hidden;
  }
`;

const RemainItem = styled.li<{ color: string }>`
  float: left;
  position: relative;
  margin: 0 8px 8px 0;
  padding: 0 0 0 22px;
  font-size: 0.875rem;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transform: translateY(-50%);
    ${({ color }) =>
      color &&
      `
      background: ${palette[color]};
    `}
  }
`;

interface IProps {
  todos: Todo[];
}

type CountTypes = {
  total: number;
  pink: number;
  orange: number;
  yellow: number;
  green: number;
  blue: number;
  purple: number;
};

const TodoInfomation: React.FC<IProps> = ({ todos }) => {
  const [count, setCount] = useState<CountTypes>();

  useEffect(() => {
    const remainTodos = todos.filter(todo => todo.done === false);

    setCount({
      total: remainTodos.length,
      pink: remainTodos.filter(todo => todo.level === 'pink').length,
      orange: remainTodos.filter(todo => todo.level === 'orange').length,
      yellow: remainTodos.filter(todo => todo.level === 'yellow').length,
      green: remainTodos.filter(todo => todo.level === 'green').length,
      blue: remainTodos.filter(todo => todo.level === 'blue').length,
      purple: remainTodos.filter(todo => todo.level === 'purple').length,
    });
  }, [todos]);

  return (
    <TodoInfomationBlock>
      <h2 className="section-title">남은 할 일 상세내용</h2>
      <div className="remain-information-area">
        <p>남은 TODO</p>
        <em>{count && count.total}개</em>
      </div>
      <ul className="remain-count-area">
        <RemainItem color="pink">{count && count.pink}개</RemainItem>
        <RemainItem color="orange">{count && count.orange}개</RemainItem>
        <RemainItem color="yellow">{count && count.yellow}개</RemainItem>
        <RemainItem color="green">{count && count.green}개</RemainItem>
        <RemainItem color="blue">{count && count.blue}개</RemainItem>
        <RemainItem color="purple">{count && count.purple}개</RemainItem>
      </ul>
    </TodoInfomationBlock>
  );
};

export default TodoInfomation;
