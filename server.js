const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: "https://neumoinvova-source.github.io",
    methods: ["GET", "POST"]
}));

const io = new Server(server, {
    cors: {
        origin: "https://neumoinvova-source.github.io",
        methods: ["GET", "POST"]
    }
});

app.get("/", (req, res) => {
    res.send("🦉 OWL server работает!");
});

io.on("connection", (socket) => {

    console.log("Пользователь подключился");

    socket.on("send_message", (message) => {
        io.emit("receive_message", message);
    });

    socket.on("disconnect", () => {
        console.log("Пользователь отключился");
    });

});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
    console.log(`OWL server запущен на порту ${PORT}`);
});
