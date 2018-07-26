calvinApp.service('fotoService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('foto');
        };
        
        this.busca = function(pagina, callback){
            this.api().one('galeria').customGET('', {pagina:pagina}).then(callback);
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

        this.inicia = function(token, verifier, callback){
            this.api().one('configuracao').customPUT({token:token,verifier:verifier}).then(callback);
        };
}]);
        