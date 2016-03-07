//mongoose 모듈을 불러와서 mongoose라는 변수로 씀.
var mongoose = require('mongoose');

//Schema라는 변수는 mongoose의 Schema임.
var Schema = mongoose.Schema;

//passportLocalMongoose는 passport-local-mongoose 모듈을 말하는 것.
var passportLocalMongoose = require('passport-local-mongoose');

// mongoose
//accout변수는 mongoose의 mongodb://localhost/Account 주소로 접속하는 것.
var account = mongoose.connect('mongodb://localhost/mystore');

//Accout변수에 새로운 스키마를 정의해줌. 여기서는 회원가입할 user의 정보의 Schema를 정의.
var Account = new Schema({
	username: String,
	fullName : String,
	password: String,
	phone : String,
	address : String,
	sex : String
});

//passportLocalMongoose는 자동으로 해시처리한다
Account.plugin(passportLocalMongoose);

module.exports = account.model('Account', Account);