angular.module('productController')
  .controller('productDetailCtrl', function(Users, $scope, $routeParams, $http, Products, Users,BoughtItems) {
    // View 부분에서 item_id 라는 것에 url에서 item_id 부분을 사용함. localhost:3000/#/A1-001이라면
    // A1-001부분이 item_id부분이기 때문에 console.log(item_id)를 하면 A1-001이 찍힘.
    $scope.item_id = $routeParams.item_id;
    

       Users.getUserSession()
     .success(function(data){
       $scope.user=data;
       
      }).error(function(){
         alert('error');
    })


    //상품평 로그인된 사람만 삭제 하게 하려고 유저의 유저네임 불러온 곳.
    $scope.getusername = function() {
        
        return $scope.user.username;
                  
    }


    // 하나의 상품을 불러오기 위한 로직. 위에서 정의해준 $scope.item_id를 통해 그 값에 대한 하나의 상품만을
    // 불러온다. 성공시에 data를 $scope.singleProduct라는 곳에 저장함.
    Products.getSingleProduct($scope.item_id)
      .success(function(data){
        $scope.singleProduct = data;
      })
      .error(function(){
        alert('error');
      })

      //뷰에서 {{img}}로 쓰인부분을 정의한 곳. item_id값이 A1-001과 같은 형식이고 우리가 사용하는 이미지
      //파일의 파일명은 A1-001.jpg의 형식이기 때문에 뒤에 .jpg를 더해주고 뷰 부분에서 ng-src로 
      //이미지 불러옴.
      $scope.img = $routeParams.item_id +'.jpg';
      // $scope.singleProduct = {};
      
      $scope.addCart=function(){
        // 카트에 저장하는 로직. 
        // singleProduct가 정의되지 않은 것이 아니라면 Products
        // (Service폴더에 있는 Products.js 안에 있는 Factory 이름임)의 createCart를 실행.
        if($scope.singleProduct !=undefined){
          Products.addCart($scope.singleProduct)
          .success(function(data){
            $scope.singleProduct={};
            $scope.carts=data;
          });
      }}
      //제품 상세정보페이지에서 자신이 입력한 수량을 상품 DB의 qty값에 저장.
      $scope.orderSetQty = function(item_id, qty){

          Products.orderSetQty(item_id, qty).success(function(data){
               $scope.asd = data;            
      }
      )}

      Products.getEvaluations($scope.item_id)
        .success(function(data) {
        // console.log($scope.item_id);
        $scope.evaluation = data;
      })
        .error(function(){
          alert('error');
      });







    $scope.deleteeval = function (id) {
      // console.log(data);
      Products.deleteeval(id).success(function (data) {
        // alert('evaluation deleted!');
        // console.log(data);
        $scope.evaluation = data;
        // location.reload();
      });
    };











      var bought = false;

      $scope.createEvaluation=function(){
        if($scope.singleProduct !=undefined)
        {
          BoughtItems.getboughtitem()
            .success(function(data) {
              
              for(var i=0; i < data.length;i++){
                if($scope.singleProduct.item_id === data[i].item_id){
                  bought = true;
                  // console.log($scope.singleProduct.item_id);
                  // console.log(data[i].item_id);
                }
              }
              if(bought){
                Products.createEvaluations($scope.singleProduct)
                    .success(function(data){
                      $scope.singleProduct.evaluation= null;
                      $scope.evaluation=data;
              
                    });
              } 
              else{
                alert('상품을 구매하지 않으셨습니다!');
                $scope.singleProduct.evaluation= null;
              }
            });
        }
      };

      Users.getUserSession()
      .success(function(data){
        $scope.userSession = data;
      });





      $scope.itemsPerPage = 10;
      $scope.currentPage = 0;

      $scope.evaluation = [];

      $scope.range = function() {
        if($scope.evaluation.length % $scope.itemsPerPage == 0){
          if(Math.ceil($scope.evaluation.length/$scope.itemsPerPage) >= 5){
            var rangeSize = 5;
          }
          else{
            var rangeSize = $scope.evaluation.length / $scope.itemsPerPage;
          }
        }
        else{
          if(Math.ceil($scope.evaluation.length/$scope.itemsPerPage) >= 5){
            var rangeSize = 5;
          }
          else{
            var rangeSize = Math.ceil($scope.evaluation.length/$scope.itemsPerPage);
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
        return Math.ceil($scope.evaluation.length/$scope.itemsPerPage)-1;
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