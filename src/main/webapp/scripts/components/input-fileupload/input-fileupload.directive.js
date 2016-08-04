calvinApp.directive('inputFileupload', function(){
    return {
        restrict: 'E',
        scope:{
            ngModel: '=',
            readonly: '='
        },
        templateUrl: 'scripts/components/input-fileupload/input-fileupload.html',
        controller: function($scope, Restangular, Upload){
            $scope.submetendo = false;
            
            $scope.realizaUpload = function(file){
                Upload.upload({
                    url: '/app/rest/arquivo/upload',
                    data: {file: file}
                }).then(function(arquivo){
                    $scope.submetendo = false;
                    $scope.ngModel = arquivo.data;
                }, function (resp) {
                    $scope.submetendo = false;
                }, function (evt) {
                    $scope.submetendo = true;
                    $scope.statusUpload = parseInt(100.0 * evt.loaded / evt.total);
                }); 
            };
        }
    };
});