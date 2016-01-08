(function ()
		{
	'use strict';

	angular
	.module(appName)
	.service('_transfer', transfer);

	transfer.$inject = ['$rootScope','$ionicPopup','$timeout','$http','localStorageService', 
	                    '_rpc', '_app', '$ionicModal', '$ionicLoading', '_dialogs'];

	function transfer($rootScope, $ionicPopup, $timeout, $http, localStorageService, 
			_rpc, _app, $ionicModal, $ionicLoading, _dialogs)
	{	
		this.data =
		{
				address: '1234567890',
				amount: 0.0,
				comment: ''
		};

		var dialogScope = $rootScope.$new();
		this.sendTo2 = _sendTo2;
		this.openDialog = _openDialog;
		this.closeDialog = _closeDialog;

		var _this = this;

		var callback = function(data)
		{
			_this.closeDialog();

			if (!data.success)
			{
				$timeout(function()
						{
					$ionicPopup.alert(
							{
								title: Lang.TxSend[$rootScope.activeLang.name],
								template: '<span clas="assertive">'+Lang.SendError[$rootScope.activeLang.name]+'</span>',
								buttons: [{text: Lang.buttonOK[$rootScope.activeLang.name],type: 'button-royal'}]
							});

						}, 1000);
			}
		};

		
		function _openDialog(toAddr)
		{

			this.data =
			{
					address: toAddr || '',
					amount: '',
					comment: ''
			};

			

			dialogScope.addressbookList = [];
			if (localStorageService.get('addressbook'))
			{
				dialogScope.addressbookList = localStorageService.get('addressbook');
			}

			dialogScope.selectFromAddressBook = function()
			{
				$('#selectFromAddressBook_dummy').click();
			}
			dialogScope.qrScan = function()
			{
				cordova.plugins.barcodeScanner.scan(
						function (result)
						{
						if (!ionic.Platform.isIE()) {
						    $('#selAddy').val(result.text).trigger('input');
						}else{    
						    $('#selAddy').val(result.text);
						    $('#selAddy').trigger('input');
						    $('#selAddy').trigger('change');
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
			var _this = this;
			$ionicModal.fromTemplateUrl('views/modals/send-transaction.html',
					{
				scope: dialogScope,
				animation: 'slide-in-up'
					}).then(function(modal)
							{
						_this.modal = modal;
						_this.modal.show();
							});
		}

		function _closeDialog()
		{
			this.modal.hide();
			this.modal.remove();
		}
		function _sendTo2(_toAddr)
		{
			var obj = _app.decodeToken();
			if($rootScope.online==false){
				$ionicPopup.alert(
						{
							title: Lang.ErrorHeader[$rootScope.activeLang.name],
							template: '<span class="assertive">'+Lang.walletOffline[$rootScope.activeLang.name]+'</span>',
							buttons: [{text: Lang.buttonOK[$rootScope.activeLang.name],type: 'button-royal'}]
						});	
				return false;
			}
			if(!isValidAddress(_this.data.address)){
					var alertPopup = $ionicPopup.alert({
						title: Lang.invalidAddress[$rootScope.activeLang.name],
						template: Lang.invalidAddress[$rootScope.activeLang.name],
						buttons: [{text: Lang.buttonOK[$rootScope.activeLang.name],type: 'button-royal'}]
						});		
					return false;
			}
			$ionicLoading.show({ template: Lang.Sending[$rootScope.activeLang.name] });
			var tmsec = new Date().getTime();
		    $http.get(explorerUrl + '/api/listunspent?address=' + obj.address + '&nocache=' + tmsec)
			.success(function(utxoData){
				if (utxoData != null){
					var keyPair = mcoin.bitcoin.ECKey.fromWIF(obj.key);
					var tx = new mcoin.bitcoin.TransactionBuilder();
					var txtmp = new mcoin.bitcoin.TransactionBuilder();
					var utxoSum=0;
					var utxoGenSum=0;
					var amountToSend=parseFloat(_this.data.amount.toFixed(8));
					var txAmoutOut;
					var txAmoutChange;
					var fee=0;
					var coinMultiplier=100000000;
					var inCount=0;
					txAmoutOut=Math.ceil(amountToSend*coinMultiplier);
					try {
						tx.addOutput(_this.data.address,txAmoutOut );
					}
					catch(err) {
						$ionicLoading.hide();
						$ionicPopup.alert(
								{
									title: Lang.TxSend[$rootScope.activeLang.name],
									template: '<span class="assertive">'+err.message+'</span>',
									buttons: [{text: Lang.buttonOK[$rootScope.activeLang.name],type: 'button-royal'}]
								});	
						return false;
					}					
					for(var utxo in utxoData){	
						utxoGenSum+=parseFloat(utxoData[utxo]['amount']);	
					}
					for(var utxo in utxoData){	
						try {
							tx.addInput(utxoData[utxo]['txid'],utxoData[utxo]['vout']);	
						}
						catch(err) {
							$ionicLoading.hide();
							$ionicPopup.alert(
									{
										title: Lang.TxSend[$rootScope.activeLang.name],
										template: '<span class="assertive">'+err.message+'</span>',
										buttons: [{text: Lang.buttonOK[$rootScope.activeLang.name],type: 'button-royal'}]
									});	
							return false;
						}		

						txtmp=tx;
						fee=parseFloat(((mcoin.bitcoin.networks[walletNetwork].estimateFee(txtmp.buildIncomplete())+mcoin.bitcoin.networks[walletNetwork].staticFee)/coinMultiplier).toFixed(8));
						utxoSum+=parseFloat(utxoData[utxo]['amount']);
						inCount++;
						if(utxoSum>parseFloat((amountToSend+fee).toFixed(8)))break;
					}
					if(utxoGenSum<parseFloat((amountToSend+fee).toFixed(8))){
						$ionicLoading.hide();
						$ionicPopup.alert(
								{
									title: Lang.TxSend[$rootScope.activeLang.name],
									template: '<span class="assertive">'+Lang.insufficientFunds[$rootScope.activeLang.name]+' '+parseFloat((fee).toFixed(8))+'</span>',
									buttons: [{text: Lang.buttonOK[$rootScope.activeLang.name],type: 'button-royal'}]
								});	
						return false;
					}
					txAmoutChange=Math.ceil((utxoSum-parseFloat((amountToSend+fee).toFixed(8)))*coinMultiplier);
					if(txAmoutChange>0){
						try {
							tx.addOutput(obj.address, txAmoutChange);
						}
						catch(err) {
							$ionicLoading.hide();
							$ionicPopup.alert(
									{
										title: Lang.TxSend[$rootScope.activeLang.name],
										template: '<span class="assertive">'+err.message+'</span>',
										buttons: [{text: Lang.buttonOK[$rootScope.activeLang.name],type: 'button-royal'}]
									});	
							return false;
						}	
					}
					for(var insIt=0; insIt<inCount; insIt++){
						try {
							tx.sign(insIt, keyPair);
						}
						catch(err) {
							$ionicLoading.hide();
							$ionicPopup.alert(
									{
										title: Lang.TxSend[$rootScope.activeLang.name],
										template: '<span class="assertive">'+err.message+'</span>',
										buttons: [{text: Lang.buttonOK[$rootScope.activeLang.name],type: 'button-royal'}]
									});	
							return false;
						}	
					}  
					try {
						var rawTX=tx.build().toHex();
					}
					catch(err) {
						$ionicLoading.hide();
						$ionicPopup.alert(
								{
									title: Lang.TxSend[$rootScope.activeLang.name],
									template: '<span class="assertive">'+err.message+'</span>',
									buttons: [{text: Lang.buttonOK[$rootScope.activeLang.name],type: 'button-royal'}]
								});	
						return false;
					}	
					$ionicLoading.hide();
					var myPopup = $ionicPopup.show({
					    title: Lang.TxSend[$rootScope.activeLang.name],
					    subTitle:Lang.confirmSend[$rootScope.activeLang.name],
						template: '<div style="float:left;">'+Lang.toSend[$rootScope.activeLang.name]+':</div><div style="float:right;font-size:10px;">'+_this.data.address+'</div><div style="clear:both;"></div><div style="float:left;">'+Lang.TxAmount[$rootScope.activeLang.name]+':</div><div style="float:right;">'+amountToSend+'</div><div style="clear:both;"></div><div style="float:left;">'+Lang.Fee[$rootScope.activeLang.name]+':</div><div style="float:right;">'+fee+'</div><div style="clear:both;"><div style="float:left;">'+Lang.totalSend[$rootScope.activeLang.name]+':</div><div style="float:right;">'+parseFloat((amountToSend+fee).toFixed(8))+'</div><div style="clear:both;"></div>',
					    buttons: [
					      { text: Lang.buttonCancel[$rootScope.activeLang.name] },
					      {
					        text: Lang.TxSend[$rootScope.activeLang.name],
					        type: 'button-royal',
					        onTap: function(e) {
					        $ionicLoading.show({ template: Lang.Sending[$rootScope.activeLang.name]});
					//---------------------------------------------------------------------------------------------------------------
					$http.get(explorerUrl+'/api/sendrawtransaction?hex='+rawTX)
					.success(function(RetTxId){
						$ionicLoading.hide();
						if(RetTxId.indexOf('error')===-1){
							$ionicPopup.alert(
									{
										title: Lang.TxSend[$rootScope.activeLang.name],
										template: '<span>'+Lang.CoinsSent[$rootScope.activeLang.name]+'</span><br><br><span>txid: '+RetTxId+'</span><br><br><span>'+Lang.CoinsSentMsg[$rootScope.activeLang.name]+'</span>',
										buttons: [{text: Lang.buttonOK[$rootScope.activeLang.name],type: 'button-royal'}]
									});	
							$('#selAddy').val('').trigger('input');
							$('#selAmt').val('').trigger('input');
							_this.closeDialog();
						}else{
							$ionicPopup.alert(
									{
										title: Lang.TxSend[$rootScope.activeLang.name],
										template: '<span class="assertive">'+Lang.SendError[$rootScope.activeLang.name]+'</span>',
										buttons: [{text: Lang.buttonOK[$rootScope.activeLang.name],type: 'button-royal'}]
									});	
						}
					})
					.error(function(){
						$ionicLoading.hide();
						$ionicPopup.alert(
								{
									title: Lang.TxSend[$rootScope.activeLang.name],
									template: '<span class="assertive">'+Lang.SendError[$rootScope.activeLang.name]+'</span>',
									buttons: [{text: Lang.buttonOK[$rootScope.activeLang.name],type: 'button-royal'}]
								});	
					});
					//---------------------------------------------------------------------------------------------------------------
					        }
					      }
					    ]
					  });
				}	
			}).error(function(){
				$ionicLoading.hide();
				$ionicPopup.alert(
						{
							title: Lang.TxSend[$rootScope.activeLang.name],
							template: '<span class="assertive">'+Lang.SendError[$rootScope.activeLang.name]+'</span>',
							buttons: [{text: Lang.buttonOK[$rootScope.activeLang.name],type: 'button-royal'}]
						});	
			});
		}

	}
		})();
