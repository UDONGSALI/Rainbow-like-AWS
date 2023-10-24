const { Server } = require("socket.io");

const io = new Server(3000, {
    cors: {
        origin: function (origin, callback) {
            if (origin.startsWith("http://rainbow-react.s3-website.ap-northeast-2.amazonaws.com")) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    },
});

// 1
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