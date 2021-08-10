import React, {useState, useEffect} from 'react'
import "./Chat.css"
import { useParams } from 'react-router'
import axios from "axios"
import moment from "moment"

function Chat(props) {

   const {id} = useParams();
   const [input, setInput] = useState("");
   const [messages, setMessages] = useState([]);
   const [userinfo, setUserinfo] = useState({id:'', email:'', name:''})
  
    useEffect(() => {
    async function getMessage(){

        try{
            const res = await axios.get('http://localhost:5000/users/' + id)
            setUserinfo({...userinfo, id:res.data.useridentity, email:res.data.email, name:res.data.name})
            try{
                const res1 = await axios.get('http://localhost:5000/message/' + res.data.useridentity)
                setMessages([...res1.data])
                console.log("h", messages)
              
            }
            catch(err){
                console.log(err)
            }
        }
        catch(err){
            console.log(err)
        }     
    }
    getMessage();
    }, [id])


    const sendMessage = async (e) => {
        e.preventDefault();
        const user = {email: userinfo.email, whoissending: "agent", text:input, userid:userinfo.id}
 
        try{
            await axios.post('http://localhost:5000/message', user)
            setMessages((message) => [...message, user])
            
        }
        catch(err){
            console.log(err)
        }

        setInput("");
    }




    return id===undefined ?(
        <div className="chat">
            <div className="chat__header">
                <div className="chat__headerInfo">
                    <h3>Agent</h3>
                </div>
            </div>

            <div className="chat__body">
                <p className="chat__message chat__reciever">
                     Welcome Agent!!!!   
                </p>         
            </div>
        </div>
    ):(
        <div className="chat">
            <div className="chat__header">
                
                
                <div className="chat__headerInfo">
                    <h3>{userinfo.name}</h3>
                    <p>{new Date().toUTCString}</p>
                </div>

                <div className="chat__headerRight">
                    
                </div>
            </div>
            
            <div className="chat__body">
            {messages.map(message =>
                {return message.whoissending !== "client" ? 
                    (
                        <div>
                            <p className="chat__message chat__reciever">
                                {message.text}
                            </p>
                        
                            <p className="chat__message1 chat__reciever1">
                                {moment(message.updatedAt).utc().format('MMMM DD,h:mm A')}
                            </p>
                        </div>
                    ):
                    (
                        <div>
                            <p className="chat__message">
                                {message.text}
                            </p>
                        
                            <p className="chat__message1">
                                {moment(message.updatedAt).utc().format('MMMM DD,h:mm A')}
                            </p>
                        </div>
                    )
                 
                }
            )}

                        
            </div>

            <div className="chat__footer">

                <form>
                    <input  value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text"></input>
                    <button  onClick={sendMessage} type="submit">Send a message</button>
                </form>
                
            </div>
        </div>
    )
}

export default Chat