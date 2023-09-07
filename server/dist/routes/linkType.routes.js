"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const linkType_controller_1 = require("../controller/linkType.controller");
const LinktTypeRouter = express_1.default.Router();
LinktTypeRouter.post('/add', linkType_controller_1.addLinkType);
exports.default = LinktTypeRouter;
