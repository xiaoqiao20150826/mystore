var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cartDB = mongoose.createConnection('mongodb://localhost/mystore');

var cartSchema = new Schema({
   username: String,
   item_id: String,
   upper_category: String,
   sub_category: String,
   brand: String,
   things: String,
   price: Number,
   description: String,
   delivery_charge: Number,
   picture_url: String,
   qty: Number,
   time:String
})

module.exports = cartDB.model('cart', cartSchema);

mongoose.connection.close();