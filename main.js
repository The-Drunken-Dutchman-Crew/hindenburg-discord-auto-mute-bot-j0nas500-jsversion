//const Discord = require('discord.js');
//const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES", "GUILD_MEMBERS"], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

require('dotenv').config()
console.log(process.env.TOKEN_MAIN)

var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000', {reconnect: true});

const DBConnection = require("./db/DbConnection");
const DbConnection = new DBConnection();

const db_connection = [
    user=process.env.MYSQL_USER,
    password=process.env.MYSQL_PASSWORD,
    host=process.env.MYSQL_HOST,
    port=process.env.MYSQL_PORT,
    database=process.env.MYSQL_DATABASE,
]

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
    result = DbConnection.execute(db_connection, sql);
    //set_presence
    if(result[0][0] == null) return;
    await updateEmbed(db_connection, result[0][0], data[1][1], data[2][1]);
});

socket.on('on_leave', async function (data) {
    sql = "SELECT username FROM players";
    result = DbConnection.execute(db_connection, sql);
    //set_presence
    if(data[1][1] == "null") return;
    await updateEmbed(db_connection, parseInt(data[1][1]), data[2][1]);
});

socket.on('on_setcolor', async function (data) {
    sql = "SELECT discord_message_id FROM players WHERE roomcode = '" + data[1][1] + "'";
    result = DbConnection.execute(sql)
    if(result[0][0] == null) return;
    await updateEmbed(db_connection, result[0][0], data[1][1]);
});

socket.on('on_game_start', async function (data) {

});

socket.on('on_game_end', async function (data) {

});

socket.on('on_player_start_meeting', async function (data) {

});

socket.on('on_meeting_voting_complete', async function (data) {

});

socket.on('on_player_die', async function (data) {

});