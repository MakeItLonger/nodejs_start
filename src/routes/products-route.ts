import { Router, Response } from 'express';
import { Product } from '../constants/types';
import { RequestBody, RequestParams, RequestQuery, RequestParamsAndBody } from '../constants/types';
import { ProductCreateModel } from '../models/ProductCreateModel';
import { ProductUpdateModel } from '../models/ProductUpdateModel';
import { ProductQueryModel } from '../models/ProductQueryModel';
import { ProductViewModel } from '../models/ProductViewModel';
import { ProductUriModel } from '../models/ProductUriModel';
import { HTTP_STATUSES } from '../constants/http_statuses';
import { products } from '../constants/products';
import { getProductViewModel } from '../constants/utils';

export const productsRouter = Router({});

productsRouter.post('/', (req: RequestBody<ProductCreateModel>, res: Response<ProductViewModel>) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  const newProduct: Product = {
    title: req.body.title,
    id: +new Date(),
    amount: 5,
  };

  products.push(newProduct);
  res.status(HTTP_STATUSES.CREATED_201).json(getProductViewModel(newProduct));
});

productsRouter.put(
  '/:id',
  (req: RequestParamsAndBody<ProductUriModel, ProductUpdateModel>, res: Response<ProductViewModel>) => {
    if (!req.body.title) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      return;
    }

    const product = products.find((product: Product) => product.id === +req.params.id);

    if (product) {
      product.title = req.body.title;
      res.json(getProductViewModel(product));
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  },
);

productsRouter.get('/', (req: RequestQuery<ProductQueryModel>, res: Response<ProductViewModel[]>) => {
  if (req.query.title) {
    const title: string = req.query.title;

    const filteredProducts: Product[] = products.filter((product: Product) => product.title.includes(title));

    const viewedProducts: ProductViewModel[] = filteredProducts.map(getProductViewModel);

    res.json(viewedProducts);
  } else {
    const viewedProducts: ProductViewModel[] = products.map(getProductViewModel);
    res.json(viewedProducts);
  }
});

productsRouter.get('/:id', (req: RequestParams<ProductUriModel>, res: Response<ProductViewModel>) => {
  const product = products.find((product: Product) => product.id === +req.params.id);
  if (product) {
    res.json(getProductViewModel(product));
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
});

productsRouter.delete('/:id', (req: RequestParams<ProductUriModel>, res: Response) => {
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
