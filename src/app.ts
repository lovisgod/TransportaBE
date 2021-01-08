import express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./api/routes/index";
import multer from 'multer';
import cors from 'cors';


class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public upload = multer();
  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(cors());
    this.app.use(this.upload.single('avatar'));
 }
}

export default new App().app;