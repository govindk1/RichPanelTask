import express from "express"
import cors from "cors"
import  "./db/mongoose.js"

//user router
import usersRouter from "./routes/user.js"
import messageRouter from "./routes/messages.js";


//making realtime using socketio connection
import { createServer } from "http";
import { Server } from "socket.io";
import events from "events"


const PORT = 5000;

//configuring app
const app = express()
app.use(express.json())
app.use(cors())

//setting up eventEmitter
const eventEmitter = new events.EventEmitter()
app.set('eventEmitter', eventEmitter)  


app.use('/users', usersRouter)
app.use('/message', messageRouter)

//socket.io work
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:{
        origin:"https://localhost:3000",
        method:["GET", "POST"],
        
    }
})
httpServer.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

io.on('connection', (socket) => { 
});

eventEmitter.on("message_update", (message) => {
    console.log(message)
    io.emit("message_update", message)
})

