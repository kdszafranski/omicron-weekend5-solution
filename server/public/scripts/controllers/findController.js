myApp.controller('FindController', ['$scope', '$http', function($scope, $http) {


    $scope.getRandomPet = function() {
        // API key
        var key = 'b900e0d5e332753a460a64eaa8de00fd';

        var baseURL = 'http://api.petfinder.com/';
        var query = 'pet.getRandom';
        query += '?key=' + key;
        query += '&output=basic';
        query += '&format=json';

        var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
        console.log(request);

        $http.jsonp(request).then(
            function(response) {
                $scope.pet = response.data.petfinder.pet;
                console.log($scope.pet);
            }
        );
    }

}]);
