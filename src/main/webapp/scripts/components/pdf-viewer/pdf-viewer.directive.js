calvinApp.directive('pdfViewer', function(){
    return {
        restrict: 'E',
        scope:{
            pdfUrl: '@'
        },
        templateUrl: 'scripts/components/pdf-viewer/pdf-viewer.html',
        controller: ['$scope', '$cookies', '$http', '$window', function($scope, $cookies, $http, $window){
            $scope.httpHeaders = {
                Igreja: $_serverCode,
                Dispositivo: $_clientKey,
                Authorization: $cookies.get('Authorization')
            };
            
            $scope.salvar = function(){
                $http({
                    method: 'GET',
                    url: $scope.pdfUrl,
                    headers: $scope.httpHeaders
                }).then(function(response){
                    $window.open('data:application/force-download,' + escape(response.data));
                });
            };
        }]
    };
});