calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('chamado', {
        parent: 'home',
        url: 'chamado/',
        data:{
            displayName: 'chamado.chamados',
            permissions:{
                only: ['HOME'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/chamado/chamado.list.html',
                controller: function(chamadoService, $scope, NgTableParamsCalvin){
                    $scope.filtro = {};
                    
                    $scope.tabelaChamados = new NgTableParamsCalvin(function($defer, params){
                        chamadoService.busca({
                            pagina: params.parameters().page,
                            total: params.parameters().count
                    }, function(chamados){
                            $scope.chamados = chamados;
                            params.total(chamados.totalResultados);
                            $defer.resolve(chamados.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelaChamados.reload();
                    };

                    $scope.busca();
                }
            }
        }
    }).state('chamado.cadastro', {
        parent: 'chamado',
        url: 'novo/',
        data:{
            displayName: 'chamado.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/chamado/chamado.form.html',
                controller: function(chamadoService, $state, $scope, message){
                    $scope.salvar = function(){
                        chamadoService.cadastra($scope.chamado, function(chamado){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('chamado');
                        });
                    };
                }
            }
        }
    });         
}]);
        