myApp.controller('FindController', ['$scope', '$http', function($scope, $http) {
    $scope.animal = '';
    $scope.pet = {};
    $scope.numFavs = 0;

    $scope.changeAnimal = function() {
        console.log($scope.animal);

        if($scope.animal != '') {
            $scope.getRandomPet();
        }
    }

    $scope.getRandomPet = function() {
        // API key
        var key = 'b900e0d5e332753a460a64eaa8de00fd';

        var baseURL = 'http://api.petfinder.com/';
        var query = 'pet.getRandom';
        query += '?key=' + key;
        query += '&animal=' + $scope.animal;
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

    $scope.saveFavorite = function() {
        var favorite = {
            petID: $scope.pet.id.$t,
            petName: $scope.pet.name.$t,
            description: '',
            //image: ''
        };

        if($scope.pet.description.$t) {
            favorite.description = $scope.pet.description.$t.substring(0, 99);
        }

        var photos = $scope.pet.media.photos;
        console.log('Photos: ', photos);
        if(photos != undefined) {
            favorite.image = $scope.pet.media.photos.photo[0].$t;
        }

        $http.post('/favorite', favorite).then(function(response) {
          if(response.status == 201) {
            getNumFavorites();
          } else {
            console.log("error posting new favorite");
          }
        });
    };

    function getNumFavorites() {
      $http.get('/favorite/count').then(function(response) {
        console.log('count response: ', response);
        if(response.status == 200) {
          $scope.numFavs = response.data;
        } else {
          console.log("error getting favorite count");
        }

      });
    }

}]);
