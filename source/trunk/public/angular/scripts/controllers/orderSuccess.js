angular.module('productController')
  .controller('orderSuccessCtrl', function($scope, $routeParams, $http, Products, Users) {

  	$scope.img = $routeParams.item_id +'.jpg';
    $scope.item_id = $routeParams.item_id;

    Users.getUserSession()
     .success(function(data){
       $scope.user=data;
       
      }).error(function(){
         alert('error');
    })

    //하나의 상품을 불러오기 위한 로직. 위에서 정의해준 $scope.item_id를 통해 그 값에 대한 하나의 상품만을
    //불러온다. 성공시에 data를 $scope.singleProduct라는 곳에 저장함.
    Products.getSingleProduct($scope.item_id)
      .success(function(data){
        $scope.singleProduct = data;
        
      }).error(function(){
        alert('error');
    })
  
});