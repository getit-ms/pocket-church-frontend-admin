calvinApp.directive('checkOne', function() {
        return {
            restrict: 'E',
            scope: {
                target:'=target',
                change:'@change',
                item:'=item'
            },
            templateUrl: 'scripts/components/check-one/checkone.directive.html',
            controller: 'CheckOneController'
        };
    })
    .controller('CheckOneController',['$scope', '$timeout', function($scope, $timeout) {
    	$scope.toggle = function(){
    	    if (!$scope.target) $scope.target = [];
    		if ($scope.target.indexOf($scope.item) < 0){
    			$scope.target.push($scope.item);
    		}else{
    			$scope.target.splice($scope.target.indexOf($scope.item), 1);
    		}
    		if ($scope.change){
        		$timeout($scope.change, 0);
    		}
    	};
    }]);

