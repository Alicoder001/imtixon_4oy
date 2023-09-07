import { Request, Response } from 'express';
import prisma from '../db/prisma';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (!user) {
			return res.status(404).json({ error: 'Foydalanuvchi topilmadi!' });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ error: "Parol notog'ri!" });
		}
		const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '7d' });
		res.cookie('token', token, { httpOnly: true, secure: true });
		res.status(200).json({ message: 'Foydalanuvchi tizimga kirdi!', token });
	} catch (err) {
		res.status(200).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const signUp = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (user) {
			return res.status(409).json({ error: "Ushbu foydalanuvchi allaqachon ro'yxatdan o'tgan!" });
		}
		const hashPassword = await bcrypt.hash(password, 10);
		await prisma.user.create({
			data: {
				email,
				password: hashPassword,
			},
		});
		res.status(201).json({ message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi!" });
	} catch (error) {
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const updateUser = async (req: Request, res: Response) => {
	try {
		const id = +req.params.id;
		const { firstName, lastName, email, password, imgUrl } = req.body;
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});
		if (!user) {
			return res.status(404).json({ error: 'Id topilmadi!' });
		}
		const updateUser = await prisma.user.update({
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
	} catch (error) {
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const getUser = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.split(' ')[1] || '';
		const userId = (jwt.verify(token, 'secret') as JwtPayload).userId;
		if (!userId) {
			return res.status(404).json({ error: 'Token xatosi' });
		}
		let user = await prisma.user.findUnique({
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
	} catch (error) {
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
