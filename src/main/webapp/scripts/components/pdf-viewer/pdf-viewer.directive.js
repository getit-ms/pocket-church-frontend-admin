calvinApp.directive('pdfViewer', function(){
    return {
        restrict: 'E',
        scope:{
            pdfUrl: '@'
        },
        templateUrl: 'scripts/components/pdf-viewer/pdf-viewer.html',
        controller: ['$scope', '$http', '$window', function($scope, $http, $window){
            $scope.httpHeaders = {
                Igreja: $_serverCode,
                Dispositivo: $_clientKey,
                Authorization: localStorage.getItem('Authorization')
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