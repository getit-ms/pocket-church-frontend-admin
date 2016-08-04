calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('perfil', {
        parent: 'home',
        url: 'perfil/',
        data:{
            displayName: 'perfil.perfis',
            permissions:{
                only: ['MANTER_PERFIS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                
                templateUrl: 'scripts/app/perfil/perfil.list.html',
                controller: function($scope, message, perfilService, $state, confirmExclusao){
                    $scope.busca = function(){
                        $scope.perfis = perfilService.busca();
                    };

                    $scope.detalhar = function(perfil){
                        $state.go('perfil.view', {id: perfil.id});
                    };

                    $scope.editar = function(perfil){
                        $state.go('perfil.edicao', {id: perfil.id});
                    };

                    $scope.excluir = function(perfil){
                        confirmExclusao('perfil', perfil.nome, function(){
                            perfilService.remove(perfil.id, function(perfil){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('perfil.cadastro', {
        parent: 'perfil',
        url: 'novo/',
        data:{
            displayName: 'perfil.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/perfil/perfil.form.html',
                controller: function($scope, message, perfilService, funcionalidades, $state){
                    $scope.perfil = {};

                    $scope.funcionalidades = funcionalidades;

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        perfilService.cadastra($scope.perfil, function(perfil){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('perfil');
                        });
                    };
                },
                resolve: {
                    funcionalidades: function(perfilService){
                        return perfilService.buscaFuncionalidades();
                    }
                }
            }
        }
    }).state('perfil.edicao', {
        parent: 'perfil',
        url: ':id/',
        data:{
            displayName: 'perfil.editar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/perfil/perfil.form.html',
                controller: function($scope, message, perfilService, perfil, funcionalidades, $state){
                    $scope.perfil = perfil;
                    $scope.funcionalidades = funcionalidades;
                    
                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }

                        perfilService.atualiza($scope.perfil, function(perfil){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('perfil');
                        });
                    };
                },
                resolve: {
                    perfil: function(perfilService, $stateParams){
                        return perfilService.carrega($stateParams.id);
                    },
                    funcionalidades: function(perfilService){
                        return perfilService.buscaFuncionalidades();
                    }
                }
            }
        }
    }).state('perfil.view', {
        parent: 'perfil',
        url: ':id/view/',
        data:{
            displayName: 'perfil.detalhar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/perfil/perfil.detail.html',
                controller: function($scope, perfil, funcionalidades){
                    $scope.perfil = perfil;
                    $scope.funcionalidades = funcionalidades;
                },
                resolve: {
                    perfil: function(perfilService, $stateParams){
                        return perfilService.carrega($stateParams.id);
                    },
                    funcionalidades: function(perfilService){
                        return perfilService.buscaFuncionalidades();
                    }
                }
            }
        }
    });         
}]);
        