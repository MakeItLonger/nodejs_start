import express, { Request, Response } from 'express';
import { productsRouter } from './routes/products-route';

const app = express();
const port = process.env.PORT || 3000;

export interface Product {
  title: string;
  id: number;
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  const phrase = 'Goodbye, world!';
  res.send(phrase);
});

app.use('/products', productsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
