'use strict';
  /* App Module */
 
 var meanMall = angular.module('meanMall', [
   'ngRoute','productController','productService','ui.bootstrap','ngAnimate',
 ]);


 meanMall.config(['$routeProvider',
   function($routeProvider) {
     // Check if the user is connected
     var checkLoggedin = function($q, $timeout, $http, $location) {
       // Initialize a new promise
       var deferred = $q.defer();

       // Make an AJAX call to check if the user is logged in
       $http.get('/user').success(function(user) {
         // Authenticated
         // alert(user.username);
         if (user.username !== undefined){
          // alert('1234');
          $timeout(deferred.resolve);
        }

        // Not Authenticated
        else { 
          alert('로그인 후 이용하실 수 있습니다.');
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });
       return deferred.promise;
     };

     $routeProvider.
        when('/', {
          templateUrl: '/angular/view/productList.html',
          controller: 'mainCtrl'
        }).
        when('/login', {
          templateUrl: '/angular/view/login.html'
        }).
        when('/register', {
          templateUrl: '/angular/view/register.html'
        }).
        when('/usermodify', {
          templateUrl: '/angular/view/userModify.html',
          controller: 'NavbarCtrl',
          resolve: {
                    loggedin: checkLoggedin
                }
        }).
        // when('/main', {
        //   templateUrl: '/angular/view/recommend.html',
        //   controller: 'mainCtrl'
        // }).
        when('/shoppingcart', {
          templateUrl: '/angular/view/cart.html',
          controller: 'cartCtrl',
          resolve: {
                    loggedin: checkLoggedin
                }
        }).
        when('/ordercheck/', {
          templateUrl: '/angular/view/orderCheck.html',
          controller: 'orderCheckCtrl',
          resolve: {
                    loggedin: checkLoggedin
                }
        }).       
        when('/:upper_category/:sub_category', {
          templateUrl: '/angular/view/sub_category.html',
          controller: 'sub_categoryCtrl'
        }).
        when('/:upper_category/:sub_category/:item_id', {
          templateUrl: '/angular/view/productDetail.html',
          controller: 'productDetailCtrl'
        }).
        when('/:upper_category/:sub_category/:item_id/order', {
          templateUrl: '/angular/view/order.html',
          controller: 'orderCtrl',
          resolve: {
                    loggedin: checkLoggedin
                }
        }).
        when('/:upper_category/:sub_category/:item_id/order/orderSuccess', {
          templateUrl: '/angular/view/orderSuccess.html',
          controller: 'orderSuccessCtrl',
          resolve: {
                    loggedin: checkLoggedin
                }
        }).      
        otherwise({
          redirectTo: '/'
        });
    }]);