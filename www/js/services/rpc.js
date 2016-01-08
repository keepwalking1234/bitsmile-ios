(function () {
    'use strict';

    angular
        .module(appName)
        .service('_rpc', rpc);

    rpc.$inject = ['$http', 'localStorageService'];

    function rpc($http, localStorageService) {

        this.info = getInfo;

        this.register = _register;
        this.call = callRpc;
        this.getBalance = _getBalance;
        this.setPayment = _setPayment;
        this.getTransactions = _getTransactions;
        this.buildTransaction = _buildTransaction;
        
        var token = '';
        var bitsmilepass = 'bitsmile2015';
        
        function callRpc(_action, _data, _successCallback){
        	_successCallback(_data);
		}
		
        function getInfo(successCallback) {
            var tmsec=new Date().getTime();
            $http.get(explorerUrl + '/api/getinfox' + '?nocache=' + tmsec)
			.success(function(data){
				if (successCallback != undefined)
				{	
					var ret={};
					ret={success:true,result:data};
					successCallback(ret);
				}
			})
        }
        
        function getTransactionsList(data, successCallback){
			callRpc('listtransactions', data, successCallback);
		}
		
        function _register(data, successCallback){
			var enc = CryptoJS.AES.encrypt(JSON.stringify(data), bitsmilepass, {format: CryptoJSAesJson}).toString();
			var tokenObj = JSON.parse(enc);
			var token = tokenObj.ct + '.' + tokenObj.iv + '.' + tokenObj.s;
			var _fake = {
				success: true,
				result: token
			}
			successCallback(_fake);
        	
	
		}
		
		function _getBalance(address, successCallback)
        {
		    var tmsec = new Date().getTime();
		    $.ajax({
		        headers: { "cache-control": "no-cache" },
		        url: explorerUrl + '/ext/getaddress/' + address + '?nocache=' + tmsec,
		        success: function (data) {
		            if (successCallback != undefined) {
		                successCallback(data);
		            }
		        },
		        async: true
		    })
			//$http.get(explorerUrl+'/ext/getaddress/' + address)
			//.success(function(data){
			//	if (successCallback != undefined)
			//	{
			//		successCallback(data);
			//	}
			//})
		}
		
		function _setPayment(addresPK, accountName, fromAddress, toAddres, amount, balance, fee, comment, successCallback){
			callRpc('_sendBitsmiles', 
				{addr: addresPK, 
				lbl: accountName, 
				fromAddr: fromAddress,
				toAddr: toAddres, 
				a: amount, 
				b: balance,
				f: fee,
				c: comment}, 
			successCallback);
		}
		
		function _getTransactions(addressPK, accountName, successCallback)
		{
			callRpc('_getTransactions', 
				{addr: addressPK, lbl: accountName}, 
			successCallback);
		}
		
		function _buildTransaction(privKey, myAddr, destAddr, amount, successCallback)
		{
			callRpc('_listUnspent', {key: privKey}, function(data){
				if(data.success)
				{
					var _data = data.result;
					
					var balance = 0;
					var unspents = [];
					for(var i = 0; i < _data.result.length; i++)
					{
						var tmp = _data.result[i];
						balance += tmp.amount;
						
						unspents.push({txid: tmp.txid, vout: tmp.vout});
					}
					
					var secondParam = {};
					secondParam[destAddr] = amount;
					secondParam[myAddr] = balance - amount - 0.0001;
					
					
					
					callRpc('_CreateRawTransaction', 
					{
						key: privKey, 
						p1: JSON.stringify(unspents), 
						p2: JSON.stringify(secondParam)
					}, function(crtData){
						
					})
				}
			});	
		}
		
    }
})();