"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralReponse = void 0;
class GeneralReponse {
    constructor() {
        /**
       * @param {res} resposne Input parameter
       * @param {code} the response code
       * @param {errorMessage} response error message
       * @return response object {@link res}
       */
        this.sendErrorResponse = (res, code, errorMessage) => res.status(code).send({
            status: 'error',
            error: errorMessage,
        });
        /**
           * @param {res} resposne Input parameter
           * @param {code} the response code
           * @param {errorMessage} response error message
           * @return response object {@link res}
           */
        this.sendSuccessResponse = (res, code, data) => res.status(code).send({
            status: 'success',
            data,
        });
    }
}
exports.GeneralReponse = GeneralReponse;
//# sourceMappingURL=generalRespose.js.map