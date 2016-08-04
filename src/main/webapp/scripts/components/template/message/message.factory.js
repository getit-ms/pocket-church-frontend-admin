calvinApp.factory('message', ['toaster', '$translate', '$q', '$rootScope',
        function(toaster, $translate, $q, $rootScope){
            var message = function(data){
                $rootScope.$emit('removerMensagens');
                var deferred = $q.defer();

                function resolver(result){
                    data.body = result[data.body];
                    data.title = result[data.title];

                    var timeout = 10000;
                    if(data.type == 'error'){
                        timeout = 0;
                    }
                    angular.extend(data, {timeout: timeout});
                    deferred.resolve(toaster.pop(data));
                }

                $translate([data.title, data.body], data.params).then(resolver, resolver);

                return deferred.promise;
            };

            //Cadastro de eventos para o clear do toastr
            function clearToastr(){ toaster.clear()}
            $rootScope.$on('$stateChangeStart', clearToastr);
            $rootScope.$on('removerMensagens', clearToastr);

        return message;
    }])
    .factory('backendErrors', ['$rootScope', function($rootScope){
    	return {
    		args: function(name){
    			return $rootScope['bckend.args.' + name];
    		},
    		get: function(name){
    			return $rootScope['bckend.error.' + name];
    		},
    		set: function(name, value, args){
    			$rootScope['bckend.error.' + name] = value;
    			$rootScope['bckend.args.' + name] = args;
    		},
    		contains: function(name){
    			var value = this.get(name);
    			return value && value != '';
    		},
    		watch: function(name, func){
    			$rootScope.$watch(function(){
    				return $rootScope['bckend.error.' + name];
    			}, func);
    		}
    	};
    }]
);