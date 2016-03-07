angular.module('productService')
  .factory('Carts', function($http) {
    return {
      //장바구니 전체 데이터 중에서 username을 기준으로 불러옴.
      //로그인된 username과 cartDB의 username이 일치하는
      //상품들을 return하도록 구현해야함.
      getCartbyId: function(username) {
        return $http.get('/carts/' + username);
      },

      //장바구니에 담은 아이템들을 삭제하는 명령. _id값을 기준으로
      //삭제한다.
      deleteCartbyId: function(_id) {
        return $http.delete('/carts/' + _id);
      },

      //장바구니에서 수량을 조절하고 수정하기를 누르면 CartDB
      //에서도 수정되는 것. _id값을 기준으로 qty값을 update하는 구조임.
      modifyqty: function(_id, qty){
        return $http.put('/carts/' + _id, qty);
      },
      deleteCartbyitem_id : function(item_id){
        return $http.delete('/cart/' + item_id);
      }
    }
   

   
});