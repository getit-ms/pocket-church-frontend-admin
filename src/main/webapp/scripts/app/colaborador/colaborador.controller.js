calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('colaborador', {
        parent: 'home',
        url: 'colaborador/',
        data:{
            displayName: 'colaborador.colaboradores',
            permissions:{
                only: ['GERENCIAR_ACESSO_COLABORADORES'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/colaborador/colaborador.list.html',
                controller: function($scope, colaboradorService, perfilService, $state, message, confirmDialog, NgTableParamsCalvin){
                    $scope.filtro = {nome:'',email:'',perfil:[]};
                    $scope.perfis = perfilService.busca();

                    $scope.tabelaColaboradores = new NgTableParamsCalvin(function($defer, params){
                        $scope.filtro.pagina = params.parameters().page;
                        $scope.filtro.total = params.parameters().count;
                        colaboradorService.busca($scope.filtro, function(colaboradores){
                            $scope.colaboradores = colaboradores;
                            params.total(colaboradores.totalResultados);
                            $defer.resolve(colaboradores.resultados);
                        });
                    });

                    $scope.busca = function(){
                        $scope.tabelaColaboradores.reload();
                    };

                    $scope.darAcessoAdm = function(colaborador){
                        $state.go('colaborador.acesso', {id: colaborador.id});
                    };

                    $scope.darAcessoColaborador = function(colaborador){
                        colaboradorService.darAcessoColaborador(colaborador.id, function(){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $scope.busca();
                        });
                    };

                    $scope.redefinirSenha = function(colaborador){
                        confirmDialog({
                            title:'colaborador.confirmacao_redefinicao_senha',
                            text:'mensagens.MSG-051',
                            ok:'global.sim',
                            cancel:'global.nao',
                            params:{
                                colaborador: colaborador.nome
                            }
                        }).then(function(){
                            colaboradorService.redefineSenha(colaborador.id, function(){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.retirarAcessoColaborador = function(colaborador){
                        confirmDialog({
                            title:'colaborador.confirmacao_retirada_acesso',
                            text:'mensagens.MSG-019',
                            ok:'global.sim',
                            cancel:'global.nao',
                            params:{
                                colaborador: colaborador.nome
                            }
                        }).then(function(){
                            colaboradorService.removeAcessoColaborador(colaborador.id, function(){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };
                    
                    $scope.retirarAcessoAdm = function(colaborador){
                        confirmDialog({
                            title:'colaborador.confirmacao_retirada_acesso',
                            text:'mensagens.MSG-024',
                            ok:'global.sim',
                            cancel:'global.nao',
                            params:{
                                colaborador: colaborador.nome
                            }
                        }).then(function(){
                            colaboradorService.removeAcessoAdmin(colaborador.id, function(){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('colaborador.acesso', {
        parent: 'colaborador',
        url: 'acesso/:id/',
        data:{
            displayName: 'colaborador.conceder_acesso'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/colaborador/acesso.form.html',
                controller: function($scope, message, colaboradorService, perfilService, $stateParams, colaborador, $state){
                    colaboradorService.carregaAcessoAdmin($stateParams.id, function(acesso){
                        $scope.acesso = acesso;
                        
                        if (!$scope.acesso){
                            $scope.acesso = {};
                        }
                        
                        $scope.acesso.colaborador = colaborador;
                    });

                    $scope.perfis = perfilService.busca();

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
                        
                        colaboradorService.atualizaAcessoAdmin($scope.acesso, function(acesso){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('colaborador');
                        });
                    };
                },
                resolve: {
                    colaborador: function($stateParams, colaboradorService){
                        return colaboradorService.carrega($stateParams.id);
                    }
                }
            }
        }
    });         
}]);
        