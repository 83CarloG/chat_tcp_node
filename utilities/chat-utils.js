"use strict"

const path = require('path');
const process = require('process')

const {getName} = require(path.resolve(process.cwd(), 'services', 'chat-nicks'));

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

function socketTold(sock) {
    return `${sock.remoteAddress}:${sock.remotePort}`
}

function parsePvtMessage(msg) {
    const [_, receiver, ...rest] = msg.split(" ");
    const pvtMsg = rest.join(" ");
    return [receiver, rest];

}

function getSocketByName(sockets, name) {
    return sockets.find((s) => getName(s) === name);
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
    socketTold,
    parsePvtMessage,
    getSocketByName,
    colorGrey,
    colorGreen
}