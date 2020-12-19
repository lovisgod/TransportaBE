"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler_1 = __importDefault(require("./api/errorHandlers/ErrorHandler"));
const generalRespose_1 = require("./api/responses/generalRespose");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
// handle any uncaught exceptions
process.on('uncaughtException', (error) => {
    // console.log(error)
    if (!ErrorHandler_1.default.isTrustedError(error)) {
        process.exit(1);
    }
});
// error handler
app_1.default.use((err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(err);
    console.log("hereh erehre 4444");
    if (err instanceof Error) {
        // wiston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        if (ErrorHandler_1.default.isTrustedError(err)) {
            yield ErrorHandler_1.default.handleError(err, res);
        }
        else {
            new generalRespose_1.GeneralReponse().sendErrorResponse(res, 500, err.message);
        }
    }
    else {
        console.log("hereh erehre");
        next(err);
    }
}));
app_1.default.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
//# sourceMappingURL=server.js.map