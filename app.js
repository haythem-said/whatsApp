import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
io.on("connection", (socket) => {
  console.log("Un client est connecté");

  socket.on("message", (data) => {
    console.log("Message reçu du client:", data);
    io.emit("message", data); // renvoie le message à tous les clients connectés
  });

  socket.on("disconnect", () => {
    console.log("Un client s'est déconnecté");
  });
});

server.listen(3000, () => {
  console.log("Serveur Socket.IO démarré sur le port 3000");
});
