var app = angular.module('dashboard',['toggle-fullscreen','account-module']);

app.controller('dashboardCtrl',function($scope,fullscreen) {
    
	
    $scope.formHolder={};
	$scope.views = {};
	$scope.fullscreen =  fullscreen;

});