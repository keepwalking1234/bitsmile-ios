angular.module(appName).controller('StartCtrl',
	function($rootScope, $scope, $state, $ionicModal, $timeout,
		_rpc, _dialogs, _app,
		localStorageService)
	{
		if (localStorage.getItem('lang') == null){
			localStorage.setItem('lang', JSON.stringify(langArr[defaultLang]));
		}
		$scope.patternBtn = true;
		$scope.Lang=Lang;
		$scope.activeLang=JSON.parse(localStorage.getItem('lang'));
		$scope.registerData =
		{
			password: ''
		}

		$timeout(function()
			{
				_rpc.call('help', {}, function(data){ });
			}, 100);

		$rootScope.lock = new PatternLock("#patternContainer",
			{
				margin: 10,
				radius: 20,
				onDraw: function(pattern)
				{
					if ($scope.isInit)
					{
						$scope.loginData.password = pattern;
						$scope.loginMe();
					} else
					{
					    $scope.registerData.password = pattern;
					    if (pattern != '') {
					        $scope.patternBtn = false;
					        $scope.$apply();
					    } else {
					        $scope.patternBtn = true;
					        $scope.$apply();
					    }					    
					}
				}
			});

		$scope.isInit = false;
		if (localStorageService.get('token'))
		{
			$scope.isInit = true;
		}

		$scope.loginData =
		{
			password: ''
		}

		$scope.openDialog = function(_name)
		{
			_dialogs.open($scope, _name);
		}

		$scope.closeDialog = function(_name)
		{
			_dialogs.close($scope, _name);
		}

		$scope.registerMe = function()
		{
			var _tc = JSON.parse(localStorage.getItem('_tc_'));
			$scope.registerData.address = _tc.address;
			$scope.registerData.key = _tc.privateKey;
			$rootScope.lock.reset();
			$scope.isInit = true;
			_rpc.register($scope.registerData, function(req)
				{
					if (req.success)
					{
						localStorageService.set('token', req.result);
						$rootScope.lock.reset();
						$scope.isInit = true;
					} else
					{

					}
				});
		};

		$scope.loginMe = function()
		{
			var obj = _app.decodeToken();

			if (obj.password == $scope.loginData.password)
			{
				$rootScope.isLogged = true;
				setTimeout(function(){ $rootScope.lock.reset(); }, 200);
				$state.go('tabs.home');
			} else {
				$rootScope.lock.error();
				setTimeout(function(){ $rootScope.lock.reset(); }, 200);
			}
		};
		$scope.clearMe = function () {
		    $scope.patternBtn = true;
		    $scope.$apply();
		    $rootScope.lock.reset();
		};
	});	
