import { Router } from 'express';
import ManagerController from './Controller';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const managerRouter: Router = Router();

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
 *         name:
 *           example: FootBall
 *         price:
 *           example: 1000
 *         description:
 *           example: Good product
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
 * /product:
 *   get:
 *     tags:
 *       - ProductManager
 *     name: Find product
 *     summary: Find Product List
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: name
 *         type: string
 *       - in: query
 *         name: skip
 *         type: number
 *       - in: query
 *         name: limit
 *         type: number
 *       - in: query
 *         name: sort
 *         type: string
 *       - in: query
 *         name: all
 *         type: string
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               example: OK
 *             message:
 *               example: Product List
 *             data:
 *               type: object
 *               properties:
 *                 total_product:
 *                   example: 1
 *                 productList:
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
managerRouter.get(
  '/',
  authMiddleWare('getProducts', 'read'),
  ManagerController.getAll
);

/**
 * @swagger
 * /product:
 *   post:
 *     tags:
 *       - ProductManager
 *     name: Create
 *     summary: Create Product
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Details of the product to create
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             price:
 *               type: number
 *             description:
 *               type: string
 *           required:
 *             - description
 *             - price
 *             - name
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               example: OK
 *             message:
 *               example: Product Added Successfully
 *       403:
 *         schema:
 *           $ref: '#/definitions/Unauthorized'
 *       500:
 *         schema:
 *           $ref: '#/definitions/500Response'
 */
managerRouter.post(
  '/',
  authMiddleWare('getProducts', 'write'),
  ManagerController.create
);

/**
 * @swagger
 * /product:
 *   put:
 *     tags:
 *       - ProductManager
 *     name: Modify Product
 *     summary: Update Product Details
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
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
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
 *               example: Product Updated Successfully
 *       403:
 *         schema:
 *           $ref: '#/definitions/Unauthorized'
 *       500:
 *         schema:
 *           $ref: '#/definitions/500Response'
 */
managerRouter.put(
  '/',
  authMiddleWare('getProducts', 'write'),
  ManagerController.update
);


/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     tags:
 *       - ProductManager
 *     name: Delete Product
 *     summary: Delete Product Details
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
 *               example: Product Deleted Successfully
 *       403:
 *         schema:
 *           $ref: '#/definitions/Unauthorized'
 *       500:
 *         schema:
 *           $ref: '#/definitions/500Response'
 */
managerRouter.delete(
  '/:id',
  authMiddleWare('getProducts', 'write'),
  ManagerController.delete
);

export default managerRouter;
