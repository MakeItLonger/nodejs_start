import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

interface Product {
  title: string;
  id: number;
}

const products: Product[] = [
  { title: 'tomato', id: 1 },
  { title: 'orange', id: 2 },
];

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  const phrase = 'Goodbye, world!';
  res.send(phrase);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post('/products', (req: Request, res: Response) => {
  const newProduct: Product = {
    title: req.body.title,
    id: +new Date(),
  };
  products.push(newProduct);
  res.status(201).send(newProduct);
});

app.put('/products/:id', (req: Request, res: Response) => {
  const product = products.find((product: Product) => product.id === +req.params.id);
  if (product) {
    product.title = req.body.title;
    res.send(product);
  } else {
    res.sendStatus(404);
  }
});

app.get('/products', (req: Request, res: Response) => {
  if (req.query.title) {
    const title: string = req.query.title.toString();
    const filteredProducts = products.filter((product: Product) => product.title.includes(title));
    res.send(filteredProducts);
  } else {
    res.send(products);
  }
});

app.get('/products/:id', (req: Request, res: Response) => {
  const product = products.find((product: Product) => product.id === +req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/products/:id', (req: Request, res: Response) => {
  const reqID: number = +req.params.id;
  products.forEach(({ id }, index) => {
    if (id === reqID) {
      products.splice(index, 1);
      res.sendStatus(204);
      return;
    }
    res.sendStatus(404);
  });
});
