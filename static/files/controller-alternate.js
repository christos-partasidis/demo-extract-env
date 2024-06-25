'use strict';


function urlParam(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}


function CountryCtrl($scope, $http, defaultSearchService, $timeout, utilityService) {
	$scope.showLoader = true;
	
	var puDay = urlParam('pickupDate');
	var puMonth = urlParam('pickupMonth');
	var puYear = urlParam('pickupYear');
	var puHour = urlParam('pickupHour');
	var puMin = urlParam('pickupMinute');
	puHour = parseInt(puHour);
	puMin = parseInt(puMin / 15) * 15;
	puMonth = parseInt(puMonth);
	puDay = parseInt(puDay);
	
	if(puMin == 0) {
		puMin = "00";
	}
	if(isNaN(puHour)) {
		puHour = "12";
	}
	
	if(puDay == undefined) {
		setupPuDates();
	}
	
	var doDay = urlParam('returnDate');
	var doMonth = urlParam('returnMonth');
	var doYear = urlParam('returnYear');
	var doHour = urlParam('returnHour');
	var doMin = urlParam('returnMinute');
	var enabler = urlParam('enabler');
	doHour = parseInt(doHour);
	doMin = parseInt(doMin / 15) * 15;
	doMonth = parseInt(doMonth);
	doDay = parseInt(doDay);
	
	if(doMin == 0) {
		doMin = "00";
	}
	if(isNaN(doHour)) {
		doHour = "12";
	}
	
	if(doDay == undefined) {
		setupPuDates();
	}
	
	var affiliateCode = getAffiliateCode(urlParam('pid'), urlParam('lang'), urlParam('affiliateCode'));
	
	if(pidMap.hasOwnProperty(urlParam('pid'))) {
		$("#headBanner").addClass("withoutLogo");
	}
	
	if(affiliateCode != null && affiliateCode != "") {
		affiliateCode = "affiliateCode=" + affiliateCode;
	}
	else {
		affiliateCode = "affiliateCode=booking-com";
	}
	$scope.affiliateCode = affiliateCode;

    var ridewaysURL = urlParam('ridewaysURL');
    if(!ridewaysURL) {
        ridewaysURL = "https://www.rideways.com";
    }

    $scope.ridewaysURL = ridewaysURL;
	
	var prefcurrency = urlParam('prefcurrency');
	var adcamp = urlParam('adcamp'); 
	var flightNumber = urlParam('flightNumber'); 
	var ng = urlParam('ng');
	if(ng == null) {
		ng = urlParam('maxOccupancy');
		if(ng == null) {
			ng = 1;
		}
	}
	
	$scope.showRideways = urlParam("showRideways");
	if($scope.showRideways == null) {
		$scope.showRideways = false;
	}
	
	$scope.widgetPaneSelected = urlParam("initialWidget");
	if(!$scope.showRideways || $scope.widgetPaneSelected == null || !($scope.widgetPaneSelected == "RC" || $scope.widgetPaneSelected == "RW")) {
		$scope.widgetPaneSelected = "RC";
	}
	
	if($scope.widgetPaneSelected == "RW") {
		$("#ridewaysIframe").show();
	}
	
	if(!$scope.showRideways) {
		$("#ridewaysIframe").hide();
	}
	
	var iata = urlParam('pickupIATACode');
	var latitude = urlParam('latitude');
	var longitude = urlParam('longitude');
	var locationParams = '';
	
	if(iata != null) {
		locationParams = 'iata=' + iata;
	} else {
		locationParams = 'latitude=' + latitude + '&longitude=' + longitude;
	}
	var ngParams = '';
	if(ng != null) {
		ngParams = 'j_min_ppl=' + ng;
	} else {		
		ngParams = '';
	}
	$scope.results = urlParam('results');
	if($scope.results == null) {
		$scope.results = 3;
	} else if($scope.results > 4) {
		$scope.results = 4;
	}
	
	var daily = '';
	
	if($('#initialPayLocal').val() == "false") {
		/* If the dates are in the past (for some reason) then the dates should default to 3 days ahead of today’s date */
		var now = new Date();
		var	pickup = new Date(puYear, puMonth-1, puDay);
		var daysInTheFuture = Math.floor((pickup - now) / 86400000);
		
		if(daysInTheFuture<4){
			pickup.setTime(now.getTime() + 86400000);
		}
			
		var dropoff = new Date(doYear, doMonth-1, doDay);
		var numberOfDays = Math.floor((dropoff - pickup) / 86400000);
		if(numberOfDays < 3) {
			daily = '&daily=true';
		}
	}
	
	var adplat = '&adplat=myres';
	if(urlParam("firstTimeConfPage") != null) {
		adplat = '&adplat=book';
	}
	
	$timeout(function() {
		window.top.postMessage(($(".bodyWrapper").height() + ""), "*");
	}, 100);
	
	var params = "callback=JSON_CALLBACK&" + locationParams + '&' + ngParams + '&flightNumber=' + flightNumber + '&adcamp=' + adcamp + '&trans=true&prefcurrency=' + prefcurrency + '&' + affiliateCode + adplat
		+ '&results='+ $scope.results + '&driversAge=25&servername=www.rentalcars.com&preflang=' + getLangParam() + '&age=25&puDay=' + puDay + '&puMonth=' + puMonth + '&puYear=' + puYear + '&puHour=' + puHour + '&puMin=' + puMin + '&doDay=' + doDay
		+ '&doMonth=' + doMonth + '&doYear=' + doYear + '&doHour=' + doHour + '&doMin=' + doMin + '&ng=' + ng + daily + "&showRideways=" + $scope.showRideways
	  + '&enabler=' + enabler;
	defaultSearchService.doSearch(params).then(function(data) {
		processResponse(data);
	}, 
	function(errorMessage) {
		$scope.error = errorMessage
	});
	
	function processResponse(data) {
		$scope.countries = data.countries;
		$scope.cities = data.cities;
		$scope.locations = data.locs;
		$scope.selectedCountry = getObjectByValue(data.countries, data.loc.country);
		$scope.selectedCity = getObjectByValue(data.cities, data.loc.city);
		$scope.selectedLocation = getObjectByValue(data.locs, data.loc.location);
		$scope.location = data.loc.location;
		$scope.vehicleInfos = data.vehicles; 
		$scope.showLoader = false;
		$scope.puDay = puDay;
		$scope.puMonth = puMonth;
		$scope.puYear = puYear;
		$scope.puHour = puHour;
		$scope.puMin = puMin;
		
		$scope.doDay = doDay;
		$scope.doMonth = doMonth;
		$scope.doYear = doYear;
		$scope.doHour = doHour;
		$scope.doMin = doMin;
		
		$scope.ng = ng;
		$scope.affiliateCode = affiliateCode;
		$scope.prefcurrency = prefcurrency;
		$scope.adcamp = adcamp;
		$scope.flightNumber = flightNumber;
		$scope.enabler = enabler;
		
		$scope.daily = data.daily;	
		if(data.daily == true){		
			$scope.doDay = data.doDay;			
		}
		
		if($scope.selectedLocation != null) {
			document.getElementById("locName").innerHTML = $scope.selectedLocation.name;
		}
		
		$scope.payLocal = false;
		if(data.vehicles.length > 0 && data.vehicles[0].paylocal == true) {
			$('#puDestination').hide();
			$('#plDestination').show();
			$('#puchange').show();
			$scope.payLocal = true;
		}
		//Retain the location data for the cars currently on screen, so clicking 'More details' won't be broken by being partway through a new search.
		if($scope.selectedLocation) {
			$("#currentResultsCountry_name").val($scope.selectedCountry.name);
			$("#currentResultsCity_name").val($scope.selectedCity.name);
			$("#currentResultsLocation_name").val($scope.selectedLocation.name);
			$("#currentResultsLocation_id").val($scope.selectedLocation.id);
            utilityService.setRidewaysSearch($scope, data)
		}
		document.cookie = 'tj_track=;domain=.rentalcars.com;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
		
	function setupPuDates() {
		var today = new Date();
		var threeDays = new Date();
		threeDays.setDate(today.getDate() + 3);
		
		var threeDay = threeDays.getDate();
		var threeMonth = threeDays.getMonth()+1;
		var threeYear = threeDays.getFullYear();
	}
	
	function setupDoDates(puDate) {
		var sevenDays = new Date();
		var today = new Date();
		sevenDays.setDate(today.getDate() + 10);
		
		var tenDay = sevenDays.getDate();
		var tenMonth = sevenDays.getMonth()+1;
		var tenYear = sevenDays.getFullYear()+1;
	}
	
	
	$scope.loadCities = function() {
		$scope.cities = null; 
		$http({method: 'GET', url: '/AjaxDroplists.do?country=' + $scope.selectedCountry.name}).success(function(data) {
			$scope.cities = data; 
			$scope.locations = null;
			$scope.selectedLocation = null;
			
			if(data.length == 1) {
				$scope.selectedCity = data[0];
			}
		});
	}
	
	$scope.loadLocations = function() {
		$scope.locations = null; 
		$http({method: 'GET', url: '/AjaxDroplists.do?country=' + $scope.selectedCountry.name + "&city=" + $scope.selectedCity.name}).success(function(data) {
			$scope.locations = data; 
			if(data.length == 1) {
				$scope.selectedLocation = data[0];
			}
		});
	}
	
	$scope.receiveMessage = function(message, widgetPaneSelected) {
		if(!message.origin.includes("rentalcars.com")) {
			$scope.adjustRidewaysPaneHeight(message.data, widgetPaneSelected);
		}
	}

	$scope.adjustRidewaysPaneHeight = function(height, widgetPaneSelected) {
        if (height > 0) {
            $("#ridewaysIframe").height(height);
        }
		if(widgetPaneSelected != "RW") {
			$("#ridewaysIframe").hide();
		}
		$timeout(function() {
			var totalHeight = $(".bodyWrapper").height();
			window.top.postMessage(totalHeight, "*");
		}, 250);
	}
	
	$scope.submit = function() {
		$scope.showLoader = true;
		$scope.vehicleInfos = undefined;
		
		var daily='';
		
		if($scope.payLocal == false) {
			var	pickup = new Date($scope.puYear, $scope.puMonth, $scope.puDay);
			var dropoff = new Date($scope.doYear, $scope.doMonth,$scope.doDay);
			var now = new Date();
			var	pickup = new Date($scope.puYear,$scope.puMonth-1, $scope.puDay);
			var daysInTheFuture = Math.floor((pickup - now) / 86400000);
			if(daysInTheFuture < -1) {
				pickup.setTime(now.getTime() + 86400000);
			}
				
			var dropoff = new Date($scope.doYear, $scope.doMonth-1, $scope.doDay);
			var numberOfDays = Math.floor((dropoff - pickup) / 86400000);
			if(numberOfDays < 3) {
				daily = 'daily=true&';
				$scope.daily = true;
			}
		}

		var affiliateCode = getAffiliateCode(urlParam('pid'), getLangParam(), urlParam('affiliateCode'));		
		
		if(affiliateCode != null && affiliateCode != "") {
			affiliateCode = "affiliateCode=" + affiliateCode + "&";
		}
		else {
			affiliateCode = "affiliateCode=booking-com&";
		}
		$scope.affiliateCode = affiliateCode;
		
		var adplat = '&adplat=myres_rs';
		if(urlParam("firstTimeConfPage") != null) {
			adplat = '&adplat=book_rs';
		}
		
		$scope.results = $("input[name=results]").val();
		var requestParams = "callback=JSON_CALLBACK&trans=true&" + affiliateCode + adplat + "&results=" + $scope.results + "&driversAge=25&servername=www.rentalcars.com&age=25&puSameAsDo=on&";
		if($scope.payLocal == true) {
			requestParams = requestParams + "iata=" + urlParam('pickupIATACode') + "&";
		} else {
			requestParams = requestParams + "country=" + $scope.selectedCountry.name + "&";
			requestParams = requestParams + "city=" + $scope.selectedCity.name + "&";
			requestParams = requestParams + "locationName=" + $scope.selectedLocation.name + "&";
			requestParams = requestParams + "location=" + $scope.selectedLocation.id + "&";
			requestParams = requestParams + "dropCountry=" + $scope.selectedCountry.name + "&";
			requestParams = requestParams + "dropCity=" + $scope.selectedCity.name + "&";
			requestParams = requestParams + "dropLocationName=" + $scope.selectedLocation.name + "&";
		}
		requestParams = requestParams + "puDay=" + $scope.puDay + "&";
		requestParams = requestParams + "puMonth=" + $scope.puMonth + "&";
		requestParams = requestParams + "puYear=" + $scope.puYear + "&";
		requestParams = requestParams + "puHour=" + $scope.puHour + "&";
		requestParams = requestParams + "puHour=" + $scope.puHour + "&";
		requestParams = requestParams + "puMin=" + $scope.puMin + "&";
		requestParams = requestParams + "doDay=" + $scope.doDay + "&";
		requestParams = requestParams + "doMonth=" + $scope.doMonth + "&";
		requestParams = requestParams + "doYear=" + $scope.doYear + "&";
		requestParams = requestParams + "doHour=" + $scope.doHour + "&";
		requestParams = requestParams + "doMin=" + $scope.doMin + "&";
		requestParams = requestParams + "ng=" + $scope.ng + "&";
		requestParams = requestParams + "flightNumber=" + $scope.flightNumber + "&";
		requestParams = requestParams + daily;
		requestParams = requestParams + "showRideways=" + $scope.showRideways + "&";
		requestParams = requestParams + "enabler=" + $scope.enabler + "&";

    defaultSearchService.doSearch(requestParams).then(function(data) {
			$scope.showLoader = false;
			$scope.vehicleInfos = data.vehicles;
			$scope.daily = data.daily;
			if(data.daily == true) {
				$scope.doDay = data.doDay;
			}
			$("#locName").text($scope.selectedLocation.name);
			//Retain the location data for the cars currently on screen, so clicking 'More details' won't be broken by being partway through a new search.
			if($scope.selectedLocation) {
				$("#currentResultsCountry_name").val($scope.selectedCountry.name);
				$("#currentResultsCity_name").val($scope.selectedCity.name);
				$("#currentResultsLocation_name").val($scope.selectedLocation.name);
				$("#currentResultsLocation_id").val($scope.selectedLocation.id);
                utilityService.setRidewaysSearch($scope, data)
			}
			document.cookie = 'tj_track=;domain=.rentalcars.com;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}, 
		function(errorMessage) {
			$scope.error = errorMessage;
		});
	}
	
	$scope.toggleWidgetPane = function(pane) {
		$scope.widgetPaneSelected = pane;
		if(pane == "RW") {
			$("#ridewaysIframe").show();
		} else {
			$("#ridewaysIframe").hide();
		}
		$timeout(function() {
			window.top.postMessage(($(".bodyWrapper").height() + ""), "*");
		}, 250);
	}

	
	$scope.$watch("vehicleInfos", function(newValue, oldValue) {
		if($scope.showLoader == false && $(".bodyWrapper").height() > 1) {
			$timeout(function() {
				window.top.postMessage(($(".bodyWrapper").height() + ""), "*");
			}, 250);
		}
	});
}
