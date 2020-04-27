import React from 'react';
import styled from 'styled-components';
import HeaderWrapper from '../components/base/header/HeaderWrapper';
import TodoWrapper from '../components/todo/TodoWrapper';

const MainWrapper = styled.div`
  max-width: 375px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background: #fff;
`

export default function index() {
  return (
    <MainWrapper>
      <HeaderWrapper />
      <TodoWrapper />
    </MainWrapper>
  )
}
