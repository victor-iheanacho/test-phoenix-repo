import bcrypt from 'bcryptjs';

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
}

export default Utils;
