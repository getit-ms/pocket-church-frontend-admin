calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('cifra', {
        parent: 'home',
        url: 'cifra/',
        data:{
            displayName: 'cifra.cifras',
            permissions:{
                only: ['MANTER_cifras'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/cifra/cifra.list.html',
                controller: function(cifraService, $scope, $state, message, confirmExclusao, NgTableParamsCalvin){
                    $scope.tabelacifras = new NgTableParamsCalvin(function($defer, params){
                        cifraService.busca({
                            pagina: params.parameters().page,
                            total: params.parameters().count
                        }, function(cifras){
                            $scope.cifras = cifras;
                            params.total(cifras.totalResultados);
                            $defer.resolve(cifras.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelacifras.reload();
                    };

                    $scope.detalhar = function(cifra){
                        $state.go('cifra.view', {id: cifra.id});
                    };

                    $scope.editar = function(cifra){
                        $state.go('cifra.edicao', {id: cifra.id});
                    };

                    $scope.excluir = function(cifra){
                        confirmExclusao('cifra', cifra.cifra.nome, function(){
                            cifraService.remove(cifra.id, function(cifra){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('cifra.cadastro', {
        parent: 'cifra',
        url: 'novo/',
        data:{
            displayName: 'cifra.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/cifra/cifra.form.html',
                controller: function(cifraService, $scope, $state, message){
                    $scope.cifra = {};
                    
                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        cifraService.cadastra($scope.cifra, function(cifra){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('cifra');
                        });
                    };
                }
            }
        }
    }).state('cifra.edicao', {
        parent: 'cifra',
        url: ':id/',
        data:{
            displayName: 'cifra.editar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/cifra/cifra.form.html',
                controller: function(cifraService, $scope, message, cifra, $state){
                    $scope.cifra = cifra;

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        cifraService.atualiza(this.cifra, function(cifra){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('cifra');
                        });
                    };
                },
                resolve: {
                    cifra: function(cifraService, $stateParams){
                        return cifraService.carrega($stateParams.id);
                    }
                }
            }
        }
    }).state('cifra.view', {
        parent: 'cifra',
        url: ':id/view/',
        data:{
            displayName: 'cifra.detalhar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/cifra/cifra.detail.html',
                controller: function(cifra, $scope, $cookies){
                    $scope.cifra = cifra;
                    $scope.headers = 'Dispositivo=' + $_clientKey + '&Igreja=' + $_serverCode + '&Authorization=' + $cookies.get('Authorization');
                },
                resolve: {
                    cifra: function(cifraService, $stateParams){
                        return cifraService.carrega($stateParams.id);
                    }
                }
            }
        }
    });         
}]);
        