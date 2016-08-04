calvinApp.service('ministerioService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('ministerio');
        };
        
        this.busca = function(){
            return this.api().getList().$object;
        };
        
        this.buscaAcessiveis = function(){
            return this.api().one('acesso').getList().$object;
        };
        
        this.carrega = function(id){
            return this.api().get(id).$object;
        };
        
        this.remove = function(id, callback){
            this.api().one('/' + id).remove().then(callback);
        };
        
        this.cadastra = function(ministerio, callback){
            this.api().customPOST(ministerio).then(callback);
        };
        
        this.atualiza = function(ministerio, callback){
            this.api().customPUT(ministerio).then(callback);
        };
}]);
        