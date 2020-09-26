import { Request, Response, NextFunction } from 'express';
function errHandler(err, req: Request, res: Response, next: NextFunction) {
  if (Array.isArray(err)) {
    const errArr = [];
    err.forEach(element => {
      errArr.push({
        error: element,
        message: 'error',
        status: 500,
        timestamp: new Date()
      });
    });
    res.send(errArr);
  } else {
    const { error, message, status } = err;
    const errorHandler = {
      error: error || 'Not Found',
      message: message || 'Error',
      status: status || 500,
      timestamp: new Date()
    };
    res.send(errorHandler);
  }
}
export default errHandler;
