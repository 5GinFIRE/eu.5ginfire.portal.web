var appServices = angular.module('portalapp.services',[]);

//PortalUser Resource
appServices.factory('PortalUser', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/admin/users/:id", 
			{ id: '@id' }, {
	    update: {
	        method: 'PUT' // this method issues a PUT request
        	
	      }
	});
});


appServices.factory('SessionService', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/sessions/");
});


appServices.service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});






appServices.factory('formDataObject', function() {
	return function(data) {
		var fd = new FormData();
		angular.forEach(data, function(value, key) {
			if (value){
				fd.append(key, value);
				//console.log("key="+key+", value="+value);
			}else{
				fd.append(key, "");
			}
				
		});
		return fd;
	};
});

//SubscribedResource Resource
appServices.factory('SubscribedResource', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/admin/subscribedresources/:id", 
			{ id: '@id' }, {
	    update: {
	        method: 'PUT' // this method issues a PUT request
        	
	      }
	});
});


//Category Resource
appServices.factory('AdminCategory', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/admin/categories/:id", 
			{ id: '@id' }, {
	    update: {
	        method: 'PUT' // this method issues a PUT request
        	
	      }
	});
});


//Category Resource
appServices.factory('Category', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/categories/:id", 
			{ id: '@id' }, {
	    update: {
	        method: 'PUT' // this method issues a PUT request
        	
	      }
	});
});

//experiments Resource
appServices.factory('ExperimentMetadata', function($resource, APIEndPointService) {
	
	return $resource(APIEndPointService.APIURL+"services/api/repo/experiments/:id", 
			{ id: '@id' }, {				
		
		    update: {
		        method: 'PUT' // this method issues a PUT request      	
		      	}
	});
	
});


//Admin experiments Resource
appServices.factory('AdminExperimentMetadata', function($resource, APIEndPointService) {
	
	return $resource(APIEndPointService.APIURL+"services/api/repo/admin/experiments/:id", 
			{ id: '@id' }, {				
		
		    update: {
		        method: 'PUT' // this method issues a PUT request      	
		      	}
	});
	
});


appServices.factory('Container', function() {
	
	var container = function(id, aName) {
	       
	    this.id = id;
	     
	    this.name = aName;
	    this.deployArtifacts = [];
	 
	    this.isObject = function(object) {
	        return object instanceof Object;
	    };
	 
	};
	
	return container;
	
});


appServices.factory('DeployContainer', function() {
	
	var container = function(id, aName) {
	       
	    this.id = id;

	    this.name = aName;
	    //this.targetResource = {};
	    this.deployArtifacts = [];
	 
	    this.isObject = function(object) {
	        return object instanceof Object;
	    };
	 
	};
	
	return container;
	
});


appServices.factory('DeployArtifact', function() {
	
	var dep = function(id, uuid, name, artifactURL, artifactPackageURL, depextensions) {
	       
	    this.id = id;	     
	    this.name = name; 
	    this.uuid = uuid; 
	    this.artifactURL = artifactURL; 
	    this.artifactPackageURL = artifactPackageURL;
	    
	    
	    var exs=[];
	    angular.forEach ( depextensions, function(extension, categkey) {
	    	 var e={};
			 e.name = extension.name;
			 e.value = extension.value;
			 exs.push(e);
		 });

	    this.extensions = exs;
	    
	    this.isObject = function(object) {
	        return object instanceof Object;
	    };
	 
	};
	
	return dep;
	
	
});


//DeploymentDescriptor Resource
appServices.factory('DeploymentDescriptor', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/admin/deployments/:id", 
		{id : "@id"	}, {
		"update" : {
			method : "PUT"
		}

	});
});



appServices.factory('formDataObject', function() {
	return function(data) {
		var fd = new FormData();
		angular.forEach(data, function(value, key) {
			if (value){
				fd.append(key, value);
				//console.log("key="+key+", value="+value);
			}else{
				fd.append(key, "");
			}
				
		});
		return fd;
	};
});


//PortalUser Resource
appServices.factory('VxFMetadata', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/vxfs/:id", 
		{id : "@id"	}, {
		"update" : {
			method : "PUT"
		}

	});
});

//PortalUser Resource
appServices.factory('AdminVxFMetadata', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/admin/vxfs/:id", 
		{id : "@id"	}, {
		"update" : {
			method : "PUT"
		}

	});
});

//ComputeEndpoint
appServices.factory('ComputeEndpoint', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/fiware/computeendpoints", 
		{id : "@id"	}, {
		"update" : {
			method : "PUT"
		}

	});
});

//FIWAREServers
appServices.factory('FIWAREServers', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/fiware/servers", 
		{id : "@id"	}, {
		"update" : {
			method : "PUT"
		}

	});
});



//MANO platform Resource
appServices.factory('AdminMANOplatform', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/admin/manoplatforms/:id", 
			{ id: '@id' }, {
	    update: {
	        method: 'PUT' // this method issues a PUT request
      	
	      }
	});
});


//MANO provider Resource
appServices.factory('AdminMANOprovider', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/admin/manoproviders/:id", 
			{ id: '@id' }, {
	    update: {
	        method: 'PUT' // this method issues a PUT request
      	
	      }
	});
});


appServices.factory('VxFOnBoardedDescriptor', function($resource, APIEndPointService) {
	console.log(" =====> IN appServices.factory('VxFOnBoardedDescriptor' <=========");
	return $resource(APIEndPointService.APIURL+"services/api/repo/admin/vxfobds/:id", 
			{ id: '@id' }, {
	    update: {
	        method: 'PUT' // this method issues a PUT request
      	
	      }
	});
});

appServices.factory('ExperimentOnBoardDescriptor', function($resource, APIEndPointService) {
	console.log(" =====> IN appServices.factory('ExperimentOnBoardDescriptor' <=========");
	return $resource(APIEndPointService.APIURL+"services/api/repo/admin/experimentobds/:id", 
			{ id: '@id' }, {
	    update: {
	        method: 'PUT' // this method issues a PUT request
      	
	      }
	});
});


//FStoreProperty Resource
appServices.factory('PortalProperty', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.APIURL+"services/api/repo/admin/properties/:id", 
			{ id: '@id' }, {
	    update: {
	        method: 'PUT' // this method issues a PUT request
        	
	      }
	});
});



