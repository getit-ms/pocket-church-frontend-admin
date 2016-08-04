calvinApp.directive('dateExpiredValidate', function(){
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            dateToCompare: "=dateExpiredValidate"
        },
        link: function($scope, element, attributes, ngModel){
            ngModel.$validators.date_expired_validate = function (modelValue) {

                if (!$scope.dateToCompare) return Date.now() < modelValue;

                var dateToCompare = new Date(angular.copy($scope.dateToCompare));
                if (dateToCompare) return dateToCompare < modelValue;

            };
        }
    }
});
