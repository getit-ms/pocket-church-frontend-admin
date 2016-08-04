calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('home', {
        parent: 'parent',
        url: '/',
        data:{
            displayName: 'home.inicio',
            permissions:{
                only: ['HOME'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/home/home.form.html',
                controller: function($scope, $rootScope, acessoService){
                    $rootScope.hideMenu = false;
                    $rootScope.hideBreadcrumb = false;
                    
                    $scope.status = acessoService.buscaStatus();
                }
            }
        }
    });         
}]);
        