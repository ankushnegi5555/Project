import { Request, Response, NextFunction } from 'express';
export default function notFoundRoute(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const err = new Error('Not Found');
  next(err);
}
