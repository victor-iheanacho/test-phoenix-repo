import UserServices from '../services/userServices.js';
import Utils from '../utils';

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
      return res.status(201).json({
        status: 201,
        message: 'User successfuly created',
        data,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
