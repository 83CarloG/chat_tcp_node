function isSameSocket (s1, s2) {
    return (s1.remoteAddress === s2.remoteAddress && s1.remotePort === s2.remotePort);
}

function removeCRLF(str){
    return str.replace(/[\r\n]+$/, "");
}

function broadcastMessage(socket, message) {
    socket.forEach(sock => sock.write(message));
}

function getSocketsExcluding (sockets, sock) {
    return sockets.filter(s => !isSameSocket(s, sock));
}
module.exports = {broadcastMessage, getSocketsExcluding, removeCRLF}