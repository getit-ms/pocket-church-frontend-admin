calvinApp.service('youtubeService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('youtube');
        };
        
        this.busca = function(){
            return this.api().getList().$object;
        };
        
        this.configuracao = function(){
            return this.api().one('configuracao').get().$object;
        };
        
        this.url = function(callback){
            this.api().one('url').get().then(callback);
        };
        
        this.inicia = function(code, callback){
            this.api().one('configuracao/' + code).put().then(callback);
        };
}]);
        