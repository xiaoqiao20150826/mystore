var express = require('express');
var router = express.Router();
//DB
var mongoose = require('mongoose');
var Project = require('../models/project');
var CartDB = require('../models/cartdb');
var boughtitemDB = require('../models/boughtitemDB');
var EvaluationDB=require('../models/evaluationDB');
//로그인
var passport = require('passport');
var Account = require('../models/account');

/* GET home page. */
router.get('/', function(req, res) {
  res.sendfile('./public/angular/index.html');
});

router.put('/orderSetQty/:item_id', function(req, res){
  //id라는 변수를 넘겨받은 _id값으로 지정.
  var id = req.params.item_id;
 
  //productqty를 변수를 scope안의 qty 값으로 지정.
  var productqty = req.body.qty;
   
  //Project DB의 item_id값을 변수 id 값으로 변경. dummyqty값을 변수 productqty값으로 변경.              
  Project.update({item_id:id},{dummyqty: productqty}, function(err, things){
    if(err)
      res.send(err);
    res.json(things);
  })
});



//하나의 아이템의 정보만 item_id값을 필터 기준으로 해서 추출. 
router.get('/singleProduct/:item_id', function(req,res){
  Project.findOne({item_id:req.params.item_id}, function(err, product){
    if(err)
      res.send(err)
    res.json(product);
  })
});

// 상품평을 상품 아이디 별로 가져옴
router.get('/evaluations/:item_id', function(req, res) {
  var item_id= req.params.item_id;

  EvaluationDB.find({item_id:item_id},function(err, eval) {
    if (err)
      res.send(err);
    
    res.json(eval);
  });
});

// 상품평을 작성해서 db에 저장함
router.post('/evaluations', function(req, res) {

 var currentdate = new Date();
  //날짜를 시간을 HH:MM:SS 의 형식으로 나오게 하기 위한 함수.
  function leadingZeros(n, digits) {
   var zero = '';
    n = n.toString();

    if (n.length < digits) {
      for (i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return zero + n;
  };

  EvaluationDB.create({
    username:req.user.username,
    evaluation:req.body.evaluation,
    fullName:req.user.fullName,
    upper_category: req.body.upper_category,
    sub_category: req.body.sub_category,
    item_id : req.body.item_id,
    // rating : req.body.rating,
    time : leadingZeros(currentdate.getFullYear(), 4) + '-' +
        leadingZeros(currentdate.getMonth() + 1, 2) + '-' +
        leadingZeros(currentdate.getDate(), 2) + ' ' +
        leadingZeros(currentdate.getHours(), 2) + ':' +
        leadingZeros(currentdate.getMinutes(), 2) + ':' +
        leadingZeros(currentdate.getSeconds(), 2)

  }, function(err, eval) {
    if (err)
      res.send(err);

    var item_id = req.body.item_id;

    EvaluationDB.find({item_id:item_id},function(err, eval) {
      if (err)
        res.send(err)

      res.json(eval);
    });
  });
});

//싼거 3개 불러오는것.
router.get('/getCheapestProducts', function(req, res){

  Project.find().sort({price:1}).limit(3).exec(function(err, CheapestProducts){
    if(err)
        res.send(err);

      res.json(CheapestProducts);
  })
});

//subcategory별로 상품들 불러옴. 주소창의 sub_category부분을 필터 기준으로 써서 각 sub_category 페이지에 맞는 
//상품들만 출력.
router.get('/subcategoryProducts/:sub_category', function(req,res){
  Project.find({sub_category:req.params.sub_category}, function(err, subcategoryProducts){
    if(err)
      res.send(err)
    res.json(subcategoryProducts);
  })
});

// 500개 DB 모두 불러오라는 것. 아무 기준없이 find.
// router.get('/totalProduct', function(req, res){
//   Project.find(function(err, totalProduct){
//     if(err)
//       res.send(err)
//     res.json(totalProduct)
//   })
// });

//카트 DB 모두 불러옴.  
router.get('/carts', function(req, res){
  CartDB.find(function(err, carts){
    if(err)
      res.send(err)
    res.json(carts);
  })
});

//var a 를 현재 로그인한 username 주는 걸로 로직 짜야함.
// router.get('/users/:username', function(req, res){
//   var a = 'ksj';
//   Account.find({username : a}, function(err, users){
//     if(err)
//       res.send(err)
//     res.json(users);
//   })
// });

//유저정보 불러오는 부분. 주문시에 회원가입 때 입력 한 전화번호와 주소를 결제 페이지에서 불러오기 위함.
router.get('/boughtitems/:username', function(req, res){

  var user = req.user.username;
  //username 변경가능.
  boughtitemDB.find({username: user}, function(err, boughtitems){
    if(err)
      res.send(err)
    res.json(boughtitems);
  })
});


router.post('/boughtitems', function(req, res, localStorage) {
  
  //currentdate라는 변수를 새로운 날짜나 시간으로 지정.
  var currentdate = new Date();
  //날짜를 시간을 HH:MM:SS 의 형식으로 나오게 하기 위한 함수.
  function leadingZeros(n, digits) {
   var zero = '';
    n = n.toString();

    if (n.length < digits) {
      for (i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return zero + n;
  };

  //장바구니에 담기 기능을 하기 위해 각 부분의 불러올 값을 정해주는 곳.
       
  var boughtitem = new boughtitemDB({
      item_id : req.body.item_id,
      username : req.user.username,
      brand: req.body.brand,
      things: req.body.things,
      price: req.body.price,
      delivery_charge: req.body.delivery_charge,
      qty: req.body.dummyqty,
      description: req.body.description,
      upper_category:req.body.upper_category,
      sub_category:req.body.sub_category,
      time : leadingZeros(currentdate.getFullYear(), 4) + '-' +
        leadingZeros(currentdate.getMonth() + 1, 2) + '-' +
        leadingZeros(currentdate.getDate(), 2) + ' ' +
        leadingZeros(currentdate.getHours(), 2) + ':' +
        leadingZeros(currentdate.getMinutes(), 2) + ':' +
        leadingZeros(currentdate.getSeconds(), 2)

  });
    boughtitem.save(function(err){
    if (err) 

      //console.log('aaaaaaaaaaaaaaa');

      res.send(400);
    else
      res.send(200);
  })

//위에서 정의한 새로운 CartDB인 변수 cart를 세이브함.

});

//마이 페이지부분에서 구매한 아이템들 username 으로 필터해서 get해옴.
router.get('/carts/:username', function(req, res){
  
  var user = req.user.username;
  //username 변경가능.
  CartDB.find({username: user}, function(err, carts){
    if(err)
      res.send(err)
    res.json(carts);
  })
});

// 장바구니 DB에서 현재 item_id에 해당하는 상품의 정보를 찾는다.
router.get('/carts/:item_id', function(req, res){

  var item = req.params.item_id;
  
  CartDB.findOne({item_id: item}, function(err, carts){
    if(err)
      res.send(err)
    res.json(carts);
  })
});

//user별로 CartDB에서 불러오기. var id 부분을 로그인한 아이디로 지정할 수 있어야 함.
//장바구니의 내용들을 삭제하는 곳 CartDB를 넘겨받은 _id값은 기준으로 삭제함.
router.delete('/carts/:_id', function(req, res){
  var id = req.params._id;
  CartDB.remove({_id: id}, function(err, carts){
    if(err)
      res.send(err)

     var user = req.user.username;
  //username 변경가능.
  CartDB.find({username: user}, function(err, carts){
    if(err)
      res.send(err)
    res.json(carts);
    });   
  });
});


router.delete('/cart/:item_id', function(req, res){
  var id = req.params.item_id;
  CartDB.remove({item_id: id}, function(err, carts){
    if(err)
      res.send(err)
    
 
  });
});





router.delete('/eveluations/:_id', function(req, res){
  
  var id = req.params._id;
  var item_id;

  EvaluationDB.findById(id, function(err, eval){
    if(err) res.send(err);

    item_id = eval.item_id;

    EvaluationDB.remove({_id:id}, function(err,eval){

    // 형변환 하는 법
    // EvaluationDB.remove({_id:mongoose.Types.ObjectId(id)}, function(err,eval){
       if(err) res.send(err);

       
         EvaluationDB.find({item_id:item_id}, function(err, eval){
            if(err) res.send(err);
            
            res.json(eval);
          })
    });   

  })

});







router.post('/carts', function(req, res) {

  //currentdate라는 변수를 새로운 날짜나 시간으로 지정.
  var currentdate = new Date();
  //날짜를 시간을 HH:MM:SS 의 형식으로 나오게 하기 위한 함수.
  function leadingZeros(n, digits) {
   var zero = '';
    n = n.toString();

    if (n.length < digits) {
      for (i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return zero + n;
  };
  //장바구니에 담기 기능을 하기 위해 각 부분의 불러올 값을 정해주는 곳.
  var cart = new CartDB({
      username : req.user.username,
      upper_category: req.body.upper_category,
      sub_category: req.body.sub_category,
      item_id : req.body.item_id,
      brand: req.body.brand,
      things: req.body.things,
      price: req.body.price,
      delivery_charge: req.body.delivery_charge,
      qty: req.body.qty,
      description: req.body.description,
      // username : req.userSession.username,
      time : leadingZeros(currentdate.getFullYear(), 4) + '-' +
        leadingZeros(currentdate.getMonth() + 1, 2) + '-' +
        leadingZeros(currentdate.getDate(), 2) + ' ' +
        leadingZeros(currentdate.getHours(), 2) + ':' +
        leadingZeros(currentdate.getMinutes(), 2) + ':' +
        leadingZeros(currentdate.getSeconds(), 2)

  });
    cart.save(function(err){
    if (err)
      res.send(400);
    else
      res.send(200);
  })

//위에서 정의한 새로운 CartDB인 변수 cart를 세이브함.

});

router.post('/addCartinorder', function(req, res) {

  //currentdate라는 변수를 새로운 날짜나 시간으로 지정.
  var currentdate = new Date();
  //날짜를 시간을 HH:MM:SS 의 형식으로 나오게 하기 위한 함수.
  function leadingZeros(n, digits) {
   var zero = '';
    n = n.toString();

    if (n.length < digits) {
      for (i = 0; i < digits - n.length; i++)
        zero += '0';
    }
    return zero + n;
  };
  //장바구니에 담기 기능을 하기 위해 각 부분의 불러올 값을 정해주는 곳.
  var cart = new CartDB({
      username : req.user.username,
      upper_category: req.body.upper_category,
      sub_category: req.body.sub_category,
      item_id : req.body.item_id,
      brand: req.body.brand,
      things: req.body.things,
      price: req.body.price,
      delivery_charge: req.body.delivery_charge,
      qty: req.body.dummyqty,
      description: req.body.description,
      // username : req.userSession.username,
      time : leadingZeros(currentdate.getFullYear(), 4) + '-' +
        leadingZeros(currentdate.getMonth() + 1, 2) + '-' +
        leadingZeros(currentdate.getDate(), 2) + ' ' +
        leadingZeros(currentdate.getHours(), 2) + ':' +
        leadingZeros(currentdate.getMinutes(), 2) + ':' +
        leadingZeros(currentdate.getSeconds(), 2)

  });
    cart.save(function(err){
    if (err) 

      //console.log('aaaaaaaaaaaaaaa');

      res.send(400);
    else
      res.send(200);
  })

//위에서 정의한 새로운 CartDB인 변수 cart를 세이브함.

});

router.put('/carts/:_id', function(req, res){
  //id라는 변수를 넘겨받은 _id값으로 지정.
  var id = req.params._id;
  //productqty라는 변수를 body-parser module을 사용하여 
  //req.body.qty 값으로 지정.
  var productqty = req.body.qty;

  //_id에 위에서 지정한 id값을 넣어줌. 해당 _id값에
  // 해당하는 qty값을 새로 변경한 req.body.qty값으로
  // update함.
  CartDB.update({_id:id},{qty: productqty}, function(err, carts){
    if(err)
      res.send(err);

 var user = req.user.username;
  //username 변경가능.
  CartDB.find({username: user}, function(err, carts){
    if(err)
      res.send(err)
    res.json(carts);
  })

    
  })
});

//로그인
// 세션에 저장된 유저 정보를 넘겨줌
router.get('/user', function(req, res){
  //console.log(req.user);
  res.json(req.user);
});

router.post('/register', function(req, res) {
  // body-parser 라는 모듈을 사용하여 html페이지에서 불러와 Account모델에 정보 저장
  Account.register(new Account({ username : req.body.username, fullName : req.body.fullName, phone : req.body.phone, address : req.body.address, sex : req.body.sex }), req.body.password, function(err, account) {
    if (err) {
      // return res.render('register', { account : account });
      // console.log('register error');

      // 에러일 경우 아래 주소로 이동
      return res.redirect('/#/register');
    }
    // local에서 인증이 된 경우 홈으로 이동
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

router.get('/login', function(req, res){
  // res.render('test', {user : req.user});

  // 홈으로 이동함
  res.redirect('/');

  // console.log(req.user);
  // res.json(req.user);
});

router.post('/login', passport.authenticate('local',
  // 로그인에 실패할 경우 아래 주소로 이동
  {failureRedirect:'/#/login'}), function(req,res){

  // 성공할 경우 /login으로 이동(위쪽 get('/login')으로 넘어감)
  res.redirect('/login');
});

router.get('/logout', function(req, res) {
  // 세션에 저장된 정보 취소
  req.logout();
  
  // 홈으로 이동
  res.redirect('/');
});

//정보수정하기 
router.put('/user', function(req, res){
 
  var id = req.user.username;
 
  var address = req.body.address;
  
  var phone=req.body.phone;

  // var email=req.body.email
  
  Account.update({username:id},{ address: address, phone:phone}, function(err, accounts){
    if(err)
      res.send(err);
    res.json(accounts);
    
  })
});

module.exports = router;