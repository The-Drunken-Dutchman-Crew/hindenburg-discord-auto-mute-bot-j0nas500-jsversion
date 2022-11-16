//const Discord = require('discord.js');
//const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES", "GUILD_MEMBERS"], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

require('dotenv').config()
console.log(process.env.TOKEN_MAIN)

var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true});

var DbConnection

const db_connection = DbConnection(
    user=process.env.MYSQL_USER,
    password=process.env.MYSQL_PASSWORD,
    host=process.env.MYSQL_HOST,
    port=process.env.MYSQL_PORT,
    database=process.env.MYSQL_DATABASE,
);

socket.on('connect', async function (socket) {
    console.log('Connected!');
    await socket.emit("room", "main")
});

socket.on('connect_error', async function (socket) {
    console.log('The connection failed!');
});

socket.on('disconnect', async function (socket) {
    console.log("I'm disconnected!");
});

socket.on('on_join', async function (data) {
    sql = "SELECT discord_message_id FROM players WHERE roomcode = '" + data[1][1] + "'";
    result = db_connection.execute_list(sql)
});