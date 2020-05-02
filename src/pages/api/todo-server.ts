import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const editTodos = datas => {
    fs.writeFileSync('todos.json', JSON.stringify(datas));
    res.status(200).json(datas);
  };

  fs.exists('todos.json', function (exists: boolean) {
    if (exists) {
      const dataJSON = fs.readFileSync('todos.json', 'utf-8');
      const datas = JSON.parse(dataJSON);

      if (req.method === 'GET') {
        res.status(200).json(dataJSON);
      } else if (req.method === 'POST') {
        const { content, level } = req.body;
        const todosIds = datas.map(todo => +todo.id);
        const nextId = Math.max(0, ...todosIds) + 1;

        const newData = datas.concat([
          { id: nextId, content, level, done: false },
        ]);

        editTodos(newData);
      } else if (req.method === 'PATCH') {
        const { id } = req.body;

        const filterDatas = datas.map(data =>
          data.id === id ? { ...data, done: !data.done } : data
        );

        editTodos(filterDatas);
      } else if (req.method === 'DELETE') {
        const { id } = req.body;

        const filterDatas = datas.filter(data => data.id !== id);
        editTodos(filterDatas);
      }
    } else {
      // 최초 todos.json 파일을 생성하고 todos를 응답해주는 로직
      const initialData = JSON.stringify([]);
      fs.writeFileSync('todos.json', initialData);

      if (req.method === 'GET') {
        const data = fs.readFileSync('todos.json', 'utf-8');
        res.status(200).json(data);
      }
    }
  });
};
