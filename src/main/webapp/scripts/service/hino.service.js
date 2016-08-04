calvinApp.service('hinoService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('hino');
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
        
        this.cadastra = function(hino, callback){
            this.api().customPOST(hino).then(callback);
        };
        
        this.atualiza = function(hino, callback){
            this.api().customPUT(hino).then(callback);
        };
}]);
        