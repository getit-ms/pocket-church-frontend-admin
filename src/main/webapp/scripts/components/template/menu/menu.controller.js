calvinApp.controller('MenuController', ['$scope', '$state', 'Restangular', '$rootScope', function ($scope, $state, Restangular, $rootScope) {
        $scope.$state = $state;
        $rootScope.contentFullScreen = false;

        Restangular.one('app/version').get().then(function(app){
            $scope.app = app;
            $scope.version = $_version;
        });
    }]
);
