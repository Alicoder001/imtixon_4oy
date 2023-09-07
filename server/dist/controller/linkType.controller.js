"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLinkType = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const addLinkType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, iconUrl, color } = req.body;
        const type = yield prisma_1.default.linkType.create({
            data: {
                name,
                iconUrl,
                color,
            },
        });
        console.log(type);
        if (!type) {
            return res.status(500).json({
                error: "LinkType qo'shilmadi",
            });
        }
        res.status(200).json({ type, message: "Linktype qo'shildi!" });
    }
    catch (error) {
        res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
    }
});
exports.addLinkType = addLinkType;
