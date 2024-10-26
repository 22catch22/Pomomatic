import Quoteviewer from "../Components/Quoteviewer"
import Timer from "../Components/Timer"
import { Link } from "react-router-dom"
import {UserContext} from '../Context/userContext'
import { useContext } from "react"


function TimerPage(){
const{user} = useContext(UserContext);
const time = new Date();
time.setMinutes(time.getMinutes()+ 10)
 
return (
<> 
<span className='font-link'>
     <div class = "backing">
 <div class = "loginbar">
  
    <div class = "greeting-container">
      
 <img src = "./logo/Tomato.png" id = "tomatopic2" height = "100" length = "100"></img>
<div class = "greeting">{!!user && (<h3><strong>Welcome, {user.username}!</strong></h3>)}
  <Quoteviewer/>
  
   <Link to = "/"><button id = "logoutbutton">Logout</button></Link>
</div>



</div> 
<Timer expiryTimestamp={time}/>
</div> 
</div>
 
</span>
</>
)

}
export default TimerPage