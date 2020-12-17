import { Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller";

export class Routes {
  public authController: AuthController = new AuthController();

  public routes(app): void {
    app.route("/").get(this.authController.index);

    app.route("/users").get(this.authController.listUsers);
    app.route("/create-user").post(this.authController.createUser);
    app.route("/login").post(this.authController.login);
    app.route("/profile").get(this.authController.getUserProfile);
  }
}