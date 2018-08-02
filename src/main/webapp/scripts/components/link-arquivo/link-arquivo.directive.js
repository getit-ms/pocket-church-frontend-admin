calvinApp.directive('linkArquivo', function(){
    return {
        restrict: 'E',
        transclude: true,
        scope:{
            ngModel: '=ngModel'
        },
        templateUrl: 'scripts/components/link-arquivo/link-arquivo.html',
        controller: function($scope) {
            $scope.headers = 'Dispositivo=' + $_clientKey + '&Empresa=' + $_serverCode;
        }
    };
});