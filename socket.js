let playerCount = 0;

function listen(io){
    const pongNamespace = io.of('/pong');
    pongNamespace.on('connection', (socket) => {
        let room;
        console.log(`socket enstablished successfully!!`, socket.id);
    
        socket.on('ready', () => {
            room = `room${Math.floor(playerCount/2)}`;
            console.log('client is ready', room)
            socket.join(room);
            playerCount += 1;
            if(playerCount%2===0){
                pongNamespace.in(room).emit('startGame', socket.id);
            }
        });
    
        socket.on('paddleMove', (data) => {
            socket.to(room).emit('paddleMoved', data);
        });
    
        socket.on('ballMove', (ballData) => {
            socket.to(room).emit('ballMoved', ballData)
        });

        socket.on('disconnect', (reason) => {
            console.log(`disconnection reason : ${reason}`);
            socket.leave(room);
        })
    });
}

module.exports = {
    listen
}