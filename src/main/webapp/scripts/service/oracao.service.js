calvinApp.service('oracaoService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('oracao');
        };
        
        this.busca = function(filtro, callback){
            return this.api().customGET('', angular.extend(filtro, {
                dataInicio:formatDate(filtro.dataInicio),
                dataTermino:formatDate(filtro.dataTermino)
            })).then(callback);
        };
        
        this.buscaStatus = function(){
            return this.api().all('status').getList().$object;
        };
        
        this.atende = function(id, callback){
            this.api().one('atende/' + id).put().then(callback);
        };
}]);
        