import React from 'react';
import styled from 'styled-components';

const HeaderWrapperBlock = styled.section`
  display: flex;
  align-items: center;
  min-height: 52px;
  padding: 0 12px;
  border-bottom: 1px solid #e5e5e5;

  .header-wrapper-title {
    font-size: 1.3125rem;
  }
`;

const HeaderWrapper = () => {
  return (
    <HeaderWrapperBlock>
      <h1 className="header-wrapper-title">CheolHwan's TodoList</h1>
    </HeaderWrapperBlock>
  );
};

export default React.memo(HeaderWrapper);
