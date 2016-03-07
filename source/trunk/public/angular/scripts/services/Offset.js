angular.module('productService')
  .filter('offset', function() {
    return function(input, start) {
    // 십진수를 사용하기 위해 parseInt안에 10을 주었다.
    start = parseInt(start, 10);
      return input.slice(start);
  };
  // slice('abcdefgh',5) 라는 뜻은 abcdefgh의 5번째까지 짜른다는 얘기
  // 따라서 ng-repeat부분에 offset라는 필터를 줌으로써 5번째 아이템까지 나올 수 있다
  // (itemsperpage=5)
});