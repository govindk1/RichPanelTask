import React, {useState, useEffect} from 'react'
import "../Chat/Chat.css"
import { useParams } from 'react-router'
import axios from "axios"
import moment from "moment"
import socketClient  from "socket.io-client";
import SidebarRight from "../SidebarRight/SidebarRight"
const SERVER = "http://localhost:5000";


function Chat(props) {

   const {id} = useParams();
   const [input, setInput] = useState("");
   const [messages, setMessages] = useState([]);
   const [userinfo, setUserinfo] = useState({id:'', email:'', name:''})
    
   const [check, setCheck] = useState(0);

    var socket = socketClient(SERVER);
    socket.on('message_update', (message) => {
        if(message === "client"){
            setCheck(!check)
        }
   });


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
    }, [id, check])


    const sendMessage = async (e) => {
        e.preventDefault();
        if(input.trim()){
        const user = {email: userinfo.email, whoissending: "agent", text:input.trim(), userid:userinfo.id}
 
        try{
            await axios.post('http://localhost:5000/message', user)
            setMessages((message) => [...message, user])
            
        }
        catch(err){
            console.log(err)
        }
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
        <div className="divideArea">
            <div className="chat">
                <div className="chat__header">
                    
                    
                    <div className="chat__headerInfo">
                        <h2>{userinfo.name}</h2>
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
            
                <div className="sideright">
                    <SidebarRight data={userinfo}/>
                    <div className="downhead">
                        <div className="downhead_content">
                            <div><h3>Customer Details</h3></div>
                            <div><p1>Email:{userinfo.email}</p1></div>
                            <div><p1>Firstname:   {userinfo.name.split(" ")[0]}</p1></div>
                            <div><p1>second name: {userinfo.name.split(" ")[0]}</p1></div>
                            <div><a href="#" style={{color:"blue"}}>view more details</a></div>
                        </div>
                    </div>
                </div>
        </div>
            
        
            
        
        
    )
}

export default Chat