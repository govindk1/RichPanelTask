import mongoose from "mongoose"
import validator from "validator"



const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Email is invalid')
            if (!validator.isAscii(value))
                throw new Error('Only ascii characters are allowed')
        }
    },
    useridentity : {
        type : String,
        required : true
    },
    picture:{
        type: String
    }
   
})




const User = mongoose.model('User', userSchema)
export default User;