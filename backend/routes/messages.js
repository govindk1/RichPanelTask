import express from "express"
import Message from "../models/usermsg.js"

const router = express.Router() 

//add
router.post("/", async (req, res) => {

    //whenever any agent or client save the data we will let it know 
    const eventEmitter = req.app.get('eventEmitter')

    const newMessage = new Message(req.body);
    
    try {
      const savedMessage = await newMessage.save();
      eventEmitter.emit('message_update', newMessage.whoissending)
      res.status(200).json(savedMessage);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
//get  
router.get("/:id", async (req, res) => {
try {
    
    const messages = await Message.find({
        userid: req.params.id}
    ).sort({"timestamp":-1});
    console.log(req.params.id)
    res.status(200).json(messages);
} catch (err) {
    res.status(500).json(err);
}
});

export default router;