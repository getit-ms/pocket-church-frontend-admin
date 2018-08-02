calvinApp.config(['$stateProvider', function($stateProvider){
        $stateProvider.state('agenda', {
            parent: 'home',
            url: 'agenda/',
            data:{
                displayName: 'agenda.agendas',
                permissions:{
                    only: ['MANTER_AGENDA'],
                    redirectTo: 'login'
                }
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/agenda/agenda.list.html',
                    controller: function(agendaService, $state, $scope, message, confirmExclusao){
                        $scope.busca = function(){
                            $scope.agendas = agendaService.busca();
                        };
                        
                        $scope.detalhar = function(agenda){
                            $state.go('view', {id: agenda.id});
                        };
                        
                        $scope.editar = function(agenda){
                            $state.go('edicao', {id: agenda.id});
                        };
                        
                        $scope.excluir = function(agenda){
                            confirmExclusao('agenda', agenda.gerente.nome, function(){
                                agendaService.remove(agenda.id, function(agenda){
                                    message({type:'success',body:'mensagens.MSG-001'});
                                    $scope.busca();
                                });
                            });
                        };
                        
                        $scope.busca();
                    }
                }
            }
        }).state('cadastro', {
            parent: 'agenda',
            url: 'novo/',
            data:{
                displayName: 'agenda.cadastrar'
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/agenda/agenda.form.html',
                    controller: function(agendaService, $state, message, $scope){
                        $scope.agenda = {horarios:[]};
                        $scope.gerentes = agendaService.buscaPastores();
                        
                        $scope.salvar = function(formulario){
                            if (formulario.$invalid){
                                message({type:'error',body:'mensagens.MSG-002'});
                                return;
                            }
                            
                            agendaService.cadastra($scope.agenda, function(agenda){
                                message({type:'success',body:'mensagens.MSG-001'});
                                $state.go('edicao', {id: agenda.id});
                            });
                        };
                    }
                }
            }
        }).state('edicao', {
            parent: 'agenda',
            url: ':id/',
            data:{
                displayName: 'agenda.editar'
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/agenda/agenda.form.html',
                    controller: function(agenda, $scope, message, modalService, $filter, uiCalendarConfig){
                        $scope.agenda = agenda;
                        
                        $scope.showEvent = function(evento, jsEvent, view){
                            var titulo;

                            if (evento.horario){
                                titulo = 'agenda.horario.titulo';
                            }else if (evento.agendamento) {
                                titulo = 'agenda.agendamento.titulo';
                            }

                            $scope.modalInstance = modalService.prepare($scope, {
                                title: $filter('translate')(titulo),
                                controller: 'ModalHorario',
                                templateUrl: 'scripts/app/agenda/modal/horario.form.html',
                                freeForm: 'formulario_horario',
                                resolve: {
                                    evento: evento,
                                    callback: function(){
                                        return function(){
                                            message({type:'success',body:'mensagens.MSG-001'});
                                            uiCalendarConfig.calendars['agenda'].fullCalendar('refetchEvents');
                                        }
                                    }
                                }
                            })();
                        };
                        
                        $scope.calendario = {
                            lang:'pt-br',
                            editable: true,
                            defaultView: 'agendaWeek',
                            eventDurationEditable: false,
                            timeFormat: 'H:mm',
                            header:{
                                left: 'title',
                                center: '',
                                right: 'today prev,next'
                            },
                            eventClick: $scope.showEvent
                        };
                        
                    },
                    resolve: {
                        agenda: function(agendaService, $stateParams){
                            return agendaService.carrega($stateParams.id)
                        }
                    }
                }
            }
        }).state('view', {
            parent: 'agenda',
            url: ':id/view/',
            data:{
                displayName: 'agenda.detalhar'
            },
            views:{
                'content@':{
                    templateUrl: 'scripts/app/agenda/agenda.detail.html',
                    controller: function(agenda, $scope, modalService, $filter){
                        $scope.agenda = agenda;
                        
                        $scope.showEvent = function(evento, jsEvent, view){
                            var titulo = 'agenda.agendamento.titulo';

                            $scope.modalInstance = modalService.prepare($scope, {
                                title: $filter('translate')(titulo),
                                controller: 'ModalHorario',
                                templateUrl: 'scripts/app/agenda/modal/horario.detail.html',
                                freeForm: 'formulario_horario',
                                resolve: {
                                    evento: evento,
                                    callback: function(){}
                                }
                            })();
                        };
                        
                        $scope.calendario = {
                            lang:'pt-br',
                            editable: true,
                            defaultView: 'agendaWeek',
                            eventDurationEditable: false,
                            timeFormat: 'H:mm',
                            header:{
                                left: 'title',
                                center: '',
                                right: 'today prev,next'
                            },
                            eventClick: $scope.showEvent
                        };
                    },
                    resolve: {
                        agenda: function(agendaService, $stateParams){
                            return agendaService.carrega($stateParams.id)
                        }
                    }
                }
            }
        });         
    }]).controller('HorarioAgendaController', ['$scope', 'agendaService', '$state', function($scope, agendaService, $state){
        $scope.diasSemana = agendaService.buscaDiasSemana();
                        
        $scope.clear = function(){
            $scope.horario = {diasSemana:[]};
        };
        
        $scope.addHorario = function(form){
            if (!$scope.horario.diasSemana ||
                    !$scope.horario.diasSemana.length ||
                    !$scope.horario.horaInicio ||
                    !$scope.horario.horaFim){
                return;
            }
        
            agendaService.cadastraHorario($scope.agenda.id, $scope.horario, function(){
                if ($scope.callback){
                    $scope.callback();
                }
                $scope.clear();
            });
        };
    
        $scope.clear();
    
    }]).controller('ModalHorario', ['$scope', 'agendaService', 'colaboradorService', 'evento', 'message', 'confirmDialog', 'callback',
        function($scope, agendaService, colaboradorService, evento, message, confirmDialog, callback){

        $scope.horario = $scope.agendamento = $scope.folga = null;
        
        function dayTime(date){
            return date.getYear() * 10000 + date.getMonth() + date.getDate();
        }
        
        $scope.modalCallbak = function(){
            callback();
            $scope.modalInstance.close();
        };
        
        $scope.inicio = new Date(evento.start);
        $scope.fim = new Date(evento.end);
        $scope.sameDay = dayTime($scope.fim) - dayTime($scope.inicio) === 0;
        
        if (evento.horario){
            $scope.pesquisarColaboradors = function(filtro){
                colaboradorService.busca({nome:filtro,pagina:1,count:30}, function(colaboradores){
                    $scope.colaboradores = colaboradores;
                });
            };
            
            $scope.horario = evento.horario;

            $scope.req = {horario: evento.horario.id,data: new Date(evento.start)};
            
            $scope.submitForm = function(){
                if (!$scope.req.colaborador){
                    message({type:'error', body:'mensagens.MSG-002'});
                    return;
                }
                
                agendaService.agenda($scope.agenda.id, $scope.req, $scope.modalCallbak);
            };
            
            $scope.removeDia = function(){
                confirmDialog({title:'global.confirmacao_exclusao',text:'mensagens.MSG-020',ok:'global.sim',cancel:'global.nao'}).then(function(){
                    agendaService.removeDia($scope.agenda.id, $scope.horario.id, evento.start, $scope.modalCallbak);
                });
            };
            
            $scope.removeFuturos = function(){
                confirmDialog({title:'global.confirmacao_exclusao',text:'mensagens.MSG-021',ok:'global.sim',cancel:'global.nao'}).then(function(){
                    agendaService.removePeriodo($scope.agenda.id, $scope.horario.id, evento.start, null, $scope.modalCallbak);
                });
            };
            
            $scope.removePeriodo = function(){
                confirmDialog({title:'global.confirmacao_exclusao',text:'mensagens.MSG-022',ok:'global.sim',cancel:'global.nao'}).then(function(){
                    agendaService.removePeriodo($scope.agenda.id, $scope.horario.id, evento.start, $scope.dataFim, $scope.modalCallbak);
                });
            };
        }else if (evento.agendamento){
            $scope.agendamento = evento.agendamento;

            $scope.submitForm = function(){
                if ($scope.agendamento.naoConfirmado){
                    agendaService.confirma($scope.agenda.id, $scope.agendamento.id, $scope.modalCallbak);
                }
            };

            $scope.cancelarAgendamento = function(){
                agendaService.cancela($scope.agenda.id, $scope.agendamento.id, $scope.modalCallbak);
            };
        }
    }]).controller('AgendaController', ['$scope', 'agendaService', 
            function($scope, agendaService){
        
        $scope.eventSources = [
            function(start, end, timezone, callback){
                if ($scope.agenda.id && !$scope.readonly){
                    agendaService.buscaAgenda($scope.agenda.id, {di:start, df:end}, function(agenda){
                        var eventos = [];
                                
                        agenda.forEach(function(ev){
                            eventos.push({
                                start: ev.dataInicio,
                                end: ev.dataTermino,
                                horario: ev.horario,
                                className:['horario']
                            });
                        });

                        callback(eventos);
                    });
                }else{
                    callback([]);
                }
            
            }, 
            function(start, end, timezone, callback){
            
                if ($scope.agenda.id){
                    agendaService.buscaAgendamentos($scope.agenda.id, {di:start, df:end}, function(ags){
                        var agendamentos = [];
                        ags.forEach(function(ag){
                            agendamentos.push({
                                title:ag.colaborador.nome,
                                start: ag.dataHoraInicio,
                                end: ag.dataHoraFim,
                                agendamento:ag,
                                className:['agendamento', ag.confirmado ? 'confirmado' : 'nao_confirmado']
                            });
                        });
                        callback(agendamentos);
                    });
                }else{
                    callback([]);
                }
            
            }];
    }]);
