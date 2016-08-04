calvinApp.
        factory('ModalCalvinParams', [function () {
                var ModalCalvinParams = function (params) {
                    var self = this;
            
            this.params = params;
            
            this.setModalInstance = function ($uibModalInstance) {
                self.$uibModalInstance = $uibModalInstance;
            };
            
            this.closeModal = function () {
                self.$uibModalInstance.close();
            };
        };
        
        return ModalCalvinParams;
    }])
        .service('modalService', ['$uibModal', 'ModalCalvinParams', function($uibModal, ModalCalvinParams){
                this.prepare = function($scope, modalCalvinParams){
            var hasModalCalvinParams = modalCalvinParams && modalCalvinParams instanceof ModalCalvinParams;
            
            $scope.params = hasModalCalvinParams ? modalCalvinParams.params : modalCalvinParams;
            
            if (!$scope.params || (!$scope.params.controller && !$scope.params.alert) || !$scope.params.templateUrl) {
                throw "É obrigatório passar os parametros de 'controller' e 'tempalteUrl'.";
            }
            
            /**
             * Função a ser executada ao submeter o form, inserido devido a problemas com a tag <button type="subtmit" />
             * fora da tag <form /> em alguns navegadores (IE)
             * Deve ser sobrescrita no $scope da controladora da modal
             */
            $scope.submitForm = function(){
                throw 'O método submitForm deve ser sobrescrito pela controladora da modal para enviar o formulário';
            };
            
            /**
             * Função para gerar a url do atributo ng-href do botão de download da modal
             * Deve ser sobrescrita no $scope da controladora da modal
             */
            $scope.downloadLink = function(){
                throw 'O método submitForm deve ser sobrescrito pela controladora da modal para enviar o formulário';
            };
            
            if (hasModalCalvinParams) {
                $scope.modalCalvinParams.changeTitle = function (title) {
                    $scope.params.title = title;
                };
                
                $scope.modalCalvinParams.changeButtons = function (btnOk, btnCancelar) {
                    $scope.params.btnOk = btnOk ? btnOk : null;
                    $scope.params.btnOk = btnCancelar ? btnCancelar : null;
                    
                };
                
                $scope.modalCalvinParams.changeForm = function (form) {
                    $scope.params.form = form || $scope.settings.form;
                };
            }
            
            return function () {
                var modalInstance = $uibModal.open({
                    templateUrl: 'scripts/components/modal-form/modal-form.tpl.html',
                    controller: $scope.params.controller,
                    controllerAs: 'modalCtrl',
                    bindToController: true,
                    scope: $scope,
                    size: $scope.params.size || '',
                    resolve: $scope.params.resolve
                });
                
                $scope.ok = function () {
                    modalInstance.close();
                };
                
                $scope.cancel = function () {
                    modalInstance.dismiss('cancel');
                };
                
                hasModalCalvinParams && $scope.modalCalvinParams.setModalInstance(modalInstance);
                
                modalInstance.opened.then(function () {
                    hasModalCalvinParams && $scope.params.opened && $scope.params.opened(modalInstance);
                });
                
                modalInstance.result.then(function () {
                    $scope.params.result && $scope.params.result(modalInstance);
                }, function () {
                    $scope.params.dismissed && $scope.params.dismissed(modalInstance);
                });
                
                return modalInstance;
            };
        };
    }])
        .directive('modalCalvin', [function () {
                return {
                    restrict: 'A',
            scope: {
                modalCalvinParams: '=modalCalvin'
            },
            link: function ($scope, element, ModalService) {
                element[0].onclick = ModalService.prepare($scope, $scope.modalCalvinParams);
            }
        };
    }]
        );