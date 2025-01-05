"use strict"

const path = require('path');
const process = require('process')

function isSameSocket(s1, s2) {
    return (s1.remoteAddress === s2.remoteAddress && s1.remotePort === s2.remotePort);
}

function removeCRLF(str) {
    return str.replace(/[\r\n]+$/, "");
}

function broadcastMessage(socket, message) {
    socket.forEach(sock => sock.write(message));
}

function getSocketsExcluding(sockets, sock) {
    return sockets.filter(s => !isSameSocket(s, sock));
}

function socketToId(sock) {
    return `${sock.remoteAddress}:${sock.remotePort}`
}

function parseNickMessage(msg) {
    const [_, name] = msg.split(" ");
    return name;
}

function parsePvtMessage(msg) {
    const [_, receiver, ...rest] = msg.split(" ");
    const pvtMsg = rest.join(" ");
    return [receiver, rest];

}
function colorGrey(str) {
    return `\x1b[97;100m${str}\x1b[0m`
}

function colorGreen(str) {
    return `\x1b[97;42m${str}\x1b[0m`
}

module.exports = {
    broadcastMessage,
    getSocketsExcluding,
    removeCRLF,
    socketToId,
    parsePvtMessage,
    parseNickMessage,
    colorGrey,
    colorGreen
}