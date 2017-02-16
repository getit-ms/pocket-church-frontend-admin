calvinApp.service('youtubeService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('youtube');
        };
        
        this.busca = function(callback){
            this.api().getList().then(callback);
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
        