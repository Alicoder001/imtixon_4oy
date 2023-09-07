import { Request, Response } from 'express';
import prisma from '../db/prisma';
export const addManyLink = async (req: Request, res: Response) => {
	try {
		let { data } = req.body;
		data = data?.map((item: any) => {
			return { ...item, userId: +item.userId, typeId: +item.typeId };
		});
		const msg = await prisma.link.createMany({
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
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const addLink = async (req: Request, res: Response) => {
	try {
		const { userId, typeId, linkAdress } = req.body;
		const msg = await prisma.link.create({
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
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const getLinks = async (req: Request, res: Response) => {
	try {
		const userId = +req.params.userId;
		const links = await prisma.link.findMany({
			where: {
				userId,
			},
			include: {
				type: true,
			},
		});
		res.status(200).json(links);
	} catch (error) {
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const getLink = async (req: Request, res: Response) => {
	try {
		const id = +req.params.linkId;
		const link = await prisma.link.findUnique({
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
	} catch (error) {
		res.status(500).json({ error: 'Serverda xatolik yuz berdi!' });
	}
};
export const updateAll = async (req: Request, res: Response) => {
	try {
		const userId = +req.params.userId;
		const newData = req.body;
		const deleteLink = await prisma.link.deleteMany({
			where: {
				userId,
			},
		});
		console.log(deleteLink);
		const createLink = await prisma.link.createMany({
			data: newData,
		});
		if (!createLink) {
			res.status(500).json({
				error: "Ma'lumot yangilanmadi!",
			});
		}
		res.status(200).json({ message: "Ma'lumotlar yangilandi!" });
	} catch (error) {
		res.status(500).json({
			error: 'Serverda xatolik!',
		});
	}
};
