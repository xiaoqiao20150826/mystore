angular.module('productService')
  .factory('Products', function($http) {
    return {
     
      //가격이 저렴한 3개의 상품을 불러오는 function.
      getCheapestProducts : function(){
      	return $http.get('/getCheapestProducts');
      },

      //하나의 상품을 가져오는 명령. item_id값을 가지고 아이템을 분류하여 해당 item_id에 해당하는
      //상품의 정보만을 불러온다.
      getSingleProduct : function(item_id) {
        return $http.get('/singleProduct/' + item_id);
      },

      //sub_category를 기준으로 상품을 불러옴. 10개씩의 상품을
      //리턴해줌. 아이템을 불러오는 것이므로 $http.get method를 이용한다.
      getsubcategoryProducts : function(sub_category){
        return $http.get('/subcategoryProducts/' + sub_category);
      },
      //username을 기준으로 장바구니에서 상품을 불러온다.
      getCartbyId: function(username) {
        return $http.get('/carts/' + username);
      },

    

      //제품상세페이지나 주문하기 페이지에서 해당 상품을
      //장바구니에 담을 수 있는 버튼 function. 새로운 상품을
      //추가하는 것이기 때문에 post명령을 통해 데이터를 저장.
      addCart : function(data) {
        return $http.post('/carts', data);
      },
      addCartinorder : function(data) {
        return $http.post('/addCartinorder', data);
      },     

      //자신이 input에 입력한 수량을 DB에 저장하게 함.
      orderSetQty : function(item_id, qty) {
        return $http.put('/orderSetQty/' + item_id, qty);
      },

      getEvaluations : function(item_id) {
        return $http.get('/evaluations/'+ item_id);
      },
      deleteeval : function(id){
        return $http.delete('/eveluations/' + id);

      },

      createEvaluations : function(eval) {
        return $http.post('/evaluations', eval)
          .error(function(){
            alert('로그인 후 이용하실수 있습니다.');
          });
        }

   
    }
});