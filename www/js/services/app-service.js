(function()
	{
		'use strict';
		angular.module(appName)
		.factory('_app', ['$log','localStorageService', '$linq', '$http',
				function($log, localStorageService, $linq, $http)
				{
					var lsKeys = localStorageService.keys();

					var queryResult = $linq.Enumerable().From(lsKeys)
					.FirstOrDefault('-',function(x)
						{
							return x == configurationName;
						});

					var _firstTime = function()
					{
						var isinit = localStorageService.get('is-init');
						isinit = isinit == null ? false : isinit;
						return queryResult == "-" && !isinit;
					}

					var _init = function()
					{
						localStorageService.set('is-init', true);
					}


					var _decodeToken = function()
					{
						var t = localStorageService.get('token');
						if (t != null)
						{
							var tt = t.split('.');
							var encToken =
							{
								ct: tt[0],
								iv: tt[1],
								s: tt[2]
							}
							var decryption = CryptoJS.AES.decrypt(JSON.stringify(encToken), 'bitsmile2015', {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8);
							return JSON.parse(decryption);
						} return null;
					}

					return	{
						firstTime: _firstTime,
						init: _init,
						decodeToken: _decodeToken
					}
				}]);
	})();