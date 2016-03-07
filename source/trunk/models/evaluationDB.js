var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var evaluationDB=mongoose.createConnection('mongodb://localhost/mystore');

module.exports=evaluationDB.model('evaluation',{
	username:String,
	fullName:String,
	evaluation:String,
	upper_category: String,
   	sub_category: String,
   	item_id: String,
   	time: String,
   	// rating: Number,
});

mongoose.connection.close();




