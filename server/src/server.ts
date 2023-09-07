import app from './app';
import dotenv from 'dotenv';
dotenv.config();
// const PORT = process.env.PORT || 3000;
async function runServer() {
	app.listen(3000, () => {
		console.log('server started');
	});
}
runServer();
