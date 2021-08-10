import React, { useEffect, useState } from 'react'
import {IconButton} from "@material-ui/core"
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import RefreshIcon from '@material-ui/icons/Refresh';
import "./Sidebar.css"
import axios from 'axios'
import SidebarChat from './SidebarChat';

function Sidebar() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        async function all_users(){
            const response = await axios.get('http://localhost:5000/users/')
            console.log(response.data)
            setUsers([...response.data])
            console.log( users)

        }

       all_users()

    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <IconButton>
                        <FormatAlignLeftIcon />
                    </IconButton>
                    
                    <h1 style={{fontSize:"25px", marginTop:"9px"}}>Conversations</h1>

                </div>

                <div>
                    <IconButton>
                        <RefreshIcon />
                    </IconButton>
                </div>
             
            </div>


            <div className="sidebar__chats">
               {users.map(room => {
                        return <SidebarChat key ={room._id} id={room._id} name={room.name} email={room.email} picture={room.picture} />
                         })
                }
                
            </div>
        </div>
    )
}


export default Sidebar