calvinApp.directive('fieldMessage', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            field:'=',
            backendKey:'@'
        },
        templateUrl: 'scripts/components/template/field-message/field-message.directive.html',
        controller: ['$scope', 'backendErrors', function($scope, backendErrors){
                var setValid = function(valid){
                    if(!$scope.field){
                        return;
                    }

                    $scope.field.$setValidity('backend', valid);
                    if (valid){
                        backendErrors.set($scope.backendKey, null, []);
                    }else{
                        $scope.field.$errorMessage = backendErrors.get($scope.backendKey);
                        $scope.field.$errorArgs = backendErrors.args($scope.backendKey)
                    }
                };
                
                var stp = $scope.$watch('field', function(){
                    if ($scope.field){
                        stp();
                        
                        $scope.backendKey || ($scope.backendKey = $scope.field.$name);

                        $scope.$watch(function(){
                            if(!$scope.field){
                                return;
                            }

                            return $scope.field.$modelValue;
                        }, function(){
                            setValid(true);
                        });

                        backendErrors.watch($scope.backendKey, function(){
                            setValid(!backendErrors.contains($scope.backendKey));
                        });
                    }
                });
            }]
    };
});

