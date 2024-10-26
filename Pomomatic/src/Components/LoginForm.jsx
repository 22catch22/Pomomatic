import {Link} from "react-router-dom";
import anime from 'animejs';
import { useState } from 'react'; 
 import axios from 'axios';
import {toast} from 'react-hot-toast';
import click from "/soundeffects/click.wav"
import { useNavigate } from 'react-router-dom';
import bloop from '/soundeffects/bloop.wav'
//This lets the user log in to their profile

function Loginform()

{
const navigate = useNavigate();
const [data, setData] = useState({
email:'',
password:'',
})
function playsound2(){new Audio(bloop).play()}
const loginUser = async (e) =>
{
e.preventDefault()
const {email, password} = data

try
{ 
const {data} = await axios.post('/loginprofile', 
{  
email, 
password
});

if(data.error)
{toast.error(data.error)}
else{
setData({});
navigate("timerpage")

}
}
catch(error){console.log(error)}
}
function playsound(){new Audio(click).play()}
 
 return(
<>
 
<form id = "loginform"onSubmit={loginUser} onclick ={playsound}>
    
<label for = "username">Username</label>
<p><input type = "Text" name = "usename" value ={data.username} onChange={(e) => setData({...data, username: e.target.value })}required></input></p>
<label for = "email">Email</label>
<p><input type = "Text" name = "email" value = {data.email} onChange={(e) => setData({...data, email: e.target.value })}required></input></p>
<label for = "username">password</label>
<p><input type = "Text" name = "username" value = {data.password} onChange={(e) => setData({...data, password: e.target.value })}required></input></p>
 <button type = "submit" id = "logbutton" onClick={playsound}>Login</button> 
<p><Link to ="/CreateProfile"><button id = "profilebutton" onClick={playsound}>Create Profile</button></Link></p>
<p><Link to = "/Pomoinfo">
<button id = "pomobutton" onClick={playsound}>What's a Pomodoro?</button></Link></p>
</form>
 
 
</>
 )
 }
 export default Loginform