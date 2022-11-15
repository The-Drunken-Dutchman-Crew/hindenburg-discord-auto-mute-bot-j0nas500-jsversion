const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES", "GUILD_MEMBERS"], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

require('dotenv').config()

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);