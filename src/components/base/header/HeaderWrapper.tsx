import React from 'react';
import styled from 'styled-components';

const HeaderWrapperBlock = styled.section`
  display: flex;
  align-items: center;
  min-height: 52px;
  padding: 0 12px;
  border-bottom: 1px solid #e5e5e5;

  .title {
    font-size: 1.3125rem;
  }
`;

export default function HeaderWrapper() {
  return (
    <HeaderWrapperBlock>
      <h1 className="title">CheolHwan's TodoList</h1>
    </HeaderWrapperBlock>
  );
}
