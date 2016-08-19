calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('notificacao', {
        parent: 'home',
        url: 'notificacao/',
        data:{
            displayName: 'notificacao.notificacoes',
            permissions:{
                only: ['ENVIAR_NOTIFICACOES'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/notificacao/notificacao.form.html',
                controller: function(ministerioService, notificacaoService, message, $scope, $state, confirmDialog){
                    $scope.ministerios = ministerioService.buscaAcessiveis();
                    
                    $scope.carrega = function(){
                        $scope.notificacao = {apenasMembros:false};
                    };

                    $scope.enviar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        confirmDialog({
                            title:'notificacao.confirmacao_envio',
                            text:'mensagens.MSG-018',
                            ok:'global.sim',
                            cancel:'global.nao'
                        }).then(function(){
                            notificacaoService.envia($scope.notificacao, function(notificacao){
                                message({type:'success',body:'mensagens.MSG-009'});
                                $scope.carrega();
                                form.$submitted = false;
                            });
                        });
                    };

                    $scope.carrega();
                }
            }
        }
    });         
}]);
        