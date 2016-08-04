calvinApp.factory('confirmDialog', ['$confirm', '$translate', '$q',  function($confirm, $translate, $q){
		var confirm = function(data, settings){
			var deferred = $q.defer();

			function resolver(result){
				data.text = result[data.text];
				data.title = result[data.title];
				data.ok = result[data.ok];
				data.cancel = result[data.cancel];
				deferred.resolve($confirm(data, settings));
			}
			$translate([data.text, data.title, data.ok, data.cancel], data.params).then(resolver, resolver);

			return deferred.promise;
		};

		return confirm;
	}
]).factory('confirmExclusao', ['confirmDialog', '$filter', function(confirmDialog, $filter){
        return function(elemento, descricao, callback){
            confirmDialog({
                title:'global.confirmacao_exclusao',
                text:'mensagens.MSG-016',
                ok:'global.sim',
                cancel:'global.nao',
                params:{
                    elemento: $filter('translate')('global.elemento.' + elemento),
                    descricao: descricao
                }
            }).then(callback);
        };
}]);

