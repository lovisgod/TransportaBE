import { UserDataSource } from "../../core/data/UserDataSource";
import { UserInterface } from "../../core/domain/User";
import { Request, Response } from "express";
import { PasswordHasher } from "../../config/passwordHash";
import { TokenProccessor } from "../../config/tokenProccessor";

export class AuthController {
  public index(req: Request, res: Response) {
    res.json({
      message: "Hello user welcome to transporta api",
    });
  }

  listUsers = async (req: Request, res: Response) => {
    try {
        const users  = await UserDataSource.listUsers();
        return res.send({
            success: true,
            message: "Successful",
            data: users
        });    
      } catch (error) {
        return res.status(500).send({
            success: false,
            message: error,
            data: null
        })
        
      }       
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const password = new PasswordHasher().hashPassword(req.body.password);
      const body: UserInterface = req.body;
      body.password = password;
      const existed = await UserDataSource.getAUserbyEmail(body.email);
      if (existed){
        return res.status(409).send({
          success: false,
          message: "User already exist",
          data: null
        })
      } 
      await UserDataSource.createUser(body);
      return res.status(200).send({
        success: true,
        message: "Account created successfully",
        data: null
      }) 
    } catch (error) {
      console.log(error);
      console.log(error.message);
      return res.status(500).send({
          success: false,
          message: "Internal server error",
          data: null
      })
      
    }
}

login = async (req: Request, res: Response) => {
  try {
    const body: UserInterface = req.body;
    const existed = await UserDataSource.getAUserbyEmail(body.email);
    if (!existed){
      return res.status(404).send({
        success: false,
        message: "User not found!!!",
        data: null
      })
    } 
    const passwordMatch = await new PasswordHasher().comparePassword(body.password, existed.password)

    if (passwordMatch) {
      const token = new TokenProccessor().createToken({
        name: existed.name,
        email: existed.email,
        phone: existed.phone
      })
      return res.status(200).send({
        success: true,
        message: "Login successful",
        data: {
          token
        }
      }) 
    } else {
      return res.status(404).send({
        success: false,
        message: "Password does not match!!!",
        data: null
      })
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return res.status(500).send({
        success: false,
        message: "Internal server error",
        data: null
    })
    
  }
}
  
}