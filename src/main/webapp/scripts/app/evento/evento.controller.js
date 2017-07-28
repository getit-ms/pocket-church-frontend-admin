calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('evento', {
        parent: 'home',
        url: 'evento/',
        data:{
            displayName: 'evento.eventos',
            permissions:{
                only: ['MANTER_EVENTOS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/evento/evento.list.html',
                controller: function(eventoService, $scope, $state, message, confirmExclusao, NgTableParamsCalvin){
                    $scope.filtro = {tipo:'EVENTO'};

                    $scope.headers = 'Dispositivo=' + $_clientKey + '&Igreja=' + $_serverCode + '&Authorization=' + localStorage.getItem('Authorization.' + $_serverCode);

                    $scope.tabelaEventos = new NgTableParamsCalvin(function($defer, params){
                        $scope.filtro.pagina = params.parameters().page;
                        $scope.filtro.total = params.parameters().count;
                        eventoService.busca($scope.filtro, function(eventos){
                            $scope.eventos = eventos;
                            params.total(eventos.totalResultados);
                            $defer.resolve(eventos.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelaEventos.reload();
                    };

                    $scope.detalhar = function(evento){
                        $state.go('evento.view', {id: evento.id});
                    };

                    $scope.copiar = function(evento){
                        $state.go('evento.copy', {id: evento.id});
                    };

                    $scope.editar = function(evento){
                        $state.go('evento.edicao', {id: evento.id});
                    };

                    $scope.inscritos = function(evento){
                        $state.go('evento.inscricoes', {id: evento.id});
                    };

                    $scope.inscricao = function(evento){
                        $state.go('evento.inscricao', {id: evento.id});
                    };

                    $scope.excluir = function(evento){
                        confirmExclusao('evento', evento.nome, function(){
                            eventoService.remove(evento.id, function(evento){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('evento.cadastro', {
        parent: 'evento',
        url: 'novo/',
        data:{
            displayName: 'evento.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/evento/evento.form.html',
                controller: function(eventoService, $scope, $state, message){
                    $scope.evento = {tipo:'EVENTO'};
                    
                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        eventoService.cadastra($scope.evento, function(evento){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('evento');
                        });
                    };
                }
            }
        }
    }).state('evento.edicao', {
        parent: 'evento',
        url: ':id/',
        data:{
            displayName: 'evento.editar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/evento/evento.form.html',
                controller: ['eventoService', '$scope', 'message', '$state', 'evento', function(eventoService, $scope, message, $state, evento){
                    $scope.evento = evento;

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        eventoService.atualiza($scope.evento, function(evento){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('evento');
                        });
                    };
                }],
                resolve:{
                    evento: ['eventoService', '$stateParams', function(eventoService, $stateParams){
                        return eventoService.carrega($stateParams.id).$object;
                    }]
                }
            }
        }
    }).state('evento.copy', {
        parent: 'evento',
        url: ':id/copy/',
        data:{
            displayName: 'evento.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/evento/evento.form.html',
                controller: ['eventoService', '$scope', 'message', '$state', '$stateParams', 
                            function(eventoService, $scope, message, $state, $stateParams){
                    eventoService.carrega($stateParams.id).then(function(evento){
                        $scope.evento = evento;
                        $scope.evento.id = undefined;
                    });

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        eventoService.cadastra($scope.evento, function(evento){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('evento');
                        });
                    };
                }]
            }
        }
    }).state('evento.view', {
        parent: 'evento',
        url: ':id/view/',
        data:{
            displayName: 'evento.detalhar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/evento/evento.detail.html',
                controller: ['$scope', 'evento', function($scope, evento){
                    $scope.evento = evento;
                }],
                resolve: {
                    evento: ['eventoService', '$stateParams', function(eventoService, $stateParams){
                        return eventoService.carrega($stateParams.id).$object;
                    }]
                }
            }
        }
    }).state('evento.inscricoes', {
        parent: 'evento',
        url: ':id/inscricoes/',
        data:{
            displayName: 'evento.inscricoes'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/evento/inscritos.list.html',
                controller: function(evento, eventoService, $scope, message, NgTableParamsCalvin, $stateParams, confirmDialog){
                    $scope.filtro = {};

                    $scope.evento = evento;

                    $scope.inscricao = {}

                    $scope.inscrever = function(form) {
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }

                        eventoService.inscricao($scope.evento.id, [$scope.inscricao], function(){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('evento');
                        });
                    };

                    $scope.headers = 'Dispositivo=' + $_clientKey + '&Igreja=' + $_serverCode + '&Authorization=' + localStorage.getItem('Authorization.' + $_serverCode);
                    
                    $scope.tabelaInscricoes = new NgTableParamsCalvin(function($defer, params){
                        $scope.filtro.pagina = params.parameters().page;
                        $scope.filtro.total = params.parameters().count;
                        eventoService.buscaInscricoes($stateParams.id, $scope.filtro, function(inscricoes){
                            $scope.inscricoes = inscricoes.resultados;
                            params.total(inscricoes.totalResultados);
                            $defer.resolve(inscricoes.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelaInscricoes.reload();
                    };
                    
                    $scope.cancelar = function(inscricao){
                        confirmDialog({
                            title:'evento.cancelamento_inscricao',
                            text:'mensagens.MSG-045',
                            ok:'global.sim',
                            cancel:'global.nao',
                            params:{
                                inscrito: inscricao.nomeInscrito
                            }
                        }).then(function(){
                            eventoService.cancelaInscricao($stateParams.id, inscricao.id, function(inscricao){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };
                    
                    $scope.confirmar = function(inscricao){
                        eventoService.confirmaInscricao($stateParams.id, inscricao.id, function(inscricao){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $scope.busca();
                        });
                    };
                    
                    $scope.cancelar = function(inscricao){
                        confirmDialog({
                            title:'evento.cancelamento_inscricao',
                            text:'mensagens.MSG-045',
                            ok:'global.sim',
                            cancel:'global.nao',
                            params:{
                                inscrito: inscricao.nomeInscrito
                            }
                        }).then(function(){
                            eventoService.cancelaInscricao($stateParams.id, inscricao.id, function(inscricao){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };
                },
                resolve:{
                    evento: ['eventoService', '$stateParams', function(eventoService, $stateParams){
                        return eventoService.carrega($stateParams.id).$object;
                    }]
                }
            }
        }
    });         
}]);
        