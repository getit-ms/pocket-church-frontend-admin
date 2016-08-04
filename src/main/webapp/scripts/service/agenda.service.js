calvinApp.service('agendaService', ['Restangular', function(Restangular){
        this.api = function(){
            return Restangular.all('agenda');
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
        
        this.cadastra = function(ministerio, callback){
            this.api().customPOST(ministerio).then(callback);
        };
        
        this.cadastraHorario = function(id, horario, callback){
            this.api().one(id + '/horario').customPOST(horario).then(callback);
        };
        
        this.buscaDiasSemana = function(){
            return this.api().one('diasSemana').getList().$object;
        };
        
        this.buscaPastores = function(){
            return this.api().one('pastores').getList().$object;
        };
        
        this.agenda = function(id, req, callback){
            this.api().one(id + '/agendar').customPOST(angular.extend({}, req, {data:formatDate(req.data)})).then(callback);
        };
        
        this.confirma = function(id, agendamento, callback){
            this.api().one(id + '/confirmar/' + agendamento).post().then(callback);
        };
        
        this.cancela = function(id, agendamento, callback){
            this.api().one(id + '/cancelar/' + agendamento).post().then(callback);
        };
        
        this.buscaAgenda = function(id, filtro, callback){
            this.api().one(id + '/agenda').get({di: formatDate(filtro.di), df: formatDate(filtro.df)}).then(callback);
        };
        
        this.removeDia = function(id, horario, data, callback){
            this.api().one(id + '/horario/' + horario + "/dia").remove({data: formatDate(data) }).then(callback);
        };
        
        this.removePeriodo = function(id, horario, inicio, fim, callback){
            this.api().one(id + '/horario/' + horario + "/periodo").remove({inicio: formatDate(inicio), fim: formatDate(fim)}).then(callback);
        };
        
        this.buscaAgendamentos = function(id, filtro, callback){
            this.api().one(id + '/agendamentos').get({di:formatDate(filtro.di),df:formatDate(filtro.df)}).then(callback);
        };
}]);
        