const jwt = require ('jsonwebtoken');
const User = require ('./modelsnstuff/user')
const Pomos = require ('./modelsnstuff/Pomodoros')
const { comparePassword, hashslingingPassword} = require ('./auth');
const { compare } = require('bcrypt');
 
 
const createProfile = async (req, res) => {
//As the name implies, this function allows the user to create a new user profile
try{
const {Username, email, password} = req.body;

if(!Username)
{return res.json({error: 'Please enter a valid username'})}

if (!email)
{return res.json({error: 'Please enter a valid email'})}

if (!password || password.length < 6)
{return res.json({error: 'Please enter a valid password with at least six characters'})}

const exist = await User.findOne({email});
if (exist)
{
return res.json ({
error: "I'm sorry, but that email address is already taken",
});}

//this creates a user in the database
const hashpassword = await hashslingingPassword


const user = await User.create
({
    Username,
    email,
    password: hashpassword,
 
});

return res.json(user);
} catch(error)
{console.log(error);
}
};

 

//logs in user

const loginProfile = async (req,res) => {
try{
const{email, password} = req.body;

const user = await User.findOne({email});
if(!user)
{return res.json
({error:"Sorry, but I can't find that user"})
}

//checks passwords
const matchmaker = await comparePassword(password, user.password)
if (matchmaker)
    {
        jwt.sign({email:user.email, id: user._id, username: user.Username},process.env.JWT_SECRET, {}, (err,token) => 
        {
        if(err) throw err;
        res.cookie('token', token).json(user)
        })
    } 
  if (!matchmaker)
        {res.json({
error: "The Passwords do not match :("
})}
}   
catch(error)
{console.log(error)
}
}  

//--//

//--//
 
const getUser = (req, res) =>
{const {token} = req.cookies
 if (token)
{jwt.verify(token, process.env.JWT_SECRET,{},(err, user)=> {
if (err) throw err;
res.json(user)
 })}
else{res.json(null)}
}

const getPomos = async(req,res) =>{
    Pomos.find()
.then(pomos => res.json(pomos))
.catch(err => res.json(err))
}



const postPomos = async (req, res) =>{
const {title} = req.body
try{
const newpomo = await Pomos.create({
title,
});
if (!title)
    {return res.json({error:"Please enter a title"})}
 
else{ 
await newpomo.save();

return res.json({
 title, 
message:"Pomodoro created:)!",
    
});
}}
catch (error){console.log(error)}

}
 
const deletePomo = async (req, res) =>{
 
const pomoId = req.params.pomoId
 
try{const pomo = Pomos.findOne({_id:pomoId})
if (!pomo){
return res.status(404).json ({error:true, message:"Error"
});
}
await Pomos.deleteOne({_id:pomoId})

return res.json
({error: false, message:"Pomodoro deleted. You monster."})
}
catch(error)
{return res.status(500).json(
{error:true, message: "Internal Server Error",})}
}

//Allows user to add Notes
//automatically removes pomos when timer reaches zero
const removefromList = async (req, res) =>{
 
const pomoId = req.params.pomoId
 
try{const firstpomo = Pomos.findOne({_id:pomoId})
if (!firstpomo){
return res.status(404).json ({error:true, message:"Error"
});
}
await Pomos.deleteOne({_id:pomoId})

return res.json
({error: false, message:"Pomodoro deleted. You monster."})
}
catch(error)
{return res.status(500).json(
{error:true, message: "Internal Server Error",})}
}

module.exports = {createProfile, loginProfile, getUser, postPomos, deletePomo, getPomos}
