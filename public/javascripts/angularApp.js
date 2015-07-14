var app = angular.module('theShop', ['ui.router']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.
        state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl',
            resolve: {
                postPromise: ['products', function(products) {
                    return products.getAll();
                }]
            }
        }).state('cart', {
            url: '/cart',
            templateUrl: '/cart.html',
            controller: 'CartCtrl',
            resolve: {
                postPromise: ['products', function(products) {
                    return products.getAll();
                }]
            }
        }).state('products', {
            url: 'products/:productID',
            templateUrl: 'products.html',
            controller: 'ProductsCtrl',
            resolve: {
                postPromise: ['products', function(products) {
                    return products.getAll();
                }]
            }
        });
//        $urlRouterProvider.otherwise('home');
    }
]);


app.factory('products', ['$http', function($http) {
   var o = {
        products:[]
    };

    o.getAll = function() {
        return $http.get('/products').success(function (data) {
            angular.copy(data, o.products);
        });
    };

    return o;
}]);

app.controller('MainCtrl', ['$scope', 'products',
function($scope, products) {
    $scope.products = products;

    $scope.cost = 0;
    $scope.addProduct = function() {
        $scope.cost = $scope.cost + 1;
    }
}]);

app.controller('ProductsCtrl', ['$scope', '$stateParams', '$http', 'products',
function($scope, $stateParams, $http, products) {
    $scope.id = $stateParams.productID;

    if($stateParams.productID){
       var id = $stateParams.productID;
       $http.get('/products/' + id).success(function(data){
           $scope.product = data[0];
       });
    }
}]);

app.controller('CartCtrl', ['$scope', function($scope) {

}]);

app.controller('NavCtrl', ['$scope', function($scope) {
    $scope.query="";
}]);