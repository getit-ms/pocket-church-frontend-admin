calvinApp.service('configuracaoService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('configuracao');
        };
        
        this.buscaPagamento = function(){
            return this.api().one('pagamento').get().$object;
        };
        
        this.salvaPagamento = function(pagamento, callback){
            this.api().one('pagamento').customPUT(pagamento).then(callback);
        };
        
}]);
        