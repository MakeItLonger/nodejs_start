import { Product } from './types';
import { ProductViewModel } from '../models/ProductViewModel';

export const getProductViewModel = (product: Product): ProductViewModel => {
  return {
    title: product.title,
    id: product.id,
  };
};
