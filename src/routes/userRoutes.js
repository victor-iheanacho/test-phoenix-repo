import express from 'express';
import UserController from '../controllers/UserController';
import UserMiddlewares from '../middlewares/userMiddlewares';
import userValidation from '../validation/userValidation';
import validationHandler from '../validation/validationHandler';

const userRoutes = express.Router();

const { createUser } = UserController;
const { checkUserExists } = UserMiddlewares;

userRoutes.post('/signup', userValidation, validationHandler, checkUserExists, createUser);

export default userRoutes;
