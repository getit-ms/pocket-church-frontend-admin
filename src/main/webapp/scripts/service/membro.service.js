calvinApp.service('membroService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('membro');
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

        this.redefineSenha = function(id, callback) {
            this.api().one('/' + id + '/redefine-senha').put().then(callback);
        };
        
        this.cadastra = function(ministerio, callback){
            this.api().customPOST(ministerio).then(callback);
        };
        
        this.atualiza = function(ministerio, callback){
            this.api().customPUT(ministerio).then(callback);
        };
        
        this.darAcessoMembro = function(id, callback){
            this.api().one(id + '/membro').put().then(callback);
        };
        
        this.removeAcessoMembro = function(id, callback){
            this.api().one(id + '/membro').remove().then(callback);
        };
        
        this.removeAcessoAdmin = function(id, callback){
            this.api().one(id + '/acesso').remove().then(callback);
        };
        
        this.carregaAcessoAdmin = function(id, callback){
            this.api().one(id + '/acesso').get().then(callback);
        };
        
        this.atualizaAcessoAdmin = function(acesso, callback){
            this.api().one(acesso.membro.id + '/acesso').customPUT(acesso).then(callback);
        };
}]);
        