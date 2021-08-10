import React from 'react'
import { Link } from 'react-router-dom'
import "./SidebarChat.css"

function SidebarChat(props) {
    console.log(props)
    return (
        <Link to={`/rooms/${props.id}`}>
            <div className="sidebarChat">
               
                <div className="sidebarChat__info">
                    <h2>{props.name}</h2>
                </div>

            </div>
        </Link>
    )
   
}

export default SidebarChat
