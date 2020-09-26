import { Response } from 'express';
import OrderRepository from '../../repositories/order/OrderRepository';
import IRequest from '../../libs/routes/IRequest';
import * as bcrypt from 'bcrypt';

class OrderController {
  private orderRepository = new OrderRepository();

  static instance;
  static getInstance = (): OrderController => {
    if (!OrderController.instance) {
      OrderController.instance = new OrderController();
      return OrderController.instance;
    }
    return OrderController.instance;
  };
  create = async (req: IRequest, res: Response) => {
    const id = await this.orderRepository.generateId();
    const userId = req.user;
    const { product, price } = req.body;
    const dataTocreate = {
      _id: id,
      originalId: id,
      createdBy: userId,
      createdAt: Date.now(),
      product,
      price,
     };
    const order = await this.orderRepository.create(dataTocreate);
    if (!order) {
      throw {
        error: 'Error Occured',
        message: 'Type of the entered data is not valid'
      };
    }
    res.send({
      status: 'OK',
      message: 'Order added successfully'
    });
  };

  delete = async (req: IRequest, res: Response) => {
    const userId = req.user;
    const { id } = req.params;
    const data = {
      userId,
      id,
    };
    const order = await this.orderRepository.delete(data);
    if (!order) {
      throw {
        error: 'Error Occured',
        message: 'Type of the entered data is not valid'
      };
    }
    res.send({
      status: 'OK',
      message: 'Order deleted successfully'
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
    const order = await this.orderRepository.update(data);
    if (!order) {
      throw {
        error: 'Error Occured',
        message: 'Type of the entered data is not valid'
      };
    }
    res.send({
      status: 'OK',
      message: 'Order updated successfully'
    });
  };

  getAll = async (req: IRequest, res: Response) => {
    const query = { createdBy: req.user, deletedAt: undefined };
    const { skip, limit } = req.query;
    const options = {
      skip,
      limit,
    };
    const order = await this.orderRepository.list(query, options);
    if (!order) {
      throw {
        error: 'Error Occured',
        message: 'Type of the entered data is not valid'
      };
    }
    const counts = await this.orderRepository.count(query);
    const { list, listCount } = order;
    res.send({
      status: 'OK',
      message: 'Order list : ',
      data: {
        count: counts,
        record: list,
      }
    });
  };
}

export default OrderController.getInstance();
