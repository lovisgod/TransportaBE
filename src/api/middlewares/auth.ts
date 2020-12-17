import { TokenProccessor } from "../../config/tokenProccessor";
import { UserDataSource } from "../../core/data/UserDataSource";
import { Request, Response } from "express";


export class AuthChecker {
// eslint-disable-next-line consistent-return



    check =  async (req: Request, res: Response, next) => {
    try {
      if (!req.headers.authorization) {
          return res.status(401).send("Authorization required!!!")
      }
      const token = req.headers.authorization.split(' ')[1] || req.headers.authorization;
    const {email} = new TokenProccessor().verifyToken(token);
      const user = await UserDataSource.getAUserbyEmail(email);
      if (!user) {return res.status(404).send({
        success: false,
        message: "user does not exist",
        data: null
      })}
      req.body.userData = user;
      next();
    } catch (err) {
      const error = err.message ? 'Authentication Failed' : err;
      next(error);
    }
  };
}



