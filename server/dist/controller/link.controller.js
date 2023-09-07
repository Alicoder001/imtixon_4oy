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
exports.updateAll = exports.getLink = exports.getLinks = exports.addLink = exports.addManyLink = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const addManyLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { data } = req.body;
        data = data === null || data === void 0 ? void 0 : data.map((item) => {
            return Object.assign(Object.assign({}, item), { userId: +item.userId, typeId: +item.typeId });
        });
        const msg = yield prisma_1.default.link.createMany({
            data: [
                {
                    userId: 1,
                    linkAdress: 'flksadlflksdflasdfl',
                    typeId: 1,
                },
            ],
            skipDuplicates: true,
        });
        if (!msg) {
            return res.status(500).json({ error: "Ma'lumotlar qo'shilmadi!" });
        }
        res.status(200).json({ message: "Ma'lumot muvaffaqiyatli qo'shildi!" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.addManyLink = addManyLink;
const addLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, typeId, linkAdress } = req.body;
        const msg = yield prisma_1.default.link.create({
            data: {
                userId: +userId,
                typeId: +typeId,
                linkAdress,
            },
        });
        if (!msg) {
            return res.status(500).json({ error: "Ma'lumot qo'shilmadi!" });
        }
        res.status(200).json({ message: "Ma'lumot muvaffaqiyatli qo'shildi!" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.addLink = addLink;
const getLinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +req.params.userId;
        const links = yield prisma_1.default.link.findMany({
            where: {
                userId,
            },
            include: {
                type: true,
            },
        });
        res.status(200).json(links);
    }
    catch (error) {
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.getLinks = getLinks;
const getLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.linkId;
        const link = yield prisma_1.default.link.findUnique({
            where: {
                id,
            },
            include: {
                type: true,
            },
        });
        if (!link) {
            return res.status(404).json({ error: 'Link topilmadi' });
        }
        res.status(200).json(link);
    }
    catch (error) {
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.getLink = getLink;
const updateAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +req.params.userId;
        const newData = req.body;
        const deleteLink = yield prisma_1.default.link.deleteMany({
            where: {
                userId,
            },
        });
        console.log(deleteLink);
        const createLink = yield prisma_1.default.link.createMany({
            data: newData,
        });
        if (!createLink) {
            res.status(500).json({
                error: "Ma'lumot yangilanmadi!",
            });
        }
        res.status(200).json({ message: "Ma'lumotlar yangilandi!" });
    }
    catch (error) {
        res.status(500).json({
            error: 'Serverda xatolik!',
        });
    }
});
exports.updateAll = updateAll;
