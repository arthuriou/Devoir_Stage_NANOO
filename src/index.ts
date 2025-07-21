import { timeStamp } from 'console';
import express from 'express';
import { Request, Response } from 'express';
import { uptime } from 'process';
import { HTTP_STATUS, RESPONSE_MESSAGE } from './utils/error_message';
const app = express();

const PORT = 3000 ;

// app.get('/', (req:Request,res:Response)=>{
//     res.send('Juste un simple serveur express avec TypeScript !');
// }); 

// app.listen(PORT, () => {
//     console.log('le serveur est lancé sur le port '+PORT);
// }
// );

app.get('/healthCheck', (req:Request , res:Response) =>{
    res.status(HTTP_STATUS.OK).json({
        status : 'ok',
        message : RESPONSE_MESSAGE.OK,
        timeStamp: new Date().toISOString(), // date de la requête
        uptime: process.uptime(), // temps de fonctionnement du serveur
    });
})

app.listen(PORT, () => {
    console.log('le serveur est lancé sur le port '+PORT);
}
);