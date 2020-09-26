import { Response, NextFunction } from 'express';
import { hasPermission } from '../../extraTs/utils';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';
import UserRepository from '../../repositories/user/UserRepository';
import IRequest from '../../libs/routes/IRequest';

export default (module: string, permissionType: string) => async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string = await req.headers.authorization;
    const { secretKey } = config;
    const decodeUser = await jwt.verify(token, secretKey);
    if (!decodeUser) {
      throw new Error('Invalid Token');
    }
    const user = await new UserRepository().findOne({
      _id: decodeUser.originalId,
      email: decodeUser.email
    });
    req.user = user._id;
    if (user === null) {
      throw new Error('Invalid Id and email');
    }
    if (!hasPermission(module, decodeUser.role, permissionType)) {
      throw new Error('Permission Denied');
    }
    next();
  } catch (error) {
    next({
      message: error.message,
      status: 403,
      error: 'Unauthorised Access'
    });
  }
};
