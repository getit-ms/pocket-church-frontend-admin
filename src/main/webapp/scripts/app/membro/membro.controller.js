calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('membro', {
        parent: 'home',
        url: 'membro/',
        data:{
            displayName: 'membro.membros',
            permissions:{
                only: ['GERENCIAR_ACESSO_MEMBROS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/membro/membro.list.html',
                controller: function($scope, membroService, perfilService, $state, message, confirmDialog, NgTableParamsCalvin){
                    $scope.filtro = {nome:'',email:'',perfil:[]};
                    $scope.perfis = perfilService.busca();

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

                    $scope.darAcessoAdm = function(membro){
                        $state.go('membro.acesso', {id: membro.id});
                    };

                    $scope.darAcessoMembro = function(membro){
                        membroService.darAcessoMembro(membro.id, function(){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $scope.busca();
                        });
                    };
                    
                    $scope.retirarAcessoMembro = function(membro){
                        confirmDialog({
                            title:'membro.confirmacao_retirada_acesso',
                            text:'mensagens.MSG-019',
                            ok:'global.sim',
                            cancel:'global.nao',
                            params:{
                                membro: membro.nome
                            }
                        }).then(function(){
                            membroService.removeAcessoMembro(membro.id, function(){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };
                    
                    $scope.retirarAcessoAdm = function(membro){
                        confirmDialog({
                            title:'membro.confirmacao_retirada_acesso',
                            text:'mensagens.MSG-024',
                            ok:'global.sim',
                            cancel:'global.nao',
                            params:{
                                membro: membro.nome
                            }
                        }).then(function(){
                            membroService.removeAcessoAdmin(membro.id, function(){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('membro.acesso', {
        parent: 'membro',
        url: 'acesso/:id/',
        data:{
            displayName: 'membro.conceder_acesso'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/membro/acesso.form.html',
                controller: function($scope, message, membroService, perfilService, ministerioService, $stateParams, membro, $state){
                    membroService.carregaAcessoAdmin($stateParams.id, function(acesso){
                        $scope.acesso = acesso;
                        
                        if (!$scope.acesso){
                            $scope.acesso = {};
                        }
                        
                        $scope.acesso.membro = membro;
                    });

                    $scope.perfis = perfilService.busca();
                    $scope.ministerios = ministerioService.busca();

                    $scope.exigeMinisterios = function(){
                        var exige = false;
                        if ($scope.perfis.length){
                            $scope.perfis.forEach(function(perfil){
                                if (perfil.exigeMinisterios){
                                    exige = true;
                                }
                            });
                        }
                        return exige;
                    };

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        membroService.atualizaAcessoAdmin($scope.acesso, function(acesso){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('membro');
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
    });         
}]);
        