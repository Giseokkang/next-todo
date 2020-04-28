import React from 'react';
import { NextPage } from 'next';
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

type Todo = {
  id: number,
  level: string,
  title: string,
  done: boolean
}

interface IProps {
  todos: Todo[];
}

const Index: NextPage<IProps> = ({ todos }) => {
  return (
    <>
      <Head>
        <title>할일 관리 앱</title>
      </Head>
      <MainWrapper>
        <HeaderWrapper />
        <TodoWrapper todos={todos} />
      </MainWrapper>
    </>
  )
}

Index.getInitialProps = async ({ res }) => {
  const { data } = await axios.get('http://localhost:3000/api/todo');

  return {
    todos: data
  }
};

export default Index;