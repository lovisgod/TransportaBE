"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const auth_controller_1 = require("../controllers/auth.controller");
class Routes {
    constructor() {
        this.authController = new auth_controller_1.AuthController();
    }
    routes(app) {
        app.route("/").get(this.authController.index);
        app.route("/users").get(this.authController.listUsers);
        app.route("/create-user").post(this.authController.createUser);
        app.route("/login").post(this.authController.login);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map