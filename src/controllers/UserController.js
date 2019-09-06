import https from 'https';
import Linkedn from 'node-linkedin';
import Utils from '../utils';
import UserServices from '../services/userServices';

const scope = ['r_liteprofile', 'w_member_social', 'r_emailaddress'];
const clientId = process.env.LINKENDIN_CLIENT_ID;
const clientSecret = process.env.LINKENDIN_CLIENT_SECRET;
const redirect = process.env.LINKENDIN_REDIRECT_URL;
const Linkedin = Linkedn(clientId, clientSecret, redirect);

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
      return res.status(201).json({
        status: 201,
        message: 'User successfuly created',
        data,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   *@name getGoogleUrl
   * @param {object} req The request object
   * @param {object} res The response object
   * @returns {object} The API response
   * @memberof User
   */
  static async getGoogleUrl(req, res) {
    try {
      const auth = Utils.createConnection();
      const url = Utils.getConnectionUrl(auth);
      return res.status(200).json({ status: 200, url });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }

  /**
   * @name getGoogleAccountFromCode
   * @param {*} req Request object
   * @param {*} res Response object
   * @return {json} Returns json object
   * @memberof User
   */
  static async getGoogleAccountFromCode(req, res) {
    try {
      const auth = Utils.createConnection();
      const data = await auth.getToken(req.query.code);
      const token = data.tokens;
      auth.setCredentials(token);
      const plus = Utils.getGooglePlusApi(auth);
      const me = await plus.people.get({ userId: 'me' });
      const email = me.data.emails && me.data.emails.length && me.data.emails[0].value;
      const user = await UserServices.getUserByGmail(email);
      if (!user) {
        return res.status(404).json({ status: 404, message: 'User not found' });
      }
      return res.status(200).json({ status: 200, user });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }

  /**
   * @name getLinkedinUrl
   * @param {*} req Request object
   * @param {*} res Response object
   * @return {json} Returns json object
   * @memberof User
   */
  static async getLinkedinUrl(req, res) {
    const authurl = Linkedin.auth.authorize(scope);
    const url = authurl;
    return res.status(200).json({ status: 200, url });
  }

  /**
   * @name getLinkedinAccountFromCode
   * @param {*} req Request object
   * @param {*} res Response object
   * @return {json} Returns json object
   * @memberof User
   */
  static async getLinkedinAccountFromCode(req, res) {
    Linkedin.auth.getAccessToken(
      res,
      req.query.code,
      req.query.state,
      async (err, results) => {
        if (err) return err;
        const accessToken = results.access_token;

        const options = {
          host: 'api.linkedin.com',
          path: '/v2/emailAddress?q=members&projection=(elements*(handle~))',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'cache-control': 'no-cache',
            'X-Restli-Protocol-Version': '2.0.0'
          }
        };

        const profileRequest = https.request(options, (result) => {
          let data = '';
          result.on('data', (chunk) => {
            data += chunk;
          });
          result.on('end', async () => {
            const profileData = JSON.parse(data);
            const email = Object.values(profileData.elements[0])[0]
              .emailAddress;
            const user = await UserServices.getUserByLinkedin(email);
            if (!user) {
              return res
                .status(404)
                .json({ status: 404, message: 'User not found' });
            }
            return res.status(200).json({ status: 200, user });
          });
        });
        profileRequest.end();
      }
    );
  }
}
