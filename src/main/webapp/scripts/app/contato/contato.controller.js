calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('contato', {
        parent: 'home',
        url: 'contato/',
        data:{
            displayName: 'contato.contatos',
            permissions:{
                only: ['MANTER_MEMBROS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/contato/contato.list.html',
                controller: function($scope, membroService, perfilService, $state, message, confirmExclusao, NgTableParamsCalvin){
                    $scope.filtro = {nome:'',email:'',perfil:[]};

                    $scope.headers = 'Dispositivo=' + $_clientKey + '&Igreja=' + $_serverCode + '&Authorization=' + localStorage.getItem('Authorization.' + $_serverCode);

                    $scope.tabelaMembros = new NgTableParamsCalvin(function($defer, params){
                        $scope.filtro.pagina = params.parameters().page;
                        $scope.filtro.total = params.parameters().count;
                        membroService.busca($scope.filtro, function(membros){
                            $scope.membros = membros;
                            params.total(membros.totalResultados);
                            $defer.resolve(membros.resultados);
                        });
                    });

                    $scope.busca = function(){
                        $scope.tabelaMembros.reload();
                    };

                    $scope.detalhar = function(membro){
                        $state.go('contato.view', {id: membro.id});
                    };

                    $scope.editar = function(membro){
                        $state.go('contato.edicao', {id: membro.id});
                    };

                    $scope.remover = function(membro){
                        confirmExclusao('membro', membro.nome, function(){
                            membroService.remove(membro.id, function(){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('contato.cadastro', {
        parent: 'contato',
        url: 'novo/',
        data:{
            displayName: 'contato.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/contato/contato.form.html',
                controller: function($scope, message, membroService, $state, $scope){
                    $scope.membro = {endereco:{}};
                    
                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        membroService.cadastra($scope.membro, function(membro){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('contato');
                        });
                    };
                }
            }
        }
    }).state('contato.edicao', {
        parent: 'contato',
        url: ':id/',
        data:{
            displayName: 'contato.editar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/contato/contato.form.html',
                controller: function($scope, membroService, membro, $state, message){
                    $scope.membro = membro;

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        membroService.atualiza($scope.membro, function(membro){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('contato');
                        });
                    };
                },
                resolve: {
                    membro: function($stateParams, membroService){
                        return membroService.carrega($stateParams.id);
                    }
                }
            }
        }
    }).state('contato.view', {
        parent: 'contato',
        url: ':id/view/',
        data:{
            displayName: 'contato.detalhar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/contato/contato.detail.html',
                controller: function($scope, membro){
                    $scope.membro = membro;
                },
                resolve: {
                    membro: function($stateParams, membroService){
                        return membroService.carrega($stateParams.id);
                    }
                }
            }
        }
    });         
}]);
        