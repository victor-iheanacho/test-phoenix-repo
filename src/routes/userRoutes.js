import express from 'express';
import UserController from '../controllers/UserController';
import UserMiddlewares from '../middlewares/userMiddlewares';

const userRoutes = express.Router();

const { createUser } = UserController;
const { checkUserExists } = UserMiddlewares;

userRoutes.post('/signup', checkUserExists, createUser);

export default userRoutes;
