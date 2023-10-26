const fs = require('fs');
const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('https');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/socket.rainbow-like-back.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/socket.rainbow-like-back.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/socket.rainbow-like-back.com/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const app = express();
const httpServer = createServer(credentials, app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    },
});

app.get('/healthcheck', (req, res) => {
    res.status(200).send('OK');
});

const clients = new Map();
io.sockets.on("connection", (socket) => {
    console.log("user connected");
    socket.on("message", (res) => {
        console.log(res.roomNumber);
        socket.join(res.roomNumber);
        const { target } = res;
        // 2
        const toUser = clients.get(target);
        target
            ? io.sockets.to(toUser).emit("sMessage", res)
            : socket.to(res.roomNumber).emit("sMessage", res);
    });
    socket.on("login", (data) => {
        console.log(data.roomNumber);
        socket.join(data.roomNumber);
        // 3
        clients.set(data.userId, socket.id);
        socket.to(data.roomNumber).emit("sLogin", data);
    });
});
httpServer.listen(3000, () => {
    console.log('Server is running on port 3000');
});


