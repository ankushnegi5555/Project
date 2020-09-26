import { Router } from 'express';
import UserController from './Controller';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const userRouter: Router = Router();
/**
 * @swagger
 * /User/me:
 *   get:
 *     tags:
 *       - Users
 *     name: me
 *     summary: User own details
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         schema:
 *           $ref: '#/definitions/TraineeResponse'
 *       403:
 *         schema:
 *           $ref: '#/definitions/Unauthorized'
 *       500:
 *         schema:
 *           $ref: '#/definitions/500Response'
 */
userRouter.get('/me', authMiddleWare('getUsers', 'read'), UserController.me);

/**
 * @swagger
 * /User/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Logs in a user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - email
 *           - password
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               example: Token Generated
 *             token:
 *               example: hdbcuf38org39rh12_jhdcbwybuhbUBBbibiBiBmlgUdf0rh3fubwe30fj3-fh3-rvj3-vj3-vh0rivb04rvbnfufbsdhc sjkcn
 *       403:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               example: Error in token Generation
 *             message:
 *               example: Email or Password is Invalid
 *             status:
 *               example: 403
 *             timestamp:
 *               example: 2020-03-03T13:49:56.373Z
 *       500:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               example: Not Found
 *             message:
 *               example: Error
 *             status:
 *               example: 500
 *             timestamp:
 *               example: 2020-03-03T13:49:56.373Z
 */
userRouter.post('/login', UserController.login);


/**
 * @swagger
 * /User/signup:
 *   post:
 *     tags:
 *       - Users
 *     name: SignUp
 *     summary: User signup
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Details of the user to signup
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             role:
 *               type: string
 *             password:
 *               type: string
 *             dob:
 *               type: string
 *             hobbies:
 *               type: array
 *               items:
 *                 type: string
 *                 format: int64
 *             address:
 *               type: string
 *           required:
 *             - email
 *             - password
 *             - name
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               example: OK
 *             message:
 *               example: SignUp Successfully
 *       403:
 *         schema:
 *           $ref: '#/definitions/Unauthorized'
 *       500:
 *         schema:
 *           $ref: '#/definitions/500Response'
 */
userRouter.post('/signup', UserController.signup);
export default userRouter;
