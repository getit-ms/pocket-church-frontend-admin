calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('calendario', {
        parent: 'home',
        url: 'calendario/?code',
        data:{
            displayName: 'calendario.configuracoes',
            permissions:{
                only: ['CONFIGURAR_GOOGLE_CALENDAR'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/calendario/calendario.form.html',
                controller: function(calendarioService, message, $scope, $state, $stateParams, confirmDialog){
                    $scope.carrega = function(){

                        calendarioService.configuracao(function(calendario){
                            $scope.calendario = calendario;

                            calendarioService.busca({tamanho:10}, function(eventos){
                                $scope.eventos = eventos;
                            });

                            calendarioService.buscaVisoes(function(visoes) {
                                $scope.visoes = visoes;
                            })
                        });

                    };

                    $scope.vincularConta = function(){
                        calendarioService.url(function(response){
                            location.href = response.url;
                        });
                    };

                    $scope.desvincularConta = function(){
                        confirmDialog({
                            title:'calendario.desativar_integracao',
                            text:'mensagens.MSG-050',
                            ok:'global.sim',
                            cancel:'global.nao'
                        }).then(function(){
                            calendarioService.disable(function(){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.carrega();
                            });
                        });
                    };

                    $scope.salvar = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'});
                            return;
                        }
                        
                        calendarioService.salva($scope.calendario, function(configuracao){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $scope.carrega();
                        });
                    };

                    if ($stateParams.code){
                        var code = $stateParams.code;
                        if (code.indexOf('%') >= 0){
                            code = decodeURIComponent(code);
                        }

                        if (!$scope.$parent[code]){
                            $scope.$parent[code] = true;
                            calendarioService.inicia(code, function(){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $state.go('calendario', {}, {reload:true});
                            });
                        }
                    }

                    $scope.carrega();
                }
            }
        }
    });         
}]);
        