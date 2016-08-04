calvinApp.directive('menuItem', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                state: '@',
                menuIcon: '@',
                menuName: '@'
            },
            templateUrl: 'scripts/components/template/menu/menu-item/menuitem.directive.html'
        };
    });

