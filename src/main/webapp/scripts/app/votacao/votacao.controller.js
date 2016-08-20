calvinApp.config(['$stateProvider', function($stateProvider){
        $stateProvider.state('votacao', {
            parent: 'home',
            url: 'votacao/',
            data:{
                displayName: 'votacao.votacoes',
            permissions:{
                only: ['MANTER_VOTACOES'],
                redirectTo: 'login'
            }
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/votacao/votacao.list.html',
                    controller: function(votacaoService, $scope, message, $state, confirmExclusao, NgTableParamsCalvin){
                        $scope.filtro = {};
                        
                        $scope.tabelaVotacoes = new NgTableParamsCalvin(function($defer, params){
                            $scope.filtro.pagina = params.parameters().page;
                            $scope.filtro.total = params.parameters().count;
                            votacaoService.busca($scope.filtro, function(votacoes){
                                $scope.votacoes = votacoes;
                                params.total(votacoes.totalResultados);
                                $defer.resolve(votacoes.resultados);
                            });
                        });
                        
                        $scope.busca = function(){
                            $scope.tabelaVotacoes.reload();
                        };
                        
                        $scope.detalhar = function(votacao){
                            $state.go('votacao.view', {id: votacao.id});
                        };
                        
                        $scope.editar = function(votacao){
                            $state.go('votacao.edicao', {id: votacao.id});
                        };
                        
                        $scope.resultado = function(votacao){
                            $state.go('votacao.resultado', {id: votacao.id});
                        };
                        
                        $scope.excluir = function(votacao){
                            confirmExclusao('votacao', votacao.nome, function(){
                                votacaoService.remove(votacao.id, function(votacao){
                                    message({type:'success',body:'mensagens.MSG-001'});
                                    $scope.busca();
                                });
                            });
                        };
                        
                        $scope.busca();
                    }
                }
            }
        }).state('votacao.cadastro', {
            parent: 'votacao',
            url: 'novo/',
            data:{
                displayName: 'votacao.cadastrar'
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/votacao/votacao.form.html',
                    controller: function($scope, votacaoService, message, $state){
                        $scope.votacao = {};
                        
                        $scope.salvar = function(form){
                            if (form.$invalid){
                                message({type:'error',body:'mensagens.MSG-002'});
                                return;
                            }
                            
                            votacaoService.cadastra($scope.votacao, function(votacao){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $state.go('votacao');
                            });
                        };
                    }
                }
            }
        }).state('votacao.edicao', {
            parent: 'votacao',
            url: ':id/',
            data:{
                displayName: 'votacao.editar'
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/votacao/votacao.form.html',
                    controller: function($scope, votacaoService, votacao, message, $state){
                        $scope.votacao = votacao;
                        
                        $scope.salvar = function(form){
                            if (form.$invalid){
                                message({type:'error',body:'mensagens.MSG-002'});
                                return;
                            }
                            
                            votacaoService.atualiza($scope.votacao, function(votacao){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $state.go('votacao');
                            });
                        };
                    },
                    resolve: {
                        votacao: function(votacaoService, $stateParams){
                            return votacaoService.carrega($stateParams.id);
                        }
                    }
                }
            }
        }).state('votacao.view', {
            parent: 'votacao',
            url: ':id/view/',
            data:{
                displayName: 'votacao.detalhar'
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/votacao/votacao.detail.html',
                    controller: function($scope, votacao){
                        $scope.votacao = votacao;
                    },
                    resolve: {
                        votacao: function(votacaoService, $stateParams){
                            return votacaoService.carrega($stateParams.id);
                        }
                    }
                }
            }
        }).state('votacao.resultado', {
            parent: 'votacao',
            url: ':id/resultado/',
            data:{
                displayName: 'votacao.resultado'
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/votacao/votacao.resultado.html',
                    controller: function($scope, votacaoService, $stateParams){
                        $scope.votacao = votacaoService.carrega($stateParams.id);
                        $scope.headers = 'Dispositivo=' + $_clientKey + '&Igreja=' + $_serverCode + '&Authorization=' + localStorage.getItem('Authorization');
                    }
                }
            }
        });         
    }]).controller('CrudQuestaoController', ['$scope', function($scope){
        $scope.addQuestao = function(){
            if (!$scope.votacao.questoes){
                $scope.votacao.questoes = [];
            }
            
            $scope.votacao.questoes.push({});
        };
        
        $scope.removeQuestao = function(questao){
            $scope.votacao.questoes.splice($scope.votacao.questoes.indexOf(questao), 1);
            if (!$scope.votacao.questoes.length){
                $scope.votacao.questoes = undefined;
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
