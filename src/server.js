const express = require('express')
const initConection = require('./db/mongo')
const router = require('./routes/index')
const handlebars = require('express-handlebars')
const {Server} = require('socket.io')
const ChatManager = require('./daos/mongoDaos/ChatManager')

const chatManager = new ChatManager()

const app = express()
initConection()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//definir motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + "/views")
app.set('view engine', 'handlebars')
app.use('/aleas', express.static(__dirname + "/public"))

app.use(router)

const httpServer = app.listen(PORT, err => {
    if (err) return err
    console.log(`Escuchando en el puerto ${PORT}`)
})
const io = new Server(httpServer)
module.exports = io


io.on('connection', (socket)=>{
    console.log("Conexión establecida")
    
    socket.on("usrLogueado", async (data)=>{
        socket.emit("chat", {chat: await chatManager.getMessages(), name: data,})
        socket.broadcast.emit("nuevoUsuarioAlerta", data)
    })

    socket.on("nuevoMsj", async (data)=>{
        const chat = await chatManager.addMessage(data)
        io.emit("chat", {chat})
    })
})
