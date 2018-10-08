var appControllers = angular.module('portalapp.controllers',[ 'ngAnimate', 'ngSanitize', 'ngMaterial', 'ngMessages']) 


appControllers.controller('FeaturedApps', ['$scope','$window','$log', 'ExperimentMetadata', 'Category', '$filter',
                                                     	function($scope, $window, $log, ExperimentMetadata, Category,$filter ) {
                         	
        	var orderBy = $filter('orderBy');
         	$scope.apps = ExperimentMetadata.query(function() {
        		    $scope.apps = orderBy($scope.apps, 'name', true);
        		    
        		    
        		    
        		    angular.forEach($scope.apps, function(app, key) {
        		    	if ( app.iconsrc.indexOf( 'unknown' ) !== -1 ){
        		    		app.iconsrc = "images/experiment.png";
        			  		console.log("app.iconsrc = " + app.iconsrc);
        			  	  }
        		    	
        				});
        		    
         		  }); 
         	
         	
         	
}]);
         	
         	
appControllers.controller('UserListController', ['$scope','$window','$log', 'PortalUser', 'popupService', 'ngDialog',
                            	function($scope, $window, $log, PortalUser, popupService, ngDialog) {
	
	

	$scope.portalusers = PortalUser.query(function() {
		    //console.log($scope.portalusers);
		  }); //query() returns all the portalUsers
		 
	
	
	 $scope.deletePortalUser = function(gridItem, useridx, username, name){

		 	$log.debug("Selected to DELETE User with userID = "+ useridx);
		 	

		 	var portaluser=PortalUser.get({id:useridx}, function() {
			    $log.debug("WILL DELETE User with ID "+ portaluser.id);
			    
		        if(popupService.showPopup('Really delete user '+name+' with username "'+username+'" ?')){
		        	$log.debug("WILL DELETE User with $scope.portaluser.id = "+ portaluser.id);
				 	
		        	portaluser.$delete(function(){
		    			$scope.portalusers.splice($scope.portalusers.indexOf(gridItem),1)
		            });
		        
		        }
		 	});
	    }
	 
	 $scope.clickToOpen = function (gridItem) {
	        ngDialog.open({ 
	        	template: 'UserView.html',
	        	controller : ['$scope', 'PortalUser', function( $scope,  PortalUser){
	        	    $scope.portaluser=PortalUser.get({id:gridItem});
	        	    $log.debug("WILL GET User with ID "+gridItem);   
	    			}],
	    		className: 'ngdialog-theme-default'
	    		
	        	});
	    };
	    
}]);

appControllers.controller('UserViewController', ['$scope', '$route', '$routeParams', '$location', 'PortalUser', '$anchorScroll',
                                                 function( $scope, $route, $routeParams, $location, PortalUser, $anchorScroll){
    $scope.portaluser=PortalUser.get({id:$routeParams.id});
    
	$scope.name = "UserViewController";
	$scope.params = $routeParams;
	
	

}]);

appControllers.controller('UserAddController',function($scope, $location, PortalUser){

    $scope.portaluser=new PortalUser();
    $scope.addPortalUser=function(){
        $scope.portaluser.$save(function(){
			$location.path("/users");
        });
    }

});

appControllers.controller('UserEditController', ['$scope', '$route', '$routeParams', '$location', 'PortalUser', '$anchorScroll',
        function( $scope, $route, $routeParams, $location, PortalUser, $anchorScroll){


    //console.log("WILL EDIT User with ID "+$routeParams.id);
	
    $scope.updateUser=function(){

	    console.log( $scope.portaluser );		
        console.log("$scope.password = "+$scope.password);
        console.log("$scope.retypepassword = "+$scope.retypepassword);
        console.log("$scope.portaluser.password = " + $scope.portaluser.password );
    	if ( ($scope.password) && ($scope.password === $scope.retypepassword))
    		$scope.portaluser.password= $scope.password;
    	else {
            //console.log("Will send to server empty password to keep old one ");
    		$scope.portaluser.password= ''; //send empty to server, so not to change!
    	}
        console.log("$scope.portaluser.password = " + $scope.portaluser.password );
    	
        $scope.portaluser.$update(function(){
			$location.path("/users");
        });
    };

    $scope.loadUser=function(){
        $scope.portaluser=PortalUser.get({id:$routeParams.id}, function() {    
    	    $scope.portaluser.password='';
    	    console.log( $scope.portaluser );		
    	});  
    	
    };

    $scope.loadUser();
    
}]);

appControllers.directive('equals', function() {
	  return {
	    restrict: 'A', // only activate on element attribute
	    require: 'ngModel', // get a hold of NgModelController
	    link: function(scope, elem, attrs, ngModel) {
	        //console.log("IN LINK! ");
	      if(!ngModel) return; // do nothing if no ng-model

	        //console.log("PASS IN LINK! ");
	      // watch own value and re-validate on change
	        
	      scope.$watch(attrs.ngModel, function() {
	        validate();
	      });

	      // observe the other value and re-validate on change
	      attrs.$observe('equals', function (val) {
	        validate();
	      });

	      var validate = function() {
	        // values
	        var val1 = ngModel.$viewValue;
	        var val2 = attrs.equals;

	        //console.log("val1= "+val1);
	        //console.log("val2= "+val2);
	        // set validity
	        ngModel.$setValidity('passwordVerify', ! val1 || ! val2 || val1 === val2);
	      };
	    }
	  }
	});




appControllers.controller('SubscribedResourceListController', ['$scope','$window','$log', 'SubscribedResource', 'popupService','ngDialog',
                                             	function($scope, $window, $log, SubscribedResource, popupService, ngDialog ) {
                 	
                 	

 	$scope.subscribedresources = SubscribedResource.query(function() {
 		    //console.log($scope.subscribedresources);
 		  }); //query() returns all the subscribedresources
 		 
 	
 	
 	 $scope.deleteSubscribedResource = function(gridItem, useridx, url){

 		 $log.debug("Selected to DELETE SubscribedResource with id = "+ useridx);
 		 	

 		 	var subscribedresource=SubscribedResource.get({id:useridx}, function() {
 			    $log.debug("WILL DELETE SubscribedResource with ID "+ subscribedresource.id);
 			    
 		        if(popupService.showPopup('Really delete SubscribedResource '+subscribedresource.id+'" ?')){
 				 	
 		        	subscribedresource.$delete(function(){
 		    			$scope.subscribedresources.splice($scope.subscribedresources.indexOf(gridItem),1)
 		            });
 		        
 		        }
 		 	});
 	    }
 	 
 	 $scope.clickToOpen = function (gridItem, useridx, url) {
        ngDialog.open({ 
        	template: 'SubscribedResourceView.html',
        	controller : ['$scope', 'SubscribedResource', function( $scope,  SubscribedResource){
        	    $scope.subscribedresource=SubscribedResource.get({id:useridx});
        	    var i =SubscribedResource.get({id:useridx});
        	    //console.log("WILL GET SubscribedResource with ID "+useridx);
        	    //console.log("WILL GET SubscribedResource with i "+i.id);	        	    
    			}],
    		className: 'ngdialog-theme-default'
    		
        	});
    };

              	
                 	 
}]);

appControllers.controller('SubscribedResourceViewController', ['$scope', '$route', '$routeParams', '$location', 'SubscribedResource', '$anchorScroll', 
                                                 function( $scope, $route, $routeParams, $location, SubscribedResource, $anchorScroll){
    $scope.subscribedresource=SubscribedResource.get({id:$routeParams.id});
    var i =SubscribedResource.get({id:$routeParams.id});
    //console.log("WILL GET SubscribedResource with ID "+$routeParams.id);
    //console.log("WILL GET SubscribedResource with i "+i.id);
    
	$scope.name = "SubscribedResourceViewController";
	$scope.params = $routeParams;
	
	  

}]);

appControllers.controller('SubscribedResourceAddController',function($scope, $rootScope,$location, SubscribedResource){

    $scope.subscribedresource=new SubscribedResource();
	$scope.subscribedresource.owner = $rootScope.loggedinportaluser;

    $scope.addSubscribedResource=function(){
        $scope.subscribedresource.$save(function(){
			$location.path("/subscribed_resources");
        });
    }

});

appControllers.controller('SubscribedResourceEditController', ['$scope', '$route', '$routeParams', '$location', 'SubscribedResource', '$anchorScroll',
        function( $scope, $route, $routeParams, $location, SubscribedResource, $anchorScroll){


    //console.log("WILL EDIT SubscribedResource with ID "+$routeParams.id);
	
    $scope.updateSubscribedResource=function(){
        $scope.subscribedresource.$update(function(){
			$location.path("/subscribed_resources");
        });
    };

    $scope.loadSubscribedResource=function(){
        $scope.subscribedresource=SubscribedResource.get({id:$routeParams.id});
    };

    $scope.loadSubscribedResource();
}]);


//experiments controller


appControllers.controller('ExperimentListController', ['$scope','$window','$log', 'AdminExperimentMetadata', 'popupService','ngDialog',
                                             	function($scope, $window, $log, AdminExperimentMetadata, popupService, ngDialog ) {
                 	
                 	

 	$scope.apps = AdminExperimentMetadata.query(function() {	 		
	 		angular.forEach( $scope.apps , function( app, appkey) {
	    		
	 			if ( app.iconsrc.indexOf( 'unknown' ) !== -1 ){
		    		app.iconsrc = "images/experiment.png";
			  		console.log("app.iconsrc = " + app.iconsrc);
			  	  }
	 		});

 		  }); //query() returns all the subscribedresources
 		 
 	
 	
 	 $scope.deleteApp = function(gridItem, useridx){

 		$log.debug("Selected to DELETE AdminExperimentMetadata with id = "+ useridx);
 		 	

 		 	var app=AdminExperimentMetadata.get({id:useridx}, function() {
 			    $log.debug("WILL DELETE AdminExperimentMetadata with ID "+ app.id);
 			    
 		        if(popupService.showPopup('Really delete Application "'+app.name+'" ?')){
 				 	
 		        	app.$delete(function(){
 		    			$scope.apps.splice($scope.apps.indexOf(gridItem),1)
 		            }, function errorCallback(response) {
  		               alert( response.statusText + " - Failed to delete! " + response.data["message"]  );
  		           });
 		        
 		        }
 		 	});
 	    }
 	          	
                 	 
}]);

appControllers.controller('ExperimentAddController', function($scope, $location,
		AdminExperimentMetadata, PortalUser, $rootScope, $http,formDataObject, Category,$filter,APIEndPointService, Container, DeployArtifact, ExperimentMetadata) {

	
	$scope.exprm = new AdminExperimentMetadata();
	$scope.exprm.owner = $rootScope.loggedinportaluser;//PortalUser.get({id:$rootScope.loggedinportaluser.id});
	$scope.exprm.extensions=[];


	var orderBy = $filter('orderBy');
	$scope.categories = Category.query(function() {
		$scope.categories = orderBy($scope.categories, 'name', false);
		
	}); 
	
    
	$scope.addExperiment = function() {
		$scope.exprm.$save(function() {
			$location.path("/experiments");
		});
	}
	
	
	$scope.addExtension= function(vxf){
		console.log('addExtension');
		var e={};
		e.name = 'param';
		e.value = 'val';
    	
    	$scope.exprm.extensions.push(e);
	}
	
	$scope.removeRow = function(ext) {
		$scope.exprm.extensions.splice( $scope.exprm.extensions.indexOf(ext) ,1);
	};
	
	
	
	
	$scope.submitNewExperiment = function submit() {
		

		return $http({
			method : 'POST',
			url : APIEndPointService.APIURL+'services/api/repo/admin/experiments/',
			headers : {
				'Content-Type' : 'multipart/form-data'
			},
            //This method will allow us to change how the data is sent up to the server
            // for which we'll need to encapsulate the model data in 'FormData'
			transformRequest: formDataObject,
            //Create an object that contains the model and files which will be transformed
            // in the above transformRequest method
            data: { 
            		exprm: angular.toJson( $scope.exprm, false), 
            		prodIcon: $scope.uploadedExperimentIcon,
            		prodFile: $scope.uploadedExperimentFile
            		}
			
            
		}).then(function(response) {
			$location.path("/experiments");
		}, function errorCallback(response) {
            alert( response.statusText + " - Failed to read uploaded archive! " + response.data["message"]  );
        }); 	

	};
	
});

appControllers.controller('ExperimentUploadController', function($scope, $location,
		AdminExperimentMetadata, PortalUser, $rootScope, $http,formDataObject, Category,$filter,APIEndPointService, Container, DeployArtifact, ExperimentMetadata) {

	
	$scope.exprm = new AdminExperimentMetadata();
	$scope.exprm.owner = $rootScope.loggedinportaluser;//PortalUser.get({id:$rootScope.loggedinportaluser.id});
	$scope.exprm.extensions=[];


	var orderBy = $filter('orderBy');
	$scope.categories = Category.query(function() {
		$scope.categories = orderBy($scope.categories, 'name', false);
		
	}); 
	
    
	$scope.addExperiment = function() {
		$scope.exprm.$save(function() {
			$location.path("/experiments");
		});
	}
	
		
	
	
	$scope.submitNewExperiment = function submit() {
		

		return $http({
			method : 'POST',
			url : APIEndPointService.APIURL+'services/api/repo/admin/experiments/',
			headers : {
				'Content-Type' : 'multipart/form-data'
			},
            //This method will allow us to change how the data is sent up to the server
            // for which we'll need to encapsulate the model data in 'FormData'
			transformRequest: formDataObject,
            //Create an object that contains the model and files which will be transformed
            // in the above transformRequest method
            data: { 
            		exprm: angular.toJson( $scope.exprm, false), 
            		prodIcon: $scope.uploadedExperimentIcon,
            		prodFile: $scope.uploadedExperimentFile
            		}
			
            
		}).then(function(response) {
			$location.path("/experiments");
		}, function errorCallback(response) {
            alert( response.statusText + " - Failed to read uploaded archive! " + response.data["message"]  );
        }); 	

	};
	

});


appControllers.directive("contenteditable", function() {
	  return {
	    require: "ngModel",
	    link: function(scope, element, attrs, ngModel) {

	      function read() {
	        ngModel.$setViewValue(element.html());
	      }

	      ngModel.$render = function() {
	    	  var t = ngModel.$viewValue;
	    	  t =  encodeURI(t);
	        element.html( t || "");
	      };

	      element.bind("blur keyup change", function() {
	        scope.$apply(read);
	      });
	    }
	  };
	});

appControllers.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});



appControllers.directive('popover', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).popover('show');
            }, function(){
                // on mouseleave
                $(element).popover('hide');
            });
        }
    };
});


appControllers.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

appControllers.directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
        	
        	
            
            el.bind('change', function (event) {
                var files = event.target.files;
                scope.$emit("fileSelectedClearPrevious", {});
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i] });
                }                                       
            });
        }
    };
});

appControllers.controller('ExperimentEditController', ['$scope', '$route', '$routeParams', '$location', 
                                                'AdminExperimentMetadata', '$anchorScroll','$http', 'formDataObject', 'cfpLoadingBar', 'Category', '$filter', 'APIEndPointService', 
                                                'AdminMANOprovider', 'ExperimentOnBoardDescriptor', 'AdminMANOplatform', '$interval', 'popupService',
     function( $scope, $route, $routeParams, $location, AdminExperimentMetadata, $anchorScroll,
    		 $http,formDataObject, cfpLoadingBar, Category, $filter, APIEndPointService, AdminMANOprovider, 
    		 ExperimentOnBoardDescriptor, AdminMANOplatform, $interval, popupService ){
	
	
    
	$scope.onboardToMANOprovider = function() {
    	console.log('onboardToMANOprovider');
//    	var contnr = new ExperimentOnBoardDescriptor();
//    	$scope.exprm.experimentOnBoardDescriptors.push(contnr);
//    	$scope.activeExperimentOnBoardDescriptor = contnr;   
//    	$scope.submitUpdateExperiment( false );  //save Experiment with the new descriptor added 

    	addOnBoardDescriptorExperiment( $scope.exprm );
	};
	
	
	addOnBoardDescriptorExperiment = function( aExp ) {

    	console.log("addOnBoardDescriptorExperiment for aExp id = " + aExp.id );

        return $http({
			method : 'POST',
			url : APIEndPointService.APIURL+'services/api/repo/admin/experimentobds/',
			headers : {
				'Content-Type' : 'application/json'
			},

            data: aExp
			
            
		}).then(function successCallback( response ) {			
			//we need to reload the Experiment
	        $scope.exprm = JSON.parse(  JSON.stringify(response.data)  );
	    	syncScreenData(  $scope.exprm, $scope.categories );
	    	$scope.activeExperimentOnBoardDescriptor = $scope.exprm.experimentOnBoardDescriptors[ $scope.exprm.experimentOnBoardDescriptors.length-1 ];
	        
		}),
        function error (response) {
            alert("failed! "+response.status);
        }; 	  	   
        
        //sareturn avobd;
        
    };
	
	$scope.deleteExperimentOnBoardDescriptor = function( eOnBoardDescriptor ) {

    	console.log("ExperimentOnBoardDescriptor from Experiment" + eOnBoardDescriptor.id );
        if(popupService.showPopup('Really delete MANO on-boarding "'+ eOnBoardDescriptor.id+'" ?')){    	
		 	var dep=ExperimentOnBoardDescriptor.get({id:eOnBoardDescriptor.id}, function() {
		 		
			    
				 	
		        	dep.$delete(function(){
	
		        		console.log("DELETED eOnBoardDescriptor.id "+ eOnBoardDescriptor.id);
		 			    $scope.exprm.experimentOnBoardDescriptors.splice( $scope.exprm.experimentOnBoardDescriptors.indexOf(eOnBoardDescriptor), 1  );
		 			    syncScreenData(  $scope.exprm, $scope.categories );
		            }, function(error) {
		            	$window.alert("Cannot delete: "+error.data);
		            });
		        
		 	}); 
        }
    	  
        //No need to save the experiment. With Delete the backend API model is updated
    	//$scope.submitUpdateExperiment( false );  //save experiment with the new descriptor added 
	};
	

	$scope.isActive=function(c) {
        return $scope.activeExperimentOnBoardDescriptor === c;
    };
    
    
	 $scope.activateVOBD =function(c) {
	        return $scope.activeExperimentOnBoardDescriptor = c;
	    };
	    	    

	    
	$scope.selectedMANOProviders = AdminMANOprovider.query(function() {
		    $scope.mpTotalNumber = $scope.selectedMANOProviders.length;
		    $scope.MANOProviders = orderBy($scope.selectedMANOProviders, 'name', false);
		     
	});
	
	
	  $scope.onBoardExperiment = function( eOnBoardedDescriptor, selMANOProvider) {

	    	console.log("onBoardexperiment" + eOnBoardedDescriptor.deployId + ", " + selMANOProvider.name);
	        //var avobd = eOnBoardedDescriptor;
	        //here we contact API and eventually do the onboarding
	        //eOnBoardedDescriptor.onBoardingStatus = 'ONBOARDED';
	        //eOnBoardedDescriptor.lastOnboarding = new Date();
	    	eOnBoardedDescriptor.obMANOprovider = selMANOProvider;
	        
	    	eOnBoardedDescriptor.onBoardingStatus = 'ONBOARDING';

	        return $http({
				method : 'PUT',
				url : APIEndPointService.APIURL+'services/api/repo/admin/experimentobds/'+ eOnBoardedDescriptor.id +'/onboard',
				headers : {
					'Content-Type' : 'application/json'
				},

	            data: eOnBoardedDescriptor
				
	            
			}).then(function successCallback( response ) {			

		        console.log("onBoardExperiment successCallback");
		        var d = JSON.parse(  JSON.stringify( response.data )  );		        
		        var expobdToSync = $scope.exprm.experimentOnBoardDescriptors[ $scope.exprm.experimentOnBoardDescriptors.indexOf(eOnBoardedDescriptor) ];
		        expobdToSync.onBoardingStatus = d.onBoardingStatus;
		        expobdToSync.deployId = d.deployId;
		        expobdToSync.lastOnboarding = d.lastOnboarding;
		        expobdToSync.vxfMANOProviderID = d.vxfMANOProviderID;
		        
		        $scope.checkOBVDStatus( expobdToSync );
		        

		        		
		        
			}),
	        function error (response) {
	            alert("failed! "+response.status);
	        }; 	  	   
	        
	        //sareturn avobd;
	        
	    };
	    
	 $scope.checkOBVDStatus = function( eOnBoardedDescriptor) {
	        var interval=5000;
	        var retry = 0;
	        var i = $interval(function(){ //make an interval to check every 5sec the status of the VxF onboarding
	  	      interval += 5000;
	  	      try {
	  	    	  var vobd = eOnBoardedDescriptor;
	  	    	  console.log("CheckStatusOfOBVD vxfobdToSync " + vobd.id);
	  	    		 
	  	    	 if( vobd.onBoardingStatus === 'ONBOARDED' ){ //when window closes without login
		  	    	  console.log("Will cancel CheckStatusOfOBVD vxfobdToSync for " + vobd.id);
	  	      			$interval.cancel(i);
	  	      		}
	  	    	  
	  	    	  retry = retry+1;
	  	    	  if ( retry> 4){ 
		  	    	  console.log("Will cancel max retries CheckStatusOfOBVD vxfobdToSync for " + vobd.id);
	  	      			$interval.cancel(i);	  
	  	    	  }
	  	    	  
	  	    	  //here make a get
		  	        return $http({
		  				method : 'GET',
		  				url : APIEndPointService.APIURL+'services/api/repo/admin/experimentobds/'+ eOnBoardedDescriptor.id +'/status',
		  				headers : {
		  					'Content-Type' : 'application/json'
		  				},
	
		  	            data: eOnBoardedDescriptor
		  				
		  	            
		  			}).then(function successCallback( response ) {			

				        console.log("checkOBVDStatus successCallback");
		  		        var d = JSON.parse(  JSON.stringify( response.data)  );		        
		  		        var expobdToSync = $scope.exprm.experimentOnBoardDescriptors[ $scope.exprm.experimentOnBoardDescriptors.indexOf(eOnBoardedDescriptor) ];
		  		        expobdToSync.onBoardingStatus = d.onBoardingStatus;
		  		        expobdToSync.deployId = d.deployId;
		  		        expobdToSync.lastOnboarding = d.lastOnboarding;
		  		        expobdToSync.vxfMANOProviderID = d.vxfMANOProviderID;	
		  		        		
		  		        
		  			}),
			        function error ( response ) {
			            alert("failed! "+ response.status);
			        }; 	 		        
	  		        
		  		  
	  	    	 
	  	    	  
	  	      		
	  	      } catch(e){
	  	        console.error(e);
	  	      }
	  	    }, interval);
	        		        
	 };
	    
	  $scope.removeExperimentFromMANO = function( eOnBoardedDescriptor, expr) {
		  	if(popupService.showPopup('Really off-board '+expr.name+' from MANO Provider"'+ eOnBoardedDescriptor.id+'" ?')){
		        console.log("offBoardExperiment" + eOnBoardedDescriptor.deployId );
		
		        eOnBoardedDescriptor.onBoardingStatus = 'OFFBOARDING';

		        return $http({
					method : 'PUT',
					url : APIEndPointService.APIURL+'services/api/repo/admin/experimentobds/'+ eOnBoardedDescriptor.id +'/offboard',
					headers : {
						'Content-Type' : 'application/json'
					},

		            data: eOnBoardedDescriptor
					
		            
				}).then(function successCallback(response) {			
			        console.log("removExperimentFromMANO successCallback");

			        var d = JSON.parse(  JSON.stringify(response.data)  );		        
			        var expobdToSync = $scope.exprm.experimentOnBoardDescriptors[ $scope.exprm.experimentOnBoardDescriptors.indexOf(eOnBoardedDescriptor) ];
			        expobdToSync.onBoardingStatus = d.onBoardingStatus;
			        expobdToSync.deployId = d.deployId;
			        expobdToSync.lastOnboarding = d.lastOnboarding;
			        expobdToSync.vxfMANOProviderID = d.vxfMANOProviderID;
			    	//$scope.activeExperimentOnBoardDescriptor = $scope.vxf.vxfOnBoardedDescriptors.indexOf( d ) ;
			        
			        //$scope.checkOBVDStatus( expobdToSync );			        			        					        
				},
		        function errorCallback(response) {
			        avxfOnBoardedDescriptor.onBoardingStatus = 'ONBOARDED';			        
					alert(response.data);
		        }); 	   
		        
	        }
	        
	    };   
	    
	 $scope.submitUpdateExperiment = function submit(closeWindow) {

		 var catidsCommaSeparated = '';
		 angular.forEach ( $scope.exprm.categories, function(categ, categkey) {
			 catidsCommaSeparated = catidsCommaSeparated+categ.id+',';
		 });
		 		 
			return $http({
				method : 'PUT',
				url : APIEndPointService.APIURL+'services/api/repo/admin/experiments/'+$routeParams.id,
				headers : {
					'Content-Type' : 'multipart/form-data'
				},
				data : {
					exprm: angular.toJson( $scope.exprm, false ),					
					prodIcon: $scope.uploadedVxFIcon,
					prodFile: $scope.uploadedExperimentFile,
					//file : $scope.file
				},
				transformRequest : formDataObject
			}).then(function(response) {			

//		        console.log("data: " + data);
		        $scope.exprm = JSON.parse(  JSON.stringify(response.data)  );
		        
				if (closeWindow){
					$location.path("/experiments");					
				} else {
			    	syncScreenData(  $scope.exprm, $scope.categories );
			    	$scope.activeExperimentOnBoardDescriptor = $scope.exprm.experimentOnBoardDescriptors[ $scope.exprm.experimentOnBoardDescriptors.length-1 ];
				}
			}, function errorCallback(response) {
	            alert( response.statusText + " - Failed to update NSD! " + response.data["message"]  );
	        });
		};
		
		
	var orderBy = $filter('orderBy');
	$scope.categories = Category.query(function() {
		$scope.categories = orderBy($scope.categories, 'name', false);
		$scope.loadExperiment($scope.categories);
	}); 

	
	

    $scope.loadExperiment=function(cats){

    	var orderBy = $filter('orderBy');

        
    	var exp = AdminExperimentMetadata.get({id:$routeParams.id}, function() {    		
    		syncScreenData( exp, cats );    		
    	});         	 	
    };

    
    var syncScreenData = function( myexp, cats ){
		//synch categories with local model
		var categoriesToPush=[];
   	 	angular.forEach(myexp.categories, function(myvxfcateg, myvxfcategkey) {
	    		
	    		angular.forEach(cats, function(categ, key) {
   	    		if (myvxfcateg.id === categ.id){
   	    			categoriesToPush.push(categ);
   	    		}
	    		});
	 	});
		
   	 myexp.categories=[];//clear everything
		//now re add the categories to synchronize with local model
		angular.forEach(categoriesToPush, function(cat, key) {
			myexp.categories.push(cat);
		});	 			
		

	
		
		
		
		$scope.exprm = myexp;
		
		manoProviderId = myexp.experimentOnBoardDescriptors.length - 1;
		$scope.activeExperimentOnBoardDescriptor = myexp.experimentOnBoardDescriptors[0];
		
		//sync with local model
		angular.forEach( myexp.experimentOnBoardDescriptors, function(myvxobd, myvxfobdkey) {
			if (myvxobd.obMANOprovider != null){

				angular.forEach( $scope.selectedMANOProviders, function(pr, key) {
		  	    	
	   	    		if (myvxobd.obMANOprovider.id === pr.id){
	   	    			myvxobd.obMANOprovider = pr;
	   	    		}
		    	});
			}
			
		});
		
		
	};
	
	
	
	
    
	$scope.addExtension= function(vxf){
		console.log('addExtension');
		var e={};
		e.name = 'param';
		e.value = 'val';
    	
    	$scope.myexp.extensions.push(e);
	}
		
	$scope.removeRow = function(ext) {
		$scope.myexp.extensions.splice( $scope.myexp.extensions.indexOf(ext) ,1);
	};
	
	
	$('.table-remove').click(function () {
		  $(this).parents('tr').detach();
	});

    
}]);


appControllers.controller('ExperimentViewController', ['$scope', '$route', '$routeParams', '$location', 'ExperimentMetadata',
                                                 function( $scope, $route, $routeParams, $location, ExperimentMetadata ){
    $scope.exprm = ExperimentMetadata.get({id:$routeParams.id}, function() {

  	  $scope.tabs = [
  		    { id:0, title:'Description', content:$scope.exprm.longDescription },
  		    { id:1, title:'Terms of use', content: '<pre>' + $scope.exprm.termsOfUse + '</pre>' },
  		    { id:1, title:'Descriptor', content: '<pre>' + $scope.exprm.descriptorHTML + '</pre>'  },
  		    { id:1, title:'Descriptor (YAML)', content: '<pre>' + $scope.exprm.descriptor + '</pre>'  }
  		  ];
  	  
  	  $scope.tab = $scope.tabs[0];
  	  
  	  if ( $scope.exprm.iconsrc.indexOf( 'unknown' ) !== -1 ){
  		$scope.exprm.iconsrc = "images/experiment.png";
  		console.log("$scope.exprm.iconsrc = " + $scope.exprm.iconsrc);
  	  }
  	
  	
	});         
  
  $scope.isActive=function(c) {
      return $scope.tab === c;
  };
  
  
	 $scope.activate =function(c) {
	        return $scope.tab = c;
	    }

}]);



appControllers.controller('CategoriesListController', ['$scope','$window','$log', 'Category', 'popupService','ngDialog',
                                             	function($scope, $window, $log, Category, popupService, ngDialog ) {
                 	
                 	

 	$scope.categories = Category.query(function() {
 		    //console.log($scope.categories);
 		  }); //query() returns all the categories
 		 
 	
 	
 	 $scope.deleteCategory = function(gridItem, useridx){

 		 	//console.log("Selected to DELETE Categorywith id = "+ useridx);
 		 	

 		 	var cat=Category.get({id:useridx}, function() {
 			    $log.debug("WILL DELETE Category with ID "+ cat.id);
 			    
 		        if(popupService.showPopup('Really delete Category "'+cat.name+'" ?')){
 				 	
 		        	cat.$delete(function(){
 		    			$scope.categories.splice($scope.categories.indexOf(gridItem),1)
 		            }, function(error) {
 		            	$window.alert("Cannot delete: "+error.data);
 		            });
 		        
 		        }
 		 	});
 	    }
 	          	
                 	 
}]);

appControllers.controller('CategoryAddController',function($scope, $location, AdminCategory){

    $scope.cat=new AdminCategory();

    $scope.addCategory=function(){
        $scope.cat.$save(function(){
			$location.path("/categories");
        });
    }

});

appControllers.controller('CategoryEditController', ['$scope', '$route', '$routeParams', '$location', 'AdminCategory', '$anchorScroll',
        function( $scope, $route, $routeParams, $location, AdminCategory, $anchorScroll){


    //console.log("WILL EDIT Category with ID "+$routeParams.id);
	
    $scope.updateCategory=function(){
        $scope.cat.$update(function(){
			$location.path("/categories");
        });
    };

    $scope.loadCategory=function(){
        $scope.cat=AdminCategory.get({id:$routeParams.id});
    };

    $scope.loadCategory();
}]);


//experiments controller


appControllers.controller('ExperimentsMarketplaceController', ['$scope','$window','$log', 'ExperimentMetadata', 'Category', '$filter',
                                             	function($scope, $window, $log, ExperimentMetadata, Category,$filter ) {
                 	
	var orderBy = $filter('orderBy');
	$scope.categories = Category.query(function() {
		    //console.log($scope.apps);
		    $scope.categories = orderBy($scope.categories, 'name', false);
	});
 	$scope.apps = ExperimentMetadata.query(function() {
 		    //console.log($scope.apps);
 		    $scope.appsTotalNumber = $scope.apps.length;
		    $scope.apps = orderBy($scope.apps, 'name', false);
		    
		    angular.forEach($scope.apps, function(app, key) {
		    	if ( app.iconsrc.indexOf( 'unknown' ) !== -1 ){
		    		app.iconsrc = "images/experiment.png";
			  		console.log("app.iconsrc = " + app.iconsrc);
			  	  }
		    	
				});
		    
		    
 	}); 
 		 
 	$scope.filterCategory=function(category){
 			if (category.id){
 				//console.log("Selected catid = "+ category.id);
 				angular.forEach($scope.apps, function(app, key) {
 					//console.log("key= "+key+", app.id="+app.id+", app.name="+app.name);
 					//app.name = app.name+'!!';
 				});
 				$scope.selectedcategory = category;
 			}else{
 				$scope.selectedcategory = null;
 			}

			//$scope.apps = ExperimentMetadata.query();
			$scope.apps = ExperimentMetadata.query({categoryid: category.id}, function() {
	 		    //console.log($scope.apps);
			    $scope.apps = orderBy($scope.apps, 'name', false);
	 	});
    };
    
    $scope.isActive=function(c) {

   		//console.log("isActive c= "+c.name+", $scope.selectedcategory="+$scope.selectedcategory.name);
        return $scope.selectedcategory === c;
    };
    
    $scope.isNoneSelected=function(c) {
    	
    	//console.log("isNoneSelected c $scope.selectedcategory="+$scope.selectedcategory);
   		return ( (!$scope.selectedcategory) || ($scope.selectedcategory === null) );
    };

 	
                 	 
}]);
	



appControllers.controller('VxFListController', ['$scope','$window','$log', 'AdminVxFMetadata', 'popupService','ngDialog',
                                             	function($scope, $window, $log, AdminVxFMetadata, popupService, ngDialog ) {
                 	
                 	
 	$scope.vxfs= AdminVxFMetadata.query(function() {
	 		angular.forEach( $scope.vxfs , function( vxf, appkey) {
	    		
	 			if ( vxf.iconsrc.indexOf( 'unknown' ) !== -1 ){
	 				vxf.iconsrc = "images/vxf.png";
			  	  }
	 		});
 		  }); //query() returns all the subscribedresources
 		 
 	
 	
 	 $scope.deleteVxF = function(gridItem, useridx){

 		$log.debug("Selected to DELETE AdminVxFMetadata with id = "+ useridx);
 		 	

 		 	var vxf=AdminVxFMetadata.get({id:useridx}, function() {
 			    $log.debug("WILL DELETE VxFMetadatawith ID "+ vxf.id);
 			    
 		        if(popupService.showPopup('Really delete VxF "'+vxf.name+'" ?')){
 				 	
 		        	vxf.$delete(function(){
 		    			$scope.vxfs.splice($scope.vxfs.indexOf(gridItem),1)
 		            }, function errorCallback(response) {
 		               alert( response.statusText + " - Failed to delete! " + response.data["message"]  );
 		           });
 		        
 		        }
 		 	});
 	    }
 	          	
                 	 
}]);


appControllers.controller('VxFAddController', function($scope, $location,
		AdminVxFMetadata, PortalUser, $rootScope, $http,formDataObject, Category, $filter,
		APIEndPointService, AdminMANOplatform) {
	
	$scope.vxf = new AdminVxFMetadata();
	$scope.vxf.owner = $rootScope.loggedinportaluser;//PortalUser.get({id:$rootScope.loggedinportaluser.id});
	$scope.vxf.extensions=[];
	
	
	var orderBy = $filter('orderBy');
	$scope.categories = Category.query(function() {
		$scope.categories = orderBy($scope.categories, 'name', false);
		
	}); 
	
	
	var orderBy = $filter('orderBy');
    $scope.MANOplatforms =  AdminMANOplatform.query(function() {
		$scope.MANOplatforms = orderBy($scope.MANOplatforms, 'name', false);
		
	});
	    
	    
	$scope.addVxF = function() {
		$scope.vxf.$save(function() {
			$location.path("/vxfs");
		});
	}
	
	$scope.addExtension= function(vxf){
		console.log('addExtension');
		var e={};
		e.name = 'param';
		e.value = 'val';
    	
    	$scope.vxf.extensions.push(e);
	}
	
	$scope.removeRow = function(ext) {
		$scope.vxf.extensions.splice( $scope.vxf.extensions.indexOf(ext) ,1);
	};
	
	
	$scope.submitNewVxF = function submit() {
		
		 
		return $http({
			method : 'POST',
			url : APIEndPointService.APIURL+'services/api/repo/admin/vxfs/',
			headers : {
				'Content-Type' : 'multipart/form-data'
			},
			data : {
				vxf: angular.toJson( $scope.vxf, false ),
				prodIcon: $scope.uploadedVxFIcon,
				prodFile: $scope.uploadedVxFFile,
				//file : $scope.file
			},
			transformRequest : formDataObject
		}).then(function( response ) {
			$location.path("/vxfs");
		}, function errorCallback(response) {
            alert( response.statusText + " - Failed to read uploaded archive! " + response.data["message"]  );
        });
	};
});


appControllers.controller('VxFUploadController', function($scope, $location,
		AdminVxFMetadata, PortalUser, $rootScope, $http,formDataObject, Category, $filter,
		APIEndPointService, AdminMANOplatform) {
	
	$scope.vxf = new AdminVxFMetadata();
	$scope.vxf.owner = $rootScope.loggedinportaluser;//PortalUser.get({id:$rootScope.loggedinportaluser.id});
	$scope.vxf.extensions=[];
	
	
	var orderBy = $filter('orderBy');
	$scope.categories = Category.query(function() {
		$scope.categories = orderBy($scope.categories, 'name', false);		
	}); 
	
	
	var orderBy = $filter('orderBy');
    $scope.MANOplatforms =  AdminMANOplatform.query(function() {
		$scope.MANOplatforms = orderBy($scope.MANOplatforms, 'name', false);		
	});
	    
	    
	$scope.addVxF = function() {
		$scope.vxf.$save(function() {
			$location.path("/vxfs");
		});
	}
	
		
	$scope.submitNewVxF = function submit() {
		
		 
		return $http({
			method : 'POST',
			url : APIEndPointService.APIURL+'services/api/repo/admin/vxfs/',
			headers : {
				'Content-Type' : 'multipart/form-data'
			},
			data : {
				vxf: angular.toJson( $scope.vxf, false ),
				prodFile: $scope.uploadedVxFFile,
				prodIcon: $scope.uploadedVxFIcon,
				//file : $scope.file
			},
			transformRequest : formDataObject
		}).then(function( response ) {
			$location.path("/vxfs");
		}, function errorCallback(response) {
            alert( response.statusText + " - Failed to read uploaded archive! " + response.data["message"]  );
        });
	};

});


appControllers.controller('VxFEditController', ['$scope', '$route', '$routeParams', '$location', 'AdminVxFMetadata', '$anchorScroll', 'popupService',
                                                '$http', 'formDataObject', 'cfpLoadingBar', 'Category', '$filter', 'APIEndPointService',
                                                'AdminMANOprovider', 'VxFOnBoardedDescriptor', 'AdminMANOplatform', '$interval',
     function( $scope, $route, $routeParams, $location, AdminVxFMetadata, $anchorScroll, popupService,
    		 $http,formDataObject, cfpLoadingBar, 
    		 Category, $filter,APIEndPointService, AdminMANOprovider, VxFOnBoardedDescriptor, AdminMANOplatform, $interval){

	
	$scope.onboardToMANOprovider = function() {
    	console.log('onboardToMANOprovider');    	
//    	var contnr = new VxFOnBoardedDescriptor();
//    	contnr.vxf = $scope.vxf;
    	addOnBoardDescriptorVxF( $scope.vxf );
    	
//    	$scope.vxf.vxfOnBoardedDescriptors.push(contnr);
//    	$scope.activevxfOnBoardedDescriptor = contnr;   
//    	$scope.submitUpdateVxF( false );  //save vxf with the new descriptor added 
    	
    	
	};
	
	$scope.deleteVxFOnBoardedDescriptor = function( avxfOnBoardedDescriptor ) {

    	console.log("VxFOnBoardedDescriptor from VxF" + avxfOnBoardedDescriptor.id );
        if(popupService.showPopup('Really delete MANO on-boarding "'+ avxfOnBoardedDescriptor.id+'" ?')){    	
		 	var dep=VxFOnBoardedDescriptor.get({id:avxfOnBoardedDescriptor.id}, function() {
		 		
			    
				 	
		        	dep.$delete(function(){
	
		        		console.log("DELETED avxfOnBoardedDescriptor.id "+ avxfOnBoardedDescriptor.id);
		 			    $scope.vxf.vxfOnBoardedDescriptors.splice( $scope.vxf.vxfOnBoardedDescriptors.indexOf(avxfOnBoardedDescriptor), 1  );
		 			    syncScreenData(  $scope.vxf, $scope.categories );
		            }, function(error) {
		            	$window.alert("Cannot delete: "+error.data);
		            });
		        
		 	}); 
        }
    	  
        //No need to save the VxF. With Delete the backend API model is updated
    	//$scope.submitUpdateVxF( false );  //save vxf with the new descriptor added 
	};
	
	
	addOnBoardDescriptorVxF = function( avxf) {

	    	console.log("onBoardVxF for vxf id = " + avxf.id );

	        return $http({
				method : 'POST',
				url : APIEndPointService.APIURL+'services/api/repo/admin/vxfobds/',
				headers : {
					'Content-Type' : 'application/json'
				},

	            data: avxf
				
	            
			}).then(function successCallback( response ) {			
				//we need to reload the VxF
				 //$scope.vxf=VxFMetadata.get( $scope.vxf.id );
		        $scope.vxf = JSON.parse(  JSON.stringify(response.data)  );
		        syncScreenData(  $scope.vxf, $scope.categories );
		    	$scope.activevxfOnBoardedDescriptor = $scope.vxf.vxfOnBoardedDescriptors[ $scope.vxf.vxfOnBoardedDescriptors.length-1 ];
		        
			}),
	        function error (response) {
	            alert("failed! "+response.status);
	        }; 	  	   
	        
	        //sareturn avobd;
	        
	    };

	$scope.isActive=function(c) {
        return $scope.activevxfOnBoardedDescriptor === c;
    };
    
    
	 $scope.activateVOBD =function(c) {
	        return $scope.activevxfOnBoardedDescriptor = c;
	    };
	    	    

	    
	$scope.selectedMANOProviders = AdminMANOprovider.query(function() {
		    $scope.mpTotalNumber = $scope.selectedMANOProviders.length;
		    $scope.MANOProviders = orderBy($scope.selectedMANOProviders, 'name', false);
		     
	});
	
	
	  $scope.onBoardVxF = function( avxfOnBoardedDescriptor, selMANOProvider) {

	    	console.log("onBoardVxF" + avxfOnBoardedDescriptor.deployId + ", " + selMANOProvider.name);
	        //var avobd = avxfOnBoardedDescriptor;
	        //here we contact API and eventually do the onboarding
	        //avxfOnBoardedDescriptor.onBoardingStatus = 'ONBOARDED';
	        //avxfOnBoardedDescriptor.lastOnboarding = new Date();
	        avxfOnBoardedDescriptor.obMANOprovider = selMANOProvider;
	        
	        avxfOnBoardedDescriptor.onBoardingStatus = 'ONBOARDING';

	        return $http({
				method : 'PUT',
				url : APIEndPointService.APIURL+'services/api/repo/admin/vxfobds/'+ avxfOnBoardedDescriptor.id +'/onboard',
				headers : {
					'Content-Type' : 'application/json'
				},

	            data: avxfOnBoardedDescriptor
				
	            
			}).then(function successCallback( response ) {			

		        console.log("onBoardVxF successCallback");
		        var d = JSON.parse(  JSON.stringify( response.data )  );		        
		        var vxfobdToSync = $scope.vxf.vxfOnBoardedDescriptors[ $scope.vxf.vxfOnBoardedDescriptors.indexOf(avxfOnBoardedDescriptor) ];
		        vxfobdToSync.onBoardingStatus = d.onBoardingStatus;
		        vxfobdToSync.deployId = d.deployId;
		        vxfobdToSync.lastOnboarding = d.lastOnboarding;
		        vxfobdToSync.vxfMANOProviderID = d.vxfMANOProviderID;
		    	//$scope.activevxfOnBoardedDescriptor = $scope.vxf.vxfOnBoardedDescriptors.indexOf( d ) ;
		        
		        $scope.checkOBVDStatus( vxfobdToSync );
		        

		        		
		        
			}),
	        function error (response) {
	            alert("failed! "+response.status);
	        }; 	  	   
	        
	        //sareturn avobd;
	        
	    };
	    
	 $scope.checkOBVDStatus = function( avxfOnBoardedDescriptor) {
	        var interval=5000;
	        var retry = 0;
	        var i = $interval(function(){ //make an interval to check every 5sec the status of the VxF onboarding
	  	      interval += 5000;
	  	      try {
	  	    	  var vobd = avxfOnBoardedDescriptor;
	  	    	  console.log("CheckStatusOfOBVD vxfobdToSync " + vobd.id);
	  	    		 
	  	    	 if( vobd.onBoardingStatus === 'ONBOARDED' ){ //when window closes without login
		  	    	  console.log("Will cancel CheckStatusOfOBVD vxfobdToSync for " + vobd.id);
	  	      			$interval.cancel(i);
	  	      		}
	  	    	  
	  	    	  retry = retry+1;
	  	    	  if ( retry> 3){ 
		  	    	  console.log("Will cancel max retries CheckStatusOfOBVD vxfobdToSync for " + vobd.id);
	  	      			$interval.cancel(i);	  
	  	    	  }
	  	    	  
	  	    	  //here make a get
		  	        return $http({
		  				method : 'GET',
		  				url : APIEndPointService.APIURL+'services/api/repo/admin/vxfobds/'+ avxfOnBoardedDescriptor.id +'/status',
		  				headers : {
		  					'Content-Type' : 'application/json'
		  				},
	
		  	            data: avxfOnBoardedDescriptor
		  				
		  	            
		  			}).then(function successCallback( response ) {			

				        console.log("checkOBVDStatus successCallback");
		  		        var d = JSON.parse(  JSON.stringify( response.data)  );		        
		  		        var vxfobdToSync = $scope.vxf.vxfOnBoardedDescriptors[ $scope.vxf.vxfOnBoardedDescriptors.indexOf(avxfOnBoardedDescriptor) ];
		  		        vxfobdToSync.onBoardingStatus = d.onBoardingStatus;
		  		        vxfobdToSync.deployId = d.deployId;
		  		        vxfobdToSync.lastOnboarding = d.lastOnboarding;
		  		        vxfobdToSync.vxfMANOProviderID = d.vxfMANOProviderID;	
		  		        		
		  		        
		  			}),
			        function error ( response ) {
			            alert("failed! "+ response.status);
			        }; 	 		        
	  		        
		  		  
	  	    	 
	  	    	  
	  	      		
	  	      } catch(e){
	  	        console.error(e);
	  	      }
	  	    }, interval);
	        		        
	 };
	    
	  $scope.removeVxFFromMANO = function( avxfOnBoardedDescriptor, vxf) {
		  	if(popupService.showPopup('Really off-board '+vxf.name+' from MANO Provider"'+ avxfOnBoardedDescriptor.id+'" ?')){
		        //avxfOnBoardedDescriptor.onBoardingStatus = 'OFFBOARDED';
		        //avxfOnBoardedDescriptor.lastOnboarding = new Date();
		        console.log("offBoardVxF" + avxfOnBoardedDescriptor.deployId );
		        //var avobd = avxfOnBoardedDescriptor;
		        //here we contact API and eventually do the onboarding
		        //avxfOnBoardedDescriptor.onBoardingStatus = 'ONBOARDED';
		        //avxfOnBoardedDescriptor.lastOnboarding = new Date();
		        

		        return $http({
					method : 'PUT',
					url : APIEndPointService.APIURL+'services/api/repo/admin/vxfobds/'+ avxfOnBoardedDescriptor.id +'/offboard',
					headers : {
						'Content-Type' : 'application/json'
					},

		            data: avxfOnBoardedDescriptor
					
		            
				}).then(function successCallback(response) {			
			        console.log("removeVxFFromMANO successCallback");

			        var d = JSON.parse(  JSON.stringify(response.data)  );		        
			        var vxfobdToSync = $scope.vxf.vxfOnBoardedDescriptors[ $scope.vxf.vxfOnBoardedDescriptors.indexOf(avxfOnBoardedDescriptor) ];
			        vxfobdToSync.onBoardingStatus = d.onBoardingStatus;
			        vxfobdToSync.deployId = d.deployId;
			        vxfobdToSync.lastOnboarding = d.lastOnboarding;
			        vxfobdToSync.vxfMANOProviderID = d.vxfMANOProviderID;
			    	//$scope.activevxfOnBoardedDescriptor = $scope.vxf.vxfOnBoardedDescriptors.indexOf( d ) ;
			        
			        //$scope.checkOBVDStatus( vxfobdToSync );			       			        				        
				},
		        function errorCallback(response) {
			        avxfOnBoardedDescriptor.onBoardingStatus = 'ONBOARDED';			        
					alert(response.data);
		        }); 	   
		        
	        }
	        
	    };   
	    
	 $scope.submitUpdateVxF = function submit(closeWindow) {

		 var catidsCommaSeparated = '';
		 angular.forEach ( $scope.vxf.categories, function(categ, categkey) {
			 catidsCommaSeparated = catidsCommaSeparated+categ.id+',';
		 });
		 		 
			return $http({
				method : 'PUT',
				url : APIEndPointService.APIURL+'services/api/repo/admin/vxfs/'+$routeParams.id,
				headers : {
					'Content-Type' : 'multipart/form-data'
				},
				data : {
					vxf: angular.toJson( $scope.vxf, false ),					
					prodIcon: $scope.uploadedVxFIcon,
					prodFile: $scope.uploadedVxFFile,
					//file : $scope.file
				},
				transformRequest : formDataObject
			}).then(function(response) {			

//		        console.log("data: " + data);
		        $scope.vxf = JSON.parse(  JSON.stringify(response.data)  );
		        
				if (closeWindow){
					$location.path("/vxfs");					
				} else {
			    	syncScreenData(  $scope.vxf, $scope.categories );
			    	$scope.activevxfOnBoardedDescriptor = $scope.vxf.vxfOnBoardedDescriptors[ $scope.vxf.vxfOnBoardedDescriptors.length-1 ];
				}
			}, function errorCallback(response) {
	            alert( response.statusText + " - Failed to update VxF! " + response.data["message"]  );
	        });
		};
		
		
	var orderBy = $filter('orderBy');
	$scope.categories = Category.query(function() {
		$scope.categories = orderBy($scope.categories, 'name', false);
		$scope.loadVxF($scope.categories);
	}); 

	
	

    $scope.loadVxF=function(cats){

    	var orderBy = $filter('orderBy');
        $scope.MANOplatforms =  AdminMANOplatform.query(function() {
    		$scope.MANOplatforms = orderBy($scope.MANOplatforms, 'name', false);
    		
    	});	
        
    	var avxf = AdminVxFMetadata.get({id:$routeParams.id}, function() {    		
    		syncScreenData( avxf, cats );    		
    	});         	 	
    };

    
    var syncScreenData = function( myvxf, cats ){
		//synch categories with local model
		var categoriesToPush=[];
   	 	angular.forEach(myvxf.categories, function(myvxfcateg, myvxfcategkey) {
	    		
	    		angular.forEach(cats, function(categ, key) {
   	    		if (myvxfcateg.id === categ.id){
   	    			categoriesToPush.push(categ);
   	    		}
	    		});
	 	});
		
   	 	myvxf.categories=[];//clear everything
		//now re add the categories to synchronize with local model
		angular.forEach(categoriesToPush, function(cat, key) {
			myvxf.categories.push(cat);
		});	 			
		

		//synch MANO platforms with local model
		var providersToPush=[];
   	 	angular.forEach(myvxf.supportedMANOPlatforms, function(myvxfprov, myvxfcprovkey) {
	    		
	    		angular.forEach( $scope.MANOplatforms, function(pr, key) {
   	    		if (myvxfprov.id === pr.id){
   	    			providersToPush.push(pr);
   	    		}
	    		});
	 	});
		
   	 	myvxf.supportedMANOPlatforms=[];//clear everything
		//now re add the categories to synchronize with local model
		angular.forEach(providersToPush, function(cat, key) {
			myvxf.supportedMANOPlatforms.push(cat);
		});				
		
		
		
		$scope.vxf=myvxf;
		
		manoProviderId = myvxf.vxfOnBoardedDescriptors.length - 1;
		$scope.activevxfOnBoardedDescriptor = myvxf.vxfOnBoardedDescriptors[0];
		
		//sync with local model
		angular.forEach(myvxf.vxfOnBoardedDescriptors, function(myvxobd, myvxfobdkey) {
			if (myvxobd.obMANOprovider != null){

				angular.forEach( $scope.selectedMANOProviders, function(pr, key) {
		  	    	
	   	    		if (myvxobd.obMANOprovider.id === pr.id){
	   	    			myvxobd.obMANOprovider = pr;
	   	    		}
		    	});
			}
			
		});
		
		
	};
	
	
	
	
    
	$scope.addExtension= function(vxf){
		console.log('addExtension');
		var e={};
		e.name = 'param';
		e.value = 'val';
    	
    	$scope.vxf.extensions.push(e);
	}
		
	$scope.removeRow = function(ext) {
		$scope.vxf.extensions.splice( $scope.vxf.extensions.indexOf(ext) ,1);
	};
	
	
	$('.table-remove').click(function () {
		  $(this).parents('tr').detach();
	});

    
}]);


appControllers.controller('VxFViewController', ['$scope', '$route', '$routeParams', '$location', 'VxFMetadata',
                                                 function( $scope, $route, $routeParams, $location, VxFMetadata ){
    $scope.vxf=VxFMetadata.get({id:$routeParams.id}, function() {    		
    	
    	  $scope.tabs = [
    		    { id:0, title:'Description', content:$scope.vxf.longDescription },
    		    { id:1, title:'Terms of use', content: '<pre>' + $scope.vxf.termsOfUse + '</pre>' },
    		    { id:1, title:'Descriptor', content: '<pre>' + $scope.vxf.descriptorHTML + '</pre>'  },
    		    { id:1, title:'Descriptor (YAML)', content: '<pre>' + $scope.vxf.descriptor + '</pre>'  }
    		  ];
    	  
    	  $scope.tab = $scope.tabs[0];
    	  
    	  var v =  $scope.vxf;
    	if ( v.iconsrc.indexOf( 'unknown' ) !== -1 ){
    		v.iconsrc = "images/vxf.png";
	  		console.log("v.iconsrc = " + v.iconsrc);
	  	  }
		    	
				
    	
    	
	});         
    
    $scope.isActive=function(c) {
        return $scope.tab === c;
    };
    
    
	 $scope.activate =function(c) {
	        return $scope.tab = c;
	    }

}]);


appControllers.controller('VxFsMarketplaceController', ['$scope','$window','$log', 'VxFMetadata', 'Category', '$filter',
                                                     	function($scope, $window, $log, VxFMetadata, Category,$filter ) {
                         	
	console.log("IN VxFsMarketplaceController");
        	var orderBy = $filter('orderBy');
        	$scope.categories = Category.query(function() {
        		    //console.log($scope.apps);
        		    $scope.categories = orderBy($scope.categories, 'name', false);
        	});
         	$scope.vxfs = VxFMetadata.query(function() {
         		    //console.log($scope.apps);
         		    $scope.vxfsTotalNumber = $scope.vxfs.length;
        		    $scope.vxfs = orderBy($scope.vxfs, 'name', false);
        		    
        		    angular.forEach($scope.vxfs, function(v, key) {
        		    	if ( v.iconsrc.indexOf( 'unknown' ) !== -1 ){
        		    		v.iconsrc = "images/vxf.png";
        			  		console.log("v.iconsrc = " + v.iconsrc);
        			  	  }
        		    	
        				});
         	}); 
         		 
         	$scope.filterCategory=function(category){
         			if (category.id){
         				//console.log("Selected catid = "+ category.id);
         				angular.forEach($scope.vxfs, function(vxf, key) {
         					//console.log("key= "+key+", app.id="+app.id+", app.name="+app.name);
         					//app.name = app.name+'!!';
         				});
         				$scope.selectedcategory = category;
         			}else{
         				$scope.selectedcategory = null;
         			}

        			//$scope.apps = ExperimentMetadata.query();
        			$scope.vxfs = VxFMetadata.query({categoryid: category.id}, function() {
        	 		    //console.log($scope.apps);
        			    $scope.vxfs = orderBy($scope.vxfs, 'name', false);
        	 	});
            };
            
            $scope.isActive=function(c) {

           		//console.log("isActive c= "+c.name+", $scope.selectedcategory="+$scope.selectedcategory.name);
                return $scope.selectedcategory === c;
            };
            
            $scope.isNoneSelected=function(c) {
            	
            	//console.log("isNoneSelected c $scope.selectedcategory="+$scope.selectedcategory);
           		return ( (!$scope.selectedcategory) || ($scope.selectedcategory === null) );
            };

         	
                         	 
        }]);


////////////////////// FiwareInstancesController 

appControllers.controller('FiwareInstancesController', ['$scope','$window','$log',  '$filter', '$rootScope', 'ComputeEndpoint', 'FIWAREServers',
                                                     	function($scope, $window, $log,  $filter, $rootScope, ComputeEndpoint, FIWAREServers ) {

	
	$scope.fiwareuser  = $rootScope.loggedinfiwareuser;
	$scope.selectedComputeEndpoint = new ComputeEndpoint();
	
	var orderBy = $filter('orderBy');
	
	$scope.computeendpoints = ComputeEndpoint.query({xauthtoken: $rootScope.loggedinfiwareuser.xOAuth2Token},  function() {
	    //console.log($scope.apps);
		$scope.selectedComputeEndpoint = $scope.computeendpoints[0];
	    $scope.computeendpoints = orderBy($scope.computeendpoints, 'region', false);
	    $scope.changeRegion();
//	    $scope.servers = FIWAREServers.query({cloudAccessToken: $rootScope.loggedinfiwareuser.cloudToken, endPointPublicURL: $scope.selectedComputeEndpoint.publicURL},  function() {
//			
//		});
	    
	});
	
	$scope.changeRegion = function(){
//		console.log("$scope.selectedComputeEndpoint.publicURL = " +  $scope.selectedComputeEndpoint.publicURL);
//		console.log("$rootScope.loggedinfiwareuser.cloudToken = " +  $rootScope.loggedinfiwareuser.cloudToken);
		 $scope.servers = FIWAREServers.query({cloudAccessToken: $rootScope.loggedinfiwareuser.cloudToken, endPointPublicURL: $scope.selectedComputeEndpoint.publicURL},  function() {
			 $scope.serversTotalNumber = $scope.servers.length;
			});
		
	};
	
        	
}]);


//////////Deployments controller

appControllers.controller('DeploymentsListController', ['$scope','$window','$log', 'DeploymentDescriptor', 'popupService','ngDialog','$http', 'APIEndPointService',
                                             	function($scope, $window, $log, DeploymentDescriptor, popupService, ngDialog, $http, APIEndPointService ) {
                 	
                 	
 	$scope.mydeployments= DeploymentDescriptor.query(function() {
 		    
 		  }); 
 	


 	          	
                 	 
}]);


appControllers.filter("dateComputedField", function () {
    return function (fieldValueUnused, item) {
        return item.id + " / " + item.name;
    };
});
     


appControllers.controller('DeploymentAddController', ['$scope', '$route', '$rootScope', '$routeParams','$window','$log', 
                                                            'DeploymentDescriptor', 'ExperimentMetadata', 'DeployContainer','DeployArtifact',
                                                            'SubscribedResource', '$filter', '$http', 'APIEndPointService', '$location', 'Infrastructure', 'DeployableExperimentMetadata',
                                             	function($scope, $route, $rootScope, $routeParams, $window, $log, DeploymentDescriptor, 
                                             			ExperimentMetadata, DeployContainer, DeployArtifact,  SubscribedResource , 
                                             			$filter, $http, APIEndPointService, $location, Infrastructure, DeployableExperimentMetadata) {
                 	

	var orderBy = $filter('orderBy');

	//experiments sould be all public + my Valid personal
	
	
 	$scope.experiments = DeployableExperimentMetadata.query(function() { 
		    
		    //$scope.experiments = orderBy($scope.experiments, 'name', false);
 	}); 
 	
 	
 	
 	
 	$scope.infrastructures = Infrastructure.query(function() {
	    $scope.infrastructures = orderBy($scope.infrastructures, 'name', false);
	  }); //query() returns all the portalUsers
	 
	
	$scope.newdeployment = new DeploymentDescriptor(); 	
	$scope.newdeployment.owner = $rootScope.loggedinportaluser;//PortalUser.get({id:$rootScope.loggedinportaluser.id});

	$scope.newdeployment.startReqDate = new Date();
	$scope.newdeployment.endReqDate = new Date();
 	
	//DeploymentDescriptorVxFPlacement
	
	$scope.updatePlacements = function() {
  		console.log("newdeployment.experiment = " + $scope.newdeployment.experiment );
  		
  		$scope.newdeployment.vxfPlacements = [];
  		
  		angular.forEach ( $scope.newdeployment.experiment.constituentVxF, function(aconstituentVxF, aconstituentVxFKey) {
			 console.log('add placement');
			var placement={};
//			var aconstituentVxF = {};
//			aconstituentVxF.vnfdidRef = aconstituentVxF.vnfdidRef
//			var aninfra = {};
			placement.constituentVxF = aconstituentVxF;
			placement.infrastructure = $scope.infrastructureForAll;
		    	
			$scope.newdeployment.vxfPlacements.push( placement );
			 
			 
			 
		 });
  		
	}
	    
    
    $scope.submitNewAppDeployment = function submit() {
		 
		return $http({
			method : 'POST',
			url : APIEndPointService.APIURL+'services/api/repo/admin/deployments/',
			headers : {
				'Content-Type' : 'application/json'
			},

            data: $scope.newdeployment
			
            
		}).then(function successCallback( response ) {		
			$location.path("/deployments");	

		}),
        function error (response) {
            alert("failed! "+response.status);
        }; 	 
		
		
		
	};
 	          	
                 	 
}]);



appControllers.controller('DeploymentsAdminListController', ['$scope','$window','$log', 'DeploymentDescriptor', 'popupService','ngDialog','$http', 'APIEndPointService',
                                             	function($scope, $window, $log, DeploymentDescriptor, popupService, ngDialog, $http, APIEndPointService ) {
                 	
                 	
 	$scope.mydeployments= DeploymentDescriptor.query(function() {
 		    
 		  }); 
 		 
 	
 	 $scope.deleteDeployment = function(gridItem, depidx){

 		$log.debug("Selected to DELETE Deployment with id = "+ depidx);

 		 	var dep=DeploymentDescriptor.get({id:depidx}, function() {
 		 		
 			    
 		        if(popupService.showPopup('Really delete Deployment "'+dep.name+'" ?')){
 				 	
 		        	dep.$delete(function(){

 		 			    $log.debug("DELETED DeploymentDescriptor ID "+ dep.id);
 		    			$scope.mydeployments.splice( $scope.mydeployments.indexOf(gridItem),1  );
 		    			
 		            }, function(error) {
 		            	$window.alert("Cannot delete: "+error.data);
 		            });
 		        
 		        }
 		 	});
 	    };
 	    
 	    
 	    
 	   
 	   putAction   = function(action, deployment, depidx){
 		  $log.debug("Selected to "+action+" Deployment with id = "+ depidx);
	 		
	 		return $http({
				method : 'PUT',
				url : APIEndPointService.APIURL+'services/api/repo/admin/deployments/'+depidx+'?action='+action,
				headers : {
					'Content-Type' : 'application/json'
				},

	            data: deployment
				
	            
			}).success(function(data, status, headers, config) {			

//		        console.log("data: " + data);
//		        console.log("data: " + JSON.stringify(data));
//		        console.log("status: " + status);
//		        console.log("headers: " + headers);
//		        console.log("config: " + config);
		        var d = JSON.parse(  JSON.stringify(data)  );
		        
		        $scope.mydeployments[$scope.mydeployments.indexOf(deployment)] = d;
		        		
		        
			}).
	        error(function (data, status, headers, config) {
	            alert("failed to communicate! "+status);
	        });
 	   }
 	    
 	    
 	   $scope.authDeployment = function(deployment, depidx){
 		  putAction('AUTH',deployment, depidx ); 
 		   
 	   }
 	   
 	  $scope.denyDeployment = function(deployment, depidx){
 		 putAction('DENY',deployment, depidx ); 
	   }
 	   
 	  $scope.uninstallDeployment = function(deployment, depidx){
  		 putAction('UNINSTALL',deployment, depidx ); 
	 	
	   }
 	          	
                 	 
}]);



appControllers.controller('DeploymentEditController', ['$scope', '$route', '$rootScope', '$routeParams','$window','$log', 
                                                            'DeploymentDescriptor', 'ExperimentMetadata', 'DeployContainer','DeployArtifact',
                                                            'SubscribedResource', '$filter', '$http', 'APIEndPointService', '$location',
                                             	function($scope, $route, $rootScope, $routeParams, $window, $log, DeploymentDescriptor, 
                                             			ExperimentMetadata, DeployContainer, DeployArtifact,  SubscribedResource , 
                                             			$filter, $http, APIEndPointService, $location) {
                 	

	
            
		$scope.adeployment = DeploymentDescriptor.get({id:$routeParams.id}, function() {  

			$scope.adeployment.startReqDate = new Date( $scope.adeployment.startReqDate );
			$scope.adeployment.endReqDate = new Date( $scope.adeployment.endReqDate );
			if ($scope.adeployment.startDate ){
				$scope.adeployment.startDate = new Date( $scope.adeployment.startDate );
			}else {
				$scope.adeployment.startDate = new Date( $scope.adeployment.startReqDate );				
			}
			if ($scope.adeployment.endDate ){
				$scope.adeployment.endDate = new Date( $scope.adeployment.endDate );
			}else{
				$scope.adeployment.endDate = new Date( $scope.adeployment.endReqDate );
				
			}
		 	
		 	$scope.experiments = ExperimentMetadata.query(function() {		 		
				    //sync data
				    angular.forEach( $scope.experiments, function(pr, key) {
				        console.log("-------------------");
		   	    		if ( $scope.adeployment.experiment.id === pr.id){
		   	    			$scope.adeployment.experiment = pr;
		   	    		}
			    	});
				    
		 	}); 

    	});     
		
		
		   $scope.updateDeployment=function(){
		        $scope.adeployment.$update(function(){
					$location.path("/deployments_admin");
		        });
		    };
                 	 
}]);



appControllers.controller('SignupCtrl', ['$scope', '$route', '$routeParams', '$location', 'PortalUser', '$anchorScroll', 'APIEndPointService', '$http' , 'formDataObject',
                                         function( $scope, $route, $routeParams, $location, PortalUser, $anchorScroll, APIEndPointService, $http,formDataObject){
	$scope.portaluser=new PortalUser();
    $scope.portaluser.active='false';
    $scope.portaluser.role = 'EXPERIMENTER';
    
    $scope.registerNewPortalUser=function(){
        	
        	randomid= 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        	    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        	    return v.toString(16);
        	});
        	
        	link = APIEndPointService.WEBURL+'/#!/registerconfirm?rid='+randomid+'&uname='+$scope.portaluser.username;
            msg='Dear '+$scope.portaluser.name+' <br>thank you for registering a 5GinFIRE account!<br><br>\r\n'+
            'Please follow this link:<br> '+link+
            ' <br> or copy it to your web browser\r\n'+
            '<br><br>Thank you\r\nThe 5GinFIRE team';
            
        	
        	return $http({
    			method : 'POST',
    			url : APIEndPointService.APIURL+'services/api/repo/register/',
    			headers : {
    				'Content-Type' : 'multipart/form-data'
    			},
    			data : {
    				name: $scope.portaluser.name,
    				username: $scope.portaluser.username,
    				userpassword: $scope.portaluser.password,
    				userorganization: $scope.portaluser.organization,
    				useremail: $scope.portaluser.email,
    				randomregid: randomid,
    				emailmessage: msg,
    			},
    			transformRequest : formDataObject
    		}).then(function( response ) {
    			alert("A confirmation email has been sent in order to activate your account.");
    			$location.path("/");
    		},
	        function errorCallback(error) {
	            alert( "Failed to register new user! Username or email already exists! " + error.data ); //+ error.data
	        }); 
        	
        };
    

}]);


//MANO platforms Controller
appControllers.controller('MANOplatformsListController', ['$scope','$window','$log', 'AdminMANOplatform', 'popupService','ngDialog',
                                             	function($scope, $window, $log, AdminMANOplatform, popupService, ngDialog ) {
                 	
                 	

 	$scope.manoplatforms = AdminMANOplatform.query(function() {
 		    //console.log($scope.categories);
 		  }); //query() returns all the categories
 		 
 	
 	
 	 $scope.deleteMANOplatform = function(gridItem, useridx){

 		 	//console.log("Selected to DELETE Categorywith id = "+ useridx);
 		 	

 		 	var cat=AdminMANOplatform.get({id:useridx}, function() {
 			    $log.debug("WILL DELETE MANOplatform with ID "+ cat.id);
 			    
 		        if(popupService.showPopup('Really delete MANOplatform "'+cat.name+'" ?')){
 				 	
 		        	cat.$delete(function(){
 		    			$scope.manoplatforms.splice($scope.manoplatforms.indexOf(gridItem),1)
 		            }, function(error) {
 		            	$window.alert("Cannot delete: "+error.data);
 		            });
 		        
 		        }
 		 	});
 	    }
 	          	
                 	 
}]);

appControllers.controller('MANOplatformAddController',function($scope, $location, AdminMANOplatform){

    $scope.cat=new AdminMANOplatform();

    $scope.addMANOplatform=function(){
        $scope.cat.$save(function(){
			$location.path("/manoplatforms");
        });
    }

});

appControllers.controller('MANOplatformEditController', ['$scope', '$route', '$routeParams', '$location', 'AdminMANOplatform', '$anchorScroll',
        function( $scope, $route, $routeParams, $location, AdminMANOplatform, $anchorScroll){


    //console.log("WILL EDIT Category with ID "+$routeParams.id);
	
    $scope.updateMANOplatform=function(){
        $scope.cat.$update(function(){
			$location.path("/manoplatforms");
        });
    };

    $scope.loadMANOplatform=function(){
        $scope.cat=AdminMANOplatform.get({id:$routeParams.id});
    };

    $scope.loadMANOplatform();
}]);




//MANO providers Controller
appControllers.controller('MANOprovidersListController', ['$scope','$window','$log', 'AdminMANOprovider', 'popupService','ngDialog',
                                             	function($scope, $window, $log, AdminMANOprovider, popupService, ngDialog ) {
                 	
                 	

 	$scope.manoproviders = AdminMANOprovider.query(function() {
 		    //console.log($scope.categories);
 		  }); //query() returns all the categories
 		 
 	
 	
 	 $scope.deleteMANOprovider = function(gridItem, useridx){

 		 	//console.log("Selected to DELETE Categorywith id = "+ useridx);
 		 	

 		 	var cat=AdminMANOprovider.get({id:useridx}, function() {
 			    $log.debug("WILL DELETE MANOprovider with ID "+ cat.id);
 			    
 		        if(popupService.showPopup('Really delete MANO provider "'+cat.name+'" ?')){
 				 	
 		        	cat.$delete(function(){
 		    			$scope.manoproviders.splice($scope.manoproviders.indexOf(gridItem),1)
 		            }, function(error) {
 		            	$window.alert("Cannot delete: "+error.data);
 		            });
 		        
 		        }
 		 	});
 	    }
 	          	
                 	 
}]);

appControllers.controller('MANOproviderAddController',function($scope, $location,  $filter,  AdminMANOprovider, 
		AdminMANOplatform){

    $scope.manoprov=new AdminMANOprovider();
    
    var orderBy = $filter('orderBy');
    $scope.supportedMANOplatforms =  AdminMANOplatform.query(function() {
		$scope.supportedMANOplatform = orderBy($scope.supportedMANOplatform, 'name', false);
		
	});

    $scope.addMANOprovider=function(){
        $scope.manoprov.$save(function(){
			$location.path("/manoproviders");
        });
    }

});

appControllers.controller('MANOproviderEditController', ['$scope', '$route', '$filter', '$routeParams', 
                                                         '$location', 'AdminMANOprovider', '$anchorScroll', 'AdminMANOplatform',
        function( $scope, $route,$filter,  $routeParams, $location, AdminMANOprovider, $anchorScroll, AdminMANOplatform){


	

    //console.log("WILL EDIT Category with ID "+$routeParams.id);
	
    $scope.updateMANOprovider=function(){
        $scope.manoprov.$update(function(){
			$location.path("/manoproviders");
        });
    };

    $scope.loadMANOprovider=function(){
        $scope.manoprov=AdminMANOprovider.get({id:$routeParams.id}); 

		var orderBy = $filter('orderBy');
	    $scope.supportedMANOplatforms =  AdminMANOplatform.query(function() {
			$scope.supportedMANOplatform = orderBy($scope.supportedMANOplatform, 'name', false);
			console.log("XX2latf = " +  $scope.supportedMANOplatforms[0].name);
			
			angular.forEach($scope.supportedMANOplatforms, function(platf, key) {
    			console.log("XXplatf = " +  platf.name);
	    		if ($scope.manoprov.supportedMANOplatform.id === platf.id){
	    			$scope.manoprov.supportedMANOplatform = platf;
	    		}
    		});
			
		});
		console.log("XXsplatf = " +  $scope.supportedMANOplatforms[0]);
    		
    		
 	    
        
    };

    $scope.loadMANOprovider();
}]);


appControllers.controller('SystemInfoController', ['$scope','$window','$log', 'PortalProperty', 'popupService','ngDialog',
                                                    	function($scope, $window, $log, PortalProperty, popupService, ngDialog ) {
                        	
        	$scope.properties = PortalProperty.query(function() {
        		  }); //query() returns all the categories
        	
        	

	  		console.log("SystemInfoController = " );
                        	 
}]);


appControllers.controller('SystemInfoEditController', ['$scope', '$route', '$routeParams', '$location', 'PortalProperty', '$anchorScroll',
        function( $scope, $route, $routeParams, $location, PortalProperty, $anchorScroll){


    //console.log("WILL EDIT Category with ID "+$routeParams.id);
	
    $scope.updateProperty=function(){
        $scope.prop.$update(function(){
			$location.path("/systeminfo");
        });
    };

    $scope.loadProperty=function(){
        $scope.prop=PortalProperty.get({id:$routeParams.id});
    };

    $scope.loadProperty();
}]);

appControllers.controller('RegisterConfigController', ['$scope', '$route', '$routeParams', '$location', 'PortalUser', '$anchorScroll', 'APIEndPointService','$http' , 'formDataObject',
    function( $scope, $route, $routeParams, $location, PortalUser, $anchorScroll, APIEndPointService, $http, formDataObject){


	console.log("RegisterConfigController $routeParams username"+$routeParams.uname);
	console.log("RegisterConfigController $routeParams rid "+$routeParams.rid);
	
	return $http({
		method : 'POST',
		url : APIEndPointService.APIURL+'services/api/repo/register/verify',
		headers : {
			'Content-Type' : 'multipart/form-data'
		},
		data : {
			username: $routeParams.uname,
			rid: $routeParams.rid,
		},
		transformRequest : formDataObject		
        
	}).then(function successCallback( response ) {	
		$scope.portaluser = JSON.parse(  JSON.stringify( response.data )  );

	},
    function error (response) {
        alert("Error occured: "+response.status);
    }); 	 
	
    
}]);


	
appControllers.controller('InfrastructureListController', ['$scope','$window','$log', 'Infrastructure', 'popupService', 'ngDialog',
                            	function($scope, $window, $log, Infrastructure, popupService, ngDialog) {
	
	

	$scope.portalinfrastructures = Infrastructure.query(function() {
		    //console.log($scope.portalusers);
		  }); //query() returns all the portalUsers
		 
	
	
	 $scope.deleteInfrastructure = function(gridItem, useridx, name){

		 	$log.debug("Selected to DELETE Infrastructure with name = "+ name);
		 	

		 	var portalinfrastructure=Infrastructure.get({id:useridx}, function() {
			    $log.debug("WILL DELETE Infrastructure with ID "+ portalinfrastructure.id);
			    
		        if(popupService.showPopup('Really delete Infrastructure '+name + '" ?')){
		        	$log.debug("WILL DELETE Infrastructure with $scope.portalinfrastructure.id = "+ portalinfrastructure.id);
				 	
		        	portalinfrastructure.$delete(function(){
		    			$scope.portalinfrastructures.splice($scope.portalinfrastructures.indexOf(gridItem),1)
		            });
		        
		        }
		 	});
	    }
	 
	 $scope.clickToOpen = function (gridItem) {
	        ngDialog.open({ 
	        	template: 'InfrastructureView.html',
	        	controller : ['$scope', 'Infrastructure', function( $scope,  Infrastructure){
	        	    $scope.portalinfrastructure= Infrastructure.get({id:gridItem});
	        	    $log.debug("WILL GET Infrastructure with ID "+gridItem);   
	    			}],
	    		className: 'ngdialog-theme-default'
	    		
	        	});
	    };
	    
}]);

 
	


appControllers.controller('InfrastructureAddController',function($scope, $location, Infrastructure){

    $scope.portalinfrastructure=new Infrastructure();

    $scope.addInfrastructure =function(){
        $scope.portalinfrastructure.$save(function(){
			$location.path("/infrastructures");
        });
    }

});

appControllers.controller('InfrastructureEditController', ['$scope', '$route', '$routeParams', '$location', 'Infrastructure', '$anchorScroll',
        function( $scope, $route, $routeParams, $location, Infrastructure, $anchorScroll){


    //console.log("WILL EDIT User with ID "+$routeParams.id);
	
    $scope.updateInfrastructure=function(){
    	
        $scope.portalinfrastructure.$update(function(){
			$location.path("/infrastructures");
        });
    };

    $scope.loadInfrastructure=function(){
        $scope.portalinfrastructure=Infrastructure.get({id:$routeParams.id});
    };

    $scope.loadInfrastructure();
}]);




appControllers.controller('InfrastructureAddImageController',['$scope', '$route', '$routeParams', '$location', 'Infrastructure', '$anchorScroll', 'VFImage', '$http', 'APIEndPointService', 
    function( $scope, $route, $routeParams, $location, Infrastructure, $anchorScroll, VFImage, $http, APIEndPointService){

	$scope.vfimages= VFImage.query(function() {
 			angular.forEach( $scope.vfimages , function( img, appkey) {	    		
 			});
		}); 
	$scope.loadInfrastructure=function(){
        $scope.portalinfrastructure=Infrastructure.get({id:$routeParams.id});
    };

    $scope.loadInfrastructure();
    
	$scope.updateInfrastructure = function submit() {
		 
		return $http({
			method : 'POST',
			url : APIEndPointService.APIURL+'services/api/repo/admin/infrastructures/' + $scope.portalinfrastructure.id + '/images/' + $scope.vfselectedimage.id
		}).then(function( response ) {
			$location.path("/edit_infrastructure/" + $scope.portalinfrastructure.id );
		}, function errorCallback(response) {
            alert( response.statusText + " - Failed to read uploaded archive! " + response.data["message"]  );
        });
	};

}]);




appControllers.controller('VFImageListController', ['$scope','$window','$log', 'VFImage', 'popupService','ngDialog',
                                             	function($scope, $window, $log, VFImage, popupService, ngDialog ) {
                 	
                 	
 	$scope.vfimages= VFImage.query(function() {
	 		angular.forEach( $scope.vfimages , function( img, appkey) {	    		
	 		});
 		  }); //query() returns all the subscribedresources
 		 
 	
 	
 	 $scope.deleteVFImage = function(gridItem, useridx){

 		$log.debug("Selected to DELETE vfimage with id = "+ useridx);
 		 	

 		 	var vxf=VFImage.get({id:useridx}, function() {
 			    $log.debug("WILL DELETE VFImage ID "+ vxf.id);
 			    
 		        if(popupService.showPopup('Really delete Image "'+vxf.name+'" ?')){
 				 	
 		        	vxf.$delete(function(){
 		    			$scope.vfimages.splice($scope.vfimages.indexOf(gridItem),1)
 		            });
 		        
 		        }
 		 	});
 	    }
 	          	
                 	 
}]);


appControllers.controller('VFImageUploadController', function($scope, $location,
		VFImage, PortalUser, $rootScope, $http,formDataObject, $filter,
		APIEndPointService) {
	
	$scope.vfimage = new VFImage();
	$scope.vfimage.owner = $rootScope.loggedinportaluser;	
	
		    
	    
//	$scope.addVFImage = function() {
//		$scope.vfimage.$save(function() {
//			$location.path("/vfimages");
//		});
//	}
	
	
	$scope.nameChanged = function() {
  		console.log("nameChanged = " + $scope.vfimage.name );
	};

	$scope.nameIsValid = false;
	$scope.nameExists = false;
		
	
	$scope.checkVFImageName = function checkName() {
		return $http({
			method : 'GET',
			url : APIEndPointService.APIURL+'services/api/repo/admin/vfimages/name/' + $scope.vfimage.name,
			headers : {
				'Content-Type' : 'application/json'
			}
		}).then(function( response ) {
			//alert( response.statusText + " - Image exists " + response.data["message"]  );;
			$scope.nameIsValid = false;
			$scope.nameExists = true;
		}, function errorCallback(response) {
            //alert( response.statusText + " -  Image does not exists ! " + response.data["message"]  );
            $scope.nameIsValid = true;
        	$scope.nameExists = false;
        });
	};
	
		
	$scope.submitNewVFImage = function submit() {
		 
		return $http({
			method : 'POST',
			url : APIEndPointService.APIURL+'services/api/repo/admin/vfimages/',
			headers : {
				'Content-Type' : 'multipart/form-data'
			},
			data : {
				vfimage: angular.toJson( $scope.vfimage, false ),
				prodFile: $scope.uploadedVFImageFile,
				//file : $scope.file
			},
			transformRequest : formDataObject
		}).then(function( response ) {
			$location.path("/vfimages");
		}, function errorCallback(response) {
            alert( response.statusText + " - Failed to read uploaded archive! " + response.data["message"]  );
        });
	};

});


appControllers.controller('VFImageEditController', function($scope, $location, $routeParams,
		VFImage, PortalUser, $rootScope, $http,formDataObject, $filter,
		APIEndPointService) {
	

	$scope.loadvfimage = function(){
        $scope.vfimage=VFImage.get({id:$routeParams.id});
    };
    
    
    $scope.loadvfimage();
    		   
		
	$scope.submitUpdateVFImage = function submit() {
		 
		return $http({
			method : 'PUT',
			url : APIEndPointService.APIURL+'services/api/repo/admin/vfimages/',
			headers : {
				'Content-Type' : 'multipart/form-data'
			},
			data : {
				vfimage: angular.toJson( $scope.vfimage, false ),
				prodFile: $scope.uploadedVFImageFile,
				//file : $scope.file
			},
			transformRequest : formDataObject
		}).then(function( response ) {
			$location.path("/vfimages");
		}, function errorCallback(response) {
            alert( response.statusText + " - Failed to read uploaded archive! " + response.data["message"]  );
        });
	};

});




appControllers.controller('VFImageViewController', function($scope, $location, $routeParams,
		VFImage, PortalUser, $rootScope, $http,formDataObject, $filter,
		APIEndPointService) {
	

	$scope.loadvfimage = function(){
        $scope.vfimage=VFImage.get({id:$routeParams.id});
    };
    
    
    $scope.loadvfimage();
    		

});