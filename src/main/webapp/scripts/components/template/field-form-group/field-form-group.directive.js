calvinApp.directive('fieldFormGroup', function(){
    return {
        restrict: 'A',
        scope: {
            fieldFormGroup:'='
        },
        link: function($scope, $element, attr){
            var initWatch = $scope.$watch(function(){
                return $scope.fieldFormGroup;
            },
            function(){
                var field = $scope.fieldFormGroup;
                if(!field){
                    return;
                }
                
                initWatch();
                var form = field.$$parentForm;
                var invalid = function(){
                    return form.$submitted && field.$invalid;
                };
                
                $scope.$watch(function(){
                    return invalid();
                }, function(){
                    if ($element.hasClass('has-error') != invalid()){
                        $element.toggleClass('has-error');
                    }
                });
            });
        }
    };
});