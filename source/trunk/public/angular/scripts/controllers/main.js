angular.module('productController',[])
  .controller('mainCtrl', function($scope, $http, $timeout, Products, Users ) {
    
   //MD 추천상품 5개 상품이 4초간격으로 넘어감 (현재 개인 추천상품 5개도 동일하게 적용됨)
    var slidesInSlideshow2 = 5;
    var slidesTimeIntervalInMs2 = 4000; 

     $scope.slideshow2 = 1;
     var slideTimer2 =
     $timeout(function interval2() {
     $scope.slideshow2 = ($scope.slideshow2 % slidesInSlideshow2) + 1;
     slideTimer2 = $timeout(interval2, slidesTimeIntervalInMs2);
     }, slidesTimeIntervalInMs2);
  
     //메인페이지 우측 광고3개 화면 전환 3초 간격으로 넘어감 
     var slidesInSlideshow = 3;
     var slidesTimeIntervalInMs = 3000; 
  
    $scope.slideshow = 1;
    var slideTimer =
    $timeout(function interval() {
      $scope.slideshow = ($scope.slideshow % slidesInSlideshow) + 1;
      slideTimer = $timeout(interval, slidesTimeIntervalInMs);
    }, slidesTimeIntervalInMs);

     //메인페이지(로그인시 없어짐) 신규가입 광고: 화면 전환 3초 간격으로 넘어감 
    var slidesInSlideshow3 = 2;
    var slidesTimeIntervalInMs3 = 3000; 
  
    $scope.slideshow3 = 1;
    var slideTimer3 =
    $timeout(function interval3() {
      $scope.slideshow3 = ($scope.slideshow3 % slidesInSlideshow3) + 1;
      slideTimer3 = $timeout(interval3, slidesTimeIntervalInMs3);
    }, slidesTimeIntervalInMs3);

    //메인페이지(로그인시 없어짐) 신규가입 하단 광고3개 화면 전환 2초 간격으로 넘어감 
    var slidesInSlideshow4 = 3;
    var slidesTimeIntervalInMs4 = 2000; 
  
    $scope.slideshow4 = 1;
    var slideTimer4 =
    $timeout(function interval4() {
      $scope.slideshow4 = ($scope.slideshow4 % slidesInSlideshow4) + 1;
      slideTimer4 = $timeout(interval4, slidesTimeIntervalInMs4);
    }, slidesTimeIntervalInMs4);
   

    $scope.orderProp = 'item_id';
    $scope.orderProp1='price';
    // 아이템 정렬할 때 쓰는 기준들.
    $scope.priceLimit = 3;

    // Products라는 Factory의 gettotalProduct()명령 실행. 
    // 성공하면 data를 $scope.totalProduct에 넣는다.
    // totalProduct는 View 부분에서 ng-repeat 돌릴 때 사용됨.
     Products.getCheapestProducts()
       .success(function(data){
       $scope.CheapestProducts = data;
     });

     Users.getUserSession()
    .success(function(data){
      $scope.userSession = data;
    });
});