calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('documento', {
        parent: 'home',
        url: 'documento/',
        data:{
            displayName: 'documento.documentos',
            permissions:{
                only: ['MANTER_DOCUMENTOS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/documento/documento.list.html',
                controller: function(documentoService, $state, $scope, message, confirmExclusao, NgTableParamsCalvin){
                    
                    $scope.tabelaDocumentos = new NgTableParamsCalvin(function($defer, params){
                        documentoService.busca({
                            pagina: params.parameters().page,
                            total: params.parameters().count
                        }, function(documentos){
                            $scope.documentos = documentos;
                            params.total(documentos.totalResultados);
                            $defer.resolve(documentos.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelaDocumentos.reload();
                    };

                    $scope.detalhar = function(documento){
                        $state.go('documento.view', {id: documento.id});
                    };

                    $scope.editar = function(documento){
                        $state.go('documento.edicao', {id: documento.id});
                    };

                    $scope.excluir = function(documento){
                        confirmExclusao('documento', documento.titulo, function(){
                            documentoService.remove(documento.id, function(documento){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('documento.cadastro', {
        parent: 'documento',
        url: 'novo/',
        data:{
            displayName: 'documento.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/documento/documento.form.html',
                controller: function(documentoService, message, $scope, $filter, $state, modalService){
                    $scope.documento = {autor:$scope.acesso.usuario.nome};

                    $scope.buscaCategorias = function() {
                        documentoService.buscaCategorias(function(categorias) {
                            $scope.categorias = categorias;
                        });
                    };

                    $scope.cadastrarCategoria = function() {
                        $scope.modalInstance = modalService.prepare($scope, {
                            title: $filter('translate')('documento.cadastrar_categoria_documento'),
                            controller: 'ModalCategoriaDocumento',
                            templateUrl: 'scripts/app/documento/modal/categoria.form.html',
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

                        documentoService.cadastra($scope.documento, function(documento){
                            message({type:'success', body:'mensagens.MSG-001'});
                            $state.go('documento');
                        });
                    };

                    $scope.buscaCategorias();
                }
            }
        }
    }).state('documento.edicao', {
        parent: 'documento',
        url: ':id/',
        data:{
            displayName: 'documento.editar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/documento/documento.form.html',
                controller: function(documentoService, $scope, message, $state, $filter, documento, modalService){
                    $scope.documento = documento;

                    $scope.buscaCategorias = function() {
                        documentoService.buscaCategorias(function(categorias) {
                            $scope.categorias = categorias;
                        });
                    };

                    $scope.cadastrarCategoria = function() {
                        $scope.modalInstance = modalService.prepare($scope, {
                            title: $filter('translate')('documento.cadastrar_categoria_documento'),
                            controller: 'ModalCategoriaDocumento',
                            templateUrl: 'scripts/app/documento/modal/categoria.form.html',
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
                        
                        documentoService.atualiza($scope.documento, function(documento){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('documento');
                        });
                    };

                    $scope.buscaCategorias();
                },
                resolve: {
                    documento: function(documentoService, $stateParams){
                        return documentoService.carrega($stateParams.id);
                    }
                }
            }
        }
    }).state('documento.view', {
        parent: 'documento',
        url: '/:id/view',
        data:{
            displayName: 'documento.detalhar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/documento/documento.detail.html',
                controller: function(documento, $scope){
                    $scope.documento = documento;
                },
                resolve: {
                    documento: function($stateParams, documentoService){
                        return documentoService.carrega($stateParams.id);
                    }
                }
            }
        }
    });         
}]).controller('ModalCategoriaDocumento', ['$scope', 'documentoService', 'callback', function($scope, documentoService, callback){

    $scope.categoria = {};

    $scope.submitForm = function() {
        if (!$scope.categoria.nome){
            message({type:'error', body:'mensagens.MSG-002'});
            return;
        }

        documentoService.cadastraCategoria($scope.categoria, function(){
            callback();
            $scope.modalInstance.close();
        });
    }

}]);
        