calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('estudo', {
        parent: 'home',
        url: 'estudo/',
        data:{
            displayName: 'estudo.estudos',
            permissions:{
                only: ['MANTER_ESTUDOS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/estudo/estudo.list.html',
                controller: function(estudoService, $state, $scope, message, confirmExclusao, NgTableParamsCalvin){
                    
                    $scope.tabelaEstudos = new NgTableParamsCalvin(function($defer, params){
                        estudoService.busca({
                            pagina: params.parameters().page,
                            total: params.parameters().count
                        }, function(estudos){
                            $scope.estudos = estudos;
                            params.total(estudos.totalResultados);
                            $defer.resolve(estudos.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelaEstudos.reload();
                    };

                    $scope.detalhar = function(estudo){
                        $state.go('estudo.view', {id: estudo.id});
                    };

                    $scope.editar = function(estudo){
                        $state.go('estudo.edicao', {id: estudo.id});
                    };

                    $scope.excluir = function(estudo){
                        confirmExclusao('estudo', estudo.titulo, function(){
                            estudoService.remove(estudo.id, function(estudo){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('estudo.cadastro', {
        parent: 'estudo',
        url: 'novo/',
        data:{
            displayName: 'estudo.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/estudo/estudo.form.html',
                controller: function(estudoService, message, $scope, $state){
                    $scope.estudo = {autor:$scope.acesso.usuario.nome};
                    
                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error', body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        estudoService.cadastra($scope.estudo, function(estudo){
                            message({type:'success', body:'mensagens.MSG-001'});
                            $state.go('estudo');
                        });
                    };
                }
            }
        }
    }).state('estudo.edicao', {
        parent: 'estudo',
        url: ':id/',
        data:{
            displayName: 'estudo.editar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/estudo/estudo.form.html',
                controller: function(estudoService, $scope, message, $state, estudo){
                    $scope.estudo = estudo;

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        estudoService.atualiza($scope.estudo, function(estudo){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('estudo');
                        });
                    };
                },
                resolve: {
                    estudo: function(estudoService, $stateParams){
                        return estudoService.carrega($stateParams.id);
                    }
                }
            }
        }
    }).state('estudo.view', {
        parent: 'estudo',
        url: '/:id/view',
        data:{
            displayName: 'estudo.detalhar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/estudo/estudo.detail.html',
                controller: function(estudo, $scope){
                    $scope.estudo = estudo;
                },
                resolve: {
                    estudo: function($stateParams, estudoService){
                        return estudoService.carrega($stateParams.id);
                    }
                }
            }
        }
    });         
}]);
        