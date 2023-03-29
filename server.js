const http = require('http');
const io = require('socket.io');
const socketServer = require('./socket');

const app = require('./api');
const httpServer = http.createServer(app),
ioServer = io(httpServer, {
    cors: {
        origin: 3000,
        method: ['get', 'post']
    }
}),

PORT = 3000;

httpServer.listen(PORT, () => {
    console.log(`server is listening at ${PORT}....`);
});

socketServer.listen(ioServer)