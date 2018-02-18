calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('estudo', {
        parent: 'home',
        url: 'estudo/',
        data:{
            displayName: 'estudo.estudos',
            permissions:{
                only: ['MANTER_ESTUDOS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/estudo/estudo.list.html',
                controller: function(estudoService, $state, $scope, message, confirmExclusao, NgTableParamsCalvin){
                    
                    $scope.tabelaEstudos = new NgTableParamsCalvin(function($defer, params){
                        estudoService.busca({
                            pagina: params.parameters().page,
                            total: params.parameters().count
                        }, function(estudos){
                            $scope.estudos = estudos;
                            params.total(estudos.totalResultados);
                            $defer.resolve(estudos.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelaEstudos.reload();
                    };

                    $scope.detalhar = function(estudo){
                        $state.go('estudo.view', {id: estudo.id});
                    };

                    $scope.editar = function(estudo){
                        $state.go('estudo.edicao', {id: estudo.id});
                    };

                    $scope.excluir = function(estudo){
                        confirmExclusao('estudo', estudo.titulo, function(){
                            estudoService.remove(estudo.id, function(estudo){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('estudo.cadastro', {
        parent: 'estudo',
        url: 'novo/',
        data:{
            displayName: 'estudo.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/estudo/estudo.form.html',
                controller: function(estudoService, message, $scope, $filter, $state, modalService){
                    $scope.estudo = {autor:$scope.acesso.usuario.nome};

                    $scope.buscaCategorias = function() {
                        estudoService.buscaCategorias(function(categorias) {
                            $scope.categorias = categorias;
                        });
                    };

                    $scope.cadastrarCategoria = function() {
                        $scope.modalInstance = modalService.prepare($scope, {
                            title: $filter('translate')('estudo.cadastrar_categoria_estudo'),
                            controller: 'ModalCategoriaEstudo',
                            templateUrl: 'scripts/app/estudo/modal/categoria.form.html',
                            freeForm: 'formulario_categoria',
                            resolve: {
                                callback: function(){
                                    return function(){
                                        message({type:'success',body:'mensagens.MSG-001'});
                                        $scope.buscaCategorias();
                                    }
                                }
                            }
                        })();
                    };

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error', body:'mensagens.MSG-002'});
                            return;
                        }

                        estudoService.cadastra($scope.estudo, function(estudo){
                            message({type:'success', body:'mensagens.MSG-001'});
                            $state.go('estudo');
                        });
                    };

                    $scope.buscaCategorias();
                }
            }
        }
    }).state('estudo.edicao', {
        parent: 'estudo',
        url: ':id/',
        data:{
            displayName: 'estudo.editar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/estudo/estudo.form.html',
                controller: function(estudoService, $scope, message, $state, $filter, estudo){
                    $scope.estudo = estudo;

                    $scope.buscaCategorias = function() {
                        estudoService.buscaCategorias(function(categorias) {
                            $scope.categorias = categorias;
                        });
                    };

                    $scope.cadastrarCategoria = function() {
                        $scope.modalInstance = modalService.prepare($scope, {
                            title: $filter('translate')('estudo.cadastrar_categoria_estudo'),
                            controller: 'ModalCategoriaEstudo',
                            templateUrl: 'scripts/app/estudo/modal/categoria.form.html',
                            freeForm: 'formulario_categoria',
                            resolve: {
                                callback: function(){
                                    return function(){
                                        message({type:'success',body:'mensagens.MSG-001'});
                                        $scope.buscaCategorias();
                                    }
                                }
                            }
                        })();
                    };

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        estudoService.atualiza($scope.estudo, function(estudo){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('estudo');
                        });
                    };

                    $scope.buscaCategorias();
                },
                resolve: {
                    estudo: function(estudoService, $stateParams){
                        return estudoService.carrega($stateParams.id);
                    }
                }
            }
        }
    }).state('estudo.view', {
        parent: 'estudo',
        url: '/:id/view',
        data:{
            displayName: 'estudo.detalhar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/estudo/estudo.detail.html',
                controller: function(estudo, $scope){
                    $scope.estudo = estudo;
                },
                resolve: {
                    estudo: function($stateParams, estudoService){
                        return estudoService.carrega($stateParams.id);
                    }
                }
            }
        }
    });         
}]).controller('ModalCategoriaEstudo', ['$scope', 'estudoService', 'callback', function($scope, estudoService, callback){

    $scope.categoria = {};

    $scope.submitForm = function() {
        if (!$scope.categoria.nome){
            message({type:'error', body:'mensagens.MSG-002'});
            return;
        }

        estudoService.cadastraCategoria($scope.categoria, function(){
            callback();
            $scope.modalInstance.close();
        });
    }

}]);
        