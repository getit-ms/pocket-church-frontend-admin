calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('boletim', {
        parent: 'home',
        url: 'boletim/',
        data:{
            displayName: 'boletim.boletins',
            permissions:{
                only: ['MANTER_BOLETINS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/boletim/boletim.list.html',
                controller: function(boletimService, $scope, $state, message, confirmExclusao, NgTableParamsCalvin){
                    $scope.tabelaBoletins = new NgTableParamsCalvin(function($defer, params){
                        boletimService.busca({
                            pagina: params.parameters().page,
                            total: params.parameters().count,
                            tipo: 'BOLETIM'
                        }, function(boletins){
                            $scope.boletins = boletins;
                            params.total(boletins.totalResultados);
                            $defer.resolve(boletins.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelaBoletins.reload();
                    };

                    $scope.detalhar = function(boletim){
                        $state.go('boletim.view', {id: boletim.id});
                    };

                    $scope.editar = function(boletim){
                        $state.go('boletim.edicao', {id: boletim.id});
                    };

                    $scope.excluir = function(boletim){
                        confirmExclusao('boletim', boletim.titulo, function(){
                            boletimService.remove(boletim.id, function(boletim){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('boletim.cadastro', {
        parent: 'boletim',
        url: 'novo/',
        data:{
            displayName: 'boletim.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/boletim/boletim.form.html',
                controller: function(boletimService, $scope, $state, message){
                    $scope.boletim = {tipo:'BOLETIM'};
                    
                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        boletimService.cadastra($scope.boletim, function(boletim){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('boletim');
                        });
                    };
                }
            }
        }
    }).state('boletim.edicao', {
        parent: 'boletim',
        url: ':id/',
        data:{
            displayName: 'boletim.editar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/boletim/boletim.form.html',
                controller: function(boletimService, $scope, message, boletim, $state){
                    $scope.boletim = boletim;

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        boletimService.atualiza(this.boletim, function(boletim){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('boletim');
                        });
                    };
                },
                resolve: {
                    boletim: function(boletimService, $stateParams){
                        return boletimService.carrega($stateParams.id);
                    }
                }
            }
        }
    }).state('boletim.view', {
        parent: 'boletim',
        url: ':id/view/',
        data:{
            displayName: 'boletim.detalhar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/boletim/boletim.detail.html',
                controller: function(boletim, $scope){
                    $scope.boletim = boletim;
                    $scope.headers = 'Dispositivo=' + $_clientKey + '&Igreja=' + $_serverCode + '&Authorization=' + localStorage.getItem('Authorization.' + $_serverCode);
                },
                resolve: {
                    boletim: function(boletimService, $stateParams){
                        return boletimService.carrega($stateParams.id);
                    }
                }
            }
        }
    });         
}]);
        