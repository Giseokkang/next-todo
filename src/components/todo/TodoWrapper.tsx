import React from 'react';
import TodoInfomation from './TodoInfomation';
import TodoList from './TodoList';

const TodoWrapper: React.FC = () => {
  return (
    <>
      <TodoInfomation />
      <TodoList />
    </>
  );
};

export default React.memo(TodoWrapper);
