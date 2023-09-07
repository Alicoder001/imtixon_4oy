import express from 'express';
import { addLink, addManyLink, getLink, getLinks, updateAll } from '../controller/link.controller';
const LinkRouter = express.Router();

LinkRouter.post('/addlinks', addManyLink);
LinkRouter.post('/addlink', addLink);
LinkRouter.get('/userId/:userId', getLinks);
LinkRouter.get('/linkId/:linkId', getLink);
LinkRouter.put('/updateLink/userId/:userId',updateAll);
export default LinkRouter;
