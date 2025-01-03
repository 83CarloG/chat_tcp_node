# TCP Chat Server

A simple TCP chat server that allows multiple clients to connect and broadcast messages. Messages sent by one client are received by all other connected clients.

## Features

- **Multiple Connections**: Supports multiple clients connected simultaneously.
- **Message Broadcasting**: Messages sent by a client are received by all other clients.
- **Message Cleaning**: Removes trailing carriage return (`\r`) and line feed (`\n`) characters from messages.
- **Connection Management**: Tracks all active connections and allows excluding the sender from broadcast.

## Project Structure

- **`chat-utils.js`**: Contains utility functions for socket and message handling.

- **`tcp-connection.js`**: The main file that starts the TCP server and handles client connections.
  - Creates a TCP server listening on a specific IP address and port.
  - Handles new client connections and broadcasts messages.

## Prerequisites

- Node.js (version 12 or higher)
- NPM (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
