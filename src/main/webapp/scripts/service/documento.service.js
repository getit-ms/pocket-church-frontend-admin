calvinApp.service('documentoService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('documento');
        };

        this.buscaCategorias = function(callback) {
            return this.api().all('categoria').getList().then(callback);
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

        this.cadastraCategoria = function(categoria, callback){
            this.api().all('categoria').customPOST(categoria).then(callback);
        };

        this.cadastra = function(documento, callback){
            this.api().customPOST(documento).then(callback);
        };
        
        this.atualiza = function(documento, callback){
            this.api().customPUT(documento).then(callback);
        };
}]);
        