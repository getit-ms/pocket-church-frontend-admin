calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('classificados', {
        parent: 'home',
        url: 'classificados/',
        data:{
            displayName: 'classificados.classificados',
            permissions:{
                only: ['MANTER_CLASSIFICADOS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/classificados/classificados.list.html',
                controller: function(noticiaService, $state, $scope, message, confirmExclusao, NgTableParamsCalvin){
                    
                    $scope.tabelaNoticias = new NgTableParamsCalvin(function($defer, params){
                        noticiaService.busca({
                            tipo: 'CLASSIFICADOS',
                            pagina: params.parameters().page,
                            total: params.parameters().count
                        }, function(classificados){
                            $scope.classificados = classificados;
                            params.total(classificados.totalResultados);
                            $defer.resolve(classificados.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelaNoticias.reload();
                    };

                    $scope.detalhar = function(classificados){
                        $state.go('classificados.view', {id: classificados.id});
                    };

                    $scope.editar = function(classificados){
                        $state.go('classificados.edicao', {id: classificados.id});
                    };

                    $scope.excluir = function(classificados){
                        confirmExclusao('classificados', classificados.titulo, function(){
                            noticiaService.remove(classificados.id, function(classificados){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('classificados.cadastro', {
        parent: 'classificados',
        url: 'novo/',
        data:{
            displayName: 'classificados.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/classificados/classificados.form.html',
                controller: function(noticiaService, message, $scope, $filter, $state, modalService){
                    $scope.classificados = {tipo:'CLASSIFICADOS'};

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error', body:'mensagens.MSG-002'});
                            return;
                        }

                        noticiaService.cadastra($scope.classificados, function(classificados){
                            message({type:'success', body:'mensagens.MSG-001'});
                            $state.go('classificados');
                        });
                    };
                }
            }
        }
    }).state('classificados.edicao', {
        parent: 'classificados',
        url: ':id/',
        data:{
            displayName: 'classificados.editar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/classificados/classificados.form.html',
                controller: function(noticiaService, $scope, message, $state, $filter, classificados, modalService){
                    $scope.classificados = classificados;

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        noticiaService.atualiza($scope.classificados, function(classificados){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('classificados');
                        });
                    };
                },
                resolve: {
                    classificados: function(noticiaService, $stateParams){
                        return noticiaService.carrega($stateParams.id);
                    }
                }
            }
        }
    }).state('classificados.view', {
        parent: 'classificados',
        url: '/:id/view',
        data:{
            displayName: 'classificados.detalhar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/classificados/classificados.detail.html',
                controller: function(classificados, $scope){
                    $scope.classificados = classificados;
                },
                resolve: {
                    classificados: function($stateParams, noticiaService){
                        return noticiaService.carrega($stateParams.id);
                    }
                }
            }
        }
    });         
}]);
        