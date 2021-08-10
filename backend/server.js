import express from "express"
import cors from "cors"
import  "./db/mongoose.js"
import usersRouter from "./routes/user.js"
import messageRouter from "./routes/messages.js";


const PORT = 5000;


//configuring app
const app = express()
app.use(express.json())
app.use(cors())


app.use('/users', usersRouter)
app.use('/message', messageRouter)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})

