import { validationResult } from 'express-validator';
import ResponseMsg from '../utils/responseMessages';

const { resError } = ResponseMsg;
const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resError(res, 422, errors.array().map(error => error.msg)[0]);
  }
  return next();
};

export default validationHandler;
