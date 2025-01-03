const net = require("net");
const {inspect} = require("util");
const port = 5050;
const host = "127.0.0.1"
const path = require('path');
const process = require('process');

const  {broadcastMessage, getSocketsExcluding, removeCRLF} = require(path.resolve(process.cwd(), "utilities", "chat-utils"))
const util = require("node:util");


const server = net.createServer();

server.listen(port, host, () => {
    console.log(`TCP server running at ${host} on port ${port}`);
})

let sockets = [];

function processMessage(sock, message) {
    const cleanMsg = removeCRLF(message)
    const sender = `sender: ${sock.remoteAddress}:${sock.remotePort}`
    console.log(sender)
    broadcastMessage(
        getSocketsExcluding(sockets, sock),
        `<${sender}>: ${cleanMsg}\n`
    )
}

server.on("connection", function (sock) {
    console.log(`CONNECTED: ${sock.remoteAddress}:${sock.remotePort}`)
    sockets.push(sock);
    sock.on("data", function (data) {
        processMessage(sock, data.toString())
    });
})

