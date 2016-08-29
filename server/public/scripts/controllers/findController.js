myApp.controller('findController', ['$scope', '$http', function($scope, $http) {
  console.log('find controller running');
  $scope.pet = {};
  $scope.animalType = '';
  $scope.favCount = 0;

  $scope.animals = [
    {type: "dog", display: "Dog"},
    {type: "cat", display: "Cat"},
    {type: "barnyard", display: "Barnyard Animals"},
    {type: "smallfurry", display: "Small and Furry Critters"}
  ];

  updateFavCount();

  $scope.changeAnimal = function() {
    if($scope.animalType != '') {
      $scope.getRandomPet();
    }
  }

  $scope.getRandomPet = function() {
      // API key
      var key = 'b900e0d5e332753a460a64eaa8de00fd';

      var baseURL = 'http://api.petfinder.com/';
      var query = 'pet.getRandom';
      query += '?key=' + key;
      query += '&animal=' + $scope.animalType;
      query += '&output=basic';
      query += '&format=json';

      var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
      // console.log(request);

      $http.jsonp(request).then(
          function(response) {
              $scope.pet = response.data.petfinder.pet;
          }
      );
  }

  $scope.addFavorite = function() {
    var favorite = {
      petID: $scope.pet.id.$t,
      petName: $scope.pet.name.$t,
      description: '',
      image: ''
    };

    if($scope.pet.description.$t) {
      favorite.description = $scope.pet.description.$t.substring(0, 99);
    }

    var photos = $scope.pet.media.photos;
    if(photos != undefined) {
      favorite.image = photos.photo[1].$t;
    }

    console.log('new favorite: ', favorite);

    // post to server
    $http.post('/favorites', favorite).then(function(response) {
      if(response.status == 201) {
        console.log('saved favorite');
        updateFavCount();
      } else {
        console.log('error saving favorite');
      }
    });
  }

  function updateFavCount() {
    $http.get('/favorites/count').then(function(response) {
      console.log(response);
      $scope.favCount = response.data.count;
    });
  }

}]);
