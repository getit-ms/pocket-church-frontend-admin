calvinApp.directive('inputFileupload', function(){
    return {
        restrict: 'E',
        scope:{
            ngModel: '=',
            readonly: '=',
            onUpload: '=',
            types:'='
        },
        templateUrl: 'scripts/components/input-fileupload/input-fileupload.html',
        controller: function($scope, $rootScope, Upload, message){
            if (typeof $scope.types === 'string'){
                $scope.types = [$scope.types];
            }
            
            $scope.submetendo = false;
            
            $scope.realizaUpload = function(file){
                
                if (file.type && $scope.types && $scope.types.indexOf(file.type) < 0){
                    message({type:'error',body:'mensagens.MSG-043'});
                }else{
                    $rootScope.inProgress = true;

                    Upload.upload({
                        url: '/app/rest/arquivo/upload',
                        data: {file: file}
                    }).then(function(arquivo){
                        $scope.submetendo = false;
                        $rootScope.inProgress = false;
                        $scope.ngModel = arquivo.data;

                        if ($scope.onUpload){
                            $scope.onUpload(arquivo.data);
                        }
                    }, function (resp) {
                        $scope.submetendo = false;
                        $rootScope.inProgress = false;
                    }, function (evt) {
                        $scope.submetendo = true;
                        $scope.statusUpload = parseInt(100.0 * evt.loaded / evt.total);
                    }); 
                }
                
            };
        }
    };
});