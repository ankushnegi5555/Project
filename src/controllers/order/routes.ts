import { Router } from 'express';
import OrderController from './Controller';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const orderRouter: Router = Router();

/**
 * @swagger
 * definitions:
 *     Unauthorized:
 *       type: object
 *       properties:
 *         error:
 *           example: Unauthorised Access
 *         message:
 *           example: jwt must be provided
 *         status:
 *           example: 403
 *         timestamp:
 *           example: 2019-03-10T19:51:37.066Z
 *
 *
 *     Response:
 *       type: object
 *       properties:
 *         products:
 *           example: football
 *         createdAt:
 *           example: 2019-03-10T19:51:37.066Z
 *         createdBy:
 *           example: uihsidcinini345nin4n2onon
 *
 *
 *     500Response:
 *       type: object
 *       properties:
 *         error:
 *           example: Not Found
 *         message:
 *           example: Error
 *         status:
 *           example: 500
 *         timestamp:
 *           example: 2019-03-10T19:51:37.066Z
 */

/**
 * @swagger
 * /order:
 *   get:
 *     tags:
 *       - Order
 *     name: Find order
 *     summary: Find order List
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               example: OK
 *             message:
 *               example: Order List
 *             data:
 *               type: object
 *               properties:
 *                 products_quantity:
 *                   example: 1
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/definitions/Response'
 *       403:
 *         schema:
 *           $ref: '#/definitions/Unauthorized'
 *       500:
 *         schema:
 *           $ref: '#/definitions/500Response'
 */
orderRouter.get(
  '/',
  authMiddleWare('getOrders', 'read'),
  OrderController.getAll
);

/**
 * @swagger
 * /order:
 *   post:
 *     tags:
 *       - Order
 *     name: Create
 *     summary: Create Order
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Details of the order to create
 *         schema:
 *           type: object
 *           properties:
 *             products:
 *               type: array
 *               items:
 *                 type: string
 *                 format: int64
 *           required:
 *             - products
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               example: OK
 *             message:
 *               example: Order Placed Successfully
 *       403:
 *         schema:
 *           $ref: '#/definitions/Unauthorized'
 *       500:
 *         schema:
 *           $ref: '#/definitions/500Response'
 */
orderRouter.post(
  '/',
  authMiddleWare('getOrders', 'write'),
  OrderController.create
);

/**
 * @swagger
 * /order:
 *   put:
 *     tags:
 *       - Order
 *     name: Modify Order
 *     summary: Update Order Details
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Details of the product to update
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             dataToUpdate:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: int64
 *           required:
 *             - id
 *     responses:
 *       '200':
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               example: OK
 *             message:
 *               example: Order Updated Successfully
 *       403:
 *         schema:
 *           $ref: '#/definitions/Unauthorized'
 *       500:
 *         schema:
 *           $ref: '#/definitions/500Response'
 */
orderRouter.put(
  '/',
  authMiddleWare('getOrders', 'write'),
  OrderController.update
);


/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     tags:
 *       - Order
 *     name: Delete Order
 *     summary: Delete Order Details
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required:
 *           - id
 *         security:
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               example: OK
 *             message:
 *               example: Order Deleted Successfully
 *       403:
 *         schema:
 *           $ref: '#/definitions/Unauthorized'
 *       500:
 *         schema:
 *           $ref: '#/definitions/500Response'
 */
orderRouter.delete(
  '/:id',
  authMiddleWare('getOrders', 'write'),
  OrderController.delete
);

export default orderRouter;
