const express = require ('express');
const Router = express.Router();
const dotenc = require ('dotenv').config();
const cors = require('cors');
const {createProfile, loginProfile, getUser,  postPomos, deletePomo, getPomos} = require('../Controllers') 

Router.use 
(
cors({
credentials:true,
origin: 'http://localhost:5173'
})
)

//This lets us access and modify the Mongodb database.
Router.get('/');
Router.get('/Users', getUser);
Router.get('/Pomodoros', getPomos)
Router.post('/CreateProfile', createProfile);
Router.post('/loginprofile', loginProfile);
Router.post('/postPomos', postPomos)
Router.delete('/deletePomo/:pomoId', deletePomo)
module.exports  = Router