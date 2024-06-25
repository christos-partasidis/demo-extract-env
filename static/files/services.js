'use strict';

/* Services */

function getObjectByValue(data, value) {
	for(var i = 0; i < data.length; i++) {
		if(data[i].name === value) {
			return(data[i]);
		}
	}
	return( null );
}



app.factory('defaultSearchService', function($http, $q){
    return {
        doSearch: function(params){
            var deferred = $q.defer();
            deferred.reject("ERROR");
			return deferred.promise;
        }
    }
});

app.factory('utilityService', function() {
    return {
        setRidewaysSearch: function($scope, data) {
            if ($scope.showRideways) {
				var bindMessageListenerOnce = $scope.ridewaysIframeURL == undefined ? true : false;
              if(bindMessageListenerOnce) {
                window.addEventListener("message", function() {
                  $scope.receiveMessage(event, $scope.widgetPaneSelected);
                }, false);
              }
			  $("#ridewaysIframe").css('visibility', 'visible');
                $scope.ridewaysIframeURL = $scope.ridewaysURL + "/widget?pickup=" + (data.loc.iata != "" ? data.loc.iata : (data.loc.latitude + "," + data.loc.longitude))
                    + "&date=" + $scope.puYear + "-" + ($scope.puMonth < 10 ? ("0" + $scope.puMonth) : $scope.puMonth) + "-" + ($scope.puDay < 10 ? ("0" + $scope.puDay) : $scope.puDay)
                    + "&time=" + $scope.puHour + ":" + $scope.puMin
                    + "&country=" + $("#countyOfResidence").val()
                    + "&preflang=" + $("#prefLanguage").val()
                    + "&lang=" + $("#prefLanguage").val()
                    + "&currency=" + $("#prefCurrency").val()
                    + "&passengers=" + $scope.ng
                    + "&limit=" + $scope.results
                    + "&" + $scope.affiliateCode; // this is param name and value i.e. affiliateCode=abc
            }
        }
    }
});