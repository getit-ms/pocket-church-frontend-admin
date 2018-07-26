calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('flickr', {
        parent: 'home',
        url: 'flickr/?token&verifier',
        data:{
            displayName: 'flickr.configuracao',
            permissions:{
                only: ['CONFIGURAR_FLICKR'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/flickr/flickr.form.html',
                controller: function(fotoService, message, $scope, $state, $stateParams, confirmDialog){
                    $scope.carrega = function(){

                        fotoService.configuracao(function(flickr){
                            $scope.flickr = flickr;
                        });
                        
                        fotoService.busca(function(galerias){
                            $scope.galerias = galerias;
                        });
                    };

                    $scope.vincularConta = function(){
                        fotoService.url(function(response){
                            location.href = response.url;
                        });
                    };

                    $scope.desvincularConta = function(){
                        confirmDialog({
                            title:'flickr.desativar_integracao',
                            text:'mensagens.MSG-047',
                            ok:'global.sim',
                            cancel:'global.nao'
                        }).then(function(){
                            fotoService.disable(function(){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $scope.carrega();
                            });
                        });
                    };

                    if ($stateParams.verifier && $stateParams.token){
                        var token = $stateParams.token;
                        if (token.indexOf('%') >= 0){
                            token = decodeURIComponent(token);
                        }

                        var verifier = $stateParams.verifier;
                        if (verifier.indexOf('%') >= 0){
                            verifier = decodeURIComponent(verifier);
                        }

                        if (!$scope.$parent[token]){
                            $scope.$parent[token] = token;
                            fotoService.inicia(token, verifier, function(){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $state.go('flickr', {}, {reload:true});
                            });
                        }
                    }

                    $scope.carrega();
                }
            }
        }
    });         
}]);
        