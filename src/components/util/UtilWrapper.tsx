import React from 'react';
import styled, { css } from 'styled-components';
import AddTodoPopup from '../todo/AddTodoPopup';
import zIndexes from '../../styles/zindexes';
import { Todo } from '../../../types/todo.d';

const UtilWrapperBlock = styled.aside`
  position: relative;
  z-index: ${zIndexes.utilWrapper};
  margin-top: auto;
  padding: 11px 0;
  border-top: 1px solid #e5e5e5;
  background: #fff;
  text-align: center;
`;

const AddPopupButton = styled.button<{ open: boolean }>`
  display: inline-block;
  position: relative;
  width: 32px;
  height: 32px;
  border: 1px solid #2d2525;
  border-radius: 5px;
  text-indent: -9999em;
  cursor: pointer;

  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    content: '';
    width: 17px;
    height: 2px;
    background: #2d2525;
    transform: translate(-50%, -50%);
    transition: all 0.2s;
  }

  &:after {
    position: absolute;
    top: 50%;
    left: 50%;
    content: '';
    width: 17px;
    height: 2px;
    background: #2d2525;
    transform: translate(-50%, -50%) rotate(90deg);
    transition: all 0.3s;
  }

  ${({ open }) =>
    open &&
    css`
      &:before {
        transform: translate(-50%, -50%) rotate(90deg);
        opacity: 0;
      }
      &:after {
        transform: translate(-50%, -50%) rotate(0);
      }
    `}
`;

interface IProps {
  nextId: number;
  popupToggle: () => void;
  popupVisible: boolean;
  renderTodos: (todos: Todo[]) => void;
}

const UtilWrapper: React.FC<IProps> = ({
  nextId,
  popupToggle,
  popupVisible,
  renderTodos,
}) => {
  return (
    <>
      <UtilWrapperBlock>
        <AddPopupButton type="button" open={popupVisible} onClick={popupToggle}>
          추가하기
        </AddPopupButton>
      </UtilWrapperBlock>
      <AddTodoPopup
        nextId={nextId}
        visible={popupVisible}
        popupToggle={popupToggle}
        renderTodos={renderTodos}
      />
    </>
  );
};

export default UtilWrapper;
