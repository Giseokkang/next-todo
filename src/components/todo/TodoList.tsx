import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos }) {
  console.log(todos);
  return (
    <ul>
      <TodoItem />
      <li>더미2</li>
      <li>더미3</li>
      <li>더미4</li>
      <li>더미5</li>
      <li>더미6</li>
    </ul>
  )
}
