import "./App.css"
import * as React from 'react';
import { useState } from 'react';
 import anime from 'animejs';
import Login from "./pages/LoginPage"
import TimerPage from "./pages/Timerpage";
import Pomoinfo from './pages/Pomoinfo';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import CreateProfile from './pages/CreateProfilePage';
import { createContext } from 'react';
 import axios from 'axios'
import CreateProfilePage from'./Components/CreateProfile';
import {Toaster} from 'react-hot-toast';
import { UserContextProvider } from './Context/userContext';
import Loginpage from "./pages/LoginPage";



axios.defaults.baseURL = 'http://localhost:8008';
axios.defaults.withCredentials = true

const timeridcontext = createContext();


function App(){

 return(
<BrowserRouter>
<UserContextProvider>
 <Routes>
<Route path = '/' element = {<Loginpage />}/>
<Route path = "/CreateProfile" element = {<CreateProfile/>}/>
<Route path = "/Pomoinfo" element = {<Pomoinfo/>}/>
<Route path = "CreateProfilePage" element = {<CreateProfilePage/>}/>
<Route path = "/Timerpage" element  = {<TimerPage />}/>
</Routes>
</UserContextProvider>
</BrowserRouter>

)
}
export default App
export {timeridcontext};