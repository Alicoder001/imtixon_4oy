import express from 'express';
import cors from 'cors';

//Routes
import LinkRouter from './routes/link.routes';
import LinktTypeRouter from './routes/linkType.routes';
import UserRouter from './routes/user.routes';
import auth from './middleware/auth';
import cookieParser from 'cookie-parser';
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/user', UserRouter);
app.use('/link', auth, LinkRouter);
app.use('/linkType', auth, LinktTypeRouter);

export default app;
