import React, { useState, useRef, useEffect, useContext } from "react";
import {BsFillPlayFill, BsPauseFill} from "react-icons/bs"
 import List from '@mui/joy/List';

import toast from "react-hot-toast";
import Popup from 'reactjs-popup'
import axios from 'axios'
let nextId = 0;

function Timer()
{ 
let bar = document.getElementById('breaktimerbar');
let otherbar = document.getElementById('timerbar');
let overbar = document.getElementById('overbar');
 const minuteref = useRef();
 const buttonref = useRef();
 const secondsref = useRef();
 const pausebuttonref = useRef();
 const [showbreak, setShowbreak] = useState(true);
 const [hidetimer, setHidetimer] = useState(false)
 const [breakminutes, setBreakminutes] = useState(0);
 const [breakseconds, setBreakseconds] = useState(0)
 const [minutes, setMinutes] = useState(0);
 const [seconds, setSeconds] = useState(0);
 const [running, setRunning] = useState(null)
 const[breakrunning, setBreakRunning] = useState(null)
 const [pomotitle, setPomotitle] = useState({title:""})
 const [pomoArray,setPomoArray ]= useState([]);
 
const getmyPomos = async() =>{
axios.get('/Pomodoros', {})
.then(res => { 
setPomoArray(res.data)

})
.catch(err => {console.log(err)
})}

const revealBreak = async() => {
 
bar.style.visibility = 'visible';
otherbar.style.visibility = 'hidden';
console.log("it's visible");
}
const hideBreak = async() => {
bar.style.visibility = 'hidden';
otherbar.style.visibility = 'visible';

}

//makes sure there is something in the Pomolist array.
//also ensures that the user sets a time before clicking on "play"

const checkPomolist = async () =>{

  
if (pomoArray.length >= 1 && minutes > 0 && seconds > 0)
  {buttonref.current.disabled = false
    pausebuttonref.current.disabled = false
  
  }
 if (pomoArray.length >=1 && minutes === 0 && seconds >0)
  {buttonref.current.disabled = false;
pausebuttonref.current.disabled = false;

  }
else{
buttonref.current.disabled = true;
pausebuttonref.current.disabled = true;

}
console.log(pomoArray.length);
}
function playsound(){new Audio(click).play()}
 

const deletePomodoro = async(pomoId) => {

  try{await axios.delete(`/deletePomo/${pomoId}`)
  setPomoArray(pomoArray.filter((pomo) => pomo.id !== pomo))
  getmyPomos()
  checkPomolist();
}
catch(error){console.error ("Dude you're getting an error", error)
}

//fetch updated pomos
getmyPomos();

}
const pomosup = async() =>{
if (pomoArray.length === 0)
  {
  bar.style.visibility = 'hidden';
  otherbar.style.visibility = 'hidden';
  overbar.style.visibility == 'visible';}
}
 
//Allows user to post new Pomodoros
const postNewPomo  = async (e) =>{
e.preventDefault();
 
try{
//sends POST request
await axios.post('/postPomos',pomotitle)
//adds new pomos to mypomos array
if (pomoArray.length <= 3 )
{
setPomoArray([...pomoArray, pomotitle])
//fetch updated pomos
console.log("pomo posted");
checkPomolist();
getmyPomos();
 
console.log(pomoArray)
}
else {console.log("no dice chicago.")}


toast.success('Pomodoro Created!');
}
//in case something goes wrong
catch (error)
{
if (error.response){
console.log(error.response.data);
console.log(error.response.status);
console.log(error.response.headers); 
}
else if (error.request){console.log(error.request)}
else {console.log(error);}

}


}

//handles form input
const handlethatInput = async (e) =>
{
   const title = e.target.value;
   setPomotitle({...pomotitle, title})

   console.log(title);
}
 
useEffect(()=>{
checkPomolist();
pomosup();

getmyPomos(),[];
let innival
if (running){
innival = setInterval(() => {
if (seconds == 0){
{setMinutes((minutes) => minutes - 1)
setSeconds(59)}

}
else if (minutes >= 0)
{
setSeconds((seconds) => seconds - 1 + 0);
} 
}, 1000);

return () => {clearInterval(innival);
timerup()
}
}}, [minutes, seconds, running]);
//sets the interval
 useEffect(()=>{
let intival
if (breakrunning){
  intival = setInterval(() => {
 if (breakseconds == 0 && pomoArray.length >0){
  {setBreakminutes((breakminutes) => breakminutes - 1)
    setBreakseconds(59)}
 }
   else if (breakminutes >= 0)
  {
  setBreakseconds((breakseconds) => breakseconds - 1 + 0);
 
} 
 
  }, 1000);

  return () => {clearInterval(intival);
   
    breaktimerup()
}
}}, [breakminutes, breakseconds, breakrunning]);

 
function setthoseMinutes()
{
setMinutes(minuteref.current.value)
 
}
//this fires when the timer reaches zero
const timerup = () =>{

if (minutes == 0 && seconds == 0)
{
checkPomolist();
deletePomodoro(pomoArray[0]._id)
setMinutes(0);
setSeconds(0);
setRunning(false);
revealBreak();
 
setBreakminutes(5);
setBreakseconds(0);   
 
startBreakTimer();


}
else (
console.log("fake"));
}


const breaktimerup = () => {
if (breakminutes == 0 && breakseconds == 0)
{
  
pauseBreakTimer();

setBreakseconds(0);  
setBreakminutes(0);  
hideBreak();
}}



 function startBreakTimer(){
if (pomoArray.length >=1){

setBreakRunning(true)
console.log("hello")
 }
 else
 {
 checkPomolist
setBreakRunning(false);
setBreakseconds(0);  
setBreakminutes(0);  
hideBreak();
 
 }
}
 function setthoseSeconds()
{
//takes the seconds user input to set the number of seconds
setSeconds(secondsref.current.value)
}

  function startTimer(){
  if (minutes !==0 || seconds !== 0)
    {setRunning(true)
     console.log("timer running")
    }
     else {

 pauseTimer();
     }}
 function pauseTimer(){
      setRunning(false);
      checkPomolist();
     }

      function pauseBreakTimer(){
      setBreakRunning(false);
     }
  return (
<div>
<div id = "pomobox">
<List orientation = "horizontal" id = "pomolist"component = "ol">
{pomoArray.map(pom => (<li class = "plist" key = {pom._id}>
{pom.title}<button id= "deletebutton" onClick = {() => deletePomodoro(pom._id)}>X</button></li>))} 
</List >

</div>

<div id = "timerbox">


<form id = "menu" onSubmit={postNewPomo}> 
<div id = "inputbox">
<label for ="nameinput">Enter Pomo name here</label>
 
<input id = "nameinput"  
required = 'true'
type = "Text" 
name = "title"
value = {pomotitle.title}  
onChange={handlethatInput}/>
<button id = "pomobutton" type = "submit">Post</button> 

<div id = "inputbar">
  <div id = "minutebar"> 
<label for = "minuteinput">Enter minutes</label>
<p></p>
<input type= "number" id = "minuteinput" required min = {0} max = {59} value ={minutes} ref={minuteref} onChange={setthoseMinutes}></input>
<p></p>
</div>
<div id = "secondbar">
<label for = "secondinput">Enter seconds</label>
<p></p>
<input type="number" id = "secondinput" min = {0} max = {59}value = {seconds}  ref = {secondsref} onChange={setthoseSeconds}></input>
</div>
</div>
</div>

    <div id = "timerbar">
 
    <div id = "minutes">{minutes}</div> 
    <div id = "colon">:</div>
    <div id = "seconds">{seconds}</div>
    </div>

<div id = "breaktimerbar" ><div id = "minutes">{breakminutes}</div><div id = "colon">:</div><div id = "seconds">{breakseconds}</div></div>
<div id = "overbar"></div>
    <div id = "buttonbar">
   
  <p id = "playbuttonp">{!running && (
  <button  ref = {buttonref}onClick={startTimer} id = "playbutton"><BsFillPlayFill/></button>)}</p>
  <p id = "pausebuttonp"><button onClick={pauseTimer} ref = {pausebuttonref} id = "pausebutton"><BsPauseFill/></button></p>
  
 </div>
  
</form>
</div>
</div>
 

);
}

export default Timer
 