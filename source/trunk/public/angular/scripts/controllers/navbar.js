angular.module('productController')
  .controller('NavbarCtrl', function($scope, $routeParams, $http, Users, BoughtItems) {
    // 메뉴바에서 로그인 된 유저 정보값을 가져와서 뿌리는 부분
    Users.getUserSession()
      .success(function(data){
        $scope.userSession = data;
      });

	$scope.address={};

    $scope.getboughtitem = function(){
       BoughtItems.getboughtitem().success(function(data){
          $scope.boughtitems = data

      })
     }

	$scope.modifyadr = function (address){
		Users.modifyadr(address).success(function (data) {
			$scope.address={};
			$scope.userSession = data;
      location.reload(); //새로고침
      alert('수정되었습니다.');
		});
	};
});