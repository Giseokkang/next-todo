import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

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
      ${({ color }) => color && `
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

    input[type="checkbox"] {
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
    transition: all .3s;
  }

  &:hover {
    .delete-btn {
      opacity: 1;
    }
  }
`

export default function TodoItem() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // console.log(e.target.className);
    console.log('삭제버튼');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  }

  return (
    <TodoItemBlock color="pink">
      <label htmlFor={`todo${1}`}>
        <input id={`todo${1}`} type="checkbox" onChange={handleChange} />
        <span>할일목록</span>
      </label>
      <button type="button" className="delete-btn" onClick={handleClick}><img src="/static/svg/delete.svg" alt="" /></button>
    </TodoItemBlock>
  )
}
