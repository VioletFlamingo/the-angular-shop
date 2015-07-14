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
            controller: 'MainCtrl',
//            resolve: {
//                postPromise: ['products', function(products) {
//                    return products.getAll();
//                }]
//            }
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

    o.get = function(id) {
        return $http.get('/products/' + id).success(function(res) {
            console.log(res[0]);
            return res[0];
        });
    };

    return o;
}]);

app.controller('MainCtrl', ['$scope', '$stateParams', '$http', 'products',
function($scope, $stateParams, $http, products) {
    $scope.products = products;

    $scope.cost = 0;
    $scope.addProduct = function() {
        $scope.cost = $scope.cost + 1;
    }
    $scope.id = $stateParams.productID;
//    $scope.product = products.get($stateParams.productID);
//    $scope.click = function() {
//        console.log("PROD: ");
//        console.log($scope.product);
//    }

    console.log("id: "+$stateParams.productID);

       if($stateParams.productID){
           var id = $stateParams.productID;
           $http.get('/products/' + id).success(function(data){
               console.log('Konkretny produkt : \n' + JSON.stringify(data));
               $scope.product = data[0];
               console.log("Product: "+$scope.product);
               console.log("Name: "+$scope.product.name);
               $scope.click = function() {
                    console.log("PROD: ");
                    console.log($scope.product);
               };
           });
       }

}]);

app.controller('ProductsCtrl', ['$scope', 'products', 'product', function($scope) {
    $scope.post = post;
}]);

app.controller('CartCtrl', ['$scope', function($scope) {

}]);

app.controller('NavCtrl', ['$scope', function($scope) {
    $scope.query="";
}]);