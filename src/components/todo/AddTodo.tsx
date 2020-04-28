import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import zIndexes from '../../styles/zindexes';
import palette from '../../styles/palette';

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

  .title-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 16px;

    .title {
      font-size: 1.3125rem;
      line-height: 25px;
    }

    .add-button {
      height: 24px;
      padding: 0 8px;
      border: 1px solid #000;
      border-radius: 5px;
      font-size: 0.875rem;
      line-height: 22px;
    }
  }

  .level-list-box {
    display: flex;
    justify-content: space-between;
    margin: 0 0 12px;

    .level-list {
      li {
        display: inline-block;
        margin: 0 16px 0 0;

        &:last-child {
          margin: 0;
        }
      }
    }
  }

  .text-field {
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
  border-radius: 50%;
  ${({ level }) =>
    level &&
    `
    background: ${palette[level]};
  `}
  border: 2px solid transparent;
  transition: border 0.3s;
  cursor: pointer;

  &:checked {
    border: 2px solid #000;
  }
`;

interface IProps {
  visible: boolean;
}

const AddTodo: React.FC<IProps> = ({ visible }) => {
  return (
    <AddTodoBlock visible={visible}>
      <div className="title-area">
        <p className="title">Add Todo</p>
        <button type="button" className="add-button">
          추가하기
        </button>
      </div>
      <div className="level-list-box">
        <ul className="level-list">
          <li>
            <label htmlFor="level">
              <Radio type="radio" name="level" level="pink" defaultChecked />
            </label>
          </li>
          <li>
            <label htmlFor="level">
              <Radio type="radio" name="level" level="orange" />
            </label>
          </li>
          <li>
            <label htmlFor="level">
              <Radio type="radio" name="level" level="yellow" />
            </label>
          </li>
          <li>
            <label htmlFor="level">
              <Radio type="radio" name="level" level="green" />
            </label>
          </li>
          <li>
            <label htmlFor="level">
              <Radio type="radio" name="level" level="blue" />
            </label>
          </li>
          <li>
            <label htmlFor="level">
              <Radio type="radio" name="level" level="purple" />
            </label>
          </li>
        </ul>
        <i>
          <img src="/static/svg/paint.svg" alt="페인트 아이콘" />
        </i>
      </div>
      <div className="text-field">
        <textarea></textarea>
      </div>
    </AddTodoBlock>
  );
};

export default AddTodo;
