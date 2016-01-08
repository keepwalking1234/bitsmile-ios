angular.module(appName).controller('AddressBookCtrl',
	function ($rootScope, $scope, $state, $ionicPopup, $ionicLoading, localStorageService, _rpc, _app, _dialogs)
	{
		var emptyData = $scope.addressbookData =
		{
			id: 0,
			title: '',
			address: '',
		};
		function copyToClipboard(text) {
		    try {
		        cordova.plugins.clipboard.copy(text, function () {
		            $ionicLoading.show({ template: '<span class="ion-ios-copy" style="font-size: 48px; color: white"></span>', duration: 500, noBackdrop: true });
		        });
		    } catch (e) { }
		}
		$scope.copyAddress = function (copyAddress) {
		    copyToClipboard(copyAddress);
		}
		$scope.addressbookList = [];
		
		if (localStorageService.get('addressbook'))
		{
			$scope.addressbookList = localStorageService.get('addressbook');
		}

		$scope.isEmpty = $scope.addressbookList.length == 0;


		_dialogs.register($scope, 'modalAddresItem', 'views/modals/addressbook-item.html');

		$scope.newAddress = function()
		{
			$scope.abTitle = Lang.AddEntry[$rootScope.activeLang.name];
			//$scope.addressbookData = emptyData;
			$scope.addressbookData =
			{
				id: 0,
				title: '',
				address: '',
			};
			_dialogs.open($scope, 'modalAddresItem');
		}

		$scope.editAddress = function(id)
		{
			for(var i = 0; i < $scope.addressbookList.length ; i++)
			{
				if (i == id)
				{
					$scope.addressbookData.id = id + 1;
					$scope.addressbookData.title = $scope.addressbookList[i].title;
					$scope.addressbookData.address = $scope.addressbookList[i].address;
				}
			}

			$scope.abTitle = Lang.Edit[$rootScope.activeLang.name];
			_dialogs.open($scope, 'modalAddresItem');
		}

		$scope.closeDialog = function(_name)
		{
			_dialogs.close($scope, _name);
		}

		$scope.addressbookUpdate = function(id)
		{

			if (id == 0)
			{
				if(isValidAddress($scope.addressbookData.address)){
				$scope.addressbookList.push(
					{
						title: $scope.addressbookData.title,
						address: $scope.addressbookData.address
					});
				}else{
					var alertPopup = $ionicPopup.alert({
						title: Lang.invalidAddress[$rootScope.activeLang.name],
						template: Lang.invalidAddress[$rootScope.activeLang.name],
						buttons: [{text: Lang.buttonOK[$rootScope.activeLang.name],type: 'button-royal'}]
						});		
					return false;
				}
			} else
			{
				for(var i = 0; i < $scope.addressbookList.length ; i++)
				{
					if (i == (id - 1) )
					{
					if(isValidAddress($scope.addressbookData.address)){
						$scope.addressbookList[i].title = $scope.addressbookData.title;
						$scope.addressbookList[i].address = $scope.addressbookData.address;
					}else{
						var alertPopup = $ionicPopup.alert({
							title: Lang.invalidAddress[$rootScope.activeLang.name],
							template: Lang.invalidAddress[$rootScope.activeLang.name],
							buttons: [{text: Lang.buttonOK[$rootScope.activeLang.name],type: 'button-royal'}]
							});		
						return false;
					}	
					}
				}
			}
			$scope.isEmpty = $scope.addressbookList.length == 0;
			localStorageService.set('addressbook', $scope.addressbookList);
			_dialogs.close($scope, 'modalAddresItem');
		}

		var deleteFromAddressbook = function(id)
		{
			var newList = [];
			for(var i = 0; i < $scope.addressbookList.length ; i++)
			{
				if (i != id)
				{
					newList.push($scope.addressbookList[i]);
				}
			}
			$scope.addressbookList = newList;
			$scope.isEmpty = $scope.addressbookList.length == 0;
			localStorageService.set('addressbook', $scope.addressbookList);
		}

		$scope.addressbookDelete = function(id)
		{
			 var myPopup = $ionicPopup.show({
				    title: Lang.Delete[$rootScope.activeLang.name],
					template: Lang.ConfirmDelete[$rootScope.activeLang.name],
				    scope: $scope,
				    buttons: [
				      { text: Lang.buttonCancel[$rootScope.activeLang.name] },
				      {
				        text: Lang.buttonOK[$rootScope.activeLang.name],
				        type: 'button-royal',
				        onTap: function(e) {
				        	deleteFromAddressbook(id);
				        }
				      }
				    ]
				  });
		}
		
		$scope.qrScan = function()
		{
			cordova.plugins.barcodeScanner.scan(
				function (result)
				{
			        $scope.$apply(function(){$scope.addressbookData.address = result.text;});
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
	});