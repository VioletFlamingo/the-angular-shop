app.controller('NavCtrl', ['$scope', '$http', 'products', function($scope, $http, products) {
    $scope.query = "";
    $http.get('/tags').success(function (data) {
        $scope.tags = data;
    });
}]);