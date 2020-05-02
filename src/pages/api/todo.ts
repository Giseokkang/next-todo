import axios from 'axios';

export const getTodo = () => axios.get('http://localhost:3000/api/todo-server');

type addParams = {
  content: string;
  level: string;
};

export const addTodo = (addData: addParams) =>
  axios.post('http://localhost:3000/api/todo-server', addData);

export const deleteTodo = (id: number) =>
  axios.delete('http://localhost:3000/api/todo-server', {
    data: {
      id,
    },
  });

export const changeDone = (id: number) =>
  axios.patch('http://localhost:3000/api/todo-server', {
    id,
  });
