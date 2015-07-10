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
        }).state('basket', {
            url: '/basket',
            templateUrl: '/basket.html',
            controller: 'BasketCtrl',
            resolve: {
                postPromise: ['products', function(products) {
                    return products.getAll();
                }]
            }
        });
        $urlRouterProvider.otherwise('home');
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

app.controller('MainCtrl', ['$scope', 'products', function($scope, products) {
    $scope.products = products;
}]);

app.controller('ProductsCtrl', ['$scope', 'products', 'product', function($scope) {
    $scope.post = post;
}]);

app.controller('BasketCtrl', ['$scope', function($scope) {
    $scope.basket = "BASKET";
}]);