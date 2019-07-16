var app = angular.module('users',['toggle-fullscreen','account-module','user-module']);

app.controller('usersCtrl',function($scope,fullscreen,test_users) {

    $scope.formHolder={};
	
	$scope.views = {};
		
    $scope.fullscreen =  fullscreen;
    
	test_users.start($scope);
	test_users.list($scope);
	
	$scope.test_users = test_users;

});