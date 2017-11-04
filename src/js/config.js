var appConfig = angular.module('portalwebapp.config',[]);


appConfig.factory('APIEndPointService', function() {
	  return {	      
		  //APIURL: "/portal/"
		  APIURL: "http://localhost:13000/5ginfireportal/", //good to test CROSS ORIGIN scenarios. use with http://127.0.0.1/mp
		  WEBURL: "http://localhost:13000/mp"
		  //APIURL: "http://localhost:13000/5ginfireportal/" //good to test CROSS ORIGIN scenarios. use with http://127.0.0.1/mp
		  //APIURL: "http://83.212.106.218:8080/5ginfireportal/"
	  };
});
