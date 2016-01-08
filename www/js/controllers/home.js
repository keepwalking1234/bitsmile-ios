angular.module(appName).controller('HomeCtrl',
	function($rootScope, $scope, $state, $ionicLoading, $interval, _app, _rpc, _dialogs, _transfer)
	{
	    var _obj = _app.decodeToken();

	    function copyToClipboard(text) {
	        try {
	            cordova.plugins.clipboard.copy(text, function () {
	                $ionicLoading.show({ template: '<span class="ion-ios-copy" style="font-size: 48px; color: white"></span>', duration: 500, noBackdrop: true });
	            });
	        } catch (e) { }
	    }
		$scope.copyAddress = function () {
		    copyToClipboard($scope.wallet.account.address);
		}
		$scope.qrCode = {
			size: 100,
			typeNumber: 0,
			image: true,
			inputMode: ''
		}
		$scope.wallet =
		{
		};
		$scope.wallet.account =
		{
			'address': 'N/A',
			'balance' : 'N/A',
			'sent': 'N/A',
			'received': 'N/A'
		};	
		$scope.transData =
		{
			address: '',
			amount: '',
			comment: ''
		};

		_dialogs.register($scope, 'modalSendTo', 'views/modals/send-transaction.html');
		$scope.newTransaction = function()
		{
			_dialogs.open($scope, 'modalSendTo');
		}

		$scope.closeDialog = function(_name)
		{
			_dialogs.close($scope, _name);
		}

		$scope.qr_address = _obj.address;
		
		$scope.refreshInfo = function()
		{
			var obj = _app.decodeToken();
			$scope.wallet.account =
			{
				'address': obj.address,
				'balance' : $scope.wallet.account.balance!='N/A'?$scope.wallet.account.balance:'N/A',
				'sent': 'N/A',
				'received': 'N/A'
			};	
			_rpc.getBalance(obj.address, function(data){
					    if(data==null){
					    	$scope.wallet.account =
							{
								'address': obj.address,
								'balance' : 'N/A',
								'sent': 'N/A',
								'received': 'N/A'
							};		
					    }
					    else if (data.error != undefined)
						{
							$scope.wallet.account =
							{
								'address': obj.address,
								'balance' : 0,
								'sent': 0,
								'received': 0
							};
							
						} else {
							$scope.wallet.account =
							{
								'address': data.address,
								'balance' : data.balance,
								'sent': data.sent,
								'received': data.received
							};
						}
				
			});

			_rpc.info(function(data)
				{
					if (data.success)
					{
						$scope.wallet.info = data.result;
						$scope.$broadcast('scroll.refreshComplete');
						$ionicLoading.hide();
					}
				});

		}

		$scope.refreshInfo();
		$ionicLoading.show({template: Lang.PleaseWait[$rootScope.activeLang.name]});
		
		var refreshPromise = $interval( function() {
			$scope.refreshInfo();
		  }, 15000);
		  
		$scope.$on('$destroy', function () { $interval.cancel(refreshPromise); });		  

	});