calvinApp.service('calendarioService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('calendario');
        };
        
        this.busca = function(filtro, callback){
            this.api().get('', filtro).then(callback);
        };

        this.buscaVisoes = function(callback){
            this.api().all('visoes').getList().then(callback);
        };
        
        this.configuracao = function(callback){
            this.api().one('configuracao').get().then(callback);
        };
        
        this.url = function(callback){
            this.api().one('url').get().then(callback);
        };

        this.disable = function(callback){
            this.api().remove().then(callback);
        };

        this.inicia = function(code, callback){
            this.api().one('configuracao').customPUT({code:code}).then(callback);
        };

        this.salva = function(configuracao, callback){
            this.api().customPUT(configuracao).then(callback);
        };
}]);
        