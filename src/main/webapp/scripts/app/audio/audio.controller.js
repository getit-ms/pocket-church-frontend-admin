calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('audio', {
        parent: 'home',
        url: 'audio/',
        data:{
            displayName: 'audio.audios',
            permissions:{
                only: ['MANTER_AUDIOS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/audio/audio.list.html',
                controller: function(audioService, $state, $scope, message, confirmExclusao, NgTableParamsCalvin){
                    
                    $scope.tabelaAudios = new NgTableParamsCalvin(function($defer, params){
                        audioService.busca({
                            pagina: params.parameters().page,
                            total: params.parameters().count
                        }, function(audios){
                            $scope.audios = audios;
                            params.total(audios.totalResultados);
                            $defer.resolve(audios.resultados);
                        });
                    });
                    
                    $scope.busca = function(){
                        $scope.tabelaAudios.reload();
                    };

                    $scope.detalhar = function(audio){
                        $state.go('audio.view', {id: audio.id});
                    };

                    $scope.editar = function(audio){
                        $state.go('audio.edicao', {id: audio.id});
                    };

                    $scope.excluir = function(audio){
                        confirmExclusao('audio', audio.titulo, function(){
                            audioService.remove(audio.id, function(audio){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.busca();
                            });
                        });
                    };

                    $scope.busca();
                }
            }
        }
    }).state('audio.cadastro', {
        parent: 'audio',
        url: 'novo/',
        data:{
            displayName: 'audio.cadastrar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/audio/audio.form.html',
                controller: function(audioService, message, $scope, $filter, $state, modalService){
                    $scope.audio = {autor:$scope.acesso.usuario.nome};

                    $scope.buscaCategorias = function() {
                        audioService.buscaCategorias(function(categorias) {
                            $scope.categorias = categorias;
                        });
                    };

                    $scope.cadastrarCategoria = function() {
                        $scope.modalInstance = modalService.prepare($scope, {
                            title: $filter('translate')('audio.cadastrar_categoria_audio'),
                            controller: 'ModalCategoriaAudio',
                            templateUrl: 'scripts/app/audio/modal/categoria.form.html',
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

                        audioService.cadastra($scope.audio, function(audio){
                            message({type:'success', body:'mensagens.MSG-001'});
                            $state.go('audio');
                        });
                    };

                    $scope.buscaCategorias();
                }
            }
        }
    }).state('audio.edicao', {
        parent: 'audio',
        url: ':id/',
        data:{
            displayName: 'audio.editar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/audio/audio.form.html',
                controller: function(audioService, $scope, message, $state, $filter, audio, modalService){
                    $scope.audio = audio;

                    $scope.buscaCategorias = function() {
                        audioService.buscaCategorias(function(categorias) {
                            $scope.categorias = categorias;
                        });
                    };

                    $scope.cadastrarCategoria = function() {
                        $scope.modalInstance = modalService.prepare($scope, {
                            title: $filter('translate')('audio.cadastrar_categoria_audio'),
                            controller: 'ModalCategoriaAudio',
                            templateUrl: 'scripts/app/audio/modal/categoria.form.html',
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
                        
                        audioService.atualiza($scope.audio, function(audio){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('audio');
                        });
                    };

                    $scope.buscaCategorias();
                },
                resolve: {
                    audio: function(audioService, $stateParams){
                        return audioService.carrega($stateParams.id);
                    }
                }
            }
        }
    }).state('audio.view', {
        parent: 'audio',
        url: '/:id/view',
        data:{
            displayName: 'audio.detalhar'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/audio/audio.detail.html',
                controller: function(audio, $scope){
                    $scope.audio = audio;
                },
                resolve: {
                    audio: function($stateParams, audioService){
                        return audioService.carrega($stateParams.id);
                    }
                }
            }
        }
    });         
}]).controller('ModalCategoriaAudio', ['$scope', 'audioService', 'callback', function($scope, audioService, callback){

    $scope.categoria = {};

    $scope.submitForm = function() {
        if (!$scope.categoria.nome){
            message({type:'error', body:'mensagens.MSG-002'});
            return;
        }

        audioService.cadastraCategoria($scope.categoria, function(){
            callback();
            $scope.modalInstance.close();
        });
    }

}]);
        