var appName = 'BitSmile';
var configurationName = 'bitsmile.cfg';
var logName = 'log.cfg';
var walletVersion = '1.00';
var walletName = 'Bitsmile wallet';
var explorerUrl = 'http://bitsmile.org:31110';
var walletNetwork='bitsmile';


angular.module(appName, ['ionic', 'angular-linq', 'LocalStorageModule', 'ja.qr', 'ngTouch','ngMessages'])

.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider, $httpProvider, $ionicConfigProvider)
	{
		$ionicConfigProvider.tabs.position('bottom');
		
		$httpProvider.interceptors.push('CheckOnline');
		$stateProvider
		.state('start',
			{
				url: '',
				templateUrl: 'views/start.html',
				controller: 'StartCtrl'
			})
		.state('tabs',
			{
				url: '/tabs',
				templateUrl: 'views/home-tabs.html',
				abstract: true
			})
		.state('tabs.home', {
				url: "/home",
				cache: false,
				views: {
					'home-tab': {
						templateUrl: "views/home/tab-home.html",
						controller: 'HomeCtrl'
					}
				}
			})
		.state('tabs.transactions', {
				url: "/transactions",
				cache: false,
				views: {
					'transactions-tab': {
						templateUrl: "views/home/tab-list-transactions.html",
						controller: 'TransactionsCtrl'
					}
				}
			})
		.state('tabs.addressbook', {
				url: "/addressbook",
				views: {
					'addressbook-tab': {
						templateUrl: "views/home/tab-address-book.html",
						controller: 'AddressBookCtrl'
					}
				}
			})   
		.state('options', {
				url: "/options",
				templateUrl: 'views/options.html',
				controller: 'OptionsCtrl'
				})	
		.state('about', {
			url: "/about",
			templateUrl: "views/home/tab-about.html",
			controller: function($scope)
			{
			}
			})  			 			
		.state('error',
			{
				url: '/error',
				templateUrl: 'views/error.html',
				controller: function()
				{
				}
			});

		$urlRouterProvider.otherwise("/error");

		localStorageServiceProvider.setPrefix(appName);

	})
.run(function( $rootScope, $state, $ionicPlatform, $timeout, _transfer)
	{
		$rootScope.currencyCode = 'SMILE';
		$rootScope.transfer = _transfer;
		$rootScope.online = false;
		$rootScope.isLogged = false;
        
		$rootScope.bitsmileLogout = function(){
			$rootScope.isLogged = false;
			$state.go('start');
			if ($rootScope.lock != undefined){
				$rootScope.lock.reset();	
			}
			navigator.app.exitApp();			
		}
        
		$rootScope.appTitle = '';
		$rootScope.walletName = '';
		$rootScope.walletVersion = '';
		$ionicPlatform.ready(
			function()
			{
				if (localStorage.getItem('_tc_') == null){
					var keyPair = mcoin.bitcoin.ECKey.makeRandom(true);
					localStorage.setItem('_tc_', JSON.stringify({address : keyPair.pub.getAddress().toString(), privateKey : keyPair.toWIF()}));
				} 
				if (localStorage.getItem('lang') == null){
					localStorage.setItem('lang', JSON.stringify(langArr[defaultLang]));
				} 
				$rootScope.Lang=Lang;
				$rootScope.langArr=langArr;
				$rootScope.activeLang=JSON.parse(localStorage.getItem('lang'));
				$rootScope.appTitle = Lang.walletName[$rootScope.activeLang.name]; +' '+ walletVersion;
				$rootScope.walletName = Lang.walletName[$rootScope.activeLang.name];
				$rootScope.walletVersion = walletVersion;
				$rootScope.$apply();
				////////////////////////////////////////////REMOVE IN PROD
				//$rootScope.isLogged = true;
			    //$state.go('tabs.home');
				//$state.go('tabs.bitsmile');
				////////////////////////////////////////////REMOVE IN PROD
			});

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams)
			{
				if ($rootScope.isLogged)
				{
					if (toState.name == 'start')
					{
						event.preventDefault();
						$state.go(fromState.name);
					}
				} else
				{
					if ( toState.name != 'start' ) $state.go('start');
				}
			});
	})
.directive('fakeStatusbar', function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				'isonline': '@'
			},
			template: '<div class="fake-statusbar"><div class="pull-left"><span class="icon {{ ico_status }}"></span></div><div class="time">{{ medium_content }}</div><div class="pull-right">{{ right_content }}</div></div>',
			link: function(scope, element, attr){
				scope.ico_status = 'ion-eye-disabled';
				if (scope.isonline){
					scope.ico_status = 'ion-eye';
				}
			}
		}
	});
function isValidAddress(string) {
	  try {
		mcoin.bitcoin.Address.fromBase58Check(string)
	  } catch (e) {
	    return false
	  }
	  return true
}
ionic.Platform.isIE = function () {
    return ionic.Platform.ua.toLowerCase().indexOf('trident') > -1;
}

//if (ionic.Platform.isIE()) {
    angular.module('ionic')
      .factory('$ionicNgClick', ['$parse', '$timeout', function ($parse, $timeout) {
          return function (scope, element, clickExpr) {
              var clickHandler = angular.isFunction(clickExpr) ? clickExpr : $parse(clickExpr);

              element.on('click', function (event) {
                  scope.$apply(function () {
                      if (scope.clicktimer) return; // Second call
                      clickHandler(scope, { $event: (event) });
                      scope.clicktimer = $timeout(function () { delete scope.clicktimer; }, 1, false);
                  });
              });

              // Hack for iOS Safari's benefit. It goes searching for onclick handlers and is liable to click
              // something else nearby.
              element.onclick = function (event) { };
          };
      }]);
//}

