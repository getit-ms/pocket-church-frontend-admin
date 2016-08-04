calvinApp.filter('simNaoFilter', function(translate) {
        return function(input) {
            if (!input) return '';
            return translate['label.' + input];
        };
    });