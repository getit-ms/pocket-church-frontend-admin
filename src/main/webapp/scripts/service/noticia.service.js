calvinApp.service('noticiaService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('noticia');
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

        this.cadastra = function(noticia, callback){
            this.api().customPOST(noticia).then(callback);
        };
        
        this.atualiza = function(noticia, callback){
            this.api().customPUT(noticia).then(callback);
        };
}]);
        