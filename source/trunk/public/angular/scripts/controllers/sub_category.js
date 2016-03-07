angular.module('productController')
  .controller('sub_categoryCtrl', function($scope, $routeParams, $http, Products) {
    //sub_category를 주소창의 sub_category로 정의해줌.
    $scope.sub_category= $routeParams.sub_category;

    // sub_category를 기준으로 상품을 분류해서 상품을 get 해옴
    // 전체데이터가아닌 10개만 가져옴.
    Products.getsubcategoryProducts($scope.sub_category)
      .success(function(data) {
        $scope.subcategoryProducts = data;
      });


      $scope.itemsPerPage = 5;
      $scope.currentPage = 0;

      $scope.subcategoryProducts = [];

      $scope.range = function() {
        if($scope.subcategoryProducts.length % $scope.itemsPerPage == 0){
          if(Math.ceil($scope.subcategoryProducts.length/$scope.itemsPerPage) >= 5){
            var rangeSize = 5;
          }
          else{
            var rangeSize = $scope.subcategoryProducts.length / $scope.itemsPerPage;
          }
        }
        else{
          if(Math.ceil($scope.subcategoryProducts.length/$scope.itemsPerPage) >= 5){
            var rangeSize = 5;
          }
          else{
            var rangeSize = Math.ceil($scope.subcategoryProducts.length/$scope.itemsPerPage);
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
        return Math.ceil($scope.subcategoryProducts.length/$scope.itemsPerPage)-1;
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