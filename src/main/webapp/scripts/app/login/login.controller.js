calvinApp.config(['$stateProvider', function($stateProvider){
    $stateProvider.state('login', {
        parent: 'parent',
        url: '/login/',
        data:{
            displayName: 'login.autenticacao'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/login/login.form.html',
                controller: function($scope, $rootScope, $state, message, acessoService, $cookies){
                    $scope.auth = {username:'',password:''};
                    $scope.efetuarLogin = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'})
                            return;
                        }
                        
                        $rootScope.acesso = null;
                        $cookies.put('Authorization', '');
        
                        acessoService.login($scope.auth, function(acesso){
                            $cookies.put('Authorization', acesso.auth);
                            $rootScope.acesso = {
                                usuario: acesso.membro,
                                funcionalidades: acesso.funcionalidades
                            };
                            $state.go('home');
                        });
                    };
                }
            },
            'menu@': {
                controller: function($rootScope){
                    $rootScope.contentFullScreen = true;
                }
            },
            'navbar@':{
                
            },
            'header@':{
                
            }
        }
    }).state('redefineSenha', {
        parent: 'parent',
        url: '/senha/redefine/:chave/',
        data:{
            displayName: 'login.redefinicao_senha'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/login/redefine.senha.html',
                controller: function($scope, $stateParams, acessoService){
                    acessoService.redefineSenha($stateParams.chave, function(membro){
                        $scope.redefinida = membro ? true : false;
                        $scope.membro = membro;
                    }, function(){
                        $scope.erro = true;
                    });
                }
            },
            'menu@': {
                controller: function($rootScope){
                    $rootScope.contentFullScreen = true;
                }
            },
            'navbar@':{
                
            },
            'header@':{
                
            }
        }
    });         
}]);
        