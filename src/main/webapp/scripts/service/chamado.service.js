calvinApp.service('chamadoService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('chamado');
        };
        
        this.busca = function(filtro, callback){
            return this.api().get('', filtro).then(callback);
        };
        
        this.cadastra = function(chamado, callback){
            this.api().customPOST(chamado).then(callback);
        };
        
        this.carrega = function(id){
            return this.api().get(id).$object;
        };
}]);
        