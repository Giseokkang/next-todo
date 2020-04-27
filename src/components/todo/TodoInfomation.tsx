import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const TodoInfomationBlock = styled.section`
  padding: 12px;
  border-bottom: 1px solid #e5e5e5;

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
    ${({ color }) => color && `
      background: ${palette[color]};
    ` }
  }
`

export default function TodoInfomation() {
  return (
    <TodoInfomationBlock>
      <div className="remain-information-area">
        <p>남은 TODO</p>
        <em>{11}개</em>
      </div>
      <ul className="remain-count-area">
        <RemainItem color="pink">
          1개
        </RemainItem>
        <RemainItem color="orange">
          1개
        </RemainItem>
        <RemainItem color="yellow">
          1개
        </RemainItem>
        <RemainItem color="green">
          1개
        </RemainItem>
        <RemainItem color="blue">
          1개
        </RemainItem>
        <RemainItem color="purple">
          1개
        </RemainItem>
      </ul>
    </TodoInfomationBlock>
  )
}
