import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  fs.exists('todos.json', function (exists: boolean) {
    if (exists) {
      const data = fs.readFileSync('todos.json', 'utf-8');
      if (req.method === 'GET') {
        res.status(200).json(data);
      }

    } else {
      // todos.json이 존재하지 않는다면 파일 생성
      const initialData = JSON.stringify([]);
      fs.writeFileSync('todos.json', initialData);

      // 최초 todos 렌더링
      if (req.method === 'GET') {
        const data = fs.readFileSync('todos.json', 'utf-8');
        res.status(200).json(data);
      }

      if (req.method === 'POST') {

      }
    }
  });
}