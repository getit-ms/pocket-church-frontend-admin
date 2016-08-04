calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('institucional', {
        parent: 'home',
        url: 'institucional/',
        data:{
            displayName: 'institucional.dados_institucionais',
            permissions:{
                only: ['MANTER_DADOS_INSTITUCIONAIS'],
                redirectTo: 'login'
            }
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/institucional/institucional.form.html',
                controller: function(institucionalService, $scope, $rootScope, message, $cookies){
                    $scope.headers = 'Dispositivo=' + $_clientKey + '&Igreja=' + $_serverCode + '&Authorization=' + $cookies.get('Authorization');
                    
                    $scope.carrega = function(){
                        $scope.institucional = institucionalService.carrega();
                    };
                    
                    $scope.redesSociais = [
                        'facebook',
                        'twitter',
                        'youtube',
                        'pinterest',
                        'google-plus',
                        'instagram'
                    ];

                    $scope.salvar = function(form){
                        institucionalService.atualiza($scope.institucional, function(institucional){
                            $rootScope.institucional = institucional;
                            message({type:'success',body:'mensagens.MSG-001'});
                            $scope.carrega();
                        });
                    };
                    
                    $scope.removeImagem = function(){
                        $scope.institucional.divulgacao = null;
                    };

                    $scope.carrega();
                }
            }
        }
    });         
}]);
        