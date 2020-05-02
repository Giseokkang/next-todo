import React, { useState, useRef, useMemo } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import zIndexes from '../../styles/zindexes';
import palette from '../../styles/palette';
import { Todo } from '../../../types/todo.d';
import Paint from '../../../public/static/svg/paint.svg';
import useTodo from '../../lib/hooks/useTodo';

const AddTodoBlock = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 52px;
  bottom: 55px;
  z-index: ${zIndexes.addTodoBlock};
  width: 100%;
  padding: 16px;
  background: #fff;
  transform: translateY(100%);
  transition: all 0.3s ease-in-out;
  opacity: 1;

  ${({ visible }) =>
    visible &&
    `
      transform: translateY(0);
  `}

  .add-todo-popup-title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 16px;

    .add-todo-popup-title {
      font-size: 1.3125rem;
      line-height: 25px;
    }

    .add-todo-popup-add-button {
      height: 24px;
      padding: 0 8px;
      border: 1px solid #000;
      border-radius: 5px;
      font-size: 0.875rem;
      line-height: 22px;
    }
  }

  .add-todo-popup-level-list-box {
    display: flex;
    justify-content: space-between;
    margin: 0 0 12px;

    .add-todo-popup-level-list {
      li {
        display: inline-block;
        margin: 0 16px 0 0;

        &:last-child {
          margin: 0;
        }
      }
    }
  }

  .add-todo-popup-text-field {
    textarea {
      width: 100%;
      height: 300px;
      padding: 12px;
      border: 1px solid #c6c4c4;
      border-radius: 5px;
      line-height: 19px;
      resize: none;
    }
  }
`;

const Radio = styled.input<{ level: string }>`
  width: 24px;
  height: 24px;
  border: 2px solid transparent;
  border-radius: 50%;
  ${({ level }) =>
    level &&
    `
    background: ${palette[level]};
  `}
  transition: border 0.3s;
  cursor: pointer;

  &:checked {
    border: 2px solid #000;
  }
`;

interface IProps {
  visible: boolean;
  popupToggle: () => void;
}

const AddTodoPopup: React.FC<IProps> = ({ visible, popupToggle }) => {
  const contentRef = useRef(null);
  const { onAddTodo } = useTodo();
  const [level, setLevel] = useState('pink');
  const levelList = ['pink', 'orange', 'yellow', 'green', 'blue', 'purple'];

  const addTodo = async () => {
    let content = contentRef.current.value;
    if (content.trim() === '') return alert('값을 입력해주세요');
    onAddTodo(content, level);
    popupToggle();

    contentRef.current.value = '';
  };

  const levelRender = useMemo(
    () =>
      levelList.map(level => (
        <li key={uuidv4()}>
          <Radio
            type="radio"
            name="level"
            level={level}
            onClick={() => setLevel(level)}
            defaultChecked={level === 'pink'}
          />
        </li>
      )),
    []
  );

  return (
    <AddTodoBlock visible={visible}>
      <div className="add-todo-popup-title-wrapper">
        <p className="add-todo-popup-title">Add Todo</p>
        <button
          type="button"
          className="add-todo-popup-add-button"
          onClick={() => addTodo()}
        >
          추가하기
        </button>
      </div>
      <div className="add-todo-popup-level-list-box">
        <ul className="add-todo-popup-level-list">{levelRender}</ul>
        <i>
          <Paint />
        </i>
      </div>
      <div className="add-todo-popup-text-field">
        <textarea ref={contentRef}></textarea>
      </div>
    </AddTodoBlock>
  );
};

export default React.memo(AddTodoPopup);
