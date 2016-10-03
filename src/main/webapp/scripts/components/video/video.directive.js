calvinApp.directive('videoPlayer', function(){
    return {
        restrict: 'E',
        scope:{
            media: '@',
            urlAlternativa: '@url'
        },
        templateUrl: 'scripts/components/video/video.directive.html',
        controller: ['$scope', '$http', '$window', function($scope, $http, $window){
            $scope.m4v = $scope.media + '.m4v';
            $scope.webm = $scope.media + '.webm';
            $scope.jpg = $scope.media + '.jpg';
        }]
    };
}).directive('videoAjuda', function(){
    return {
        restrict: 'E',
        scope:{
            media:'@',
            header:'@',
            urlAlternativa:'@url'
        },
        template:'<a href="" class="fa fa-question-circle" title="{{\'ajuda.ajuda\' | translate}}" modal-calvin="ajuda"></a>',
        controller: ['$scope', function($scope){
            $scope.ajuda = {
                freeForm:'ajuda',
                controller:['$scope', function(scp){
                    scp.media = $scope.media;
                    scp.url = $scope.url;
                }],
                size:'xlg',
                templateUrl:'scripts/components/video/ajuda.directive.html'
            };
        }]
    };
});