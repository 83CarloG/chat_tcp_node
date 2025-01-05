"use strict";

const path = require('path');
const process = require('process')

let namesMap = {};


function setName (sock, name) {
    console.log(name)
    namesMap[`${sock.remoteAddress}:${sock.remotePort}`] = name;
}

function getName(sock) {
    return namesMap[`${sock.remoteAddress}:${sock.remotePort}`]
}
module.exports = {setName, getName};