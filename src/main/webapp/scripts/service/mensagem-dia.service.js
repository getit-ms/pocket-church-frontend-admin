calvinApp.service('mensagemDiaService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('mensagem-dia');
        };
        
        this.busca = function(filtro, callback){
            return this.api().get('', filtro).then(callback);
        };
        
        this.remove = function(id, callback){
            this.api().one('/' + id).remove().then(callback);
        };
        
        this.cadastra = function(ministerio, callback){
            this.api().customPOST(ministerio).then(callback);
        };
        
        this.habilita = function(id, callback){
            this.api().one('habilita/' + id).put().then(callback);
        };
        
        this.desabilita = function(id, callback){
            this.api().one('desabilita/' + id).put().then(callback);
        };
}]);
        