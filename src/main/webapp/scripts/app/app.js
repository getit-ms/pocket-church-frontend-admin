'use strict';

var calvinApp = angular.module('calvinApp',
['ui.bootstrap',
    'ui.router',
    'restangular',
    'pascalprecht.translate',
    'angular-confirm',
    'ngMessages',
    'ngFileUpload',
    'ui.mask',
    'ngTable',
    'ngSanitize',
    'ui.select',
    'checklist-model',
    'toaster',
    'angular-loading-bar',
    'ui.bootstrap.datetimepicker',
    'ui.dateTimeInput',
    'ngAnimate',
    'angularUtils.directives.uiBreadcrumbs',
    'ui.calendar',
    'textAngular',
    'ui.utils.masks',
    'permission',
    'permission.ui',
    'pdf'
]);

function configureHttpInterceptors($httpProvider){
    $httpProvider.interceptors.push(['$q', 'message', 'backendErrors', 
        function($q, message, backendErrors) {
            return {
                request: function(request){
                    if (request.method === 'DELETE'){
                        request.headers['Content-Length'] = 0;
                        request.headers['Content-Type'] = 'application/json;charset=UTF-8';
                        request.data = '';
                    }
                    
                    request.headers.Igreja = $_serverCode;
                    request.headers.Dispositivo = localStorage.getItem('uuid.' + $_serverCode);
                    
                    if (localStorage.getItem('Authorization.' + $_serverCode)){
                        request.headers.Authorization = localStorage.getItem('Authorization.' + $_serverCode);
                    }
                    
                    return request;
                },
                response: function(response){
                    if (response.headers('Set-Authorization')){
                        localStorage.setItem('Authorization.' + $_serverCode, response.headers('Set-Authorization'));
                    }
                    
                    return response;
                },
                responseError: function (rejection) {
                    var responseInterceptors = {
                        400: function (rejection) { // BAD REQUEST
                            message({type:'error',body:rejection.data.message});
                            if (rejection.data.validations){
                                rejection.data.validations.forEach(function(erro){
                                    backendErrors.set(erro.field, erro.message, erro.args);
                                });
                            }
                        },
                        401: function (rejection) { // UNAUTHORIZED
                            message({type:'error',body:'mensagens.MSG-401'});
                            localStorage.removeItem('Authorization.' + $_serverCode);
                            window.location = '#/login/';
                        },
                        403: function (rejection) { // FORBIDDEN
                            message({type:'error',body:'mensagens.MSG-403'});
                            localStorage.removeItem('Authorization.' + $_serverCode);
                            window.location = '#/login/';
                        },
                        404: function (rejection) { // PAGE NOT FOUND
                            window.location = '#/404';
                        },
                        500: function (rejection) { // INTERNAL SERVER ERROR
                            message({type:'error', body: rejection.data.message});
                        }
                    };

                    if (responseInterceptors[rejection.status]) {
                        responseInterceptors[rejection.status](rejection);
                    }

                    return $q.reject(rejection);
                }
            }
        }]
    );
    
    $httpProvider.defaults.transformResponse.push(function(responseData){
        convertDateStringsToDates(responseData);
        return responseData;
    });
    
    $httpProvider.defaults.transformRequest.splice(0,0,function(requestData){
        convertDateToStrings(requestData);
        return requestData;
    });
};
calvinApp.run(['$rootScope', 'PermissionStore', 'acessoService', 'institucionalService', '$state',
    function($rootScope, PermissionStore, acessoService, institucionalService, $state){

    $rootScope.todasFuncionalidades = [
        'MANTER_DADOS_INSTITUCIONAIS',
        'GERENCIAR_FUNCIONALIDADES_APLICATIVO',
        'MANTER_MINISTERIOS',
        'MANTER_PERFIS',
        'MANTER_MEMBROS',
        'GERENCIAR_ACESSO_MEMBROS',
        'MANTER_AUDIOS',
        'MANTER_NOTICIAS',
        'MANTER_BOLETINS',
        'MANTER_PUBLICACOES',
        'MANTER_PLANOS_LEITURA_BIBLICA',
        'MANTER_CIFRAS',
        'MANTER_CANTICOS',
        'MANTER_ESTUDOS',
        'MANTER_VOTACOES',
        'CONSULTAR_PEDIDOS_ORACAO',
        'MANTER_AGENDA',
        'MANTER_EVENTOS',
        'MANTER_EBD',
        'ENVIAR_NOTIFICACOES',
        'MANTER_VERSICULOS_DIARIOS',
        'CONFIGURAR',
        'CONFIGURAR_FLICKR',
        'CONFIGURAR_YOUTUBE',
        'CONFIGURAR_GOOGLE_CALENDAR',
        'ABERTURA_CHAMADO_SUPORTE'
    ];
    
    
    $rootScope.acesso = angular.fromJson(localStorage.getItem('acesso.' + $_serverCode));
    
    if (localStorage.getItem('Authorization.' + $_serverCode) && !$rootScope.acesso){
        acessoService.carrega(function(acesso){
            $rootScope.acesso = {
                usuario: acesso.membro,
                funcionalidades: acesso.funcionalidades
            };
            localStorage.setItem('acesso.' + $_serverCode, angular.toJson($rootScope.acesso));
        });
    }

    if (!localStorage.getItem('uuid.' + $_serverCode)){
        localStorage.setItem('uuid.' + $_serverCode, 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        }));
    }
        
    PermissionStore
        .definePermission('HOME', function (permissionName, transitionProperties) {
            return $rootScope.acesso ? true : false;
        });

    for (var i=0;i<$rootScope.todasFuncionalidades.length;i++){
        var func = $rootScope.todasFuncionalidades[i];
        PermissionStore
            .definePermission(func, function (permissionName, transitionProperties) {
                return $rootScope.acesso && $rootScope.acesso.funcionalidades.indexOf(permissionName) >= 0 ? true : false;
            });
    }
    
    if (!$rootScope.institucional){
        institucionalService.carrega(function(institucional){
            $rootScope.institucional = institucional;
        });
    }
}]);

calvinApp.
        run(['$translatePartialLoader', function($translatePartialLoader){
            $translatePartialLoader.addPart('global');
        }]).
        config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'RestangularProvider', '$translateProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, RestangularProvider, $translateProvider) {

        // Configurando interceptor de autenticação
        configureHttpInterceptors($httpProvider);

        // Configurando UI-ROUTER
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('parent', {
            abstract: true,
            views: {
                'navbar@': {
                    templateUrl: 'scripts/components/template/navbar/navbar.html',
                    controller: 'NavbarController'
                },
                'menu@': {
                    templateUrl: 'scripts/components/template/menu/menu.html',
                    controller: 'MenuController'
                },
                'header@': {
                    templateUrl: 'scripts/components/template/header/header.html'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', function ($translate){
                        return $translate.refresh();
                }] 
            },
            controller: ['$scope', function($scope){
                
            }]
        });
        
        // Configuranto Restangular
        RestangularProvider.setBaseUrl('/app/rest');


        // Configurando o angular-translate
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'i18n/{lang}/{part}.json'
        });

        $translateProvider.preferredLanguage('pt-br');
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.addInterpolation('$translateMessageFormatInterpolation');

        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        // disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }]
).controller('LogoutController', function($rootScope, $scope, $state, acessoService){
    $scope.logout = function(){
        $rootScope.acesso = null;
        localStorage.removeItem('Authorization.' + $_serverCode);
        localStorage.removeItem('acesso.' + $_serverCode);
        $state.go('login');
    };
});

calvinApp.run(['$http', '$templateCache', '$rootScope', function($http, $templateCache, $rootScope) {
        //Inclusão do template de mensagens de erro padrão do sistema
        $http.get('scripts/components/template/default-error-messages.html').then(function(response){
            $templateCache.put('default-error-messages', response.data);
        });
        
        $http.defaults.transformRequest.push(function (data) {
            $rootScope.inProgress = true;
            return data;
        });
        
        $http.defaults.transformResponse.push(function(data){ 
            $rootScope.inProgress = false;
            return data;
        });
        
    }]
);

var regexDateTime = /^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}.+$/;
var regexDate = /^\d{4}\-\d{2}\-\d{2}$/;
var regexTime = /^\d{2}:\d{2}:\d{2}\.\d{3}/;

function convertDateStringsToDates(input) {
    // Ignore things that aren't objects.
    if (typeof input !== "object")
        return input;

    for (var key in input) {
        if (!input.hasOwnProperty(key))
            continue;

        var value = input[key];
        var match;
        // Check for string properties which look like dates.
        if (typeof value === "string" && (match = value.match(regexDateTime))) {
            input[key] = moment(match[0]).toDate('YYYY-MM-DDTHH:mm:ss.SSSZZ');
        }else if (typeof value === "string" && (match = value.match(regexDate))) {
            input[key] = moment(match[0]).toDate('YYYY-MM-DD');
        }else if (typeof value === "string" && (match = value.match(regexTime))) {
            input[key] = moment(match[0]).toDate('HH:mm:ss.SSS');
        } else if (typeof value === "object") {
            // Recurse into object
            convertDateStringsToDates(value);
        }
    }
}

function convertDateToStrings(input) {
    // Ignore things that aren't objects.
    if (typeof input !== "object") return input;

    for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;

        var value = input[key];
        // Check for string properties which look like dates.
        if (value instanceof Date) {
            input[key] = formatDate(value);
        } else if (typeof value === "object") {
            // Recurse into object
            convertDateStringsToDates(value);
        }
    }
}

function formatDate(date){
    if (!date) return null;
    return moment(date).format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
}