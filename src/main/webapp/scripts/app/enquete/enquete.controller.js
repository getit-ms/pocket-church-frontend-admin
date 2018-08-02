calvinApp.config(['$stateProvider', function($stateProvider){
        $stateProvider.state('enquete', {
            parent: 'home',
            url: 'enquete/',
            data:{
                displayName: 'enquete.enquetes',
            permissions:{
                only: ['MANTER_ENQUETES'],
                redirectTo: 'login'
            }
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/enquete/enquete.list.html',
                    controller: function(enqueteService, $scope, message, $state, confirmExclusao, NgTableParamsCalvin){
                        $scope.filtro = {};
                        
                        $scope.tabelaVotacoes = new NgTableParamsCalvin(function($defer, params){
                            $scope.filtro.pagina = params.parameters().page;
                            $scope.filtro.total = params.parameters().count;
                            enqueteService.busca($scope.filtro, function(enquetes){
                                $scope.enquetes = enquetes;
                                params.total(enquetes.totalResultados);
                                $defer.resolve(enquetes.resultados);
                            });
                        });
                        
                        $scope.busca = function(){
                            $scope.tabelaVotacoes.reload();
                        };
                        
                        $scope.detalhar = function(enquete){
                            $state.go('enquete.view', {id: enquete.id});
                        };
                        
                        $scope.editar = function(enquete){
                            $state.go('enquete.edicao', {id: enquete.id});
                        };
                        
                        $scope.resultado = function(enquete){
                            $state.go('enquete.resultado', {id: enquete.id});
                        };
                        
                        $scope.excluir = function(enquete){
                            confirmExclusao('enquete', enquete.nome, function(){
                                enqueteService.remove(enquete.id, function(enquete){
                                    message({type:'success',body:'mensagens.MSG-001'});
                                    $scope.busca();
                                });
                            });
                        };
                        
                        $scope.busca();
                    }
                }
            }
        }).state('enquete.cadastro', {
            parent: 'enquete',
            url: 'novo/',
            data:{
                displayName: 'enquete.cadastrar'
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/enquete/enquete.form.html',
                    controller: function($scope, enqueteService, message, $state){
                        $scope.enquete = {};

                        $scope.salvar = function(form){
                            if (form.$invalid){
                                message({type:'error',body:'mensagens.MSG-002'});
                                return;
                            }
                            
                            enqueteService.cadastra($scope.enquete, function(enquete){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $state.go('enquete');
                            });
                        };
                    }
                }
            }
        }).state('enquete.edicao', {
            parent: 'enquete',
            url: ':id/',
            data:{
                displayName: 'enquete.editar'
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/enquete/enquete.form.html',
                    controller: function($scope, enqueteService, enquete, message, $state){
                        $scope.enquete = enquete;

                        $scope.salvar = function(form){
                            if (form.$invalid){
                                message({type:'error',body:'mensagens.MSG-002'});
                                return;
                            }
                            
                            enqueteService.atualiza($scope.enquete, function(enquete){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $state.go('enquete');
                            });
                        };
                    },
                    resolve: {
                        enquete: function(enqueteService, $stateParams){
                            return enqueteService.carrega($stateParams.id);
                        }
                    }
                }
            }
        }).state('enquete.view', {
            parent: 'enquete',
            url: ':id/view/',
            data:{
                displayName: 'enquete.detalhar'
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/enquete/enquete.detail.html',
                    controller: function($scope, enquete){
                        $scope.enquete = enquete;
                    },
                    resolve: {
                        enquete: function(enqueteService, $stateParams){
                            return enqueteService.carrega($stateParams.id);
                        }
                    }
                }
            }
        }).state('enquete.resultado', {
            parent: 'enquete',
            url: ':id/resultado/',
            data:{
                displayName: 'enquete.resultado'
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/enquete/enquete.resultado.html',
                    controller: function($scope, enqueteService, $stateParams){
                        $scope.enquete = enqueteService.carrega($stateParams.id);
                        $scope.headers = 'Dispositivo=' + $_clientKey + '&Empresa=' + $_serverCode + '&Authorization=' + localStorage.getItem('Authorization.' + $_serverCode);
                    }
                }
            }
        });         
    }]).controller('CrudQuestaoController', ['$scope', function($scope){
        $scope.addQuestao = function(){
            if (!$scope.enquete.questoes){
                $scope.enquete.questoes = [];
            }
            
            $scope.enquete.questoes.push({quantidadeVotos:1});
        };
        
        $scope.removeQuestao = function(questao){
            $scope.enquete.questoes.splice($scope.enquete.questoes.indexOf(questao), 1);
            if (!$scope.enquete.questoes.length){
                $scope.enquete.questoes = undefined;
            }
        };
        
        $scope.removeOpcao = function(questao, opcao){
            questao.opcoes.splice(questao.opcoes.indexOf(opcao), 1);
            if (!questao.opcoes.length){
                questao.opcoes = undefined;
            }
        };
        
        $scope.addOpcao = function(questao){
            if (!questao.opcoes){
                questao.opcoes = [];
            }
            questao.opcoes.push({});
        };
    }]);
