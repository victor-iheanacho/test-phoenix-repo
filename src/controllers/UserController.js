import UserServices from '../services/userServices';
import Utils from '../utils';
import ResponseMsg from '../utils/responseMessages';

const { resSuccess, resError } = ResponseMsg;
/**
 * User controller Class
 */
export default class UserController {
/**
 * @name CreateUser
 * @description Allows an admin add a new user
 * @param {object} req The request object
 * @param {object} res The response object
 * @returns {object} The API response
 */
  static async createUser(req, res) {
    try {
      const userData = { ...req.body };
      userData.password = Utils.hashPassword(userData.password);
      const data = await UserServices.createUser(userData);
      const { id, isAdmin } = data;
      const token = Utils.generateToken({ id, isAdmin });
      res.set('Authorization', `Bearer ${token}`);
      return resSuccess(res, 201, data);
    } catch (error) {
      return resError(res, 500, error.message);
    }
  }
}
