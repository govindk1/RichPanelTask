import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
    },
    userid: {
      type: String,
    },
    email:{
      type:String
    },
    whoissending:{
        type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);