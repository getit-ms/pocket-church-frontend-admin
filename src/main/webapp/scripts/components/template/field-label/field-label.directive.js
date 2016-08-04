calvinApp.directive('fieldLabel', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            value:'@value',
            required:'=required',
            for:'@for'
        },
        templateUrl: 'scripts/components/template/field-label/field-label.directive.html'
    };
});

