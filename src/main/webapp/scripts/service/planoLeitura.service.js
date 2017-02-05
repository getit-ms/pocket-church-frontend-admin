calvinApp.service('planoLeituraService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('planoLeitura');
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
        
        this.cadastra = function(planoLeitura, callback){
            this.api().customPOST(planoLeitura).then(callback);
        };
        
        this.atualiza = function(planoLeitura, callback){
            this.api().customPUT(planoLeitura).then(callback);
        };
}]);
        