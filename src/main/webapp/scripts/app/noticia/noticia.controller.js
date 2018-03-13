calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('noticia', {
        parent: 'home',
        url: 'noticia/',
        data:{
            displayName: 'noticia.noticias',
            permissions:{
                only: ['MANTER_NOTICIAS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/noticia/noticia.list.html',
                controller: function(noticiaService, $state, $scope, message, confirmExclusao, NgTableParamsCalvin){
                    
                    $scope.tabelaNoticias = new NgTableParamsCalvin(function($defer, params){
                        noticiaService.busca({
                            pagina: params.parameters().page,
                            total: params.parameters().count
                        }, function(noticias){
                            $scope.noticias = noticias;
                            params.total(noticias.totalResultados);
                            $defer.resolve(noticias.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelaNoticias.reload();
                    };

                    $scope.detalhar = function(noticia){
                        $state.go('noticia.view', {id: noticia.id});
                    };

                    $scope.editar = function(noticia){
                        $state.go('noticia.edicao', {id: noticia.id});
                    };

                    $scope.excluir = function(noticia){
                        confirmExclusao('noticia', noticia.titulo, function(){
                            noticiaService.remove(noticia.id, function(noticia){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('noticia.cadastro', {
        parent: 'noticia',
        url: 'novo/',
        data:{
            displayName: 'noticia.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/noticia/noticia.form.html',
                controller: function(noticiaService, message, $scope, $filter, $state, modalService){
                    $scope.noticia = {};

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error', body:'mensagens.MSG-002'});
                            return;
                        }

                        noticiaService.cadastra($scope.noticia, function(noticia){
                            message({type:'success', body:'mensagens.MSG-001'});
                            $state.go('noticia');
                        });
                    };
                }
            }
        }
    }).state('noticia.edicao', {
        parent: 'noticia',
        url: ':id/',
        data:{
            displayName: 'noticia.editar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/noticia/noticia.form.html',
                controller: function(noticiaService, $scope, message, $state, $filter, noticia, modalService){
                    $scope.noticia = noticia;

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        noticiaService.atualiza($scope.noticia, function(noticia){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('noticia');
                        });
                    };
                },
                resolve: {
                    noticia: function(noticiaService, $stateParams){
                        return noticiaService.carrega($stateParams.id);
                    }
                }
            }
        }
    }).state('noticia.view', {
        parent: 'noticia',
        url: '/:id/view',
        data:{
            displayName: 'noticia.detalhar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/noticia/noticia.detail.html',
                controller: function(noticia, $scope){
                    $scope.noticia = noticia;
                },
                resolve: {
                    noticia: function($stateParams, noticiaService){
                        return noticiaService.carrega($stateParams.id);
                    }
                }
            }
        }
    });         
}]);
        