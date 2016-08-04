calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('oracao', {
        parent: 'home',
        url: 'oracao/',
        data:{
            displayName: 'oracao.pedidos_oracao',
            permissions:{
                only: ['CONSULTAR_PEDIDOS_ORACAO'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/oracao/oracao.list.html',
                controller: function($scope, oracaoService, $state, message, confirmDialog, NgTableParamsCalvin){
                    $scope.filtro = {};
                    $scope.status = oracaoService.buscaStatus();
                    
                    $scope.tabelaOracoesParams = new NgTableParamsCalvin(function($defer, params){
                        $scope.filtro.pagina = params.parameters().page;
                        $scope.filtro.total = params.parameters().count;
                        oracaoService.busca($scope.filtro, function(pedidos){
                            $scope.pedidos = pedidos;
                            params.total(pedidos.totalResultados);
                            $defer.resolve(pedidos.resultados);
                        });
                    });

                    $scope.busca = function(){
                        $scope.tabelaOracoesParams.reload();
                    };
                    
                    $scope.atendido = function(pedido){
                        confirmDialog({title:'oracao.confirmacao_atendimento',text:'mensagens.MSG-017',ok:'global.sim',cancel:'global.nao'}).then(function(){
                            oracaoService.atende(pedido.id, function(){
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
        