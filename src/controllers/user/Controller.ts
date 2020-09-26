import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import IRequest from '../../libs/routes/IRequest';
import UserRepository from '../../repositories/user/UserRepository';
import config from '../../config/configuration';

class UserController {
  private userRepository = new UserRepository();

  static instance: UserController;
  static getInstance = () => {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  };

  me = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const myProfile = await this.userRepository.findOne({originalId: req.user});
      res.send(myProfile);
    } catch (err) {
      return next({
        error: err,
        message: err
      });
    }
  };

  signup = async (req: IRequest, res: Response, next: NextFunction) => {
    const id = await this.userRepository.generateId();
    const { password, ...rest } = req.body;
    const hashPassword: string = await bcrypt.hash(password, 10);
    const dataTocreate = {
      originalId: id,
      _id: id,
      password: hashPassword,
      createdBy: id,
      createdAt: Date.now(),
      ...rest
     };
    const user = await this.userRepository.create(dataTocreate);
    if (!user) {
      throw {
        error: 'Error Occured',
        message: 'Type of the entered data is not valid'
      };
    }
    res.send({
      status: 'OK',
      message: 'SignUp successfully'
    });
  }

  login = async (req: IRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const userData = await this.userRepository.findOne({ email });
      if (!userData) {
        throw new Error('Email is Invalid');
      }
      const result = await bcrypt.compare(password, userData.password);
      if (result) {
        const originalId = userData.originalId;
        const role = userData.role;
        const token = await jwt.sign(
          { email, originalId, role },
          config.secretKey,
          { expiresIn: (60 * 60 * 60) }
        );
        res.send({
          status: 'OK',
          message: 'Token Generated',
          data: token
        });
      } else {
        throw new Error('Password is Invalid');
      }
    } catch (error) {
      if (error.message) {
        next({
          message: error.message,
          status: 403,
          error: 'Error in token Generation'
        });
      } else {
        next({
          error: 'Not Found'
        });
      }
    }
  };
}
export default UserController.getInstance();
