calvinApp.service('institucionalService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.one('institucional');
        };
        
        this.carrega = function(callback){
            this.api().get('').then(callback);
        };
        
        this.atualiza = function(institucional, callback){
            this.api().customPUT(institucional).then(callback);
        };
}]);
        