angular.module('productController')
  .controller('cartCtrl',function(Products, $scope, $routeParams, $http, Carts) {
    //qty 객체 정의
    $scope.qty={};
  
    //CartDB에 있는 상품들을 username 으로 분류해서 현재 로그인된 username에 부합하는 상품만 불러옴.
    Carts.getCartbyId().success(function (data) {    
        $scope.carts = data;
    });
    
    //삭제하기 버튼을 눌렀을 때 상품을 cartDB에서 지우는 로직._id 값을 기준으로 삭제.
    $scope.deleteCartbyId = function ( _id ) {
      Carts.deleteCartbyId(_id).success(function (data) {
        $scope.carts = data;
        // location.reload();
      });
    };



    

    //상품 수량 조정. CRUD 중에 update를 구현한 것. _id값을 기준으로 qty숫자를 변경하여
    //저장한다. 장바구니페이지
    $scope.modifyqty = function (_id, qty){
      Carts.modifyqty(_id, qty).success(function (data) {
        $scope.carts = data;
        // location.reload();
        
      });
    };
   

      //자신이 input에 입력상 수량을 DB에 저장시켜줌.
      // 주문페이지
      $scope.orderSetQty = function(item_id, qty){

          Products.orderSetQty(item_id, qty).success(function(data){
               $scope.asd = data;            
      }
    )};


  
    
      $scope.itemsPerPage = 5;
      $scope.currentPage = 0;

      $scope.carts = [];

      $scope.range = function() {
        // var rangeSize = 0;
        if($scope.carts.length % $scope.itemsPerPage == 0){
          if(Math.ceil($scope.carts.length/$scope.itemsPerPage) >= 5){
            var rangeSize = 5;
          }
          else{
            var rangeSize = $scope.carts.length / $scope.itemsPerPage;
          }
        }
        else{
          if(Math.ceil($scope.carts.length/$scope.itemsPerPage) >= 5){
            var rangeSize = 5;
          }
          else{
            var rangeSize = Math.ceil($scope.carts.length/$scope.itemsPerPage);
          }
        }

        var ret = [];
        var start;

        start = $scope.currentPage;

        if ( start > $scope.pageCount()-rangeSize ) {
          start = $scope.pageCount()-rangeSize+1;
        }

        for (var i=start; i<start+rangeSize; i++) {
          ret.push(i);
        }
        return ret;
      };

      $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
          $scope.currentPage--;
        }
      };
      
      $scope.prevPageDisabled = function() {
        return $scope.currentPage === 0 ? "disabled" : "";
      };
      
      $scope.pageCount = function() {
        return Math.ceil($scope.carts.length/$scope.itemsPerPage)-1;
      };

      $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageCount()) {
          $scope.currentPage++;
        }
      };

      $scope.nextPageDisabled = function() {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
      };

      $scope.setPage = function(n) {
        $scope.currentPage = n;
      };

});