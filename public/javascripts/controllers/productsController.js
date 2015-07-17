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