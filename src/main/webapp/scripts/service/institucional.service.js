calvinApp.service('institucionalService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.one('institucional');
        };
        
        this.carrega = function(){
            return this.api().get('').$object;
        };
        
        this.atualiza = function(institucional, callback){
            this.api().customPUT(institucional).then(callback);
        };
}]);
        