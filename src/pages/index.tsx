import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Head from 'next/head';
import HeaderWrapper from '../components/base/header/HeaderWrapper';
import TodoWrapper from '../components/todo/TodoWrapper';

const MainWrapper = styled.div`
  max-width: 375px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background: #fff;
`

export default function Index(props) {
  console.log(props.test);
  return (
    <>
      <Head>
        <title>할일 관리 앱</title>
      </Head>
      <MainWrapper>
        <HeaderWrapper />
        <TodoWrapper />
      </MainWrapper>
    </>
  )
}

Index.getInitialProps = async ({ res }) => {
  const response = await axios.get('http://localhost:3000/api/todo');
  const test = response.data;
  console.log('test', test)
  // return { users }
  return {
    test
  }
};
