calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('youtube', {
        parent: 'home',
        url: 'youtube/?code',
        data:{
            displayName: 'youtube.configuracoes',
            permissions:{
                only: ['CONFIGURAR_YOUTUBE'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/youtube/youtube.form.html',
                controller: function(youtubeService, message, $scope, $stateParams, confirmDialog){
                    $scope.carrega = function(){
                        $scope.youtube = youtubeService.configuracao();
                        $scope.videos = youtubeService.busca();
                    };

                    $scope.vincularConta = function(){
                        youtubeService.url(function(response){
                            location.href = response.url;
                        });
                    };

                    $scope.desvincularConta = function(){
                        confirmDialog({
                            title:'youtube.desativar_integracao',
                            text:'mensagens.MSG-047',
                            ok:'global.sim',
                            cancel:'global.nao'
                        }).then(function(){
                            youtubeService.disable(function(){
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
                        
                        youtubeService.salva($scope.youtube, function(configuracao){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $scope.carrega();
                        });
                    };

                    if ($stateParams.code){
                        youtubeService.inicia($stateParams.code, function(){
                            message({type:'success',body:'mensagens.MSG-001'});
                            $scope.carrega(); 
                        });
                    }else{
                        $scope.carrega();
                    }
                }
            }
        }
    });         
}]);
        