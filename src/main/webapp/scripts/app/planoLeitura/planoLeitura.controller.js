calvinApp.config(['$stateProvider', function($stateProvider){
        $stateProvider.state('planoLeitura', {
            parent: 'home',
            url: 'planoLeitura/',
            data:{
                displayName: 'plano_leitura.planos_leitura',
                permissions:{
                    only: ['MANTER_MEMBROS'],
                    redirectTo: 'login'
                }
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/planoLeitura/planoLeitura.list.html',
                    controller: function($scope, planoLeituraService, $state, message, confirmExclusao, NgTableParamsCalvin){
                        $scope.filtro = {dataInicio:new Date()};
                        
                        $scope.tabelaPlanosLeitura = new NgTableParamsCalvin(function($defer, params){
                            $scope.filtro.pagina = params.parameters().page;
                            $scope.filtro.total = params.parameters().count;
                            planoLeituraService.busca($scope.filtro, function(planosLeitura){
                                $scope.planosLeitura = planosLeitura;
                                params.total(planosLeitura.totalResultados);
                                $defer.resolve(planosLeitura.resultados);
                            });
                        });
                        
                        $scope.busca = function(){
                            $scope.tabelaPlanosLeitura.reload();
                        };
                        
                        $scope.detalhar = function(planoLeitura){
                            $state.go('planoLeitura.view', {id: planoLeitura.id});
                        };
                        
                        $scope.editar = function(planoLeitura){
                            $state.go('planoLeitura.edicao', {id: planoLeitura.id});
                        };
                        
                        $scope.remover = function(planoLeitura){
                            confirmExclusao('plano_leitura', planoLeitura.nome, function(){
                                planoLeituraService.remove(planoLeitura.id, function(){
                                    message({type:'success',body:'mensagens.MSG-001'});
                                    $scope.busca();
                                });
                            });
                        };
                        
                        $scope.busca();
                    }
                }
            }
        }).state('planoLeitura.cadastro', {
            parent: 'planoLeitura',
            url: 'novo/',
            data:{
                displayName: 'plano_leitura.cadastrar'
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/planoLeitura/planoLeitura.form.html',
                    controller: 'ManterPlanoLeituraCtrl',
                    resolve: {
                        planoLeitura: function(){
                            var now = new Date();
                            
                            return {
                                dias:[],
                                dataInicio:new Date(now.getFullYear(), 0, 1),
                                dataTermino:new Date(now.getFullYear(), 11, 31)
                            };
                        }
                    }
                }
            }
        }).state('planoLeitura.edicao', {
            parent: 'planoLeitura',
            url: ':id/',
            data:{
                displayName: 'plano_leitura.editar'
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/planoLeitura/planoLeitura.form.html',
                    controller: 'ManterPlanoLeituraCtrl',
                    resolve: {
                        planoLeitura: function($stateParams, planoLeituraService){
                            return planoLeituraService.carrega($stateParams.id);
                        }
                    }
                }
            }
        }).state('planoLeitura.view', {
            parent: 'planoLeitura',
            url: ':id/view/',
            data:{
                displayName: 'plano_leitura.detalhar'
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/planoLeitura/planoLeitura.detail.html',
                    controller: 'ManterPlanoLeituraCtrl',
                    resolve: {
                        planoLeitura: function($stateParams, planoLeituraService){
                            return planoLeituraService.carrega($stateParams.id);
                        }
                    }
                }
            }
        });         
    }]).controller('ManterPlanoLeituraCtrl', function(planoLeitura, $scope, message, planoLeituraService, $state, $scope){
            var dayMillis = 1000 * 60 * 60 * 24;
    
            $scope.planoLeitura = planoLeitura;
            
            $scope.$watch('planoLeitura.dataTermino', function(){
                $scope.atualizaDias();
            });
            
            $scope.$watch('planoLeitura.dataInicio', function(){
                $scope.atualizaDias();
            });
            
            $scope.atualizaDias = function(){
                if (!$scope.planoLeitura.dataTermino ||
                        !$scope.planoLeitura.dataInicio){
                    return;
                }
                
                var to = moment($scope.planoLeitura.dataTermino);
                var idx = moment($scope.planoLeitura.dataInicio);
                
                var i=0;
                while (i < $scope.planoLeitura.dias.length && Math.trunc(idx.valueOf()/dayMillis) <= Math.trunc(to.valueOf()/dayMillis)){
                    var dia = $scope.planoLeitura.dias[i];
                    
                    if (Math.trunc(idx.valueOf()/dayMillis) < Math.trunc(dia.data.getTime()/dayMillis)){
                        $scope.planoLeitura.dias.splice(i, 0, {data:new Date(idx.valueOf())});
                        idx.add(1, 'day');
                        i++;
                    }else if (Math.trunc(idx.valueOf()/dayMillis) > Math.trunc(dia.data.getTime()/dayMillis)){
                        $scope.planoLeitura.dias.splice(i, 1);
                    }else{
                        i++;
                        idx.add(1, 'day');
                    }
                }
                
                $scope.planoLeitura.dias.splice(i, $scope.planoLeitura.dias.length - i);
                
                while (Math.trunc(idx.valueOf()/dayMillis) <= Math.trunc(to.valueOf()/dayMillis)){
                    $scope.planoLeitura.dias.push({data:new Date(idx.valueOf())});
                    idx.add(1, 'day');
                }
                
                $scope.agrupamento = {};
                $scope.planoLeitura.dias.forEach(function (dia){
                    if (!$scope.agrupamento[dia.data.getFullYear()]){
                        $scope.agrupamento[dia.data.getFullYear()] = {};
                    }
                    
                    if (!$scope.agrupamento[dia.data.getFullYear()][dia.data.getMonth()]){
                        $scope.agrupamento[dia.data.getFullYear()][dia.data.getMonth()] = {};
                    }
                    
                    $scope.agrupamento[dia.data.getFullYear()][dia.data.getMonth()][dia.data.getDate()] = dia;
                });
            };
            
            
            $scope.salvar = function(form){
                if (form.$invalid){
                    message({type:'error',body:'mensagens.MSG-002'});
                    return;
                }
                
                if ($scope.planoLeitura.id){
                    planoLeituraService.atualiza($scope.planoLeitura, function(planoLeitura){
                        message({type:'success',body:'mensagens.MSG-001'});
                        $state.go('planoLeitura');
                    });
                }else{
                    planoLeituraService.cadastra($scope.planoLeitura, function(planoLeitura){
                        message({type:'success',body:'mensagens.MSG-001'});
                        $state.go('planoLeitura');
                    });
                }
            };
            
            $scope.atualizaDias();
        });
