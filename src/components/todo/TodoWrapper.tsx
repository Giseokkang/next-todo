import React from 'react';
import TodoInfomation from './TodoInfomation';
import TodoList from './TodoList';

export default function TodoWrapper({ todos }) {
  return (
    <>
      <TodoInfomation todos={todos} />
      <TodoList todos={todos} />
    </>
  )
}
