calvinApp.service('enqueteService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('enquete');
        };
        
        this.busca = function(filtro, callback){
            return this.api().get('', filtro).then(callback);
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
        