calvinApp.service('eventoService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('evento');
        };
        
        this.busca = function(filtro, callback){
            return this.api().get('', filtro).then(callback);
        };
        
        this.buscaInscricoes = function(id, filtro, callback){
            return this.api().all(id + '/inscricoes').get('', filtro).then(callback);
        };
        
        this.carrega = function(id){
            return this.api().get(id).$object;
        };
        
        this.confirmaInscricao = function(id, inscricao, callback){
            this.api().one(id + '/confirmar/' + inscricao).put().then(callback);
        };
        
        this.cancelaInscricao = function(id, inscricao, callback){
            this.api().one(id + '/cancelar/' + inscricao).remove().then(callback);
        };
        
        this.remove = function(id, callback){
            this.api().one('/' + id).remove().then(callback);
        };
        
        this.cadastra = function(evento, callback){
            this.api().customPOST(evento).then(callback);
        };
        
        this.atualiza = function(evento, callback){
            this.api().customPUT(evento).then(callback);
        };
}]);
        