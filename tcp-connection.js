const net = require("net");
const {inspect} = require("util");
const port = 5050;
const host = "127.0.0.1"
const path = require('path');
const process = require('process');

const  {broadcastMessage, getSocketsExcluding, removeCRLF, socketTold, parsePvtMessage, getSocketByName, colorGrey, colorGreen} = require(path.resolve(process.cwd(), "utilities", "chat-utils"))
const {setName, getName} = require(path.resolve(process.cwd(), "services", "chat-nicks"))


const server = net.createServer();

server.listen(port, host, () => {
    console.log(`TCP server running at ${host} on port ${port}`);
})

let sockets = [];

function processMessage(sock, message) {
    const cleanMsg = removeCRLF(message)

        if(cleanMsg.startsWith("/nick ")){
            const oldName = getName(sock);
            const [_,name] = cleanMsg.split(" ");
            setName(sock, name);
            broadcastMessage(sockets, `${colorGrey(`${oldName} is now ${name}`)}\n`);
        } else if(cleanMsg.startsWith("/pvt ")){
            const [receiver, pvtMsg] = parsePvtMessage(cleanMsg);
            const receiverSock = getSocketByName(sockets, receiver);
            const preMsg = colorGreen(`pvt msg from ${getSocketByName(sock)}`);
            receiverSock.write(`${preMsg} ${pvtMsg}\n`);
        }

        else {
            broadcastMessage(
                getSocketsExcluding(sockets, sock),
                `<${getName(sock)}>: ${cleanMsg}\n`
            )
        }
}

server.on("connection", function (sock) {
    console.log(`CONNECTED: ${socketTold(sock)}`)
    sockets.push(sock);
    setName(sock, socketTold(sock))
    sock.on("data", function (data) {
        processMessage(sock, data.toString())
    });
})

