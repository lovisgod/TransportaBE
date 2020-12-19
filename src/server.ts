import ErrorHandler from "./api/errorHandlers/ErrorHandler";
import { GeneralReponse } from "./api/responses/generalRespose";
import BaseError from "./api/errorHandlers/BaseError";
import app from "./app";
const PORT = process.env.PORT || 3000;



 // handle any uncaught exceptions
 process.on('uncaughtException', (error) => {
    // console.log(error)
    if (!ErrorHandler.isTrustedError(error)) {
    process.exit(1);
    }
    });

// error handler
app.use(async (err, req, res, next) => {
  // console.log(err);
  console.log("hereh erehre 4444")
if (err instanceof Error) {
// wiston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
if (ErrorHandler.isTrustedError(err)) {
  await ErrorHandler.handleError(err, res);
} else {
  new GeneralReponse().sendErrorResponse(res,   500, err.message);
}
} else {
console.log("hereh erehre")  
next(err);
}
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));