const express = require('express');
const dotenv = require ('dotenv').config();
const cors = require('cors')
const {mongoose} = require('mongoose');
const cookiemewantcookie = require('cookie-parser');
 

mongoose.connect('mongodb+srv://beckerjosh39:iamironman@userprofile.lxuls.mongodb.net/?retryWrites=true&w=majority&appName=UserProfile')

.then(() => console.log ("Database has been Connected"))
.catch((err) => console.log('Database has NOT been connected', err))
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookiemewantcookie());
app.use('/', require('./Routes/authRoutes'));
app.use('/createProfile', require('./Routes/authRoutes'));
app.use('/loginProfile', require ('./Routes/authRoutes'));
app.use('/getUser', require('./Routes/authRoutes')) 
app.use('/postPomos', require ('./Routes/authRoutes'))
app.use('/getPomos', require('./Routes/authRoutes'))
app.use('/deletePomo/:pomoId', require ('./Routes/authRoutes'))

const port = process.env.port || 8008;
app.listen(port, () => console.log(`Server is running on '${port}'`))