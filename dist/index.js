"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_message_1 = require("./utils/error_message");
const app = (0, express_1.default)();
const PORT = 3000;
// app.get('/', (req:Request,res:Response)=>{
//     res.send('Juste un simple serveur express avec TypeScript !');
// }); 
// app.listen(PORT, () => {
//     console.log('le serveur est lancé sur le port '+PORT);
// }
// );
app.get('/healthCheck', (req, res) => {
    res.status(error_message_1.HTTP_STATUS.OK).json({
        status: 'ok',
        message: error_message_1.RESPONSE_MESSAGE.OK,
        timeStamp: new Date().toISOString(), // date de la requête
        uptime: process.uptime(), // temps de fonctionnement du serveur
    });
});
app.listen(PORT, () => {
    console.log('le serveur est lancé sur le port ' + PORT);
});
