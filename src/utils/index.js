import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Utils controller Class
 */
class Utils {
  /**
   * hashPassword
   * @description hashes a password
   * @param { string } password
   * @returns { string } hashed password
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
   * comparePassword
   * @description compares two passwords
   * @param { String } password
   * @param { String } hashedPassword
   * @returns { Boolean } True or false
   */
  static comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  /**
   * generateToken
   * @description generates authentication token
   * @param { Object } payload - { id, isAdmin }
   * @returns { String } token
   */
  static generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET, { expiresIn: '2h' });
  }
}

export default Utils;
