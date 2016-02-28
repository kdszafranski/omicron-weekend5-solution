myApp.controller('FavoriteController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
    $scope.favorites = [];
    $scope.dataFactory = DataFactory;

    if($scope.dataFactory.favoriteData() === undefined) {
        // initial load
        $scope.dataFactory.retrieveData().then(function() {
            $scope.favorites = $scope.dataFactory.favoriteData();
        });
    } else {
        $scope.favorites = $scope.dataFactory.favoriteData();
    }

}]);