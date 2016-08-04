
calvinApp.filter('phoneMask', function(PhoneMaskUtil) {
    return function(value) {
        return PhoneMaskUtil.mask(value);
    }
});

calvinApp.directive('phoneMask', function(PhoneMaskUtil) {
    return {
        scope: 'E',
        require: 'ngModel',
        link: function(scope, elem, attrs, ngModel) {
            ngModel.$formatters.push(function(value) {
                return PhoneMaskUtil.mask(value);
            });
        }
    }
});

calvinApp.factory('PhoneMaskUtil', function() {
    return {
        mask: function(value) {
            if(!value) return;
            value = value.replace(/[\s-]/g, '');
            var length = value.length;
            if (length === 10) {
                return value.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1) $2-$3');
            } else if (length === 11) {
                return value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
            } else {
                return value;
            }
        }
    }
});
