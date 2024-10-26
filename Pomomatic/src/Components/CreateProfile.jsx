import { useState } from "react"
import axios from 'axios';
import bloop from '/soundeffects/bloop.wav'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

//As you might have guessed from the title, this function lets us create a new user profile

function CreateUserProfile()

{
const navigate = useNavigate()
const [userData, setUserData] = useState({
Username:"",
email:"",
password:"",

})
const CreatenewProfile = async(e) => 
{e.preventDefault();
const {Username, email, password} = userData
try {
const{data} = await axios.post('/CreateProfile',
{Username, email, password})
 if (data.error){
toast.error(data.error)
}
else
{setUserData({})
toast.success('Login was Successful UwU')
navigate('/')
}
}
catch(error){
console.log(error);
}
}
function playsound2(){new Audio(bloop).play()}
return(
 
<span className="font-link">

<form id = "newprofileform"onSubmit={CreatenewProfile}>
<div class = "createtext">
 <p>Create a Profile, won't ya?</p>
 </div>
<label for = "username">Username</label>
<p><input type = "Text" name = "Username"
placeholder="please enter a username" value = {userData.Username}
onChange={(e)=> setUserData({...userData, Username:e.target.value})}required></input></p>
<label for = "email">Email</label>
<p><input type = "email" name = "email"  placeholder="please enter an email address" value ={userData.email} onChange={(e)=> setUserData({...userData, email:e.target.value})}required></input></p>
<label for = "username">password</label>
<p><input type = "Text"  placeholder="please enter a password" value = {userData.password} onChange={(e)=> setUserData({...userData, password:e.target.value})}required></input></p>
<button type = "submit" id = "createprofilebutton" onClick={playsound2}>Create Profile</button>
 
</form>
</span>
 
 )

}

 export default CreateUserProfile