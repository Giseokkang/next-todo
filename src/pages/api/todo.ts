import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  fs.exists('todos.json', function (exists: boolean) {
    if (exists) {
      const data = fs.readFileSync('todos.json', 'utf-8');
      res.end(data);

    } else {
      // 최초 todos 렌더링
      if (req.method === 'GET') {
        const initialData = JSON.stringify([]);
        console.log(initialData);
        fs.writeFileSync('todos.json', initialData);
      }
    }
  });
}