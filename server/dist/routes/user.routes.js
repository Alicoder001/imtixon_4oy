"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const UserRouter = express_1.default.Router();
UserRouter.post('/login', user_controller_1.login);
UserRouter.post('/signup', user_controller_1.signUp);
UserRouter.patch('/update/:id', user_controller_1.updateUser);
UserRouter.get('/auth', user_controller_1.getUser);
exports.default = UserRouter;
