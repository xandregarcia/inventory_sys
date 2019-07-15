angular.module('account-module',['bootstrap-growl','bootstrap-modal','form-validator']).factory('test_users', function($http,$timeout,$compile,growl,validate,bootstrapModal){

	function test_users(){			// The main function of your controller.

		var self = this;

		self.start = function(scope) {

			scope.user = {};		// Object.
			scope.user.id = 0;	// Object default id value.

			scope.users = [];	// Collection | Array of objects.
                        
            scope.controls = {
				ok: {btn: false, label: 'Save'},
				cancel: {btn: false, label: 'Cancel'},
            };
            
			scope.btns = {
				add: false,
				cancel: {
					control: false,
					label: 'Cancel'
				}
			};

            self.list(scope);
            
		
				
		};
		
		self.list = function(scope) {

			if (scope.$id>2) scope = scope.$parent;	

			$('#content').html('Loading...');			

			scope.btns.add = false;
			scope.btns.cancel.label = 'Cancel';

			$http({
				url: 'handlers/user-list.php',
				method: 'GET'					// Fetching purposes only.
			}).then(function success(res) {
				
				scope.users = res.data;	// Saves fetched data to the object.
				
				$('#content').load('lists/users.html', function() {
					
					$compile($('#content')[0])(scope);
                        
					//instantiate datable
					$timeout(function() {
				        $('#tablecontain').dataTable({
							"ordering": true,
                         "processing": true
                            

						});	
					 },500);					
					
				});				
				
			}, function error(res){
				
			});	

		};		
		self.save = function(scope){

		if (validate.form(scope,'user')){ 
				growl.show('alert alert-danger',{from: 'top', amount: 55},'Please complete required fields.');
				return;
			};

		if ((scope.user.stock_id && scope.user.color)==null)
			{

				alert('Fields Required');
				
			} else {

				$http({
					url: 'handlers/user-save.php',
					method: 'POST',					// Posting value to the database.
					data: scope.user
				}).then(function success(res){

					self.list(scope);
					growl.show('alert alert-success',{from: 'top', amount: 55},'Success');

					scope.user = {};				// Reset object to empty after saving.
					scope.user.id = 0;			// Reset id value to 0 after saving.

									// Refreshes the list.
					
				}, function error(res){
					//error
				});

			}

		};

		self.user = function(scope,user) {					
			
			if (scope.$id>2) scope = scope.$parent;		// Value may go under parent, use to call value inside the parent.

			scope.btns.add = true;

			if(user == null) {			// When empty, set the object and id to empty.

				scope.user = {};
				scope.user.id = 0;
				
				scope.btns.cancel.label = 'Cancel';			
				
			} else {
				
				scope.btns.cancel.label = 'Close';

				$http({
					url: 'handlers/user-edit.php',
					method: 'POST',
					data: {id: user.id}
				}).then(function success(res) {
                    
                    scope.user = res.data;
                    

				}, function error(res) {
					
				});
				
			}

			$('#content').html('Loading...');
			
			$('#content').load('forms/user.html', function() {
				
				$compile($('#content')[0])(scope);				
				
			});			
            
	    
        };
        
        self.delete=function(scope,user){
		

            var onOk =function(){
            
            if (scope.$id > 2) scope = scope.$parent;	
            $http({
                url:'handlers/user-delete.php',
                method:'POST',
                data:{id:[user.id]}
            }).then(function success(response){
                
                growl.show('alert alert-success',{from: 'top', amount: 55},'Successfully deleted');
                self.list(scope);
        
            },function error(response){
    
            });
        };
        bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
                
        };
        
        };
    
	return new test_users();		// Returns new value of a class.
});