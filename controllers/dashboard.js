var app = angular.module('dashboard',['toggle-fullscreen','account-module','dashboard-module']);

app.controller('dashboardCtrl',function($scope,fullscreen,test_users) {
    
 

    $scope.manageUsers=test_users;
    $scope.manageUsers.start($scope);

    $scope.formHolder={};
	$scope.views = {};
	$scope.fullscreen =  fullscreen;

});