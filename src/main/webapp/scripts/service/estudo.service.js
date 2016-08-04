calvinApp.service('estudoService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('estudo');
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
        
        this.cadastra = function(estudo, callback){
            this.api().customPOST(estudo).then(callback);
        };
        
        this.atualiza = function(estudo, callback){
            this.api().customPUT(estudo).then(callback);
        };
}]);
        