calvinApp.service('aplicativoService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.one('aplicativo');
        };
        
        this.buscaTodasFuncionalidades = function(){
            return this.api().one('funcionalidades/todas').getList().$object;
        };
        
        this.buscaFuncionalidades = function(){
            return this.api().one('funcionalidades').getList().$object;
        };
        
        this.salvaFuncionalidades = function(funcionalidades, callback){
            this.api().one('funcionalidades').customPUT(funcionalidades).then(callback);
        };
}]);
        