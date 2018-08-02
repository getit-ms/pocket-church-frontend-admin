calvinApp.service('colaboradorService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('colaborador');
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
        
        this.darAcessoColaborador = function(id, callback){
            this.api().one(id + '/colaborador').put().then(callback);
        };
        
        this.removeAcessoColaborador = function(id, callback){
            this.api().one(id + '/colaborador').remove().then(callback);
        };
        
        this.removeAcessoAdmin = function(id, callback){
            this.api().one(id + '/acesso').remove().then(callback);
        };
        
        this.carregaAcessoAdmin = function(id, callback){
            this.api().one(id + '/acesso').get().then(callback);
        };
        
        this.atualizaAcessoAdmin = function(acesso, callback){
            this.api().one(acesso.colaborador.id + '/acesso').customPUT(acesso).then(callback);
        };
}]);
        