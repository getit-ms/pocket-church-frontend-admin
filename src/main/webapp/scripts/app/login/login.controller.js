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
                controller: function($scope, $rootScope, $state, message, acessoService){
                    $scope.auth = {username:'',password:''};
                    $scope.efetuarLogin = function(form){
                        if (form.$invalid){
                            message({type:'error',body:'mensagens.MSG-002'})
                            return;
                        }
                        
                        $rootScope.acesso = null;
                        localStorage.removeItem('Authorization.' + $_serverCode);
        
                        acessoService.login($scope.auth, function(acesso){
                            $rootScope.acesso = {
                                usuario: acesso.colaborador,
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
                    acessoService.redefineSenha($stateParams.chave, function(colaborador){
                        $scope.redefinida = colaborador ? true : false;
                        $scope.colaborador = colaborador;
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
    }).state('instalar-aplicativo', {
        parent: 'parent',
        url: '/instalar-aplicativo',
        data:{
            displayName: 'login.instalar_aplicativo'
        },
        views:{
            'content@':{
                templateUrl: 'scripts/app/login/download.ipa.html',
                controller: function($scope, config){
                    $scope.empresa = $_serverCode;
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
        