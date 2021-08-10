import React from 'react'
import "../Sidebar/Sidebar.css"
import CallIcon from '@material-ui/icons/Call';
import PersonIcon from '@material-ui/icons/Person';
import { IconButton } from '@material-ui/core';

function SidebarRight(props) {
    return (
        <div style={{textAlign:"center", marginTop: "5%", marginBottom:"40px"}}>
            <div className="tophead">
                <img style={{height:"80px", weight:"80px", border:"2px solid lightgrey", borderRadius:"50%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZJIwdCzYcPsSf2voQZjpVaWsqJExllvZDg&usqp=CAU"/>
                <h3 >{props.data.name}</h3>
                <div>
                    <small  style={{color:"grey"}}>offline</small>
                </div>
                <span>
                <IconButton >
                    <CallIcon />
                </IconButton>
                
                <IconButton>
                    <PersonIcon />
                </IconButton>
                </span>
            </div>

        </div>
    )
}

export default SidebarRight
