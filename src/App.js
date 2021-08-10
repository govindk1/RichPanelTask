import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Sidebar from './component/agent/Sidebar/Sidebar'
import Chat from './component/agent/Chat/Chat'
import "./App.css"

//facebook login
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

//userchat
import Userchat from './component/user/Userchat'

function App() {


    const [data, setData] = useState({isLoggedIn: false, id:'', email:'', name:''})

    const responseFacebook = async (response) => {
        
        if(response.status !== "unknown"){

            const user = {useridentity: response.userID, name: response.name, email: response.email, picture: response.picture.data.url}
            setData({isLoggedIn:true, id:response.userID, email:response.email, name:response.name})
            //console.log(data)
            try{
            
            await axios.post('http://localhost:5000/users/add', user)
        
           
            }

            catch(err){
                
            }
            
        }
        
       
    }
    
    
    const componentClicked = (data) => {
        console.warn(data)
    }


    return data.isLoggedIn !== true ? (
        <div style={{backgroundColor:"lightyellow"}}>
        <div style={{position: "absolute", top: "50%", left: "50%",transform: "translate(-50%, -50%)",}}>
           

            <FacebookLogin
                appId="884226265520772"
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook} 
            />
            
            
        </div>
        </div>
    ) : (
        <div className="app">
            <div className="app__body">
                <Router>

                    <Route exact path="/">
                        <Userchat userInfo={data}/>
                    </Route>

                    
                    <Switch>
                        <Route exact path="/rooms">
                            <Sidebar />
                            <Chat />
                        </Route>

                        <Route exact path="/rooms/:id">
                            <Sidebar />
                            <Chat />
                        </Route>

                        
                    </Switch>
                </Router>
            </div>
        </div>
    )
}

export default App
