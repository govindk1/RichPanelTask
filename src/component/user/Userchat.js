import React, {useState, useEffect} from 'react'
import "./Userchat.css"
import axios from "axios"
import moment from "moment"

function Userchat(props) {

    //console.log(props.userInfo.email)
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    

    useEffect(() => {
        async function getMessage(){
        const res = await axios.get('http://localhost:5000/message/' + props.userInfo.id )
        console.log(res.data)
        setMessages([...res.data])
        console.log("m", messages)
        }
        getMessage();
    }, [])


    const sendMessage = async (e) => {
        e.preventDefault();
        const user = {email: props.userInfo.email, whoissending: "client", text:input, userid:props.userInfo.id}

        try{
            await axios.post('http://localhost:5000/message', user)
            setMessages((message) => [...message, user])
            
        }
        catch(err){
            console.log(err)
        }

        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                
                
                <div className="chat__headerInfo">
                    <h3>Agent</h3>
                    <p>{new Date().toUTCString}</p>
                </div>

                <div className="chat__headerRight">
                    
                </div>
            </div>
            
            <div className="chat__body">
            {messages.map(message =>
                {return message.whoissending === "client" ? 
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

export default Userchat