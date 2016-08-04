calvinApp.service('notificacaoService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.one('notificacao');
        };
        
        this.envia = function(notificacao, callback){
            this.api().customPOST(notificacao).then(callback);
        };
}]);
        