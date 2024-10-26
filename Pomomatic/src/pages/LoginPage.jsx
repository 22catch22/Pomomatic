import {Link} from 'react-router-dom'
import LoginForm from "../Components/LoginForm"

function Loginpage(){
return(
 

<div id = "loginbox">
<img src = "./logo/Tomato.png" alt = "It's a Tomato" id = "tomatopic"/>
<span className='font-link'>
 
<h1 class = "welcome">Welcome to the Pomomatic!</h1>
 
<LoginForm />

 </span>
 </div>

 
) 
}
export default Loginpage