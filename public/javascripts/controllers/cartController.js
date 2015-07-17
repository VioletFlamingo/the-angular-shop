app.controller('CartCtrl', ['$scope', 'cartManager', function($scope, cartManager) {
    $scope.choices = cartManager.getAll();
    $scope.cost = cartManager.getBill();
    $scope.emptyCart = false;

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