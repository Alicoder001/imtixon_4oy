import express from 'express';
import { getUser, login, signUp, updateUser } from '../controller/user.controller';

const UserRouter = express.Router();
UserRouter.post('/login', login);
UserRouter.post('/signup', signUp);
UserRouter.patch('/update/:id', updateUser);
UserRouter.get('/auth', getUser);
export default UserRouter;
