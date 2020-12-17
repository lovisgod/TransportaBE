"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const node_controller_1 = require("../controllers/node.controller");
class Routes {
    constructor() {
        this.nodesController = new node_controller_1.NodesController();
    }
    routes(app) {
        app.route("/").get(this.nodesController.index);
        app.route("/users").get(this.nodesController.listUsers);
        app.route("/create-user").post(this.nodesController.createUser);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map