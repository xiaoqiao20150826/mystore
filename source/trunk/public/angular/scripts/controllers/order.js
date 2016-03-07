angular.module('productController')
  .controller('orderCtrl', function($scope, $routeParams, $http, Products, Carts, BoughtItems, Users) {
    //View 부분에서 item_id 라는 것에 url에서 item_id 부분을 사용함. localhost:3000/#/A1-001이라면
    //A1-001부분이 item_id부분이기 때문에 console.log(item_id)를 하면 A1-001이 찍힘.
    $scope.img = $routeParams.item_id +'.jpg';
    $scope.item_id = $routeParams.item_id;
      
    //하나의 상품을 불러오기 위한 로직. 위에서 정의해준 $scope.item_id를 통해 그 값에 대한 하나의 상품만을
    //불러온다. 성공시에 data를 $scope.singleProduct라는 곳에 저장함.
    Products.getSingleProduct($scope.item_id)
      .success(function(data){
        $scope.singleProduct = data;      
        })
      .error(function(){
        alert('error');
      })

    Users.getUserSession()
     .success(function(data){
       $scope.user=data;
      
     }).error(function(){
        alert('error');
    })
    
    $scope.singleProduct = {};
    //주문하기 페이지에서 장바구니에 저장 기능을 하는 곳.
    $scope.addCart=function(){
      if($scope.singleProduct !=undefined){
        Products.addCart($scope.singleProduct)
          .success(function(data){
            $scope.singleProduct={};
            $scope.carts=data;
          });
        }}



   $scope.addCartinorder=function(){
      if($scope.singleProduct !=undefined){
        Products.addCartinorder($scope.singleProduct)
          .success(function(data){
            $scope.singleProduct={};
            $scope.carts=data;
          });
        }}



     var del= false;

    //주문하기 페이지에서 결제하기를 누르면 구매한 아이템들이 자신의 구매내역DB에 저장된다.
    $scope.saveboughtitem=function(){
      BoughtItems.saveboughtitem($scope.singleProduct)
        .success(function(data){         
          $scope.bougtitem=data;
        });
       Carts.getCartbyId().success(function (data) {    
        for(var i=0; i < data.length;i++){
                if($scope.singleProduct.item_id === data[i].item_id){
                  del = true;
            }
          }
      if(del){
       Carts.deleteCartbyitem_id($scope.item_id).success(function (data) {
        $scope.carts = data;
        
        });

        };
      });
    };      
});