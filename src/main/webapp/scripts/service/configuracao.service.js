calvinApp.service('configuracaoService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('configuracao');
        };
        
        this.busca = function(){
            return this.api().get('').$object;
        };
        
        this.salva = function(configuracao, callback){
            this.api().customPUT(configuracao).then(callback);
        };
        
}]);
        