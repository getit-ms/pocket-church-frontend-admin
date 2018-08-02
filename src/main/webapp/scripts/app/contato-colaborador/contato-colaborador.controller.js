calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('contato_colaborador', {
        parent: 'home',
        url: 'contato-colaborador/',
        data:{
            displayName: 'contato_colaborador.contatos_colaborador',
            permissions:{
                only: ['CONSULTAR_CONTATOS_COLABORADOR'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/contato-colaborador/contato-colaborador.list.html',
                controller: function($scope, contatoColaboradorService, $state, message, confirmDialog, NgTableParamsCalvin){
                    $scope.filtro = {};
                    $scope.status = contatoColaboradorService.buscaStatus();
                    
                    $scope.tabelaOracoesParams = new NgTableParamsCalvin(function($defer, params){
                        $scope.filtro.pagina = params.parameters().page;
                        $scope.filtro.total = params.parameters().count;
                        contatoColaboradorService.busca($scope.filtro, function(contatosColaborador){
                            $scope.contatosColaborador = contatosColaborador;
                            params.total(contatosColaborador.totalResultados);
                            $defer.resolve(contatosColaborador.resultados);
                        });
                    });

                    $scope.busca = function(){
                        $scope.tabelaOracoesParams.reload();
                    };
                    
                    $scope.atendido = function(pedido){
                        confirmDialog({title:'contato_colaborador.confirmacao_atendimento',text:'mensagens.MSG-017',ok:'global.sim',cancel:'global.nao'}).then(function(){
                            contatoColaboradorService.atende(pedido.id, function(){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    });         
}]);
        