import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const PomoContext = createContext({})

export function PomoContextProvider({children}){
const [pomo, setPomo] = useState(null);
useEffect(() => {

    if(!pomo){

    axios.get('./Pomodoros').then(({data}) => {
    setPomo(data)})
    
    }
}, [])
    return (
   
    <PomoContext.Provider value = {{pomo, setPomo}}>
    {children}
    </PomoContext.Provider>
    
        )
}
export default PomoContext