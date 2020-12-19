"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const auth_1 = require("../../api/middlewares/auth");
const auth_controller_1 = require("../controllers/auth.controller");
class Routes {
    constructor() {
        this.authController = new auth_controller_1.AuthController();
        this.authchecker = new auth_1.AuthChecker();
    }
    routes(app) {
        app.route("/").get(this.authController.index);
        app.route("/users").get(this.authController.listUsers);
        app.route("/create-user").post(this.authController.createUser);
        app.route("/login").post(this.authController.login);
        app.route("/profile").get(this.authchecker.check, this.authController.getUserProfile);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map