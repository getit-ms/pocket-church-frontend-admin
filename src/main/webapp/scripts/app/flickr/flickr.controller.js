calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('flickr', {
        parent: 'home',
        url: 'flickr/?code',
        data:{
            displayName: 'flickr.configuracoes',
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
                        
                        fotoService.busca(function(videos){
                            $scope.videos = videos;
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

                    if ($stateParams.code){
                        var code = $stateParams.code;
                        if (code.indexOf('%') >= 0){
                            code = decodeURIComponent(code);
                        }

                        if (!$scope.$parent[code]){
                            $scope.$parent[code] = true;
                            fotoService.inicia(code, function(){
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
        