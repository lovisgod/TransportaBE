import { UserDataSource } from "../../core/data/UserDataSource";
import { UserInterface } from "../../core/domain/User";
import { NextFunction, Request, Response } from "express";
import { PasswordHasher } from "../../config/passwordHash";
import { TokenProccessor } from "../../config/tokenProccessor";
import GeneralError from "../../api/errorHandlers/GeneralError";
import { GeneralReponse } from "../responses/generalRespose";

export class AuthController {
  public index(req: Request, res: Response) {
    res.json({
      message: "Hello user welcome to transporta api",
    });
  }

  listUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users  = await UserDataSource.listUsers();
        return new GeneralReponse().sendSuccessResponse(res, 200, { data: users}) 
      } catch (error) {
        next(error);
      }       
  }

  createUser = async (req: Request, res: Response, next) => {
    try {
      const password = new PasswordHasher().hashPassword(req.body.password);
      const body: UserInterface = req.body;
      body.password = password;
      const existed = await UserDataSource.getAUserbyEmail(body.email);
      if (existed){
         throw new GeneralError("not exist", 409, true, "User already exist")
      } 
      await UserDataSource.createUser(body);
      return new GeneralReponse().sendSuccessResponse(res, 200, {message: "sign up successful"})
    } catch (error) {
      next(error)
    }
}

login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: UserInterface = req.body;
    const existed = await UserDataSource.getAUserbyEmail(body.email);
    if (!existed){
      throw new GeneralError("not found", 404, true, "User not found!!");
    } 
    const passwordMatch = await new PasswordHasher().comparePassword(body.password, existed.password)

    if (passwordMatch) {
      const token = new TokenProccessor().createToken({
        name: existed.name,
        email: existed.email,
        role: existed.role,
      })
      return new GeneralReponse().sendSuccessResponse(res, 200, {token})
    } else {
      throw new GeneralError("error", 404, true, "Password does not match!!!");
    }
  } catch (error) {
    next(error)
  }
}

getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.userData != null) {
      return new GeneralReponse().sendSuccessResponse(res, 200, { data: req.body.userData });
    } else {
      throw new GeneralError("error", 404, true, "User not found!!!");
    }
  } catch (error) {
   next(error)
  }
}
  
}