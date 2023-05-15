import { Router, Response, Request } from 'express';
import { Product } from '..';

const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,
  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

const products: Product[] = [
  { title: 'tomato', id: 1 },
  { title: 'orange', id: 2 },
];

export const productsRouter = Router({});

productsRouter.post('/', (req: Request, res: Response) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
  }

  const newProduct: Product = {
    title: req.body.title,
    id: +new Date(),
  };

  products.push(newProduct);
  res.status(HTTP_STATUSES.CREATED_201).json(newProduct);
});

productsRouter.put('/:id', (req: Request, res: Response) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
  }

  const product = products.find((product: Product) => product.id === +req.params.id);

  if (product) {
    product.title = req.body.title;
    res.json(product);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
});

productsRouter.get('/', (req: Request, res: Response) => {
  if (req.query.title) {
    const title: string = req.query.title.toString();
    const filteredProducts = products.filter((product: Product) => product.title.includes(title));
    res.json(filteredProducts);
  } else {
    res.json(products);
  }
});

productsRouter.get('/:id', (req: Request, res: Response) => {
  const product = products.find((product: Product) => product.id === +req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
});

productsRouter.delete('/:id', (req: Request, res: Response) => {
  const reqID: number = +req.params.id;
  products.forEach(({ id }, index) => {
    if (id === reqID) {
      products.splice(index, 1);
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      return;
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  });
});
