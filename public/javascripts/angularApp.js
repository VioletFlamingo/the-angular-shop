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

app.factory('cartManager', function() {
    // observer
    var observerCallbacks = [];

    var registerObserverCallback = function(callback){
        observerCallbacks.push(callback);
    };

    var notifyObservers = function(){
    angular.forEach(observerCallbacks, function(callback){
            callback();
        });
    };
    // end of observer

    var productsList = [];
    var bill = 0;

    var addProduct = function(newProduct) {
        var index = -1;

        for (var i = 0; i<productsList.length; i++) {
            console.log(productsList[i][0]);
            console.log(newProduct);
            if (productsList[i][0].name === newProduct.name) {
                index = i;
                break;
            }
        }

        if(index > -1) {
            productsList[index][1] = productsList[index][1] + 1;
        } else {
            productsList.push([newProduct, 1]);
        }
        bill = bill + newProduct.price;
        notifyObservers();
    };

    var getAll = function() {
        return productsList;
    };

    var getBill = function() {
        return bill;
    };

    var plusProduct = function(item) {
        var index = -1;

        for (var i = 0; i<productsList.length; i++) {
            if (productsList[i][0].name === item.name) {
                index = i;
                break;
            }
        }
        bill = bill + item.price;
        productsList[i][1] = productsList[i][1] + 1;
        notifyObservers();
        return bill;
    };

    var minusProduct = function(item) {
        var index = -1;
        for (var i = 0; i<productsList.length; i++) {
            if (productsList[i][0].name === item.name) {
                index = i;
                break;
            }
        }

        bill = bill - item.price;

        if (productsList[i][1]>1) {
            productsList[i][1] = productsList[i][1] - 1;
        } else {
            productsList.splice(i, 1);
        }
        notifyObservers();
        return bill;
    };

    var removeAllOfType = function(item) {
        var index = -1;
        for (var i = 0; i<productsList.length; i++) {
            if (productsList[i][0].name === item.name) {
                index = i;
                break;
            }
        }
        bill = bill - productsList[i][1]*item.price;

        productsList.splice(i, 1);
        notifyObservers();
        return bill;
    };

    return {
        addProduct: addProduct,
        getAll: getAll,
        getBill: getBill,
        plusProduct: plusProduct,
        minusProduct: minusProduct,
        removeAllOfType: removeAllOfType,
        registerObserverCallback: registerObserverCallback
    }
});

app.controller('MainCtrl', ['$scope', 'products',
function($scope, products) {
    $scope.products = products;
}]);

app.controller('ProductsCtrl', ['$scope', '$stateParams', '$http', 'products', 'cartManager',
function($scope, $stateParams, $http, products, cartManager) {
    $scope.id = $stateParams.productID;

    if($stateParams.productID){
       var id = $stateParams.productID;
       $http.get('/products/' + id).success(function(data){
           $scope.product = data[0];
           $scope.addToCart = function() {
                cartManager.addProduct($scope.product);
           };
       });
    }

}]);

app.controller('CartCtrl', ['$scope', 'cartManager', function($scope, cartManager) {
    $scope.choices = cartManager.getAll();
    $scope.cost = cartManager.getBill();

    $scope.addItem = function(item) {
        cartManager.plusProduct(item[0]);
    };
    $scope.removeItem = function(item) {
       cartManager.minusProduct(item[0]);
    };
    $scope.removeAllItems = function(item) {
        cartManager.removeAllOfType(item[0]);
    };

    var update = function(){
        $scope.choices = cartManager.getAll();
        $scope.cost = cartManager.getBill();
    };

    cartManager.registerObserverCallback(update);
}]);

app.controller('NavCtrl', ['$scope', function($scope) {
    $scope.query="";
}]);