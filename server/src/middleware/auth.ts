import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../db/prisma';
export interface customRequest extends Request {
	userId: number;
}
const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies?.token;
		if (!token) {
			return res.status(401).json({ error: 'Token topilmadi!' });
		}
		const validToken = jwt.verify(token, 'secret') as JwtPayload;
		if (!validToken) {
			return res.status(401).json({ error: 'Token xato!' });
		}
		const userId = validToken.userId;
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
		if (!user) {
			return res.status(404).json({ error: 'Foydalanuvchi topilmadi!' });
		}
		(req as customRequest).userId = (validToken as { userId: number }).userId;
		next();
	} catch (error) {
        console.log(error)
		res.status(500).json({ error: 'Serverda xatolik!' });
	}
};
export default auth;
