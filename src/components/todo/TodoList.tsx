import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';

export default function TodoList() {
  const getText = async () => {
    const res = await axios.get('http://localhost:3000/api/todo');

    console.log(res);
  }
  useEffect(() => {
    getText();
  }, [])
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
