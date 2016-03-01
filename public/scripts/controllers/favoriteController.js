myApp.controller('FavoriteController', ['$scope', 'DataFactory', function($scope, DataFactory) {
    $scope.favorites = [];
    $scope.dataFactory = DataFactory;

    // force data update
    if($scope.dataFactory.favoriteData() === undefined) {
        // initial load
        $scope.dataFactory.retrieveData().then(function() {
            $scope.favorites = $scope.dataFactory.favoriteData();
        });
    } else {
        $scope.favorites = $scope.dataFactory.favoriteData();
    }

}]);