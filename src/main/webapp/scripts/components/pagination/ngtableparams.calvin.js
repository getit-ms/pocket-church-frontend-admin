calvinApp.factory('NgTableParamsCalvin', ['NgTableParams', function(NgTableParams){

	var NgTableParamsCalvin = function(params, settings){
            if(!params){
                throw 'Deve ser passado a função para prover os dados ao NgTable ou os objetos de configuração do NgTableParams';
            }

            var baseParameters = {
                count: 10,
                page: 1
            };

            var baseSettings = {
                counts: [10, 25, 50]
            };

            if(typeof params === 'function'){
                baseSettings.getData = params;
            }

            if(typeof params === 'object'){
                angular.extend(baseParameters, params);
            }

            this.defaultParameters = baseParameters;
            this.defaultSettings = baseSettings;

            if(settings){
                if(typeof settings === 'function'){
                    baseSettings.getData = settings;
                }

                if(typeof settings === 'object'){
                    angular.extend(baseSettings, settings);
                }
            }


            NgTableParams.apply(this, [baseParameters, baseSettings]);

	};

	NgTableParamsCalvin.prototype = new NgTableParams();

	return NgTableParamsCalvin;
    }]);

calvinApp.run(['ngTableEventsChannel', '$rootScope', function(ngTableEventsChannel, $rootScope){

	function afterReloadEvent(tableParams, actualDataset, oldDataSet){

            checkCounts(tableParams);

            checkEmptyPage(tableParams, actualDataset);


	}

	/**
	 * Verifica se o resultado esta vazio porem nao esta na primeira pagina
	 * Corrige o erro de deletar o ultimo item de uma pagina e a lista ficar vazia ao inves
	 * de retornar para a pagina anterior
	 * @param tableParams
	 * @param data
	 */
	function checkEmptyPage(tableParams, data){
            if(data.length === 0 && tableParams.page() !== 1){
                tableParams.page(tableParams.page()-1);
                tableParams.reload();
            }
	}

	/**
	 * Verifica se a quantidade de itens é pelo menos maior que o primeiro count da lista de counts
	 * passadas no settings
	 * @param tableParams
	 */
	function checkCounts(tableParams){
            var min;
            if(tableParams.defaultSettings.counts && tableParams.defaultSettings.counts.length){
                min = tableParams.defaultSettings.counts[0];
            }

            if(tableParams.total() <= (min || tableParams.count())){
                tableParams.settings().counts = [];
            } else {
                tableParams.settings().counts = tableParams.defaultSettings.counts;
            }
	}

	ngTableEventsChannel.onAfterReloadData(afterReloadEvent, $rootScope);

    }]);



