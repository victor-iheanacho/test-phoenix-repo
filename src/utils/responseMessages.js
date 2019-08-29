/**
 * Response messages Class
 */
class ResponseMsg {
/**
   * resError
   * @param { Object } res
   * @param { Number } status
   * @param { Object } message
   * @returns { Object } response body
   * @description defines the standard response format in the case of an error
   * @memberof ResponseMsg
   */
  static resError(res, status, message) {
    return res.status(status).json({
      status: 'error',
      error: message,
    });
  }

  /**
     * response
     * @param { Object } res
     * @param { Number } status
     * @param { Object } data
     * @returns { Object } response body
     * @description defines the standard response format when a data object is to be returned
     * @memberof ResponseMsg
     */
  static resSuccess(res, status, data) {
    return res.status(status).json({
      status: 'success',
      data,
    });
  }
}
export default ResponseMsg;
