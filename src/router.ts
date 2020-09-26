import { Router } from 'express';
import { ownerRouter } from './controllers/owner';
import { userRouter } from './controllers/user';
import { prodRouter } from './controllers/productManager';
import { orderRouter } from './controllers/order';

const routers: Router = Router();

routers.use('/owner', ownerRouter);
routers.use('/user', userRouter);
routers.use('/product', prodRouter);
routers.use('/order', orderRouter);

export default routers;
