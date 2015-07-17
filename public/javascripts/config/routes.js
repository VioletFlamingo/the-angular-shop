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