calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('aplicativo', {
        parent: 'home',
        url: 'aplicativo/',
        data:{
            displayName: 'aplicativo.aplicativo',
            permissions:{
                only: ['GERENCIAR_FUNCIONALIDADES_APLICATIVO'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/aplicativo/aplicativo.form.html',
                controller: function(aplicativoService, funcionalidades, $scope, $state, message){
                    $scope.carrega = function(){
                        $scope.funcionalidades = funcionalidades;
                        $scope.habilitadas = aplicativoService.buscaFuncionalidades();
                    };
                    
                    $scope.salvar = function(form){
                        aplicativoService.salvaFuncionalidades($scope.habilitadas, function(dados){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $scope.carrega();
                        });
                    };
                    
                    $scope.carrega();
                },
                resolve: {
                    funcionalidades: function(aplicativoService){
                        return aplicativoService.buscaTodasFuncionalidades();
                    }
                }
            }
        }
    });         
}]);
        