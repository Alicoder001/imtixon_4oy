import { Request, Response } from 'express';
import prisma from '../db/prisma';
export const addLinkType = async (req: Request, res: Response) => {
	try {
		const { name, iconUrl, color } = req.body;
		const type =await prisma.linkType.create({
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
	} catch (error) {
		res.status(500).json({ error: 'Serverda xatolik yuz berdi' });
	}
};
