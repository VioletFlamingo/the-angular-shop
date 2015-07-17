app.controller('MainCtrl', ['$scope', 'products', 'tagsManager',
function($scope, products, tagsManager) {
    $scope.products = products;
    $scope.selectedTags = [];

    $scope.change = function(name) {
        console.log(name);
        tagsManager.changeState(name);
    };

    var update = function() {
        $scope.selectedTags = tagsManager.getAll();
    };

    $scope.criteriaMatch = function() {
        return function(item) {
            for (index in $scope.selectedTags) {
                var tag = $scope.selectedTags[index];
                if (item.tags.indexOf(tag)<0) {
                    return false;
                }
            }
            return true;
        };
    };

    tagsManager.registerObserverCallback(update);
}]);