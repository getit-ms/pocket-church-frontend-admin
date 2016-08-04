calvinApp.directive('calvinDatepicker', function(){
    return {
        restrict: 'E',
        replace: true,
        require: 'ngModel',
        scope: {
            name: '@',
            disabled: '=',
            model: '=ngModel',
            pattern: '@datePattern',
            mask: '@dateMask',
            placeholder: '@',
            readonly: '=',
            startView: '@',
            minView: '@'
        },
        templateUrl: 'scripts/components/date/datepicker.directive.html',
        controller: function($scope){
            if (!$scope.minView){
                $scope.minView = 'minute';
            }
            
            if (!$scope.startView){
                $scope.startView = 'day';
            }
            
            if (!$scope.pattern){
                $scope.pattern = 'dd/MM/yyyy';
            }
            
            if (!$scope.mask){
                $scope.mask = $scope.pattern.replace(/[DdMYyHhmsS]/g, '9');
            }
            
            $scope.config = { 
                dropdownSelector: '#dropdown' + name, 
                startView: $scope.startView, 
                minView: $scope.minView 
            };
            
            $scope.$watch('mask', function(mask){
                maskInput(mask);
            });
            
            function maskInput(mask){
                $('#' + $scope.name).mask(mask);
            }
            
            maskInput($scope.mask);
        }
    }
});