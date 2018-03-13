calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('cantico', {
        parent: 'home',
        url: 'cantico/',
        data:{
            displayName: 'cantico.canticos',
            permissions:{
                only: ['MANTER_CANTICOS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/cantico/cantico.list.html',
                controller: function(cifraService, $scope, $state, message, confirmExclusao, NgTableParamsCalvin){
                    $scope.tabelaCanticos = new NgTableParamsCalvin(function($defer, params){
                        cifraService.busca({
                            tipo: 'CANTICO',
                            pagina: params.parameters().page,
                            total: params.parameters().count
                        }, function(canticos){
                            $scope.canticos = canticos;
                            params.total(canticos.totalResultados);
                            $defer.resolve(canticos.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelaCanticos.reload();
                    };

                    $scope.detalhar = function(cantico){
                        $state.go('cantico.view', {id: cantico.id});
                    };

                    $scope.editar = function(cantico){
                        $state.go('cantico.edicao', {id: cantico.id});
                    };

                    $scope.excluir = function(cantico){
                        confirmExclusao('cantico', cantico.titulo, function(){
                            cifraService.remove(cantico.id, function(cantico){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('cantico.cadastro', {
        parent: 'cantico',
        url: 'novo/',
        data:{
            displayName: 'cantico.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/cantico/cantico.form.html',
                controller: function(cifraService, $scope, $state, message){
                    $scope.cantico = {tipo:'CANTICO'};
                    
                    $scope.carregaLetra = function(arquivo){
                        if (!$scope.formulario_cantico.letra.$dirty){
                            $scope.formulario_cantico.letra.disabled = true;
                            cifraService.letra(arquivo.id, function(cantico){
                                $scope.cantico.letra = cantico.letra;
                                $scope.formulario_cantico.letra.disabled = false;
                            }, function(){
                                $scope.formulario_cantico.letra.disabled = false;
                            });
                        }
                    };
                    
                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        cifraService.cadastra($scope.cantico, function(cantico){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('cantico');
                        });
                    };
                }
            }
        }
    }).state('cantico.edicao', {
        parent: 'cantico',
        url: ':id/',
        data:{
            displayName: 'cantico.editar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/cantico/cantico.form.html',
                controller: function(cifraService, $scope, message, cantico, $state){
                    $scope.cantico = cantico;

                    $scope.carregaLetra = function(arquivo){
                        if (!$scope.formulario_cantico.letra.$dirty){
                            $scope.formulario_cantico.letra.disabled = true;
                            cifraService.letra(arquivo.id, function(cantico){
                                $scope.cantico.letra = cantico.letra;
                                $scope.formulario_cantico.letra.disabled = false;
                            }, function(){
                                $scope.formulario_cantico.letra.disabled = false;
                            });
                        }
                    };
                    
                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        cifraService.atualiza(this.cantico, function(cantico){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('cantico');
                        });
                    };
                },
                resolve: {
                    cantico: function(cifraService, $stateParams){
                        return cifraService.carrega($stateParams.id);
                    }
                }
            }
        }
    }).state('cantico.view', {
        parent: 'cantico',
        url: ':id/view/',
        data:{
            displayName: 'cantico.detalhar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/cantico/cantico.detail.html',
                controller: function(cantico, $scope){
                    $scope.cantico = cantico;
                    $scope.headers = 'Dispositivo=' + $_clientKey + '&Igreja=' + $_serverCode + '&Authorization=' + localStorage.getItem('Authorization.' + $_serverCode);
                },
                resolve: {
                    cantico: function(cifraService, $stateParams){
                        return cifraService.carrega($stateParams.id);
                    }
                }
            }
        }
    });         
}]);
        