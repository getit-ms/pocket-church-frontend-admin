calvinApp.directive('renderMessage', [function(){
        return {
            restrict: 'AEC',
            replace: true,
            templateUrl: 'scripts/components/template/message/message.directive.html',            		       
            controller: 'MessageController'
        };		
    }]).controller('MessageController', ['$scope', function($scope){						
        
        //$scope.$on('ngRepeatMessageFinished', function(ngRepeatMessageFinished){
        //	$scope.cleanMessages();
        //});
        
    }]).directive('onRepeatMessageFinish', ['$timeout', '$rootScope', function($timeout, $rootScope){
        return {
            restrict:'A',
            link: function(scope, element, attrs){
                scope.elementDiv = element;
                
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatMessageFinished');
                    }, 100);
                }
                
                $rootScope.messages[$rootScope.messages.length -1].scope = scope;
            }
        };
    }]).run(['$rootScope', '$timeout', '$q', '$translate', '$window', 'toaster', function($rootScope, $timeout, $q, $translate, $window, toaster){
        $rootScope.messages = [];
        
        $rootScope.visible = true;
        
        $rootScope.addMessage = function(message, translateParams){
            $rootScope.cleanMessages();
            
            $window.scrollTo(0, 0);
            
            $rootScope.visible = false;
            
            function resolver(text){
                message.msg = text;
                $rootScope.messages.push(message);
                
                $timeout(function() {
                    $rootScope.visible = true;
                });
            }
            $translate(message.msg, translateParams).then(resolver, resolver);
            
        };
        
        $rootScope.closeMessage = function(childScope){
            childScope.elementDiv.remove();
        };
        
        $rootScope.cleanMessages = function(){
            $rootScope.messages = [];
        };
        
        $rootScope.closeAllMessages = function(){
            for(var index in $rootScope.messages){
                var message = $rootScope.messages[index];
                $rootScope.closeMessage(message.scope);
            }
        };
        
        $rootScope.$on('$stateChangeStart', function(){
            $rootScope.closeAllMessages();
            toaster.clear();
        });
        
    }]
        );