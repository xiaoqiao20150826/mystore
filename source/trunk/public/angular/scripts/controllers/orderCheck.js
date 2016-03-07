angular.module('productController')
  .controller('orderCheckCtrl', function($scope, $routeParams, $http, BoughtItems, Users) {
    //주문내역 확인 페이지 역시 로그인 된 username 값으로 필터링 하는 로직 추가 필요.
    BoughtItems.getboughtitem()
      .success(function(data) {
        $scope.boughtitems = data;

      });

    Users.getUserSession()
     .success(function(data){
       $scope.user=data;
      
      
     }).error(function(){
        alert('error');
    });



      $scope.itemsPerPage = 5;
      $scope.currentPage = 0;

      $scope.boughtitems = [];

      $scope.range = function() {
        if($scope.boughtitems.length % $scope.itemsPerPage == 0){
          if(Math.ceil($scope.boughtitems.length/$scope.itemsPerPage) >= 5){
            var rangeSize = 5;
          }
          else{
            var rangeSize = $scope.boughtitems.length / $scope.itemsPerPage;
          }
        }
        else{
          if(Math.ceil($scope.boughtitems.length/$scope.itemsPerPage) >= 5){
            var rangeSize = 5;
          }
          else{
            var rangeSize = Math.ceil($scope.boughtitems.length/$scope.itemsPerPage);
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
        return Math.ceil($scope.boughtitems.length/$scope.itemsPerPage)-1;
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
