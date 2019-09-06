import express from 'express';
import UserController from '../controllers/UserController';
import UserMiddlewares from '../middlewares/userMiddlewares';

const userRoutes = express.Router();

const {
  createUser,
  getGoogleUrl,
  getGoogleAccountFromCode,
  getLinkedinUrl,
  getLinkedinAccountFromCode
} = UserController;

const { checkUserExists } = UserMiddlewares;

userRoutes.post('/signup', checkUserExists, createUser);

userRoutes.get('/user/google/signin', getGoogleUrl);
userRoutes.get('/google/callback', getGoogleAccountFromCode);
userRoutes.get('/user/linkedin/signin', getLinkedinUrl);
userRoutes.get('/linkedin/callback', getLinkedinAccountFromCode);

export default userRoutes;
