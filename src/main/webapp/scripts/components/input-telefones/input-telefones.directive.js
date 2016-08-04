calvinApp.directive('inputTelefones', function(){
    return {
        restrict: 'E',
        scope:{
            ngModel: '=',
            readonly: '='
        },
        templateUrl: 'scripts/components/input-telefones/input-telefones.html',
        controller: function($scope){
            $scope.telefone = {};
            
            $scope.adicionarTelefone = function(){
                if ($scope.telefone.numero){
                    $scope.telefone.numero = $scope.telefone.numero.replace('_', '');
                    $scope.ngModel.push($scope.telefone.numero);
                    $scope.telefone = {};
                }
            };

            $scope.removerTelefone = function(telefone){
                if (!$scope.ngModel){
                    $scope.ngModel = [];
                }
                $scope.ngModel.splice($scope.ngModel.indexOf(telefone), 1);
            };
            
            $scope.$watch('ngModel', function(){
                if (!$scope.ngModel){
                    $scope.ngModel = [];
                }
            });
        }
    };
});