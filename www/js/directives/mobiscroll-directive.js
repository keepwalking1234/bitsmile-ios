angular.module(appName)
.directive('mobiSelect', function() {
  return {
    restrict: 'A',
    link: function($scope, element, attrs) {
      return $(element).mobiscroll().select({
        theme: 'android-holo',
        display: 'modal',
		width: 150,
		headerText: ''
      });
    }
  };
}); 