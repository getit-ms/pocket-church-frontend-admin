calvinApp.service('acessoService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('acesso');
        };
        
        this.carrega = function(callback){
            this.api().get('').then(callback);
        };
        
        this.alteraSenha = function(dados, callback){
            this.api().one('alteraSenha').customPUT(dados).then(callback);
        };
        
        this.redefineSenha = function(chave, success, error){
            this.api().one('senha/redefinir').customGET('', {chave:chave}).then(success, error);
        };
        
        this.login = function(login, callback){
            this.api().one('login').customPUT(angular.extend({version:$_version, tipoDispositivo:2}, login)).then(callback);
        };
        
        this.buscaStatus = function(){
            return this.api().one('status').get().$object;
        };
}]);
        