calvinApp.directive('formEndereco', function(){
    return {
        restrict: 'E',
        scope:{
            ngModel: '=',
            readonly: '='
        },
        templateUrl: 'scripts/components/form-endereco/form-endereco.html',
        controller: function($scope){
            $scope.ufs = [
                'AC', 'AL', 'AP', 'AM', 'BA', 'CE',
                'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
                'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
                'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
                'SP', 'SE', 'TO'
            ];
        }
    };
});