"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const link_controller_1 = require("../controller/link.controller");
const LinkRouter = express_1.default.Router();
LinkRouter.post('/addlinks', link_controller_1.addManyLink);
LinkRouter.post('/addlink', link_controller_1.addLink);
LinkRouter.get('/userId/:userId', link_controller_1.getLinks);
LinkRouter.get('/linkId/:linkId', link_controller_1.getLink);
LinkRouter.put('/updateLink/userId/:userId', link_controller_1.updateAll);
exports.default = LinkRouter;
