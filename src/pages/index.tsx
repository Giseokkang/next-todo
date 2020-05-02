import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import axios from 'axios';
import Head from 'next/head';
import HeaderWrapper from '../components/base/header/HeaderWrapper';
import TodoWrapper from '../components/todo/TodoWrapper';
import UtilWrapper from '../components/util/UtilWrapper';
import { Todo } from '../../types/todo.d';
import useTodo from '../lib/hooks/useTodo';

const MainWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
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
  const { onSetTodo } = useTodo();
  const [popupVisible, setPopupVisible] = useState(false);

  const popupToggle = () => setPopupVisible(!popupVisible);

  useEffect(() => {
    onSetTodo(initialTodos);
  }, []);

  return (
    <>
      <Head>
        <title>할일 관리 앱</title>
      </Head>
      <MainWrapper>
        <HeaderWrapper />
        <TodoWrapper />
        <UtilWrapper popupVisible={popupVisible} popupToggle={popupToggle} />
      </MainWrapper>
    </>
  );
};

Index.getInitialProps = async () => {
  const { data } = await axios.get('http://localhost:3000/api/todo');
  return {
    initialTodos: data,
  };
};

export default Index;
