
import express from "express"
import User from "../models/user.js"

const router = express.Router() 

router.get('/', async (req, res) => {
    
    try{
    const user = await User.find()

    return res.json(user)
    }
    catch(err){
        return res.status(400).json('Error ' + err)
    }
    
})

router.get('/:id', async (req, res) => {
    
    try{
    const user = await User.find({_id:req.params.id})
    console.log(user[0])
    return res.json(user[0])
    }
    catch(err){
        return res.status(400).json('Error ' + err)
    }
    
})

router.post('/add', async (req, res) => {
     const useridentity = req.body.useridentity;
     const name = req.body.name;
     const email = req.body.email;
     const picture = req.body.picture;
    console.log(req.body)
    const newUser = new User({name, email, useridentity, picture})
    console.log(newUser)
    try{
    await newUser.save()
    return res.json('loggedin')
    }
    catch(err){
        console.log(err)
        res.status(400).json('Error' + err)
    }


})

export default router