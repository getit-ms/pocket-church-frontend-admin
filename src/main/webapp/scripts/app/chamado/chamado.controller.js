calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('chamado', {
        parent: 'home',
        url: 'chamado/',
        data:{
            displayName: 'chamado.suporte',
            permissions:{
                only: ['ABERTURA_CHAMADO_SUPORTE'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/chamado/chamado.list.html',
                controller: function(chamadoService, $scope, $state, NgTableParamsCalvin){
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

                    $scope.detalhar = function(chamado){
                        $state.go('chamado.detalhar', {id:chamado.id});
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
                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        chamadoService.cadastra($scope.chamado, function(chamado){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('chamado');
                        });
                    };
                }
            }
        }
    }).state('chamado.detalhar', {
        parent: 'chamado',
        url: ':id/',
        data:{
            displayName: 'chamado.detalhar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/chamado/chamado.detail.html',
                controller: function($scope, chamado){
                    $scope.chamado = chamado;
                },
                resolve: {
                    chamado: function($stateParams, chamadoService){
                        return chamadoService.carrega($stateParams.id);
                    }
                }
            }
        }
    });
}]);
        