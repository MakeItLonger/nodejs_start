import { Request } from 'express';

export type RequestBody<T> = Request<{}, {}, T>;

export type RequestQuery<T> = Request<{}, {}, {}, T>;

export type RequestParams<T> = Request<T>;

export type RequestParamsAndBody<T, T2> = Request<T, {}, T2>;

export type Product = {
  title: string;
  id: number;
  amount: number;
};
