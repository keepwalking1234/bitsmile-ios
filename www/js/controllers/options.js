angular.module(appName).controller('OptionsCtrl',
	function($rootScope, $scope, $state, $ionicLoading, $timeout, localStorageService, _app, _rpc, _dialogs, _transfer)
	{
		$scope.userData = _app.decodeToken();
		$scope.showPrivKey = false;
		function copyToClipboard(text) {
		    try {
		        cordova.plugins.clipboard.copy(text, function () {
		            $ionicLoading.show({ template: '<span class="ion-ios-copy" style="font-size: 48px; color: white"></span>', duration: 500, noBackdrop: true });
		        });
		    } catch (e) { }
		}
		$scope.closeMe = function () {
		    window.history.back();
		}
		$scope.copyAddress = function () {
		    copyToClipboard($scope.userData.address);
		}
		$scope.copyKey = function () {
		    copyToClipboard($scope.userData.key);
		}
		$scope.lock = new PatternLock("#patternContainerSmall",
				{
					margin: 10,
					radius: 17,
					onDraw: function(pattern)
					{	
						var obj = _app.decodeToken();
						if (obj.password == pattern)
						{
							$scope.showPrivKey=true;
							$scope.$apply();
							setTimeout(function(){ $scope.lock.reset(); }, 200);
						} else {
							$scope.lock.error();
							setTimeout(function(){ $scope.lock.reset(); }, 200);							
						}
					}
				});
		$scope.qrScan = function()
		{
			cordova.plugins.barcodeScanner.scan(
				function (result)
				{
					try{
						var qrt = result.text.split('.');
						$scope.userData.address = qrt[0];
						$scope.userData.key = qrt[1];						
					} catch(err){
					}
				},
				function (error)
				{
					var alertPopup = $ionicPopup.alert({
						title: Lang.ScanQR[$rootScope.activeLang.name],
						template: Lang.ScanQR[$rootScope.activeLang.name]+ " " + error,
						buttons: [{text: Lang.buttonOK[$rootScope.activeLang.name],type: 'button-royal'}]
						});					
				}
			);
		}
		
		$scope.update = function(){
			$ionicLoading.show({ template: Lang.PleaseWait[$rootScope.activeLang.name]});
			_rpc.register($scope.userData, function(req)
				{
					if (req.success)
					{
						localStorageService.set('token', req.result);
					} else
					{

					}
					$timeout(function(){
							$ionicLoading.hide();
						}, 500);
				});			
		}
		$scope.hideMe = function()
		{
			$scope.showPrivKey=false;
		};
		$scope.switchLang = function(lang)
		{
			localStorage.setItem('lang', JSON.stringify(langArr[lang]));
			$rootScope.activeLang=JSON.parse(localStorage.getItem('lang'));
			//$rootScope.$apply();
		};
	});