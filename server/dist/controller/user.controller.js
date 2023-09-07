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
exports.getUser = exports.updateUser = exports.signUp = exports.login = void 0;
const prisma_1 = __importDefault(require("../db/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(404).json({ error: 'Foydalanuvchi topilmadi!' });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Parol notog'ri!" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'secret', { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.status(200).json({ message: 'Foydalanuvchi tizimga kirdi!', token });
    }
    catch (err) {
        res.status(200).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.login = login;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (user) {
            return res.status(409).json({ error: "Ushbu foydalanuvchi allaqachon ro'yxatdan o'tgan!" });
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        yield prisma_1.default.user.create({
            data: {
                email,
                password: hashPassword,
            },
        });
        res.status(201).json({ message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi!" });
    }
    catch (error) {
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.signUp = signUp;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const { firstName, lastName, email, password, imgUrl } = req.body;
        const user = yield prisma_1.default.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            return res.status(404).json({ error: 'Id topilmadi!' });
        }
        const updateUser = yield prisma_1.default.user.update({
            where: {
                id,
            },
            data: {
                firstName,
                lastName,
                email,
                imgUrl,
            },
        });
        if (!updateUser) {
            return res.status(500).json({ error: "Ma'lumot yangilanmadi!" });
        }
        res.status(200).json({ message: "Ma'lumot yangilandi!" });
    }
    catch (error) {
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.updateUser = updateUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
        const userId = jsonwebtoken_1.default.verify(token, 'secret').userId;
        if (!userId) {
            return res.status(404).json({ error: 'Token xatosi' });
        }
        let user = yield prisma_1.default.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                link: {
                    include: {
                        type: true,
                    },
                },
            },
        });
        if (!user) {
            return res.status(404).json({ error: 'Foydalanuvchi topilmadi!' });
        }
        res.status(200).json({ user, message: 'Autentifikatsiya muvaffaqiyatli amalga oshirildi!' });
    }
    catch (error) {
        res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
    }
});
exports.getUser = getUser;
