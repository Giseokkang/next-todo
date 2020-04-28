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
        const filterDatas = datas.concat([req.body]);
        editTodos(filterDatas);
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
      const initialData = JSON.stringify([]);
      fs.writeFileSync('todos.json', initialData);

      // 최초 todos 렌더링
      if (req.method === 'GET') {
        const data = fs.readFileSync('todos.json', 'utf-8');
        res.status(200).json(data);
      }
    }
  });
};
