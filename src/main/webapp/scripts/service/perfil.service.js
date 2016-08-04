calvinApp.service('perfilService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('perfil');
        };
        
        this.busca = function(){
            return this.api().getList().$object;
        };
        
        this.carrega = function(id){
            return this.api().get(id).$object;
        };
        
        this.remove = function(id, callback){
            this.api().one('/' + id).remove().then(callback);
        };
        
        this.cadastra = function(perfil, callback){
            this.api().customPOST(perfil).then(callback);
        };
        
        this.atualiza = function(ministerio, callback){
            this.api().customPUT(ministerio).then(callback);
        };
        
        this.buscaFuncionalidades = function(){
            return this.api().one('funcionalidades').getList().$object;
        };
}]);
        