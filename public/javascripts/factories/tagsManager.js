app.factory('tagsManager', function() {
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

    var tagList = [];

    var getAll = function() {
        return tagList;
    };

    var changeState = function(tag) {
        var index = tagList.indexOf(tag);

        if (index > -1) {
            tagList.splice(index, 1);
        } else {
            tagList.push(tag);
        }

        notifyObservers();
    };

    return {
        registerObserverCallback: registerObserverCallback,
        getAll: getAll,
        changeState: changeState
    }
});