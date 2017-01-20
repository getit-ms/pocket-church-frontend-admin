calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('ebd', {
        parent: 'home',
        url: 'ebd/',
        data:{
            displayName: 'ebd.ebds',
            permissions:{
                only: ['MANTER_EBDS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/ebd/ebd.list.html',
                controller: function(ebdService, $scope, $state, message, confirmExclusao, NgTableParamsCalvin){
                    $scope.filtro = {};
                    
                    $scope.tabelaEBDs = new NgTableParamsCalvin(function($defer, params){
                        $scope.filtro.pagina = params.parameters().page;
                        $scope.filtro.total = params.parameters().count;
                        ebdService.busca($scope.filtro, function(ebds){
                            $scope.ebds = ebds;
                            params.total(ebds.totalResultados);
                            $defer.resolve(ebds.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelaEBDs.reload();
                    };

                    $scope.detalhar = function(ebd){
                        $state.go('ebd.view', {id: ebd.id});
                    };

                    $scope.editar = function(ebd){
                        $state.go('ebd.edicao', {id: ebd.id});
                    };

                    $scope.inscritos = function(ebd){
                        $state.go('ebd.inscricoes', {id: ebd.id});
                    };

                    $scope.excluir = function(ebd){
                        confirmExclusao('ebd', ebd.nome, function(){
                            ebdService.remove(ebd.id, function(ebd){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('ebd.cadastro', {
        parent: 'ebd',
        url: 'novo/',
        data:{
            displayName: 'ebd.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/ebd/ebd.form.html',
                controller: function(ebdService, $scope, $state, message){
                    $scope.ebd = {};
                    
                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        ebdService.cadastra($scope.ebd, function(ebd){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('ebd');
                        });
                    };
                }
            }
        }
    }).state('ebd.edicao', {
        parent: 'ebd',
        url: ':id/',
        data:{
            displayName: 'ebd.editar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/ebd/ebd.form.html',
                controller: ['ebdService', '$scope', 'message', '$state', 'ebd', function(ebdService, $scope, message, $state, ebd){
                    $scope.ebd = ebd;

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        ebdService.atualiza($scope.ebd, function(ebd){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('ebd');
                        });
                    };
                }],
                resolve:{
                    ebd: ['ebdService', '$stateParams', function(ebdService, $stateParams){
                        return ebdService.carrega($stateParams.id);
                    }]
                }
            }
        }
    }).state('ebd.view', {
        parent: 'ebd',
        url: ':id/view/',
        data:{
            displayName: 'ebd.detalhar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/ebd/ebd.detail.html',
                controller: ['$scope', 'ebd', function($scope, ebd){
                    $scope.ebd = ebd;
                }],
                resolve: {
                    ebd: ['ebdService', '$stateParams', function(ebdService, $stateParams){
                        return ebdService.carrega($stateParams.id);
                    }]
                }
            }
        }
    }).state('ebd.inscricoes', {
        parent: 'ebd',
        url: ':id/inscricoes/',
        data:{
            displayName: 'ebd.inscricoes'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/ebd/inscritos.list.html',
                controller: function(ebd, ebdService, $scope, message, NgTableParamsCalvin, $stateParams, confirmDialog){
                    $scope.filtro = {};

                    $scope.ebd = ebd;

                    $scope.headers = 'Dispositivo=' + $_clientKey + '&Igreja=' + $_serverCode + '&Authorization=' + localStorage.getItem('Authorization.' + $_serverCode);
                    
                    $scope.tabelaInscricoes = new NgTableParamsCalvin(function($defer, params){
                        $scope.filtro.pagina = params.parameters().page;
                        $scope.filtro.total = params.parameters().count;
                        ebdService.buscaInscricoes($stateParams.id, $scope.filtro, function(inscricoes){
                            $scope.inscricoes = inscricoes.resultados;
                            params.total(inscricoes.totalResultados);
                            $defer.resolve(inscricoes.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelaInscricoes.reload();
                    };
                    
                    $scope.confirmar = function(inscricao){
                        ebdService.confirmaInscricao($stateParams.id, inscricao.id, function(inscricao){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $scope.busca();
                        });
                    };
                    
                    $scope.cancelar = function(inscricao){
                        confirmDialog({
                            title:'ebd.cancelamento_inscricao',
                            text:'mensagens.MSG-045',
                            ok:'global.sim',
                            cancel:'global.nao',
                            params:{
                                inscrito: inscricao.nomeInscrito
                            }
                        }).then(function(){
                            ebdService.cancelaInscricao($stateParams.id, inscricao.id, function(inscricao){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };
                },
                resolve:{
                    ebd: ['ebdService', '$stateParams', function(ebdService, $stateParams){
                        return ebdService.carrega($stateParams.id);
                    }]
                }
            }
        }
    });         
}]);
        