(function ()
	{
		'use strict';

		angular
		.module(appName)
		.service('_utils', utils);

		utils.$inject = ['$rootScope','$ionicPopup','$timeout','localStorageService', '_rpc', '_app', '$ionicModal'];

		function utils($rootScope, $ionicPopup,$timeout,localStorageService, _rpc, _app, $ionicModal)
		{

			var bitsmilepass='bitsmile2015';
			this.encode = _encode;
			this.decode = _decode;

			var _this = this;
			function _decode(strData)
			{
				var tt = strData.split('.');
				var encToken =
				{
					ct: tt[0],
					iv: tt[1],
					s: tt[2]
				}
				var decryption = CryptoJS.AES.decrypt(JSON.stringify(encToken), 'bitsmile2015', {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8);
				return JSON.parse(decryption);
			}
			
			function _encode(mixData)
			{
				var enc = CryptoJS.AES.encrypt(JSON.stringify(mixData), bitsmilepass, {format: CryptoJSAesJson}).toString();
				token = window.btoa(enc);
				return token;
			}

		}
	})();
