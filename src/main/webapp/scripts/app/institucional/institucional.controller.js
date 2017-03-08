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
                controller: function(institucionalService, $scope, $rootScope, message){
                    $scope.headers = 'Dispositivo=' + $_clientKey + '&Igreja=' + $_serverCode + '&Authorization=' + localStorage.getItem('Authorization.' + $_serverCode);
                    
                    $scope.carrega = function(){
                        institucionalService.carrega(function(institucional){
                            $scope.institucional = institucional;
                            
                            if (!$scope.institucional.enderecos){
                                $scope.institucional.enderecos = [];

                                if ($scope.institucional.endereco){
                                    $scope.institucional.enderecos.push($scope.institucional.endereco);
                                }
                            }

                            $scope.institucional.endereco = undefined;
                        });
                        
                    };
                    
                    $scope.addEndereco = function(){
                        $scope.institucional.enderecos.push({});
                    };
                    
                    $scope.removeEndereco = function(endereco){
                        if ($scope.institucional.enderecos.length > 1){
                            $scope.institucional.enderecos.splice($scope.institucional.enderecos.indexOf(endereco), 1);
                        }
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
        