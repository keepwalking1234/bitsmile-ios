(function()
    {
        'use strict';
        angular.module(appName)
        .factory('_dialogs', ['$log','localStorageService', '$linq', '$http', '$ionicModal',
                function($log, localStorageService, $linq, $http, $ionicModal)
                {
                    var _registerDialog = function(_scope, _name, _tpl)
                    {
                        $ionicModal.fromTemplateUrl(_tpl,
                            {
                                scope: _scope,
                                animation: 'slide-in-up'
                            }).then(function(modal)
                            {
                                _scope[_name] = modal;
                            });
                    }
                    
                    var _openDialog = function(_scope, _name){
						_scope[_name].show();
					}

                    var _closeDialog = function(_scope, _name){
						_scope[_name].hide();
					}
					
                    return {
                        register: _registerDialog,
                        open: _openDialog,
                        close: _closeDialog
                    }
                }]);
    })();