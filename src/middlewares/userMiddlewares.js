import userServices from '../services/userServices.js';

/**
 * User Middlewares Class
 */
export default class UserMiddlewares {
/**
 * @name checkUserExists
 * @description Checks if a user exists in the database
 * @param {object} req The request object
 * @param {object} res The response object
 * @param {object} next The response object
 * @returns {object} The API response or next()
 */
  static async checkUserExists(req, res, next) {
    try {
      const { email } = req.body;
      const data = await userServices.getUserByEmail(email);
      if (!data) return next();
      return res.status(409).json({
        status: 409,
        error: 'Unsuccesful, user already exists, kindly use a different email.',
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
