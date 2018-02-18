calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('publicacao', {
        parent: 'home',
        url: 'publicacao/',
        data:{
            displayName: 'publicacao.publicacoes',
            permissions:{
                only: ['MANTER_BOLETINS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/publicacao/publicacao.list.html',
                controller: function(boletimService, $scope, $state, message, confirmExclusao, NgTableParamsCalvin){
                    $scope.tabelaBoletins = new NgTableParamsCalvin(function($defer, params){
                        boletimService.busca({
                            pagina: params.parameters().page,
                            total: params.parameters().count,
                            tipo: 'PUBLICACAO'
                        }, function(publicacoes){
                            $scope.publicacoes = publicacoes;
                            params.total(publicacoes.totalResultados);
                            $defer.resolve(publicacoes.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelaBoletins.reload();
                    };

                    $scope.detalhar = function(publicacao){
                        $state.go('publicacao.view', {id: publicacao.id});
                    };

                    $scope.editar = function(publicacao){
                        $state.go('publicacao.edicao', {id: publicacao.id});
                    };

                    $scope.excluir = function(publicacao){
                        confirmExclusao('publicacao', publicacao.publicacao.nome, function(){
                            boletimService.remove(publicacao.id, function(publicacao){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('publicacao.cadastro', {
        parent: 'publicacao',
        url: 'novo/',
        data:{
            displayName: 'publicacao.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/publicacao/publicacao.form.html',
                controller: function(boletimService, $scope, $state, message){
                    $scope.publicacao = {tipo:'PUBLICACAO'};
                    
                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        boletimService.cadastra($scope.publicacao, function(publicacao){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('publicacao');
                        });
                    };
                }
            }
        }
    }).state('publicacao.edicao', {
        parent: 'publicacao',
        url: ':id/',
        data:{
            displayName: 'publicacao.editar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/publicacao/publicacao.form.html',
                controller: function(boletimService, $scope, message, publicacao, $state){
                    $scope.publicacao = publicacao;

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        boletimService.atualiza(this.publicacao, function(publicacao){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('publicacao');
                        });
                    };
                },
                resolve: {
                    publicacao: function(boletimService, $stateParams){
                        return boletimService.carrega($stateParams.id);
                    }
                }
            }
        }
    }).state('publicacao.view', {
        parent: 'publicacao',
        url: ':id/view/',
        data:{
            displayName: 'publicacao.detalhar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/publicacao/publicacao.detail.html',
                controller: function(publicacao, $scope){
                    $scope.publicacao = publicacao;
                    $scope.headers = 'Dispositivo=' + $_clientKey + '&Igreja=' + $_serverCode + '&Authorization=' + localStorage.getItem('Authorization.' + $_serverCode);
                },
                resolve: {
                    publicacao: function(boletimService, $stateParams){
                        return boletimService.carrega($stateParams.id);
                    }
                }
            }
        }
    });         
}]);
        