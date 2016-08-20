calvinApp.service('cifraService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('cifra');
        };
        
        this.busca = function(filtro, callback){
            return this.api().get('', filtro).then(callback);
        };
        
        this.carrega = function(id){
            return this.api().get(id).$object;
        };
        
        this.letra = function(id, success, eror){
            this.api().one('letra/' + id).get().then(success, eror);
        };
        
        this.remove = function(id, callback){
            this.api().one('/' + id).remove().then(callback);
        };
        
        this.cadastra = function(cifra, callback){
            this.api().customPOST(cifra).then(callback);
        };
        
        this.atualiza = function(cifra, callback){
            this.api().customPUT(cifra).then(callback);
        };
}]);
        