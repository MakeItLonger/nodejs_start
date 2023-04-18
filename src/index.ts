import express, {Request, Response} from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  const phrase = 'Goodbye, world!';
  res.send(phrase);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
