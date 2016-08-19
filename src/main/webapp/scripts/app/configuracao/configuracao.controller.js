calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('configuracao', {
        parent: 'home',
        url: 'configuracao/',
        data:{
            displayName: 'configuracao.configuracoes',
            permissions:{
                only: ['CONFIGURAR'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/configuracao/configuracao.form.html',
                controller: function(configuracaoService, message, $scope){
                    $scope.carrega = function(){
                        $scope.configuracao = configuracaoService.busca();
                    };

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        configuracaoService.salva($scope.configuracao, function(configuracao){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $scope.carrega();
                        });
                    };

                    $scope.carrega();
                }
            }
        }
    });         
}]);
        