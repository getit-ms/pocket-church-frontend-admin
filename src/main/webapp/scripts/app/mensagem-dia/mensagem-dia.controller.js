calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('mensagem_dia', {
        parent: 'home',
        url: 'mensagem-dia/',
        data:{
            displayName: 'mensagem_dia.mensagens_dia',
            permissions:{
                only: ['MANTER_MENSAGENS_DIA'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/mensagem-dia/mensagem-dia.list.html',
                controller: function(mensagemDiaService, message, $scope, confirmExclusao, NgTableParamsCalvin){
                    $scope.filtro = {};
                    
                    $scope.tabelaVersiculos = new NgTableParamsCalvin(function($defer, params){
                        $scope.filtro.pagina = params.parameters().page;
                        $scope.filtro.total = params.parameters().count;
                        mensagemDiaService.busca($scope.filtro, function(mensagensDia){
                            $scope.mensagensDia = mensagensDia;
                            params.total(mensagensDia.totalResultados);
                            $defer.resolve(mensagensDia.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelaVersiculos.reload();
                    };
                    
                    var callback = function(mensagemDia){
                        message({type:'success',body:'mensagens.MSG-001'});
                        $scope.busca();
                    };

                    $scope.habilita = function(mensagemDia){
                        mensagemDiaService.habilita(mensagemDia.id, callback);
                    };
                    
                    $scope.desabilita = function(mensagemDia){
                        mensagemDiaService.desabilita(mensagemDia.id, callback);
                    };
                    
                    $scope.excluir = function(mensagemDia){
                        confirmExclusao('mensagem_dia', mensagemDia.mensagemDia, function(){
                            mensagemDiaService.remove(mensagemDia.id, callback);
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('mensagem_dia.cadastro', {
        parent: 'mensagem_dia',
        url: 'novo/',
        data:{
            displayName: 'mensagem_dia.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/mensagem-dia/mensagem-dia.form.html',
                controller: function(mensagemDiaService, $state, $scope, message){
                    $scope.salvar = function(){
                        mensagemDiaService.cadastra($scope.mensagemDia, function(mensagemDia){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('mensagem_dia');
                        });
                    };
                }
            }
        }
    });         
}]);
        