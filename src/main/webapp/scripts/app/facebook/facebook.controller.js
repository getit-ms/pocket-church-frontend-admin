calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('facebook', {
        parent: 'home',
        url: 'facebook/?code',
        data:{
            displayName: 'facebook.configuracoes',
            permissions:{
                only: ['CONFIGURAR_GOOGLE_VIDEOS_FACEBOOK'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/facebook/facebook.form.html',
                controller: function(facebookService, message, $scope, $state, $stateParams, confirmDialog){
                    $scope.carrega = function(){

                        facebookService.configuracao(function(facebook){
                            $scope.facebook = facebook;

                            facebookService.busca({tamanho:10}, function(videos){
                                $scope.videos = videos;
                            });

                            facebookService.buscaPaginas(function(paginas) {
                                $scope.paginas = paginas;
                            })
                        });

                    };

                    $scope.vincularConta = function(){
                        facebookService.url(function(response){
                            location.href = response.url;
                        });
                    };

                    $scope.desvincularConta = function(){
                        confirmDialog({
                            title:'facebook.desativar_integracao',
                            text:'mensagens.MSG-050',
                            ok:'global.sim',
                            cancel:'global.nao'
                        }).then(function(){
                            facebookService.disable(function(){
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
                        
                        facebookService.salva($scope.facebook, function(configuracao){
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
                            facebookService.inicia(code, function(){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $state.go('facebook', {}, {reload:true});
                            });
                        }
                    }

                    $scope.carrega();
                }
            }
        }
    });         
}]);
        