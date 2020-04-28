import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import axios from 'axios';
import Head from 'next/head';
import HeaderWrapper from '../components/base/header/HeaderWrapper';
import TodoWrapper from '../components/todo/TodoWrapper';
import { Todo } from '../../types/todo.d';

const MainWrapper = styled.div`
  max-width: 375px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background: #fff;
`;

interface IProps {
  initialTodos: Todo[];
}

const Index: NextPage<IProps> = ({ initialTodos }) => {
  const [todos, setTodos] = useState(initialTodos);
  useEffect(() => {
    console.log(todos);
  }, []);

  const renderTodos = todos => {
    setTodos(todos);
  };

  return (
    <>
      <Head>
        <title>할일 관리 앱</title>
      </Head>
      <MainWrapper>
        <HeaderWrapper />
        <TodoWrapper renderTodos={renderTodos} todos={todos} />
      </MainWrapper>
    </>
  );
};

Index.getInitialProps = async ({ res }) => {
  const { data } = await axios.get('http://localhost:3000/api/todo');

  return {
    initialTodos: data,
  };
};

export default Index;
