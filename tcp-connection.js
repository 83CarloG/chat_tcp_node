const net = require("net");
const {inspect} = require("util");
const port = 5050;
const host = "127.0.0.1"
const path = require('path');
const process = require('process');

const  {broadcastMessage, getSocketsExcluding, removeCRLF, socketToId,parseNickMessage, parsePvtMessage, colorGrey, colorGreen} = require(path.resolve(process.cwd(), "utilities", "chat-utils"))

const server = net.createServer();
server.listen(port, host, () => {
    console.log("TCP Server is running on port " + port + ".");
});

let sockets = [];
let namesMap = {};

function setName(sock, name) {
    namesMap[socketToId(sock)] = name;
}
function getName(sock) {
    return namesMap[socketToId(sock)];
}
function getSocketByName(sockets, name) {
    return sockets.find((s) => getName(s) === name);
}

function processMessage(sock, message) {
    const cleanMsg = removeCRLF(message);

    if (cleanMsg.startsWith("/nick ") /* space intended*/) {
        const oldName = getName(sock);
        const name = parseNickMessage(cleanMsg);
        setName(sock, name);
        broadcastMessage(
            sockets,
            `${colorGrey(`${oldName} is now ${name}`)}\n`
        );
    } else if (cleanMsg.startsWith("/pvt ") /* space intended*/) {
        const [receiver, pvtMsg] = parsePvtMessage(cleanMsg);
        const receiverSock = getSocketByName(sockets, receiver);
        const preMsg = colorGreen(`(pvt msg from ${getName(sock)})`);
        receiverSock.write(`${preMsg} ${pvtMsg}\n`);
    } else if(cleanMsg === "/list" ){
        const preMsg = `${colorGrey(`only visible to you`)}\n`;
        const listNick = sockets.map((s) => `${getName(s)}\n`)
        sock.write(`${preMsg}Users are:\n`);
        listNick.forEach(s => sock.write(s));
    }
    else{
        broadcastMessage(
            getSocketsExcluding(sockets, sock),
            `<${getName(sock)}> ${cleanMsg}\n`
        );
    }
}

server.on("connection", function (sock) {
    console.log(`CONNECTED:  ${socketToId(sock)}`);

    sockets.push(sock);
    setName(sock, socketToId(sock));

    sock.on("data", function (data) {
        processMessage(sock, data.toString());
    });
});
