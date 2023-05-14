import { Router, Response, Request } from 'express';
import { Product } from '..';

const products: Product[] = [
  { title: 'tomato', id: 1 },
  { title: 'orange', id: 2 },
];

export const productsRouter = Router({});

productsRouter.post('/products', (req: Request, res: Response) => {
  const newProduct: Product = {
    title: req.body.title,
    id: +new Date(),
  };
  products.push(newProduct);
  res.status(201).send(newProduct);
});

productsRouter.put('/:id', (req: Request, res: Response) => {
  const product = products.find((product: Product) => product.id === +req.params.id);
  if (product) {
    product.title = req.body.title;
    res.send(product);
  } else {
    res.sendStatus(404);
  }
});

productsRouter.get('/', (req: Request, res: Response) => {
  if (req.query.title) {
    const title: string = req.query.title.toString();
    const filteredProducts = products.filter((product: Product) => product.title.includes(title));
    res.send(filteredProducts);
  } else {
    res.send(products);
  }
});

productsRouter.get('/:id', (req: Request, res: Response) => {
  const product = products.find((product: Product) => product.id === +req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.sendStatus(404);
  }
});

productsRouter.delete('/:id', (req: Request, res: Response) => {
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
