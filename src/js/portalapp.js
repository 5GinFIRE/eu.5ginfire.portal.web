var app = angular.module('portalapp', [   'ngCookies', 'ngResource', 'ngRoute', 
                                         'trNgGrid', 'portalapp.controllers', 'portalwebapp.config', 
                                         'portalapp.services', 'ngDialog',
                                         'angular-loading-bar', 'ngAnimate' ]);


var portalversion = '20180213_trunk';

app.config(function($routeProvider, $locationProvider, $anchorScrollProvider, cfpLoadingBarProvider) {
	
    $anchorScrollProvider.disableAutoScrolling();
    
	$routeProvider.when('/login', {
		controller : 'LoginCtrl'
	}).when('/logout', {
		templateUrl : 'logout.html',
		controller : 'LogoutCtrl'
	}).when('/signup', {
		templateUrl : 'signup.html',
		controller : 'SignupCtrl'
	}).when('/users', {
		templateUrl : 'Users.html',
		controller : 'UserListController'
	}).when('/users_add', {
		templateUrl : 'UserAdd.html',
		controller : 'UserAddController'
	}).when('/edit_user/:id', {
		templateUrl : 'UserEdit.html',
		controller : 'UserEditController'
	}).when('/subscribed_resources', {
		templateUrl : 'SubscribedResources.html',
		controller : 'SubscribedResourceListController'
	}).when('/add_subscribed_resource', {
		templateUrl : 'SubscribedResourceAdd.html',
		controller : 'SubscribedResourceAddController'
	}).when('/edit_subscribed_resource/:id', {
		templateUrl : 'SubscribedResourceEdit.html',
		controller : 'SubscribedResourceEditController'
	}).when('/experiments', {
		templateUrl : 'Experiments.html',
		controller : 'ExperimentListController'
	}).when('/experiment_add', {
		templateUrl : 'ExperimentAdd.html',
		controller : 'ExperimentAddController'
	}).when('/experiment_upload', {
		templateUrl : 'ExperimentUpload.html',
		controller : 'ExperimentUploadController'
	}).when('/experiment_edit/:id', {
		templateUrl : 'ExperimentEdit.html',
		controller : 'ExperimentEditController'
	}).when('/experiment_view/:id', {
		templateUrl : 'ExperimentView.html',
		controller : 'ExperimentViewController'
	}).when('/categories', {
		templateUrl : 'Categories.html',
		controller : 'CategoriesListController'
	}).when('/add_category', {
		templateUrl : 'CategoryAdd.html',
		controller : 'CategoryAddController'
	}).when('/edit_category/:id', {
		templateUrl : 'CategoryEdit.html',
		controller : 'CategoryEditController'
	}).when('/experiments_marketplace', {
		templateUrl : 'ExperimentsMarketplace.html',
		controller : 'ExperimentsMarketplaceController'
	}).when('/vxfs', {
		templateUrl : 'VxFs.html',
		controller : 'VxFListController'
	}).when('/vxf_add', {
		templateUrl : 'VxFAdd.html',
		controller : 'VxFAddController'
	}).when('/vxf_upload', {
		templateUrl : 'VxFUpload.html',
		controller : 'VxFUploadController'
	}).when('/vxf_edit/:id', {
		templateUrl : 'VxFEdit.html',
		controller : 'VxFEditController'
	}).when('/vxf_view/:id', {
		templateUrl : 'VxFView.html',
		controller : 'VxFViewController'
	}).when('/vxf_marketplace', {
		templateUrl : 'VxFsMarketplace.html',
		controller : 'VxFsMarketplaceController'
	}).when('/fiware_instances', {
		templateUrl : 'FiwareInstances.html',
		controller : 'FiwareInstancesController'
	}).when('/deployments', {
		templateUrl : 'Deployments.html',
		controller : 'DeploymentsListController'
	}).when('/create_deployment', {
		templateUrl : 'DeploymentAdd.html',
		controller : 'DeploymentAddController'
	}).when('/deployments_admin', {
		templateUrl : 'DeploymentsAdmin.html',
		controller : 'DeploymentsAdminListController'
	}).when('/edit_deployment/:id', {
		templateUrl : 'DeploymentEdit.html',
		controller : 'DeploymentEditController'
	}).when('/portal_client', {
		templateUrl : 'PortalClient.html',
		controller : 'PortalClientViewController'
	}).when('/manoplatforms', {
		templateUrl : 'MANOplatforms.html',
		controller : 'MANOplatformsListController'
	}).when('/add_manoplatform', {
		templateUrl : 'MANOplatformAdd.html',
		controller : 'MANOplatformAddController'
	}).when('/edit_manoplatform/:id', {
		templateUrl : 'MANOplatformEdit.html',
		controller : 'MANOplatformEditController'
	}).when('/manoproviders', {
		templateUrl : 'MANOproviders.html',
		controller : 'MANOprovidersListController'
	}).when('/add_manoprovider', {
		templateUrl : 'MANOproviderAdd.html',
		controller : 'MANOproviderAddController'
	}).when('/edit_manoprovider/:id', {
		templateUrl : 'MANOproviderEdit.html',
		controller : 'MANOproviderEditController'
	}).when('/systeminfo', {
		templateUrl : 'SystemInfo.html',
		controller : 'SystemInfoController'
	}).when('/edit_systeminfo/:id', {
		templateUrl : 'SystemInfoEdit.html',
		controller : 'SystemInfoEditController'
	}).when('/registerconfirm', {
		templateUrl : 'RegisterConfig.html',
		controller : 'RegisterConfigController'
	}).when('/infrastructures', {
		templateUrl : 'Infrastructures.html',
		controller : 'InfrastructureListController'
	}).when('/infrastructures_add', {
		templateUrl : 'InfrastructureAdd.html',
		controller : 'InfrastructureAddController'
	}).when('/edit_infrastructure/:id', {
		templateUrl : 'InfrastructureEdit.html',
		controller : 'InfrastructureEditController'
	}).otherwise({
		redirectTo : '/'
	});
	
	
	cfpLoadingBarProvider.includeSpinner = true;
	cfpLoadingBarProvider.includeBar = true;
	
});


app.controller('mpMainCtrl', function($scope, PortalUser, $log, $location) {
	$scope.mpversion = portalversion;
	$scope.location = $location;
});


app.run(function ( api) {
	  api.init();
});

app.factory('api', function ($http, $cookies) {
	  return {
	      init: function (token) {
	          $http.defaults.headers.common['X-Access-Token'] = token || $cookies.token;
	      }
	  };
	});


app.controller('NavCtrl', [ '$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
	
	//$scope.user = $rootScope.portaluser;
	
	$scope.navClass = function(page) {
		var currentRoute = $location.path().substring(1) || 'home';
		return page === currentRoute ? 'active' : '';
	};
	
    
} ]);

app.controller('LogoutCtrl', [ '$scope', '$location', 'authenticationSvc', '$log',function($scope, $location, authenticationSvc, $log) {
	
	$log.debug('In LogoutCtrl');
	authenticationSvc.logout().then(function(result) {
				$scope.userInfo = null;
				$location.path("/login");
			}, function(error) {
				$log.debug(error);
			});
   
    
    
} ]);

app.controller('portalCtrl', function($scope, PortalUser, $log) {
	$log.debug('inside portalCtrl controller');
	//$scope.portalusers = PortalUser.query();
});


app.controller("LoginCtrl", ["$scope", "$location", "$window", "authenticationSvc", "$log", "$rootScope", "$http", "APIEndPointService", "$interval", "$cookies", "$cookieStore",
                             function ($scope, $location, $window, authenticationSvc, $log, $rootScope, $http, APIEndPointService, $interval, $cookies, $cookieStore) {
	$log.debug('========== > inside LoginCtrl controller');
    $scope.userInfo = null;
    $scope.user = {
    		username : '',
    		password : ''
    	};
    
    $scope.returnurl = $location.absUrl();
    
    
    
    	
    $scope.login = function () {
        authenticationSvc.login($scope.user.username, $scope.user.password)
            .then(function (result) {
    			$rootScope.loggedIn = true;
                $scope.userInfo = result;
                $rootScope.loggedinportaluser = $scope.userInfo.portalUser;

        		$log.debug('========== > inside LoginCtrl controller $rootScope.portaluser ='+ $rootScope.loggedinportaluser);
        		$log.debug('========== > inside LoginCtrl controller $rootScope.portaluser ='+ $rootScope.loggedinportaluser.username);
                
                $location.path("/experiments_marketplace");
            }, function (error) {
                //$window.alert("Invalid credentials");
    			$scope.loginError = true;
    			$log.debug(error);
            });
    };

    $scope.cancel = function () {
        $scope.user.userName = "";
        $scope.user.password = "";
    };
    
  
    
    $scope.showOauth2FIWAREPopup = function showPopup(){

		 var jsession = $cookieStore.get('JSESSIONID');
		 $log.debug('========== > COOKIES jsession= '+  jsession);
		 
	    	    // center the popup window
	    var left = screen.width/2 - 200
	        , top = screen.height/2 - 250
	        , popup = $window.open(APIEndPointService.APIURL+'services/api/repo/oauth2', '', "top=" + top + ",left=" + left + ",width=1024,height=500")
	        , interval = 1000;


		 var receiveMessage =(function (event) //this one is a callback from the popup.Portal REST returns an HTML page that we can communicate via POST message
		 {
			   // event.source is popup
			   // event.data is the jspn object
			 var popup = event.source;
			 
			 $log.debug('========== > insidereceiveMessage popup= '+  event.data);
			 var session= event.data;
			 if (session.indexOf("username")>=0 ){
		        	
		          $interval.cancel(i);
		          popup.close();
		          var sessionObj = JSON.parse(session);
		          var userInfo = {
		                    accesstoken: "NOTIMPLEMENTED",
		                    username: sessionObj.username,
		                    portalUser: sessionObj.portalUser,
		                    fiwareuser: sessionObj.fiwareuser,
		          };
		          $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
		          $rootScope.loggedIn = true;
	              $scope.userInfo = userInfo;
	              $rootScope.loggedinportaluser = $scope.userInfo.portalUser;
	              $rootScope.loggedinfiwareuser = $scope.userInfo.fiwareuser;
	              $rootScope.xAuthTokenKey = userInfo.xAuthTokenKey;
	              $rootScope.cloudAccessTokenKey = userInfo.cloudAccessTokenKey;
	              
	      			$log.debug('========== > inside LoginCtrl controllerinterval $rootScope.portaluser ='+ $rootScope.loggedinportaluser.username);
	      			$log.debug('========== > inside LoginCtrl controllerinterval $rootScope.xAuthTokenKey ='+ $rootScope.xAuthTokenKey);
	      			$log.debug('========== > inside LoginCtrl controllerinterval $rootScope.cloudAccessTokenKey ='+ $rootScope.cloudAccessTokenKey);
	      			$log.debug('========== > inside LoginCtrl controllerinterval $rootScope.loggedinfiwareuser.nickNamer ='+ $rootScope.loggedinfiwareuser.nickName);
	      			$log.debug('========== > inside LoginCtrl controllerinterval $rootScope.loggedinfiwareuser.xOAuth2Token ='+ $rootScope.loggedinfiwareuser.xOAuth2Token);
	      			$log.debug('========== > inside LoginCtrl controllerinterval $rootScope.loggedinfiwareuser.cloudToken ='+ $rootScope.loggedinfiwareuser.cloudToken);
	      			$log.debug('========== > inside LoginCtrl controllerinterval $rootScope.loggedinfiwareuser.tenantName ='+ $rootScope.loggedinfiwareuser.tenantName);
	      			  

	      			
	              $location.path("/experiments_marketplace");
	              
	              
		        }
			 
		 });
		 
		 window.addEventListener("message", receiveMessage, false);
		 
		 
	    // create an ever increasing interval to check a certain global value getting assigned in the popup
	    var i = $interval(function(){
	      interval += 500;
	      try {

	    	  // This will successfully queue a message to be sent to the popup, assuming
	    	  // the window hasn't changed its location.
	    	  popup.postMessage("hello there!", "*");
	    		 
	    	  if( !popup.document ){ //when window closes without login
	      			$interval.cancel(i);
			        popup.close();
			        return;
	      		}
	    	  
	      		
	      } catch(e){
	        console.error(e);
	      }
	    }, interval);
	    
	    

	  }
    
    
    
    
}]);



//configure cirrect date output

app.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
       return moment(date).format('DD-MM-YYYY');
    };
});




// The code below is heavily inspired by Witold Szczerba's plugin for AngularJS.
// // I have modified the code in order
// to reduce its complexity and make for easier explanation to novice JS
// developers. You can find his plugin here: // https://
// github.com/witoldsz/angular-http-auth

app.config(function($httpProvider) {
	
	$httpProvider.defaults.withCredentials = true; //good for CORS support
	$httpProvider.interceptors.push(function($rootScope, $location, $q, $log,$window) {
		return {
			'request' : function(request) { // if we're not logged-in to the
				// AngularJS app, redirect to // login
				// page
				$rootScope.loggedIn = $rootScope.loggedIn || $rootScope.username;
				$log.debug('========== > inside httpProvider.interceptors');
				
				if ($window.sessionStorage["userInfo"]!=null) {
		            userInfo = JSON.parse($window.sessionStorage["userInfo"]);
		            if (userInfo){
		            	$rootScope.loggedIn = true;		            	
		            	$rootScope.loggedinportaluser = userInfo.portalUser;
		            	$rootScope.loggedinfiwareuser =userInfo.fiwareuser;
			            $rootScope.xAuthTokenKey = userInfo.xAuthTokenKey;
			            $rootScope.cloudAccessTokenKey = userInfo.cloudAccessTokenKey;
			              
		            	$log.debug('========== > $rootScope.loggedIn set to TRUE because userInfooo = '+userInfo);
		            	if (userInfo.portalUser){
		            		$log.debug('========== > $rootScope.loggedIn set to TRUE because userInfo.portalUser.username = '+userInfo.portalUser.username);
		            		$log.debug('========== > $rootScope.loggedIn set to TRUE because user $rootScope.portaluser='+$rootScope.loggedinportaluser.username);
		            	}
		            	
		            }
		        }
				
				if (!$rootScope.loggedIn 
						&& $location.path() != '/' 
						&& $location.path() != '/login' 
							&& $location.path() != '/signup' 
							&& $location.path() != '/experiments_marketplace'
								&& $location.path() != '/vxf_marketplace'
									&& ($location.path().indexOf("experiment_view") <=0) 
									&& ($location.path().indexOf("registerconfirm") <=0) 							
							&& ($location.path().indexOf("fiwarepopup") <=0) 
							&& ($location.path().indexOf("vxf_view") <=0) 
							) {
					$log.debug('========== > $rootScope.loggedIn IS FALSE');
					$location.path('/login');
				}
				return request;
			},
			'responseError' : function(rejection) { // if we're not logged-in to
													// the web service,
				// redirect to login page
				if (rejection.status === 401 && $location.path() != '/login') {
					$rootScope.loggedIn = false;
		            $window.sessionStorage["userInfo"] = null;
					$location.path('/login');
				}
				return $q.reject(rejection);
			}
		};
	});
});




app.factory("authenticationSvc", ["$http","$q","$window","$rootScope", "$log", "APIEndPointService", 
                                  function ($http, $q, $window,$rootScope, $log, APIEndPointService) {
    var userInfo;

	$log.debug('========== > authenticationSvc');
	
    function login(userName, password) {
        var deferred = $q.defer();
        $log.debug('========== > authenticationSvc Login');
        $http.post(APIEndPointService.APIURL+"services/api/repo/sessions/", { username: userName, password: password })
            .then(function (result) {
                userInfo = {
                    accesstoken: "NOTIMPLEMENTED",//result.data.access_token,
                    username: result.data.username,
                    portalUser: result.data.portalUser,
                };
                $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                deferred.resolve(userInfo);
            }, function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    function logout() {
    	$log.debug('========== > authenticationSvc logout' );
        var deferred = $q.defer();

        $http({
            method: "GET",
            url: APIEndPointService.APIURL+"services/api/repo/sessions/logout",
            headers: {
                //"access_token": "NOT_IMPLEMENTED"//userInfo.accessToken
            }
        }).then(function (result) {
        	$log.debug('========== > authenticationSvc logout RESET everything' );
            userInfo = null;
			$rootScope.loggedIn = false;
            $window.sessionStorage["userInfo"] = null;
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    function getUserInfo() {
        return userInfo;
    }

    function init() {
		$log.debug('========== > authenticationSvc inside init');
        if ($window.sessionStorage["userInfo"]) {
            userInfo = JSON.parse($window.sessionStorage["userInfo"]);
            if (userInfo){
            	$rootScope.loggedIn = true;
            	$rootScope.loggedinportaluser = userInfo.portalUser;
            	$log.debug('========== > $rootScope.loggedIn set to TRUE because userInfo ='+userInfo);
            	$log.debug('========== > $rootScope.loggedIn set to TRUE because userInfo.portalUser ='+userInfo.portalUser);
            	if (userInfo.portalUser){
            		$log.debug('========== > $rootScope.loggedIn set to TRUE because user $rootScope.portaluser.name ='+$rootScope.loggedinportaluser.name);
            		$log.debug('========== > $rootScope.loggedIn set to TRUE because user $rootScope.portaluser.id ='+$rootScope.loggedinportaluser.id);
            	}
            }
        }
    }
    init();
    return {
        login: login,
        logout: logout,
        getUserInfo: getUserInfo
    };
}]);






