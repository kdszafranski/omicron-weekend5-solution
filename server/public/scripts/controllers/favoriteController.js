myApp.controller('favoriteController', ['$scope', '$http', function($scope, $http) {
  console.log('favorite controller running');
  $scope.favorites = [];
  $scope.favCount = '';
  getFavorites();

  function getFavorites() {
    $http.get('/favorites').then(function(response) {
      if(response.status == 200) {
        $scope.favorites = response.data;
        $scope.favCount = $scope.favorites.length;
      } else {
        console.log('error getting favorites');
      }
    });
  }

}]);
