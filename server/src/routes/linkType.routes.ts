import express from 'express';
import { addLinkType } from '../controller/linkType.controller';

const LinktTypeRouter = express.Router();
LinktTypeRouter.post('/add', addLinkType);
export default LinktTypeRouter;
