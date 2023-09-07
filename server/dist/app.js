"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
//Routes
const link_routes_1 = __importDefault(require("./routes/link.routes"));
const linkType_routes_1 = __importDefault(require("./routes/linkType.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_1 = __importDefault(require("./middleware/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/user', user_routes_1.default);
app.use('/link', auth_1.default, link_routes_1.default);
app.use('/linkType', auth_1.default, linkType_routes_1.default);
exports.default = app;
