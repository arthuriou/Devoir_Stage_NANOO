import express from 'express';
import { Request, Response } from 'express';
import { HTTP_STATUS, RESPONSE_MESSAGE } from './utils/error_message';
import userRoutes from './routes/userRoute';
const app = express();
app.use(express.json());

const PORT = 3000 ;
const API_URL = 'http://localhost:3000';

app.get('/', (req:Request,res:Response)=>{
    res.send('Juste un simple serveur express avec TypeScript !');
}); 

app.get('/healthCheck', (req:Request , res:Response) =>{
    res.status(HTTP_STATUS.OK).json({
        status : 'ok',
        message : RESPONSE_MESSAGE.OK,
        timeStamp: new Date().toISOString(), 
        uptime: process.uptime(), 
    });
})
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log('le serveur est lancé sur le port : '+API_URL);
}
);