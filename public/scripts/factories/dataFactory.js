myApp.factory('DataFactory', ['$http', function($http) {
    // PRIVATE
    var favorites = undefined;

    var getFavoriteData = function() {
        console.log('getting data from server');
        var promise = $http.get('/favorites').then(function(response) {
            people = response.data;
            console.log('Async data response:', people);
        });

        return promise;
    };

    var addFavorite = function(favorite) {
        // send to server
    };


    //PUBLIC
    var publicApi = {
        favoriteData: function() {
            return favorites;
        },
        retrieveData: function() {
            return getFavoriteData();
        },
        saveFavorite: function(favObj) {
            addFavorite(favObj);
        }
    };

    return publicApi;

}]);