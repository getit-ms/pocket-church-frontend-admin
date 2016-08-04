calvinApp.directive('checkAll', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                target:'=target',
                change:'@change',
                source:'=source'
            },
            templateUrl: 'scripts/components/check-all/checkall.directive.html',
            controller: 'CheckAllController'
        };
    })
    .controller('CheckAllController',['$scope', '$timeout', function($scope, $timeout) {
    	$scope.toggleAll = function(){
    	    if (!$scope.target) $scope.target = [];
    		if ($scope.target.length < $scope.source.length){
        		$scope.target = [];
    			$scope.source.forEach(function(item){
    				$scope.target.push(item);
    			});
    		}else{
        		$scope.target = [];
    		}
    		if ($scope.change){
        		$timeout($scope.change, 0);
    		}
    	};
    }]);

