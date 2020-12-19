export class GeneralReponse {
    /**
   * @param {res} resposne Input parameter
   * @param {code} the response code
   * @param {errorMessage} response error message
   * @return response object {@link res}
   */
 sendErrorResponse = (res, code, errorMessage) => res.status(code).send({
    status: 'error',
    error: errorMessage,
  });
  
  /**
     * @param {res} resposne Input parameter
     * @param {code} the response code
     * @param {errorMessage} response error message
     * @return response object {@link res}
     */
   sendSuccessResponse = (res, code, data) => res.status(code).send({
    status: 'success',
    data,
  });
}