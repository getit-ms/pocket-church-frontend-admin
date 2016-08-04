calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('ministerio', {
        parent: 'home',
        url: 'ministerio/',
        data:{
            displayName: 'ministerio.ministerios',
            permissions:{
                only: ['MANTER_MINISTERIOS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/ministerio/ministerio.list.html',
                controller: function(ministerioService, $state, $scope, message, confirmExclusao){
                    $scope.busca = function(){
                        $scope.ministerios = ministerioService.busca();
                    };

                    $scope.editar = function(ministerio){
                        $state.go('ministerio.edicao', {id: ministerio.id});
                    };

                    $scope.detalhar = function(ministerio){
                        $state.go('ministerio.view', {id: ministerio.id});
                    };

                    $scope.excluir = function(ministerio){
                        confirmExclusao('ministerio', ministerio.nome, function(){
                            ministerioService.remove(ministerio.id, function(ministerio){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('ministerio.cadastro', {
        parent: 'ministerio',
        url: 'novo/',
        data:{
            displayName: 'ministerio.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/ministerio/ministerio.form.html',
                controller: function(ministerioService, $state, message, $scope, message){
                    $scope.ministerio = {};

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        ministerioService.cadastra($scope.ministerio, function(ministerio){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('ministerio');
                        });
                    };
                }
            }
        }
    }).state('ministerio.edicao', {
        parent: 'ministerio',
        url: ':id/',
        data:{
            displayName: 'ministerio.editar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/ministerio/ministerio.form.html',
                controller: function(ministerioService, ministerio, $state, $scope, message){
                    $scope.ministerio = ministerio;

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        ministerioService.atualiza($scope.ministerio, function(ministerio){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('ministerio');
                        });
                    };
                },
                resolve: {
                    ministerio: function(ministerioService, $stateParams){
                        return ministerioService.carrega($stateParams.id);
                    }
                }
            }
        }
    }).state('ministerio.view', {
        parent: 'ministerio',
        url: ':id/view/',
        data:{
            displayName: 'ministerio.detalhar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/ministerio/ministerio.detail.html',
                controller: function(ministerio, $scope){
                    $scope.ministerio = ministerio;
                },
                resolve: {
                    ministerio: function(ministerioService, $stateParams){
                        return ministerioService.carrega($stateParams.id);
                    }
                }
            }
        }
    });         
}]);