const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
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
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(6000, () => {
    console.log('Server is running on port 6000');
});