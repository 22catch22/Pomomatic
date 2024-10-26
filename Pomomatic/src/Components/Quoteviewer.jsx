import { useState } from "react";
import quotes from "../data/quotes.json"


export default function Quoteviewer(){
        // Here we set up a function to retrive a random ID from the 'Quotes' Array
       const [quote, setquote] = useState("");
        
       const min = 0;
       
       const max = quotes.length;
       //Setting up the random function thing
       const ranid = Math.floor(Math.random() * (max - min)) + min; 
       //stringify it
       let x = JSON.stringify(quotes[ranid]);
 
 return(
    <div class= "quotes">
   <p>{x}</p>
    </div>
 
 )
 }
