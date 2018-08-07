calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('contato', {
        parent: 'home',
        url: 'contato/',
        data:{
            displayName: 'contato.contatos',
            permissions:{
                only: ['MANTER_COLABORADORES'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/contato/contato.list.html',
                controller: function($scope, colaboradorService, perfilService, $state, message, confirmExclusao, NgTableParamsCalvin){
                    $scope.filtro = {nome:'',email:'',perfil:[]};

                    $scope.headers = 'Dispositivo=' + $_clientKey + '&Empresa=' + $_serverCode + '&Authorization=' + localStorage.getItem('Authorization.' + $_serverCode);

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

                    $scope.detalhar = function(colaborador){
                        $state.go('contato.view', {id: colaborador.id});
                    };

                    $scope.editar = function(colaborador){
                        $state.go('contato.edicao', {id: colaborador.id});
                    };

                    $scope.remover = function(colaborador){
                        confirmExclusao('colaborador', colaborador.nome, function(){
                            colaboradorService.remove(colaborador.id, function(){
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
                controller: function($scope, message, colaboradorService, $state, modalService, $filter){
                    $scope.colaborador = {endereco:{},dadosDisponiveis:true};

                    $scope.buscaLotacoes = function() {
                        colaboradorService.buscaLotacoes(function(lotacoes) {
                            $scope.lotacoes = lotacoes;
                        });
                    };

                    $scope.cadastrarLotacao = function() {
                        $scope.modalInstance = modalService.prepare($scope, {
                            title: $filter('translate')('contato.cadastrar_lotacao_colaborador'),
                            controller: 'ModalLotacaoColaborador',
                            templateUrl: 'scripts/app/contato/modal/lotacao.form.html',
                            freeForm: 'formulario_lotacao',
                            resolve: {
                                callback: function(){
                                    return function(){
                                        message({type:'success',body:'mensagens.MSG-001'});
                                        $scope.buscaLotacoes();
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
                        
                        colaboradorService.cadastra($scope.colaborador, function(colaborador){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('contato');
                        });
                    };

                    $scope.buscaLotacoes();
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
                controller: function($scope, colaboradorService, colaborador, $state, message, modalService, $filter){
                    $scope.colaborador = colaborador;

                    $scope.buscaLotacoes = function() {
                        colaboradorService.buscaLotacoes(function(lotacoes) {
                            $scope.lotacoes = lotacoes;
                        });
                    };

                    $scope.cadastrarLotacao = function() {
                        $scope.modalInstance = modalService.prepare($scope, {
                            title: $filter('translate')('contato.cadastrar_lotacao_colaborador'),
                            controller: 'ModalLotacaoColaborador',
                            templateUrl: 'scripts/app/contato/modal/lotacao.form.html',
                            freeForm: 'formulario_lotacao',
                            resolve: {
                                callback: function(){
                                    return function(){
                                        message({type:'success',body:'mensagens.MSG-001'});
                                        $scope.buscaLotacoes();
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
                        
                        colaboradorService.atualiza($scope.colaborador, function(colaborador){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $state.go('contato');
                        });
                    };

                    $scope.buscaLotacoes();
                },
                resolve: {
                    colaborador: function($stateParams, colaboradorService){
                        return colaboradorService.carrega($stateParams.id);
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
                controller: function($scope, colaborador){
                    $scope.colaborador = colaborador;
                },
                resolve: {
                    colaborador: function($stateParams, colaboradorService){
                        return colaboradorService.carrega($stateParams.id);
                    }
                }
            }
        }
    });         
}]).controller('ModalLotacaoColaborador', ['$scope', 'colaboradorService', 'callback', function($scope, colaboradorService, callback){

    $scope.lotacao = {};

    $scope.submitForm = function() {
        if (!$scope.lotacao.nome){
            message({type:'error', body:'mensagens.MSG-002'});
            return;
        }

        colaboradorService.cadastraLotacao($scope.lotacao, function(){
            callback();
            $scope.modalInstance.close();
        });
    }

}]);
        