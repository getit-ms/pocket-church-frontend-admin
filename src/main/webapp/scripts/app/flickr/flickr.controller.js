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
                controller: function(flickrService, message, $scope, $state, $stateParams, confirmDialog){
                    $scope.carrega = function(){

                        flickrService.configuracao(function(flickr){
                            $scope.flickr = flickr;
                        });
                        
                        flickrService.busca(function(videos){
                            $scope.videos = videos;
                        });
                    };

                    $scope.vincularConta = function(){
                        flickrService.url(function(response){
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
                            flickrService.disable(function(){
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
                            flickrService.inicia(code, function(){
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
        