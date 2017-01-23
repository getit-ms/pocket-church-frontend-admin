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
                controller: function(youtubeService, message, $scope, $stateParams){
                    $scope.carrega = function(){
                        $scope.youtube = youtubeService.configuracao();
                        $scope.videos = youtubeService.busca();
                    };

                    $scope.vincularConta = function(){
                        youtubeService.url(function(response){
                            location.href = response.url;
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
        