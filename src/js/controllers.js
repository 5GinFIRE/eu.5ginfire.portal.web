var appControllers = angular.module('portalapp.controllers',[ 'ngAnimate']) 


appControllers.controller('FeaturedApps', ['$scope','$window','$log', 'ExperimentMetadata', 'Category', '$filter',
                                                     	function($scope, $window, $log, ExperimentMetadata, Category,$filter ) {
                         	
        	var orderBy = $filter('orderBy');
         	$scope.apps = ExperimentMetadata.query(function() {
        		    $scope.apps = orderBy($scope.apps, 'name', true);
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

        //console.log("$scope.password = "+$scope.password);
        //console.log("$scope.retypepassword = "+$scope.retypepassword);
    	if ( ($scope.password) && ($scope.password === $scope.retypepassword))
    		$scope.portaluser.password= $scope.password;
    	else {
            //console.log("Will send to server empty password to keep old one ");
    		$scope.portaluser.password= ''; //send empty to server, so not to change!
    	}
    	
        $scope.portaluser.$update(function(){
			$location.path("/users");
        });
    };

    $scope.loadUser=function(){
        $scope.portaluser=PortalUser.get({id:$routeParams.id});
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


appControllers.controller('AppListController', ['$scope','$window','$log', 'AdminExperimentMetadata', 'popupService','ngDialog',
                                             	function($scope, $window, $log, AdminExperimentMetadata, popupService, ngDialog ) {
                 	
                 	

 	$scope.apps = AdminExperimentMetadata.query(function() {
 		    //console.log($scope.apps);
 		  }); //query() returns all the subscribedresources
 		 
 	
 	
 	 $scope.deleteApp = function(gridItem, useridx){

 		$log.debug("Selected to DELETE AdminExperimentMetadata with id = "+ useridx);
 		 	

 		 	var app=AdminExperimentMetadata.get({id:useridx}, function() {
 			    $log.debug("WILL DELETE AdminExperimentMetadata with ID "+ app.id);
 			    
 		        if(popupService.showPopup('Really delete Application "'+app.name+'" ?')){
 				 	
 		        	app.$delete(function(){
 		    			$scope.apps.splice($scope.apps.indexOf(gridItem),1)
 		            });
 		        
 		        }
 		 	});
 	    }
 	          	
                 	 
}]);

appControllers.controller('AppAddController', function($scope, $location,
		AdminExperimentMetadata, PortalUser, $rootScope, $http,formDataObject, Category,$filter,APIEndPointService, Container, DeployArtifact, VxFMetadata) {

	
	$scope.app = new AdminExperimentMetadata();
	$scope.app.owner = $rootScope.loggedinportaluser;//PortalUser.get({id:$rootScope.loggedinportaluser.id});

	$scope.app.containers=[];//clear everything
	
	var contnrId=0;
	
	var contnr = new Container(contnrId, 'Container'+contnrId);
	$scope.app.containers.push(contnr);
	$scope.activeContainer = contnr;
	
    $scope.addContainer = function() {
    	console.log('addContainer');
    	contnrId = contnrId+1;
    	var contnr = new Container(null, 'Container'+contnrId);
    	$scope.app.containers.push(contnr);
	};
	

	$scope.removeContainer = function(container){
		$scope.app.containers.splice( $scope.app.containers.indexOf(container) ,1);
		$scope.activeContainer = $scope.app.containers[0];
	}
	
	$scope.removeDeploymentArtifact= function(container, selectedVxF) {

		container.ss.splice( container.deployArtifacts.indexOf(selectedVxF) ,1);
		
	}
	
	$scope.isActive=function(c) {
        return $scope.activeContainer === c;
    };
    
    
    $scope.activateContainer =function(c) {
        return $scope.activeContainer = c;
    };
    

	var orderBy = $filter('orderBy');
    $scope.vxfs = VxFMetadata.query(function() {
		    $scope.vxfsTotalNumber = $scope.vxfs.length;
		    $scope.vxfs = orderBy($scope.vxfs, 'name', false);
		    $scope.selectedVxF = $scope.vxfs[0]; 
	}); 
    
    
    
    $scope.addDeploymentArtifact= function(container, selectedVxF) {

        var da =new DeployArtifact( null, selectedVxF.uuid, 
        		selectedVxF.name , 
        		'uuid/'+selectedVxF.uuid, 
        		selectedVxF.packageLocation, 
        		selectedVxF.extensions);
        container.deployArtifacts.push(da);
        return da;
        
    };
    
    
	$scope.categories = Category.query(function() {
		$scope.categories = orderBy($scope.categories, 'name', false);
		
	}); 
	
	
	//an array of files selected
    $scope.files = [];
    $scope.screenshotimages = [];
    $scope.image = "";
    
   //listen for the file selected event
    

    $scope.$on("fileSelectedClearPrevious", function (event, args) {
    	$scope.files = [];
        $scope.screenshotimages = [];
    });
    
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
            
            var reader = new FileReader();
            
        	reader.onload = function (e) {
        		var mdl = {
        				file: args.file,
        				img: e.target.result
        		}
        		
        		$scope.screenshotimages.push( mdl ); 
        	    $scope.image = mdl.img;//trick to load the image
                $scope.$apply();
                
            }
        	
            reader.readAsDataURL(args.file);
            
            
        });
    });
	
	
	$scope.addApp = function() {
		$scope.app.$save(function() {
			$location.path("/experiments");
		});
	}
	
	$scope.submitNewApp = function submit() {
		
		var catidsCommaSeparated = '';
		 angular.forEach ( $scope.app.categories, function(categ, categkey) {
			 catidsCommaSeparated = catidsCommaSeparated+categ.id+',';
		 });
		 
		return $http({
			method : 'POST',
			url : APIEndPointService.APIURL+'services/api/repo/admin/experiments/',
			headers : {
				'Content-Type' : undefined
			},

            //This method will allow us to change how the data is sent up to the server
            // for which we'll need to encapsulate the model data in 'FormData'

			transformRequest: function (data) {
                var formData = new FormData();
                //need to convert our json object to a string version of json otherwise
                // the browser will do a 'toString()' on the object which will result 
                // in the value '[Object object]' on the server.
                //formData.append("app", angular.toJson(data.app));
                formData.append("application",  angular.toJson( data.app, false) );
                //formData.append("prodname", $scope.app.name);
                //formData.append("shortDescription", $scope.app.shortDescription);
                //formData.append("longDescription", $scope.app.longDescription);
                //formData.append("version", $scope.app.version);
                formData.append("prodIcon", $scope.uploadedAppIcon);
                //formData.append("categories", catidsCommaSeparated);
                //now add all of the assigned files
                for (var i = 0; i < data.files.length; i++) {
                	formData.append("screenshots", data.files[i]);
                }
                
                return formData;
            },
            //Create an object that contains the model and files which will be transformed
            // in the above transformRequest method
            data: { 
            		app: $scope.app, 
            		files: $scope.files }
			
            
		}).success(function(data, status, headers, config) {
			$location.path("/experiments");
		}).
        error(function (data, status, headers, config) {
            alert("failed!");
        });
	};
	
	

	$scope.submitNewAppOLD = function submit() {
		
		var catidsCommaSeparated = '';
		 angular.forEach ( $scope.app.categories, function(categ, categkey) {
			 catidsCommaSeparated = catidsCommaSeparated+categ.id+',';
		 });
		 
		return $http({
			method : 'POST',
			url : APIEndPointService.APIURL+'services/api/repo/admin/experiments/',
			headers : {
				'Content-Type' : 'multipart/form-data'
			},
			data : {
				prodname: $scope.app.name,
				shortDescription: $scope.app.shortDescription,
				longDescription: $scope.app.longDescription,
				version: $scope.app.version,
				prodIcon: $scope.app.uploadedAppIcon,
				categories: catidsCommaSeparated,
				//file : $scope.file
			},
			transformRequest : formDataObject
		}).success(function() {
			$location.path("/experiments");
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

appControllers.controller('AppEditController', ['$scope', '$route', '$routeParams', '$location', 
                                                'AdminExperimentMetadata', '$anchorScroll','$http', 'formDataObject', 'cfpLoadingBar', 'Category', '$filter', 'APIEndPointService', 'VxFMetadata', 'Container', 'DeployArtifact',
     function( $scope, $route, $routeParams, $location, AdminExperimentMetadata, $anchorScroll,
    		 $http,formDataObject, cfpLoadingBar, Category, $filter, APIEndPointService, VxFMetadata, Container, DeployArtifact){
	
	

	var contnrId=0;
	
	$scope.addContainer = function() {
    	console.log('addContainer');
    	contnrId = contnrId+1;
    	var contnr = new Container(null, 'Container'+contnrId);
    	$scope.app.containers.push(contnr);
	};
	
	$scope.removeContainer = function(container){
		$scope.app.containers.splice( $scope.app.containers.indexOf(container) ,1);
		
	}
	
	$scope.removeDeploymentArtifact= function(container, selectedVxF) {

		container.deployArtifacts.splice( container.deployArtifacts.indexOf(selectedVxF) ,1);
		
	}
	
	$scope.isActive=function(c) {
        return $scope.activeContainer === c;
    };
    
    
    $scope.activateContainer =function(c) {
        return $scope.activeContainer = c;
    };
    
    
    $scope.vxfs = VxFMetadata.query(function() {
		    $scope.vxfsTotalNumber = $scope.vxfs.length;
		    $scope.vxfs = orderBy($scope.vxfs, 'name', false);
		    $scope.selectedVxF = $scope.vxfs[0]; 
	}); 
    
    
    
    $scope.addDeploymentArtifact= function(container, selectedVxF) {

        var da =new DeployArtifact( null, selectedVxF.uuid, 
        		selectedVxF.name , 
        		'uuid/'+selectedVxF.uuid, 
        		selectedVxF.packageLocation, 
        		selectedVxF.extensions);
        container.deployArtifacts.push(da);
        return da;
        
    };

	
	
	
	
	 $scope.submitUpdateApp = function submit() {
		 //cfpLoadingBar.start();
		 	
		 	
			return $http({
				method : 'PUT',
				url : APIEndPointService.APIURL+'services/api/repo/admin/experiments/'+$routeParams.id,
				headers : {
					'Content-Type' : undefined
				},
				transformRequest: function (data) {
	                var formData = new FormData();
	                formData.append("application",  angular.toJson( data.app, false) );
	                    //need to convert our json object to a string version of json otherwise
	                // the browser will do a 'toString()' on the object which will result 
	                // in the value '[Object object]' on the server.
	                //formData.append("app", angular.toJson(data.app));
	                //formData.append("userid", $scope.app.owner.id);
	                //formData.append("uuid", $scope.app.uuid);
	                //formData.append("prodname", $scope.app.name);
	                //formData.append("shortDescription", $scope.app.shortDescription);
	                //formData.append("longDescription", $scope.app.longDescription);
	                //formData.append("version", $scope.app.version);
	                formData.append("prodIcon", $scope.uploadedAppIcon);
	                //formData.append("categories", catidsCommaSeparated);
	                //now add all of the assigned files
	                //var fd=new FormData();
	                for (var i = 0; i < data.files.length; i++) {
	                    //add each file to the form data and iteratively name them
	                	//fd.append("screenshots[" + i+"]", data.files[i]);
	                	formData.append("screenshots", data.files[i]);
	                }
	                //formData.append("screenshots", fd);
	                //formData.append("screenshots", data.files);
	                
	                
	                return formData;
	            },
	            data: { 
            		app: $scope.app, 
            		files: $scope.files }
			}).success(function(data, status, headers, config) {
				$location.path("/experiments");
			}).
	        error(function (data, status, headers, config) {
	            alert("failed!");
	        });
		};
	

    $scope.loadApp=function(cats){
    	var myapp = AdminExperimentMetadata.get({id:$routeParams.id}, function() {
    		
    		var categoriesToPush=[];
    		angular.forEach(myapp.categories, function(myappcateg, myappcategkey) {
	   	    		//console.log("Examining == > myappcategkey= "+myappcategkey+", myappcateg.id="+myappcateg.id+", myappcateg.name="+myappcateg.name);
	   	    		
	   	    		angular.forEach(cats, function(categ, key) {
		   	    		if (myappcateg.id === categ.id){
		   	    			categoriesToPush.push(categ);
		   	    		}
	   	    		});
	   	 	});
    		
    		myapp.categories=[];//clear everything
    		//now re add the categories to synchronize with local model
    		angular.forEach(categoriesToPush, function(cat, key) {
    			myapp.categories.push(cat);
	   	 	});	 
    		
    		angular.forEach(myapp.categories, function(myappcateg, myappcategkey) {
   	    		console.log(" == >myappcategkey= "+myappcategkey+", myappcateg.id="+myappcateg.id+", myappcateg.name="+myappcateg.name);
	   	 	});	 		
   	 		
   	 		$scope.app=myapp;    
    		
   	 		contnrId = myapp.containers.length-1;
   	 		$scope.activeContainer = myapp.containers[0];
    	});     
    		          
   	 	
    };

    var orderBy = $filter('orderBy');
	$scope.categories = Category.query(function() {
		$scope.categories = orderBy($scope.categories, 'name', false);
		$scope.loadApp($scope.categories);
	}); 
	
	
	//screenshots handling /////////////////////////
	
	//an array of files selected
    $scope.files = [];
    $scope.screenshotimages = [];
    $scope.image = "";
    
   //listen for the file selected event
    

    $scope.$on("fileSelectedClearPrevious", function (event, args) {
    	$scope.files = [];
        $scope.screenshotimages = [];
    });
    
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
            
            var reader = new FileReader();
            
        	reader.onload = function (e) {
        		var mdl = {
        				file: args.file,
        				img: e.target.result
        		}
        		
        		$scope.screenshotimages.push( mdl ); 
        	    $scope.image = mdl.img;//trick to load the image
                $scope.$apply();
                
            }
        	
            reader.readAsDataURL(args.file);            
            
        });
    });

	//screenshots handling /////////////////////////
	
	
    
}]);


appControllers.controller('AppViewController', ['$scope', '$route', '$routeParams', '$location', 'ExperimentMetadata',
                                                 function( $scope, $route, $routeParams, $location, ExperimentMetadata ){
    $scope.app=ExperimentMetadata.get({id:$routeParams.id}, function() {
        //console.log("WILL GET ExperimentMetadata with ID "+$routeParams.id);
        var shots = $scope.app.screenshots;
        $scope.screenshotimages = shots.split(",") ;    	
    	
        
        // initial image index
        $scope._Index = 0;

        // if a current image is the same as requested image
        $scope.isActive = function (index) {
            return $scope._Index === index;
        };

        // show prev image
        $scope.showPrev = function () {
            $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.screenshotimages.length - 1;
        };

        // show next image
        $scope.showNext = function () {
            $scope._Index = ($scope._Index < $scope.screenshotimages.length - 1) ? ++$scope._Index : 0;
        };

        // show a certain image
        $scope.showPhoto = function (index) {
            $scope._Index = index;
        };
        
    });

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
 		    //console.log($scope.apps);
 		  }); //query() returns all the subscribedresources
 		 
 	
 	
 	 $scope.deleteVxF = function(gridItem, useridx){

 		$log.debug("Selected to DELETE AdminVxFMetadata with id = "+ useridx);
 		 	

 		 	var vxf=AdminVxFMetadata.get({id:useridx}, function() {
 			    $log.debug("WILL DELETE VxFMetadatawith ID "+ vxf.id);
 			    
 		        if(popupService.showPopup('Really delete VxF "'+vxf.name+'" ?')){
 				 	
 		        	vxf.$delete(function(){
 		    			$scope.vxfs.splice($scope.vxfs.indexOf(gridItem),1)
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
		 
//		var $rows = $TABLE.find('tr:not(:hidden)');
//		$rows.each(function () {
//		    var param = $(this).find("td").eq(0).html();
//		    if (param){ //not undefined
//		    	var val = $(this).find("td").eq(1).html();    
//		    	//extsCommaSeparated = extsCommaSeparated+param+'='+val+',';
//		    	
//		    	var e={};
//				e.name = param;
//				e.value = val;
//		    	
//		    	$scope.vxf.extensions.push(e);
//		    }
//		});
		
		 
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
		}).success(function() {
			$location.path("/vxfs");
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
    	var contnr = new VxFOnBoardedDescriptor();
    	$scope.vxf.vxfOnBoardedDescriptors.push(contnr);
    	$scope.activevxfOnBoardedDescriptor = contnr;   
    	$scope.submitUpdateVxF( false );  //save vxf with the new descriptor added 
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
				
	            
			}).success(function(data, status, headers, config) {			

		        var d = JSON.parse(  JSON.stringify(data)  );		        
		        var vxfobdToSync = $scope.vxf.vxfOnBoardedDescriptors[ $scope.vxf.vxfOnBoardedDescriptors.indexOf(avxfOnBoardedDescriptor) ];
		        vxfobdToSync.onBoardingStatus = d.onBoardingStatus;
		        vxfobdToSync.deployId = d.deployId;
		        vxfobdToSync.lastOnboarding = d.lastOnboarding;
		        vxfobdToSync.vxfMANOProviderID = d.vxfMANOProviderID;
		    	//$scope.activevxfOnBoardedDescriptor = $scope.vxf.vxfOnBoardedDescriptors.indexOf( d ) ;
		        
		        $scope.checkOBVDStatus( vxfobdToSync );
		        

		        		
		        
			}).
	        error(function (data, status, headers, config) {
	            alert("failed! "+status);
	        }); 	   
	        
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
		  				
		  	            
		  			}).success(function(data, status, headers, config) {			
	
		  		        var d = JSON.parse(  JSON.stringify(data)  );		        
		  		        var vxfobdToSync = $scope.vxf.vxfOnBoardedDescriptors[ $scope.vxf.vxfOnBoardedDescriptors.indexOf(avxfOnBoardedDescriptor) ];
		  		        vxfobdToSync.onBoardingStatus = d.onBoardingStatus;
		  		        vxfobdToSync.deployId = d.deployId;
		  		        vxfobdToSync.lastOnboarding = d.lastOnboarding;
		  		        vxfobdToSync.vxfMANOProviderID = d.vxfMANOProviderID;	
		  		        		
		  		        
		  			}).
		  	        error(function (data, status, headers, config) {
		  	            alert("failed! "+status);
		  	        });	  		        
	  		        
		  		  
	  	    	 
	  	    	  
	  	      		
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
		        
		        avxfOnBoardedDescriptor.onBoardingStatus = 'OFFBOARDING';

		        return $http({
					method : 'PUT',
					url : APIEndPointService.APIURL+'services/api/repo/admin/vxfobds/'+ avxfOnBoardedDescriptor.id +'/offboard',
					headers : {
						'Content-Type' : 'application/json'
					},

		            data: avxfOnBoardedDescriptor
					
		            
				}).success(function(data, status, headers, config) {			

			        var d = JSON.parse(  JSON.stringify(data)  );		        
			        var vxfobdToSync = $scope.vxf.vxfOnBoardedDescriptors[ $scope.vxf.vxfOnBoardedDescriptors.indexOf(avxfOnBoardedDescriptor) ];
			        vxfobdToSync.onBoardingStatus = d.onBoardingStatus;
			        vxfobdToSync.deployId = d.deployId;
			        vxfobdToSync.lastOnboarding = d.lastOnboarding;
			        vxfobdToSync.vxfMANOProviderID = d.vxfMANOProviderID;
			    	//$scope.activevxfOnBoardedDescriptor = $scope.vxf.vxfOnBoardedDescriptors.indexOf( d ) ;
			        
			        $scope.checkOBVDStatus( vxfobdToSync );
			        

			        		
			        
				}).
		        error(function (data, status, headers, config) {
		            alert("failed! "+status);
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
			}).success(function(data, status, headers, config) {			

//		        console.log("data: " + data);
		        $scope.vxf = JSON.parse(  JSON.stringify(data)  );
		        
				if (closeWindow){
					$location.path("/vxfs");					
				} else {
			    	syncScreenData(  $scope.vxf, $scope.categories );
			    	$scope.activevxfOnBoardedDescriptor = $scope.vxf.vxfOnBoardedDescriptors[ $scope.vxf.vxfOnBoardedDescriptors.length-1 ];
				}
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
    		    { id:1, title:'Terms of use', content:$scope.vxf.termsOfUse }
    		  ];
    	  
    	  $scope.tab = $scope.tabs[0];
    	
    	
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

appControllers.controller('MyDeploymentsListController', ['$scope','$window','$log', 'DeploymentDescriptor', 'popupService','ngDialog','$http', 'APIEndPointService',
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
 	    
 	    
 	   
 	  $scope.uninstallDeployment = function(deployment, depidx){
  		 putAction('UNINSTALL',deployment, depidx ); 
	 	
	   }
 	
 	          	
                 	 
}]);


appControllers.controller('CreateAppDeploymentController', ['$scope', '$route', '$rootScope', '$routeParams','$window','$log', 
                                                            'DeploymentDescriptor', 'ExperimentMetadata', 'DeployContainer','DeployArtifact',
                                                            'SubscribedResource', '$filter', '$http', 'APIEndPointService', '$location',
                                             	function($scope, $route, $rootScope, $routeParams, $window, $log, DeploymentDescriptor, 
                                             			ExperimentMetadata, DeployContainer, DeployArtifact,  SubscribedResource , 
                                             			$filter, $http, APIEndPointService, $location) {
                 	

	var orderBy = $filter('orderBy');   	
	$scope.subscribedresources = SubscribedResource.query(function() {
			$scope.subscribedresources = orderBy($scope.subscribedresources, 'url', false);
		  }); 
		 
	
	$scope.newdeployment = new DeploymentDescriptor(); 	
	$scope.newdeployment.owner = $rootScope.loggedinportaluser;//PortalUser.get({id:$rootScope.loggedinportaluser.id});
	$scope.newdeployment.deployContainers=[];//clear everything 	
	
 	var myapp = ExperimentMetadata.get({id:$routeParams.id}, function() {	 		
	 		$scope.newdeployment.baseApplication=myapp;    	
	 		$scope.newdeployment.name=myapp.name+' Deployment';
	 		
	 		angular.forEach(myapp.containers, function(container, containerkey) {
	 			var dc = new DeployContainer(null, container.name);
	 			
	 			angular.forEach(container.deployArtifacts , function(deployArtifact, artifactkey) {
	 				var da =new DeployArtifact( null, deployArtifact.uuid, 
	 						deployArtifact.name , 
	 						deployArtifact.artifactURL, 
	 						deployArtifact.artifactPackageURL, 
	 						deployArtifact.extensions);
	 				
		 			dc.deployArtifacts.push(da);
	 				
	 			});
	 			
	 			$scope.newdeployment.deployContainers.push(dc);
	 			
	   	 	});	 
	 		
	 		$scope.activeContainer = $scope.newdeployment.deployContainers[0];
	 		
	}); 
 	
 	$scope.isActive=function(c) {
        return $scope.activeContainer === c;
    };
    
    
    $scope.activateContainer =function(c) {
        return $scope.activeContainer = c;
    };
    
    
    
    $scope.submitNewAppDeployment = function submit() {
		 
		return $http({
			method : 'POST',
			url : APIEndPointService.APIURL+'services/api/repo/admin/deployments/',
			headers : {
				'Content-Type' : 'application/json'
			},

            data: $scope.newdeployment
			
            
		}).success(function(data, status, headers, config) {
			$location.path("/mydeployments");
		}).
        error(function (data, status, headers, config) {
            alert("failed!");
        });
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
        	
        	link = APIEndPointService.WEBURL+'/#/registerconfirm?rid='+randomid+'&uname='+$scope.portaluser.username;
            msg='Dear '+$scope.portaluseruser.name+' <br>thank you for registering a 5GinFIRE account!<br><br>\r\n'+
            'Please follow this link:<br> '+link+
            ' <br> or copy it to your web browser\r\n'+
            '<br><br>Thank you\r\nThe FORGEStore team';
            
        	
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
    		}).success(function() {
    			alert("A confirmation email has been sent in order to activate your account.");
    			$location.path("/");
    		}).
            error(function (data, status, headers, config) {
                alert("failed!");
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











