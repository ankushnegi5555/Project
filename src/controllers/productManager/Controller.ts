import { Request, Response } from 'express';
import ProductRepository from '../../repositories/product/ProductRepository';
import IRequest from '../../libs/routes/IRequest';
import * as bcrypt from 'bcrypt';

class ManagerController {
  private productRepository = new ProductRepository();

  static instance;
  static getInstance = (): ManagerController => {
    if (!ManagerController.instance) {
      ManagerController.instance = new ManagerController();
      return ManagerController.instance;
    }
    return ManagerController.instance;
  };
  create = async (req: IRequest, res: Response) => {
    const userId = req.user;
    const id = await this.productRepository.generateId();
    const data = req.body;
    const dataTocreate = {
      originalId: id,
      _id: id,
      company: userId,
      createdBy: userId,
      createdAt: Date.now(),
      ...data
     };
    const product = await this.productRepository.create(dataTocreate);
    if (!product) {
      throw {
        error: 'Error Occured',
        message: 'Type of the entered data is not valid'
      };
    }
    res.send({
      status: 'OK',
      message: 'Product added successfully'
    });
  };

  delete = async (req: IRequest, res: Response) => {
    const userId = req.user;
    const { id } = req.params;
    const data = {
      userId,
      id,
    };
    const product = await this.productRepository.delete(data);
    if (!product) {
      throw {
        error: 'Error Occured',
        message: 'Type of the entered data is not valid'
      };
    }
    res.send({
      status: 'OK',
      message: 'Product deleted successfully'
    });
  };

  update = async (req: IRequest, res: Response) => {
    const { id, dataToUpdate } = req.body;
    const userId = req.user;
    const data = {
      id,
      userId,
      dataToUpdate,
      updatedAt: Date.now(),
      updatedBy: userId
    };
    const product = await this.productRepository.update(data);
    if (!product) {
      throw {
        error: 'Error Occured',
        message: 'Type of the entered data is not valid'
      };
    }
    res.send({
      status: 'OK',
      message: 'Product updated successfully'
    });
  };

  getAll = async (req: IRequest, res: Response) => {
    const userId = req.user;
    const { skip, limit, name, all, ...rest } = req.query;
    let { sort } = rest;
    if (sort === '' || sort === undefined) {
      sort = 'createdAt';
    }
    const options = { skip, limit, sort };
    let regexValue;
    let reg = {};
    if (name !== '' && name !== undefined) {
      const del1 = name;
      regexValue = 'name';
      reg = { [regexValue]: { $regex: `^${del1}`, $options: 'i' } };
    }
    let query = Object.assign(reg);
    query = {
        ...query,
        deletedAt: undefined,
    };
    if (all === 'false' ) {
        query = {
            ...query,
            company: userId
        };
    }
    const getProducts = await this.productRepository.list(query, options);
    if (!getProducts) {
      throw {
        error: 'Error Occured',
        message: 'Type of the entered data is not valid'
      };
    }
    const counts = await this.productRepository.count(query);
    const { listCount, list } = getProducts;
    res.send({
      status: 'OK',
      message: 'Product list : ',
      data: {
        count: counts,
        records: list
      }
    });
  };
}

export default ManagerController.getInstance();
