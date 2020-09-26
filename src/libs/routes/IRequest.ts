import { Request } from 'express';
import IUserModel from '../../repositories/user/IUserModel';

export default interface IRequest extends Request {
  user: IUserModel;
}
