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