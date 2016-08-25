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
        controller: function($scope, Upload, message){
            if (typeof $scope.types === 'string'){
                $scope.types = [$scope.types];
            }
            
            $scope.submetendo = false;
            
            $scope.realizaUpload = function(file){
                
                if ($scope.types && $scope.types.indexOf(file.type) < 0){
                    message({type:'error',body:'mensagens.MSG-043'});
                }else{
                    Upload.upload({
                        url: '/app/rest/arquivo/upload',
                        data: {file: file}
                    }).then(function(arquivo){
                        $scope.submetendo = false;
                        $scope.ngModel = arquivo.data;

                        if ($scope.onUpload){
                            $scope.onUpload(arquivo.data);
                        }
                    }, function (resp) {
                        $scope.submetendo = false;
                    }, function (evt) {
                        $scope.submetendo = true;
                        $scope.statusUpload = parseInt(100.0 * evt.loaded / evt.total);
                    }); 
                }
                
            };
        }
    };
});