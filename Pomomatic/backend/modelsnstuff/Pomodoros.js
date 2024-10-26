const mongoose = require('mongoose');
const {Schema} = mongoose;

const  PomoSchema= new Schema({
title: {type:String}
})

const PomoModel = mongoose.model('pomos', PomoSchema);

module.exports = PomoModel;