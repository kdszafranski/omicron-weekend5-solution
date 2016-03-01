myApp.factory('DataFactory', ['$http', function($http) {
    console.log("datafactory start");

    // PRIVATE
    var favorites = undefined;


    var getFavoriteData = function() {
        console.log('getting data from server');
        var promise = $http.get('/favorite').then(function(response) {
            favorites = response.data;
        });

        return promise;
    };

    var addFavorite = function(favorite) {
        // send to server
        var promise = $http.post('/favorite', favorite).then(function(response) {
            if(response.data) {
                // now update our favorite list
                return getFavoriteData();
            }
        });

        return promise;
    };

    var numberOfFavorites = function() {
        if(favorites != undefined) {
            return favorites.length;
        }

        return 0;
    }


    //PUBLIC
    var publicApi = {
        favoriteData: function() {
            return favorites;
        },
        retrieveData: function() {
            return getFavoriteData();
        },
        saveFavorite: function(favObj) {
            return addFavorite(favObj);
        },
        getNumFavorites: function() {
            return numberOfFavorites();
        }
    };

    return publicApi;

}]);