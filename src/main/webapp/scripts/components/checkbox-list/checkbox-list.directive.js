calvinApp
        .directive('selectChecklist', function() {
            return {
                restrict: 'E',
        scope: {
            model:'=ngModel',
            change:'=',
            options:'=',
            'var':'@',
            itemLabel:'@',
            itemValue:'@',
            trackBy:'@',
            height:'@',
            hideFilter:'=',
            sort:'='
        },
        templateUrl: 'scripts/components/checkbox-list/checkbox-list.html',
        controller: ['$scope', '$timeout', function($scope, $timeout) {
                if (!$scope.height){
                    $scope.height = '200px';
                }
                
                if (!$scope.var){
                    $scope.var = 'var';
                }
                
                if ($scope.itemValue){
                    $scope.value = function(item){
                        var scope = $scope.$new(true);
                        scope[$scope.var] = item;
                        return scope.$eval($scope.itemValue);
                    };
                }else{
                    $scope.itemValue = $scope.var;
                    $scope.value = function(item){
                        return item;
                    };
                }
                
                if ($scope.trackBy){
                    $scope.track = function(item){
                        var scope = $scope.$new(true);
                        scope[$scope.var] = item;
                        return scope.$eval($scope.trackBy);
                    };
                }else{
                    $scope.trackBy = $scope.itemValue;
                    $scope.track = function(item){
                        return $scope.value(item);
                    };
                }
                
                if ($scope.itemLabel){
                    $scope.label = function(item){
                        var scope = $scope.$new(true);
                        scope[$scope.var] = item;
                        return scope.$eval($scope.itemLabel);
                    };
                }else{
                    $scope.itemLabel = $scope.itemValue;
                    $scope.label = function(item){
                        return $scope.value(item);
                    };
                }
                
                $scope.toggleAll = function(){
                    if (!$scope.model){
                        $scope.model = [];
                    }
                    
                    if ($scope.selected.length < $scope.filtered.length){
                        $scope.model = [];
                        $scope.selected = [];
                        $scope.filtered.forEach(function(item){
                            $scope.selected.push(item);
                            $scope.model.push($scope.value(item));
                        });
                    }else{
                        $scope.selected = [];
                        $scope.model = undefined;
                    }
                    if ($scope.change){
                        $timeout($scope.change, 0);
                    }
                };
                
                $scope.applyFilter = function(){
                    if ($scope.filter){
                        var filter = $scope.filter.toUpperCase();
                        $scope.filtered = [];
                        $scope.options.forEach(function(item){
                            if ($scope.label(item).toUpperCase().indexOf(filter) >= 0){
                                $scope.filtered.push($scope.value(item));
                            }
                        });
                    }else{
                        $scope.filtered = $scope.options;
                    }
                        
                    if ($scope.sort && $scope.filtered){
                        $scope.filtered.sort(function(a, b){
                            return $scope.label(a).localeCompare($scope.label(b));
                        });
                    }
                    
                    if ($scope.change){
                        $timeout($scope.change, 0);
                    }
                };
                
                $scope.indexOf = function(item){
                    var track = $scope.track(item);
                    for (var i=0;i<$scope.selected.length;i++){
                        if ($scope.track($scope.selected[i]) == track){
                            return i;
                        }
                    }
                    return -1;
                }
                
                $scope.toggle = function(item){
                    if (!$scope.model){
                        $scope.model = [];
                    }
                    
                    var idx = $scope.indexOf(item);
                    if (idx < 0){
                        $scope.selected.push(item);
                        $scope.model.push($scope.value(item));
                    }else{
                        $scope.selected.push(idx, 1);
                        $scope.model.splice(idx, 1);
                    }
                    
                    if ($scope.selected.length === 0){
                        $scope.model = undefined;
                    }
                    
                    if ($scope.change){
                        $timeout($scope.change, 0);
                    }
                };
                
                $scope.$watch('model.length', function(){
                    $scope.atualizaSelected();
                });
                
                $scope.$watch('options.length', function(){
                    $scope.atualizaSelected();
                    $scope.applyFilter();
                });
                
                $scope.atualizaSelected = function(){
                    $scope.selected = [];
                    if ($scope.model && $scope.options){
                        $scope.model.forEach(function(value){
                            for (var i=0;i<$scope.options.length;i++){
                                if ($scope.itemValue == $scope.var){
                                    if ($scope.track($scope.options[i]) == $scope.track(value)){
                                        $scope.selected.push($scope.options[i]);
                                        break;
                                    }
                                }else{
                                    if ($scope.track($scope.options[i]) == value){
                                        $scope.selected.push($scope.options[i]);
                                        break;
                                    }
                                }
                            }
                        });
                    }
                };
                
                $scope.filter = '';
                $scope.atualizaSelected();
            }]
    };
});