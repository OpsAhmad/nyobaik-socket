const app = require("express")()
const { time } = require("console")
const express = require('express')

const server = require("http").createServer(app)
const io = require("socket.io")(server,{})

app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

let counterUserOnline = 1;
io.on("connection",socket=>{
    socket.on("join",param=>{
        console.log("user join")
        counterUserOnline++;
        io.emit("userOnline",counterUserOnline)
    })
    socket.on("message",param=>{
        console.log("user mengirim pesan")
        io.emit("message",param)
    })
    socket.on("disconnect",param=>{
        console.log("user keluar")
        counterUserOnline--;
        io.emit("userOnline",counterUserOnline)
    })
})

// set static files
app.use(express.static('public'))

server.listen(3000)