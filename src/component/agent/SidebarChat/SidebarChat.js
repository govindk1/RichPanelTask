import React from 'react'
import { Link } from 'react-router-dom'
import "./SidebarChat.css"

function SidebarChat(props) {
    console.log(props)
    const highlight = (e) => {
        const divareaa = document.getElementsByClassName("sidebarChat")
        divareaa[0].style.background = "rgb(248,249,250)"
        divareaa[0].style.borderright = "none"
    }
    return (
        <Link onClick = {highlight} to={`/rooms/${props.id}`}>
            <div className="sidebarChat">
               
                <div className="sidebarChat__info">
                    <h2>{props.name}</h2>
                </div>

            </div>
        </Link>
    )
   
}

export default SidebarChat
