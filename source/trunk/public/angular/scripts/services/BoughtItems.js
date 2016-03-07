angular.module('productService',[])
  .factory('BoughtItems', function($http) {
    return {
      //주문 완료한 아이템들 불러오기
      getboughtitem: function (username) {
        return $http.get('/boughtitems/' + username);
    },
      //구매 완료 시에 자신의 구매 내역에 데이터 저장.
      saveboughtitem: function (data) {
        return $http.post('/boughtitems', data);
    }





  }
});




