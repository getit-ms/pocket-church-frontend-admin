calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('versiculo', {
        parent: 'home',
        url: 'versiculo/',
        data:{
            displayName: 'versiculo.versiculos',
            permissions:{
                only: ['MANTER_VERSICULOS_DIARIOS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/versiculo/versiculo.list.html',
                controller: function(versiculoService, message, $scope, confirmExclusao, NgTableParamsCalvin){
                    $scope.filtro = {};
                    
                    $scope.tabelaVersiculos = new NgTableParamsCalvin(function($defer, params){
                        $scope.filtro.pagina = params.parameters().page;
                        $scope.filtro.total = params.parameters().count;
                        versiculoService.busca($scope.filtro, function(versiculos){
                            $scope.versiculos = versiculos;
                            params.total(versiculos.totalResultados);
                            $defer.resolve(versiculos.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelaVersiculos.reload();
                    };
                    
                    var callback = function(versiculo){
                        message({type:'success',body:'mensagens.MSG-001'});
                        $scope.busca();
                    };

                    $scope.habilita = function(versiculo){
                        versiculoService.habilita(versiculo.id, callback);
                    };
                    
                    $scope.desabilita = function(versiculo){
                        versiculoService.desabilita(versiculo.id, callback);
                    };
                    
                    $scope.excluir = function(versiculo){
                        confirmExclusao('versiculo', versiculo.versiculo, function(){
                            versiculoService.remove(versiculo.id, callback);
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('versiculo.cadastro', {
        parent: 'versiculo',
        url: 'novo/',
        data:{
            displayName: 'versiculo.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/versiculo/versiculo.form.html',
                controller: function(versiculoService, $state, $scope, message){
                    $scope.salvar = function(){
                        versiculoService.cadastra($scope.versiculo, function(versiculo){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('versiculo');
                        });
                    };
                }
            }
        }
    });         
}]);
        