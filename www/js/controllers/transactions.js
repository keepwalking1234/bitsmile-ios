angular.module(appName).controller('TransactionsCtrl',
	function($rootScope, $scope, $state, $http, $ionicLoading, $interval, localStorageService, _rpc, _app, _dialogs, _utils)
	{
		var tok = _app.decodeToken();

		$scope.isEmpty = false;
		$scope.transactions = [];
		$scope.tmpTxs = [];
		$scope.transactions = [];
		$scope.txLength = 0;
		$scope.wallet_balance = "-";
		var txData;
		$ionicLoading.show({ template: Lang.PleaseWait[$rootScope.activeLang.name] });
		$scope.refreshTransactions = function()
		{	
			//$ionicLoading.show({ template: Lang.PleaseWait[$rootScope.activeLang.name] });
			var obj = _app.decodeToken();
			$scope.tmpTxs = [];
			
			_rpc.getBalance(obj.address, function(data)
				{			    										
					if (data.error != undefined)
					{
						$scope.transactions = [];
						$scope.isEmpty = true;
						$scope.$apply();
						$ionicLoading.hide();
					} else
					{
						$scope.wallet_balance = data.balance;
						$scope.txLength = data.last_txs.length;
						for(var idx in data.last_txs)
						{
							var _tx = data.last_txs[idx];
							if(_tx.addresses!=undefined){								
							txData='';
							getTxInfo(_tx.addresses);
							var _tx_ ={};
							_tx_.category = 'receive';
							if(_tx['type']=='vin')_tx_.category = 'send';
							_tx_.txid = txData.txid;
							_tx_.time = txData.time;
							_tx_.blocktime = txData.blocktime;
							_tx_.amount = 0.0000;
							if (_tx_.category == "send"){
								for(var vidx in txData.vout)
								{	
									for(var myaddy in txData.vout[vidx].scriptPubKey.addresses)
									{
									var addr = txData.vout[vidx].scriptPubKey.addresses[myaddy];
									if (addr != obj.address){
										_tx_.amount = _tx_.amount + txData.vout[vidx].value;
									}
									}
								}
							} else {
								for(var vidx in txData.vout)
								{	
									for(var myaddy in txData.vout[vidx].scriptPubKey.addresses)
									{
									if(txData.vout[vidx].scriptPubKey.addresses[myaddy]==obj.address){	
									var addr = txData.vout[vidx].scriptPubKey.addresses[myaddy];
									if (addr == obj.address){
										_tx_.amount = _tx_.amount + txData.vout[vidx].value;
									}
									}
									}
								}
							}
							_tx_.confirmations = txData.confirmations;
							_tx_.other = txData;
							$scope.tmpTxs.push(_tx_);	
							//$scope.isEmpty = $scope.tmpTxs.length == 0;
							if ($scope.tmpTxs.length >= $scope.transactions.length)
								{
									$scope.transactions = $scope.tmpTxs;
								}
							if ($scope.transactions.length==0)
							{
								$scope.isEmpty = true;
								$scope.$apply();
								$ionicLoading.hide();
							}
							$scope.$broadcast('scroll.refreshComplete');
							$ionicLoading.hide();
							}
						}
					}
				});
			
		}

		function getTxInfo(txId){
		    $.ajax({
		         headers : { "cache-control": "no-cache" },
		         url:    explorerUrl+'/api/getrawtransaction?txid='+txId+'&decrypt=1',
		         success:function( data ) {
		        	 txData=data;
					},
		         async:  false
		    	}); 
		}
				
		//$ionicLoading.show({ template: Lang.PleaseWait[$rootScope.activeLang.name] });
		$scope.refreshTransactions();
		//$ionicLoading.hide();		
		
		var refreshPromise = $interval( function() {
				$scope.refreshTransactions();
			}, 15000);
		  
		$scope.$on('$destroy', function () { $interval.cancel(refreshPromise); });
		
		_dialogs.register($scope, 'modalTxDetails', 'views/modals/trans-details.html');	
		
		$scope.closeDialog = function(_name)
		{
			_dialogs.close($scope, _name);
		}			  
		
		$scope.showDetails = function(_item){
			$scope.currentTx = _item;
			_dialogs.open($scope, 'modalTxDetails');
		}
		$scope.copyAddress = function (copyAddress) {
		    copyToClipboard(copyAddress);
		}
		function copyToClipboard(text) {
		    try {
		        cordova.plugins.clipboard.copy(text, function () {
		            $ionicLoading.show({ template: '<span class="ion-ios-copy" style="font-size: 48px; color: white"></span>', duration: 500, noBackdrop: true });
		        });
		    } catch (e) { }
		}
	});