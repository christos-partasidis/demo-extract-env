'use strict';
var app = angular.module("widgetApp", [])

app.config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(true).hashPrefix('!');
}]);

app.filter('range', function() {
    return function(input, min, max) {
        min = parseInt(min);
        max = parseInt(max);
        for (var i=min; i<=max; i++)
            input.push(i);
        return input;
    };
});

var nonUSThreeAndUnderOne = ["^M[^V]", "^E", "^I", "^S", "^F"];
var nonUSThreeAndUnderTwo = ["^E", "^M[^V]", "^C", "^I", "^S", "^F"];
var nonUSThreeAndUnderThree = ["^C", "^E", "^I", "^S", "^F"];
var nonUSFourAndOverOne = ["^E", "^C", "^I", "^S", "^F"];
var nonUSFourAndOverTwo = ["^C", "^E", "^I", "^S", "^F"];
var nonUSFourAndOverThree = ["^.[FQH]", "^C", "^I", "^S", "^F"];

app.filter('filterCars', function() {
    return function(vehicleInfos) {
        var carOne, carTwo, carThree;
        var out = [];

        var ng = urlParam('ng');
        if(ng == null) {
            ng = urlParam('maxOccupancy');
            if(ng == null) {
                ng = 1;
            }
        }

        if(ng > 5) {
            var prioritisedVehiclesList = [];
            var remainingVehiclesList = [];
            $(vehicleInfos).each(function() {
                if(this.seats > 5) {
                    prioritisedVehiclesList.push(this);
                } else {
                    remainingVehiclesList.push(this);
                }
            });
            vehicleInfos = [];
            vehicleInfos.push.apply(vehicleInfos, prioritisedVehiclesList);
            vehicleInfos.push.apply(vehicleInfos, remainingVehiclesList);
        }

        if(vehicleInfos !== undefined && vehicleInfos !== null && vehicleInfos.length > 0) {

            if(ng <= 3) {
                if(getFilteredCar(nonUSThreeAndUnderOne,vehicleInfos, out) != false) {
                    out.push(getFilteredCar(nonUSThreeAndUnderOne,vehicleInfos, out, ng));
                }
                if(getFilteredCar(nonUSThreeAndUnderTwo,vehicleInfos, out) != false) {
                    out.push(getFilteredCar(nonUSThreeAndUnderTwo,vehicleInfos, out, ng));
                }
                if(getFilteredCar(nonUSThreeAndUnderThree,vehicleInfos, out) != false) {
                    out.push(getFilteredCar(nonUSThreeAndUnderThree,vehicleInfos, out, ng));
                }
                if(getFilteredCar(nonUSThreeAndUnderThree,vehicleInfos, out) != false) {
                    out.push(getFilteredCar(nonUSThreeAndUnderThree,vehicleInfos, out, ng));
                }
            } else {
                if(getFilteredCar(nonUSFourAndOverOne,vehicleInfos, out) != false) {
                    out.push(getFilteredCar(nonUSFourAndOverOne,vehicleInfos, out, ng));
                }
                if(getFilteredCar(nonUSFourAndOverTwo,vehicleInfos, out) != false) {
                    out.push(getFilteredCar(nonUSFourAndOverTwo,vehicleInfos, out, ng));
                }
                if(getFilteredCar(nonUSFourAndOverThree,vehicleInfos, out) != false) {
                    out.push(getFilteredCar(nonUSFourAndOverThree,vehicleInfos, out, ng));
                }
                if(getFilteredCar(nonUSFourAndOverThree,vehicleInfos, out) != false) {
                    out.push(getFilteredCar(nonUSFourAndOverThree,vehicleInfos, out, ng));
                }
            }
        }
        return out;
    };
});


function trimAffiliateCode(affiliateCode){
    return affiliateCode.trim().split('&')[0].split('=')[1];
}

function generatePxgo(redirectUrl, token){
    return "https://booking.com/pxgo?url=" + encodeURIComponent(redirectUrl) + "&token=" + token;
}

function getFilteredCar(filterValues, vehicleList, currentCars, ng) {
    var car = false;
    try {
        $(filterValues).each(function() {
            var regexp = new RegExp(this);
            $(vehicleList).each(function() {
                // Don't allow duplicate cars
                if((regexp.test(this.gp) || (ng > 5 && this.seats > 5)) && (jQuery.inArray(this, currentCars) < 0)) {
                    car = this;
                    return false; //Car found, stop iterating
                }
            });
            return car === false;
        });
    } catch(e) {}

    return car;
}

function getLangParam() {
    var preflangParam = urlParam('preflang');
    if(preflangParam == null || preflangParam == "") {
        preflangParam = urlParam('lang');
    }
    return preflangParam;
}

//Create a string with UTM parameters from the URL query if some of them exist
function getUTMParams() {
    var utmArray = ['__utma','__utmb','__utmc','__utmx','__utmz','__utmv','__utmk', '_ga'];
    var utmString = '';
    for (var i = 0; i < utmArray.length; i++) {
        var utmValue = urlParam(utmArray[i]);
        if ( utmValue != '' || utmValue != null) {
            utmString += '&' + utmArray[i] + "=" + utmValue;
        }
    }
    return utmString;
}

app.directive('viewmoreloader', function($http) {
    return function($scope, element) {
        element.bind("click", function() {
            var affiliateCode = getAffiliateCode(urlParam('pid'), getLangParam(), urlParam('affiliateCode'));
            if(affiliateCode != null && affiliateCode != "") {
                affiliateCode = "affiliateCode=" + affiliateCode + "&";
            }
            else {
                affiliateCode = urlParam('affiliate');
                if(affiliateCode != null && affiliateCode != "") {
                    affiliateCode = "affiliateCode=" + affiliateCode + "&";
                } else {
                    affiliateCode = "affiliateCode=booking-com&";
                }
            }
            var prefcurrency = urlParam('prefcurrency');
            if(prefcurrency != null) {
                prefcurrency = "prefcurrency=" + prefcurrency + "&";
            }
            else {
                prefcurrency = "";
            }
            var adcamp = urlParam('adcamp');
            if(adcamp != null) {
                adcamp = "adcamp=" + adcamp + "&";
            }
            else {
                adcamp = "";
            }
            var adco = urlParam('adco');
            if (adco != null) {
                adco = "adco=" + adco + "&";
            } else {
                adco = "";
            }
            var preflang = urlParam("preflang");
            if(preflang != null) {
                preflang = "preflang=" + preflang + "&";
            }
            else {
                preflang = "";
            }

            var adplat = "widgetloader";

            var puDay = urlParam('pickupDate');
            var puMonth = urlParam('pickupMonth');
            var puYear = urlParam('pickupYear');
            var puHour = urlParam('pickupHour');
            var puMin = urlParam('pickupMinute');
            puMin = parseInt(puMin / 15) * 15;
            puHour = parseInt(puHour);
            puMonth = parseInt(puMonth);
            puDay = parseInt(puDay);

            if(puMin == 0) {
                puMin = "00";
            }

            var doDay = urlParam('returnDate');
            var doMonth = urlParam('returnMonth');
            var doYear = urlParam('returnYear');
            var doHour = urlParam('returnHour');
            var doMin = urlParam('returnMinute');
            doMin = parseInt(doMin / 15) * 15;
            doHour = parseInt(doHour);
            doMonth = parseInt(doMonth);
            doDay = parseInt(doDay);

            if(doMin == 0) {
                doMin = "00";
            }

            var now = new Date();
            var	pickup = new Date(puYear, puMonth - 1, puDay);
            var daysInTheFuture = Math.floor((pickup - now) / 86400000);
            if(daysInTheFuture < 4) {
                pickup.setTime(now.getTime() + (86400000 * 3));
                puYear = pickup.getFullYear();
                puMonth = pickup.getMonth() + 1;
                puDay = pickup.getDate();
            }

            var dropoff = new Date(doYear, doMonth - 1, doDay);
            var numberOfDays = Math.floor((dropoff - pickup) / 86400000);

            if(numberOfDays < 4) {
                dropoff.setTime(pickup.getTime() + 7 * 86400000);
                doDay = dropoff.getDate();
                doMonth = dropoff.getMonth() + 1;
                doYear = dropoff.getFullYear();
            }

            var mostActiveSupplierTime = false;
            if($("#mostActiveSupplierPickup").val() != "" && $("#mostActiveSupplierDropoff").val() != "") {
                mostActiveSupplierTime = true;
            }
            var affUrl = getClickThroughUrl(urlParam('pid'), getLangParam(), urlParam('affUrl'));
            var countryName = $("#popularLocation_CountryName").val();
            var cityName = $("#popularLocation_CityName").val();
            var locationName = $("#popularLocation_LocationName").val();
            var cor = urlParam('cor');
            cor = cor != null ? cor : '';

            // Action to load: Results.
            var requestParams = affiliateCode + prefcurrency + adcamp + adco + "adplat=" + adplat + "&driversAge=25&" + preflang + "puSameAsDo=on";
            requestParams = requestParams + "&country=" + countryName;
            requestParams = requestParams + "&city=" + cityName;
            requestParams = requestParams + "&cor=" + cor;
            requestParams = requestParams + "&location=" + $("#popularLocation_LocationId").val();
            requestParams = requestParams + "&locationName=" + locationName;
            requestParams = requestParams + "&dropCountry=" + countryName;
            requestParams = requestParams + "&dropCity=" + cityName;
            requestParams = requestParams + "&dropLocation=" + $("#popularLocation_LocationId").val();
            requestParams = requestParams + "&dropLocationName=" + locationName;
            requestParams = requestParams + "&puHour=" + (mostActiveSupplierTime ? $("#mostActiveSupplierPickup").val() : puHour);
            requestParams = requestParams + "&puMinute=" + (mostActiveSupplierTime ? "30" : puMin);
            requestParams = requestParams + "&doHour=" + (mostActiveSupplierTime ? $("#mostActiveSupplierDropoff").val() : doHour);
            requestParams = requestParams + "&doMinute=" + (mostActiveSupplierTime ? "30" : doMin);
            requestParams = requestParams + "&puDay=" + puDay;
            requestParams = requestParams + "&puMonth=" + puMonth;
            requestParams = requestParams + "&puYear=" + puYear;
            requestParams = requestParams + "&doDay=" + doDay;
            requestParams = requestParams + "&doMonth=" + doMonth;
            requestParams = requestParams + "&doYear=" + doYear;
            requestParams = requestParams + "&enabler=" + $("#enabler").val();
            requestParams = requestParams + "&doFiltering=true&filterFrom=0&filterTo=20&emptySearchResults=true&fromLocChoose=true&actionToLoad=results&popularLoc=false&fromWidget=true";
            requestParams = requestParams + getUTMParams();

            document.cookie = 'JSESSIONID=;domain=.rentalcars.com;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

            window.open(affUrl + "/SearchLoaderWidget.do?" + requestParams, "_blank");
        });
    }
});

app.directive('viewmore', function($http) {
    return function($scope, element) {
        element.bind("click", function() {
            var affiliateCode = getAffiliateCode(urlParam('pid'), getLangParam(), urlParam('affiliateCode'));
            if(affiliateCode != null && affiliateCode != "") {
                affiliateCode = "affiliateCode=" + affiliateCode + "&";
            }
            else {
                affiliateCode = urlParam('affiliate');
                if(affiliateCode != null && affiliateCode != "") {
                    affiliateCode = "affiliateCode=" + affiliateCode + "&";
                } else {
                    affiliateCode = "affiliateCode=booking-com&";
                }
            }
            var prefcurrency = urlParam('prefcurrency');
            if(prefcurrency != null) {
                prefcurrency = "prefcurrency=" + prefcurrency + "&";
            }
            else {
                prefcurrency = "";
            }
            var adcamp = urlParam('adcamp');
            if(adcamp != null) {
                adcamp="adcamp="+adcamp+"&";
            }else{
                adcamp="";
            }
            var adco = urlParam('adco');
            if (adco != null) {
                adco = "adco=" + adco + "&";
            } else {
                adco = "";
            }
            var preflang = urlParam("preflang");
            if(preflang != null) {
                preflang="preflang="+preflang+"&";
            }else{
                preflang="";
            }

            var adplatDefault = 'widgetsearch';
            if(urlParam("firstTimeConfPage") != null) {
                adplatDefault = 'widgetsearch_book';
            }
            var adplat = getAdPlat(urlParam('pid'), adplatDefault);

            document.cookie = 'JSESSIONID=;domain=.rentalcars.com;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

            var affUrl = getClickThroughUrl(urlParam('pid'), getLangParam(), urlParam('affUrl'));
            var countryName = $("#currentResultsCountry_name").val();
            var cityName = $("#currentResultsCity_name").val();
            var locationName = $("#currentResultsLocation_name").val();
            var cor = urlParam('cor');
            cor = cor != null ? cor : '';

            // Action to load: Results.
            var requestParams = affiliateCode + prefcurrency + adcamp + adco +"&adplat=" + adplat + "&driversAge=25&" + preflang + "puSameAsDo=on&";
            requestParams = requestParams + "&country=" + countryName;
            requestParams = requestParams + "&city=" + cityName;
            requestParams = requestParams + "&cor=" + cor;
            requestParams = requestParams + "&location=" + $("#currentResultsLocation_id").val();
            requestParams = requestParams + "&locationName=" + locationName;
            requestParams = requestParams + "&dropCountry=" + countryName;
            requestParams = requestParams + "&dropCity=" + cityName;
            requestParams = requestParams + "&dropLocation=" + $("#currentResultsLocation_id").val();
            requestParams = requestParams + "&dropLocationName=" + locationName;
            requestParams = requestParams + "&puHour=" + $scope.puHour;
            requestParams = requestParams + "&puMinute=" + $scope.puMin;
            requestParams = requestParams + "&doHour=" + $scope.doHour;
            requestParams = requestParams + "&doMinute=" + $scope.doMin;
            requestParams = requestParams + "&puDay=" + $scope.puDay;
            requestParams = requestParams + "&puMonth=" + $scope.puMonth;
            requestParams = requestParams + "&puYear=" + $scope.puYear;
            requestParams = requestParams + "&doDay=" + $scope.doDay;
            requestParams = requestParams + "&doMonth=" + $scope.doMonth;
            requestParams = requestParams + "&doYear=" + $scope.doYear;
            requestParams = requestParams + "&enabler=" + $("#enabler").val();
            requestParams = requestParams + "&doFiltering=true&filterFrom=0&filterTo=20&emptySearchResults=true&fromLocChoose=true&actionToLoad=results&popularLoc=false&fromWidget=true";
            requestParams = requestParams + getUTMParams();

            window.open(affUrl + "/SearchLoaderWidget.do?" + requestParams, "_blank");
        });
    }
});

app.directive('bookingcarsviewmore', function($http) {
    return function($scope, element) {
        element.bind("click", function() {
            var affiliateCode = getAffiliateCode(urlParam('pid'), getLangParam(), urlParam('affiliateCode'));
            if(affiliateCode != null && affiliateCode != "") {
                affiliateCode = "affiliateCode=" + affiliateCode + "&";
            }
            else {
                affiliateCode = urlParam('affiliate');
                if(affiliateCode != null && affiliateCode != "") {
                    affiliateCode = "affiliateCode=" + affiliateCode + "&";
                } else {
                    affiliateCode = "affiliateCode=booking-cars&";
                }
            }
            var prefcurrency = urlParam('prefcurrency');
            if(prefcurrency != null) {
                prefcurrency = "prefcurrency=" + prefcurrency + "&";
            }
            else {
                prefcurrency = "";
            }
            var adcamp = urlParam('adcamp');
            if(adcamp != null) {
                adcamp="adcamp="+adcamp+"&";
            }else{
                adcamp="";
            }

            var adco = urlParam('adco');
            if (adco != null) {
                adco = "adco=" + adco + "&";
            } else {
                adco = "";
            }

            var preflang = urlParam("preflang");
            if(preflang != null) {
                preflang="preflang="+preflang+"&";
            }else{
                preflang="";
            }

            var adplatDefault = 'widgetsearch';
            if(urlParam("firstTimeConfPage") != null) {
                adplatDefault = 'widgetsearch_book';
            }
            var adplat = getAdPlat(urlParam('pid'), adplatDefault);

            document.cookie = 'JSESSIONID=;domain=.rentalcars.com;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

            var affUrl = getClickThroughUrl(urlParam('pid'), getLangParam(), urlParam('affUrl'));
            var countryName = $("#currentResultsCountry_name").val();
            var cityName = $("#currentResultsCity_name").val();
            var locationName = $("#currentResultsLocation_name").val();
            var cor = urlParam('cor');
            cor = cor != null ? cor : '';
            var token = urlParam('token');
            token = token != null ? token : '';
            affUrl = trimAffiliateCode(affiliateCode) === 'booking-cars' ? 'https://cars.booking.com' : affUrl;

            // Action to load: Results.
            var requestParams = affiliateCode + prefcurrency + adcamp + adco +"&adplat=" + adplat + "&driversAge=25&" + preflang + "puSameAsDo=on&";
            requestParams = requestParams + "&country=" + countryName;
            requestParams = requestParams + "&city=" + cityName;
            requestParams = requestParams + "&cor=" + cor;
            requestParams = requestParams + "&location=" + $("#currentResultsLocation_id").val();
            requestParams = requestParams + "&locationName=" + locationName;
            requestParams = requestParams + "&dropCountry=" + countryName;
            requestParams = requestParams + "&dropCity=" + cityName;
            requestParams = requestParams + "&dropLocation=" + $("#currentResultsLocation_id").val();
            requestParams = requestParams + "&dropLocationName=" + locationName;
            requestParams = requestParams + "&puHour=" + $scope.puHour;
            requestParams = requestParams + "&puMinute=" + $scope.puMin;
            requestParams = requestParams + "&doHour=" + $scope.doHour;
            requestParams = requestParams + "&doMinute=" + $scope.doMin;
            requestParams = requestParams + "&puDay=" + $scope.puDay;
            requestParams = requestParams + "&puMonth=" + $scope.puMonth;
            requestParams = requestParams + "&puYear=" + $scope.puYear;
            requestParams = requestParams + "&doDay=" + $scope.doDay;
            requestParams = requestParams + "&doMonth=" + $scope.doMonth;
            requestParams = requestParams + "&doYear=" + $scope.doYear;
            requestParams = requestParams + "&enabler=" + $("#enabler").val();
            requestParams = requestParams + "&doFiltering=true&filterFrom=0&filterTo=20&emptySearchResults=true&fromLocChoose=true&actionToLoad=results&popularLoc=false&fromWidget=true";
            requestParams = requestParams + getUTMParams();


            var redirectUrl = affUrl + "/SearchLoaderWidget.do?" + requestParams;
            window.open(generatePxgo(redirectUrl, token), "_blank");
        });
    }
});

app.directive('showdetails', ['$location', function($http, $location) {
    return function($scope, element) {
        element.bind("click", function() {
            var affiliateCode = getAffiliateCode(urlParam('pid'), getLangParam(), urlParam('affiliateCode'));
            if(affiliateCode != null && affiliateCode != "") {
                affiliateCode = "affiliateCode=" + affiliateCode + "&";
            }
            else {
                affiliateCode = urlParam('affiliate');
                if(affiliateCode != null && affiliateCode != "") {
                    affiliateCode = "affiliateCode=" + affiliateCode + "&";
                } else {
                    affiliateCode = "affiliateCode=booking-com&";
                }
            }
            var prefcurrency = urlParam('prefcurrency');
            if(prefcurrency != null) {
                prefcurrency = "prefcurrency=" + prefcurrency + "&";
            }
            else {
                prefcurrency = "";
            }
            var adcamp = urlParam('adcamp');
            if(adcamp != null) {
                adcamp = "adcamp=" + adcamp + "&";
            }
            else {
                adcamp = "";
            }
            var adco = urlParam('adco');
            if (adco != null) {
                adco = "adco=" + adco + "&";
            } else {
                adco = "";
            }
            var preflang = urlParam("preflang");
            if(preflang != null) {
                preflang = "preflang=" + preflang + "&";
            }
            else {
                preflang = "";
            }

            var adplatDefault = 'widgetextras';
            if(urlParam("firstTimeConfPage") != null) {
                adplatDefault = 'widgetextras_book';
            }

            var adplat = getAdPlat(urlParam('pid'), adplatDefault);

            var affUrl = getClickThroughUrl(urlParam('pid'), getLangParam(), urlParam('affUrl'));

            var countryName = $("#currentResultsCountry_name").val();
            var cityName = $("#currentResultsCity_name").val();
            var locationName = $("#currentResultsLocation_name").val();
            var cor = urlParam('cor');
            cor = cor != null ? cor : '';

            // Action to load: Results (Pay Local) or Extras (Pay Now).
            if(window.RC.featureConfig['feature_flag_RCCIUX_4222']) {
                var age = urlParam('driverAge') == null ? "25" : urlParam('driverAge');
                var driversAge = "&driversAge=" + age + "&";

                var requestParams = affiliateCode + prefcurrency + adco + adcamp + "adplat=" + adplat + driversAge + preflang + "age=" + age + "&puSameAsDo=on&";
            } else {
                var requestParams = affiliateCode + prefcurrency + adco + adcamp + "adplat=" + adplat + "&driversAge=25&" + preflang + "age=25&puSameAsDo=on&";
            }
            requestParams = requestParams + "country=" + countryName;
            requestParams = requestParams + "&city=" + cityName;
            requestParams = requestParams + "&cor=" + cor;
            requestParams = requestParams + "&location=" + $("#currentResultsLocation_id").val();
            requestParams = requestParams + "&locationName=" + locationName;
            requestParams = requestParams + "&dropCountry=" + countryName;
            requestParams = requestParams + "&dropCity=" + cityName;
            requestParams = requestParams + "&dropLocation=" + $("#currentResultsLocation_id").val();
            requestParams = requestParams + "&dropLocationName=" + locationName;
            requestParams = requestParams + "&puHour=" + $scope.puHour;
            requestParams = requestParams + "&puMinute=" + $scope.puMin;
            requestParams = requestParams + "&doHour=" + $scope.doHour;
            requestParams = requestParams + "&doMinute=" + $scope.doMin;
            requestParams = requestParams + "&puDay=" + $scope.puDay;
            requestParams = requestParams + "&puMonth=" + $scope.puMonth;
            requestParams = requestParams + "&puYear=" + $scope.puYear;
            requestParams = requestParams + "&doDay=" + $scope.doDay;
            requestParams = requestParams + "&doMonth=" + $scope.doMonth;
            requestParams = requestParams + "&doYear=" + $scope.doYear;
            requestParams = requestParams + "&enabler=" + $("#enabler").val();
            requestParams = requestParams + "&doFiltering=true&filterFrom=0&filterTo=20&emptySearchResults=true&popularLoc=false&fromWidget=true";
            requestParams = requestParams + "&flightNumber=" + $scope.flightNumber;
            requestParams = requestParams + "&vehicleInfo.vehicle.id=" + element.attr("data-vehicle_id");
            requestParams = requestParams + getUTMParams();

            document.cookie = 'JSESSIONID=;domain=.rentalcars.com;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

            if(window.RC.featureConfig['feature_flag_RCCIUX_3618']){
                var redirectionURL;
                if ($scope.payLocal == true) {
                    if (element.attr("data-supplier") === undefined) {
                        redirectionURL = encodeURI(affUrl + "/Home.do?adplat=widgetchange&" + affiliateCode);
                    } else {
                        requestParams = requestParams + "&actionToLoad=results";
                        redirectionURL = encodeURI(affUrl + "/SearchLoaderWidget.do?" );
                    }
                } else {
                    requestParams = requestParams + "&supplier=" + (requestParams ? encodeURIComponent(element.attr("data-supplier")) : element.attr("data-supplier"));
                    requestParams = requestParams + "&actionToLoad=extras";
                    redirectionURL = encodeURI(affUrl + "/SearchLoaderWidget.do?" + requestParams);
                }
                window.open(redirectionURL, "_blank");
            } else {
                if ($scope.payLocal == true) {
                    if (element.attr("data-supplier") === undefined) {
                        window.open(affUrl + "/Home.do?adplat=widgetchange&" + affiliateCode, "_blank");
                    } else {
                        requestParams = requestParams + "&actionToLoad=results";
                        window.open(affUrl + "/SearchLoaderWidget.do?" + requestParams, "_blank");
                    }
                } else {
                    requestParams = requestParams + "&supplier=" + (requestParams ? encodeURIComponent(element.attr("data-supplier")) : element.attr("data-supplier"));
                    requestParams = requestParams + "&actionToLoad=extras";
                    window.open(affUrl + "/SearchLoaderWidget.do?" + requestParams, "_blank");
                }
            }

        });
    }
}]);

app.directive('viewaltloc', function($http) {
    return function($scope, element) {
        element.bind("click", function() {
            var affiliateCode = getAffiliateCode(urlParam('pid'), getLangParam(), urlParam('affiliateCode'));
            if(affiliateCode != null && affiliateCode != "") {
                affiliateCode = "affiliateCode=" + affiliateCode + "&";
            }
            else {
                affiliateCode = urlParam('affiliate');
                if(affiliateCode != null && affiliateCode != "") {
                    affiliateCode = "affiliateCode=" + affiliateCode + "&";
                } else {
                    affiliateCode = "affiliateCode=booking-com&";
                }
            }
            var prefcurrency = urlParam('prefcurrency');
            if(prefcurrency != null) {
                prefcurrency = "prefcurrency=" + prefcurrency + "&";
            }
            else {
                prefcurrency = "";
            }
            var adcamp = urlParam('adcamp');
            if(adcamp != null) {
                adcamp="adcamp="+adcamp+"&";
            }else{
                adcamp="";
            }
            var adco = urlParam('adco');
            if (adco != null) {
                adco = "adco=" + adco + "&";
            } else {
                adco = "";
            }
            var preflang = urlParam("preflang");
            if(preflang != null) {
                preflang="preflang="+preflang+"&";
            }else{
                preflang="";
            }

            var adplatDefault = 'alternatelocsearch';
            if(urlParam("firstTimeConfPage") != null) {
                adplatDefault = 'alternatelocsearch_book';
            }
            var adplat = getAdPlat(urlParam('pid'), adplatDefault);

            document.cookie = 'JSESSIONID=;domain=.rentalcars.com;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

            var affUrl = getClickThroughUrl(urlParam('pid'), getLangParam(), urlParam('affUrl'));
            var countryName = $("#currentResultsCountry_name").val();
            var cityName = element.attr("data-city_name");
            var locationName = element.attr("data-location_name");
            var cor = urlParam('cor');
            cor = cor != null ? cor : '';

            // Action to load: Results.
            var requestParams = affiliateCode + prefcurrency + adcamp + adco + "adplat=" + adplat + "&driversAge=25&" + preflang + "puSameAsDo=on&";
            requestParams = requestParams + "country=" + countryName;
            requestParams = requestParams + "&city=" + cityName;
            requestParams = requestParams + "&cor=" + cor;
            requestParams = requestParams + "&location=" + element.attr("data-location_id");
            requestParams = requestParams + "&locationName=" + locationName;
            requestParams = requestParams + "&dropCountry=" + countryName;
            requestParams = requestParams + "&dropCity=" + cityName;
            requestParams = requestParams + "&dropLocation=" + element.attr("data-location_id");
            requestParams = requestParams + "&dropLocationName=" + locationName;
            requestParams = requestParams + "&puHour=" + $scope.puHour;
            requestParams = requestParams + "&puMinute=" + $scope.puMin;
            requestParams = requestParams + "&doHour=" + $scope.doHour;
            requestParams = requestParams + "&doMinute=" + $scope.doMin;
            requestParams = requestParams + "&puDay=" + $scope.puDay;
            requestParams = requestParams + "&puMonth=" + $scope.puMonth;
            requestParams = requestParams + "&puYear=" + $scope.puYear;
            requestParams = requestParams + "&doDay=" + $scope.doDay;
            requestParams = requestParams + "&doMonth=" + $scope.doMonth;
            requestParams = requestParams + "&doYear=" + $scope.doYear;
            requestParams = requestParams + "&enabler=" + $("#enabler").val();
            requestParams = requestParams + "&doFiltering=true&filterFrom=0&filterTo=20&emptySearchResults=true&fromLocChoose=true&actionToLoad=results&popularLoc=false&fromWidget=true";
            requestParams = requestParams + getUTMParams();

            window.open(affUrl + "/SearchLoaderWidget.do?" + requestParams, "_blank");
        });
    }
});
app.directive('bookingshowdetails', ['$location', function($http, $location) {
    return function($scope, element) {
        element.bind("click", function() {
            var affiliateCode = getAffiliateCode(urlParam('pid'), getLangParam(), urlParam('affiliateCode'));
            if(affiliateCode != null && affiliateCode != "") {
                affiliateCode = "affiliateCode=" + affiliateCode + "&";
            } else {
                affiliateCode = urlParam('affiliate');
                if(affiliateCode != null && affiliateCode != "") {
                    affiliateCode = "affiliateCode=" + affiliateCode + "&";
                } else {
                    affiliateCode = "affiliateCode=booking-cars&";
                }
            }

            var prefcurrency = urlParam('prefcurrency');
            if(prefcurrency != null) {
                prefcurrency = "prefcurrency=" + prefcurrency + "&";
            } else {
                prefcurrency = "";
            }
            var adcamp = urlParam('adcamp');
            if(adcamp != null) {
                adcamp = "adcamp=" + adcamp + "&";
            } else {
                adcamp = "";
            }

            var adco = urlParam('adco');
            if (adco != null) {
                adco = "adco=" + adco + "&";
            } else {
                adco = "";
            }

            var preflang = urlParam("preflang");
            if(preflang != null) {
                preflang = "preflang=" + preflang + "&";
            } else {
                preflang = "";
            }

            var adplatDefault = 'widgetextras';
            if(urlParam("firstTimeConfPage") != null) {
                adplatDefault = 'widgetextras_book';
            }

            var adplat = getAdPlat(urlParam('pid'), adplatDefault);

            var affUrl = getClickThroughUrl(urlParam('pid'), getLangParam(), urlParam('affUrl'));

            var countryName = $("#currentResultsCountry_name").val();
            var cityName = $("#currentResultsCity_name").val();
            var locationName = $("#currentResultsLocation_name").val();
            var cor = urlParam('cor');
            cor = cor != null ? cor : '';

            var token = urlParam('token');
            token = token != null ? token : '';
            affUrl = trimAffiliateCode(affiliateCode) === 'booking-cars' ? 'https://cars.booking.com' : affUrl;

            // Action to load: Results (Pay Local) or Extras (Pay Now).
            var requestParams = affiliateCode + prefcurrency + adco + adcamp + "adplat=" + adplat + "&driversAge=25&" + preflang + "age=25&puSameAsDo=on&";
            requestParams = requestParams + "country=" + countryName;
            requestParams = requestParams + "&city=" + cityName;
            requestParams = requestParams + "&cor=" + cor;
            requestParams = requestParams + "&location=" + $("#currentResultsLocation_id").val();
            requestParams = requestParams + "&locationName=" + locationName;
            requestParams = requestParams + "&dropCountry=" + countryName;
            requestParams = requestParams + "&dropCity=" + cityName;
            requestParams = requestParams + "&dropLocation=" + $("#currentResultsLocation_id").val();
            requestParams = requestParams + "&dropLocationName=" + locationName;
            requestParams = requestParams + "&puHour=" + $scope.puHour;
            requestParams = requestParams + "&puMinute=" + $scope.puMin;
            requestParams = requestParams + "&doHour=" + $scope.doHour;
            requestParams = requestParams + "&doMinute=" + $scope.doMin;
            requestParams = requestParams + "&puDay=" + $scope.puDay;
            requestParams = requestParams + "&puMonth=" + $scope.puMonth;
            requestParams = requestParams + "&puYear=" + $scope.puYear;
            requestParams = requestParams + "&doDay=" + $scope.doDay;
            requestParams = requestParams + "&doMonth=" + $scope.doMonth;
            requestParams = requestParams + "&doYear=" + $scope.doYear;
            requestParams = requestParams + "&enabler=" + $("#enabler").val();
            requestParams = requestParams + "&doFiltering=true&filterFrom=0&filterTo=20&emptySearchResults=true&popularLoc=false&fromWidget=true";
            requestParams = requestParams + "&flightNumber=" + $scope.flightNumber;
            requestParams = requestParams + "&vehicleInfo.vehicle.id=" + element.attr("data-vehicle_id");
            requestParams = requestParams + "&actionToLoad=extras";
            requestParams = requestParams + getUTMParams();

            document.cookie = 'JSESSIONID=;domain=.rentalcars.com;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

            var redirectUrl = affUrl + "/SearchLoaderWidget.do?" + requestParams;
            window.open(generatePxgo(redirectUrl, token), "_blank");

        });
    }
}]);

app.directive('viewmorealtloc', function($http) {
    return function($scope, element) {
        element.bind("click", function() {
            var affiliateCode = getAffiliateCode(urlParam('pid'), getLangParam(), urlParam('affiliateCode'));
            if(affiliateCode != null && affiliateCode != "") {
                affiliateCode = "affiliateCode=" + affiliateCode + "&";
            }
            else {
                affiliateCode = urlParam('affiliate');
                if(affiliateCode != null && affiliateCode != "") {
                    affiliateCode = "affiliateCode=" + affiliateCode + "&";
                } else {
                    affiliateCode = "affiliateCode=booking-com&";
                }
            }
            var prefcurrency = urlParam('prefcurrency');
            if(prefcurrency != null) {
                prefcurrency = "prefcurrency=" + prefcurrency + "&";
            }
            else {
                prefcurrency = "";
            }
            var adcamp = urlParam('adcamp');
            if(adcamp != null) {
                adcamp="adcamp="+adcamp+"&";
            }else{
                adcamp="";
            }
            var adco = urlParam('adco');
            if (adco != null) {
                adco = "adco=" + adco + "&";
            } else {
                adco = "";
            }
            var preflang = urlParam("preflang");
            if(preflang != null) {
                preflang="preflang="+preflang+"&";
            }else{
                preflang="";
            }

            var adplatDefault = 'alternatelocsearch';
            if(urlParam("firstTimeConfPage") != null) {
                adplatDefault = 'alternatelocsearch_book';
            }
            var adplat = getAdPlat(urlParam('pid'), adplatDefault);

            document.cookie = 'JSESSIONID=;domain=.rentalcars.com;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';

            var affUrl = getClickThroughUrl(urlParam('pid'), getLangParam(), urlParam('affUrl'));
            var countryName = $("#currentResultsCountry_name").val();
            var cityName = $("#currentResultsCity_name").val();
            var locationName = $("#currentResultsLocation_name").val();
            var cor = urlParam('cor');
            cor = cor != null ? cor : '';

            // Action to load: Results.
            var requestParams = affiliateCode + prefcurrency + adco + adcamp + "adplat=" + adplat + "&driversAge=25&" + preflang + "puSameAsDo=on&";
            requestParams = requestParams + "country=" + countryName;
            requestParams = requestParams + "&city=" + cityName;
            requestParams = requestParams + "&cor=" + cor;
            requestParams = requestParams + "&location=" + "-1";
            requestParams = requestParams + "&locationName=" + locationName;
            requestParams = requestParams + "&dropCountry=" + countryName;
            requestParams = requestParams + "&dropCity=" + cityName;
            requestParams = requestParams + "&dropLocation=" + "-1";
            requestParams = requestParams + "&dropLocationName=" + locationName;
            requestParams = requestParams + "&puHour=" + $scope.puHour;
            requestParams = requestParams + "&puMinute=" + $scope.puMin;
            requestParams = requestParams + "&doHour=" + $scope.doHour;
            requestParams = requestParams + "&doMinute=" + $scope.doMin;
            requestParams = requestParams + "&puDay=" + $scope.puDay;
            requestParams = requestParams + "&puMonth=" + $scope.puMonth;
            requestParams = requestParams + "&puYear=" + $scope.puYear;
            requestParams = requestParams + "&doDay=" + $scope.doDay;
            requestParams = requestParams + "&doMonth=" + $scope.doMonth;
            requestParams = requestParams + "&doYear=" + $scope.doYear;
            requestParams = requestParams + "&enabler=" + $("#enabler").val();
            requestParams = requestParams + "&doFiltering=true&filterFrom=0&filterTo=20&emptySearchResults=true&fromLocChoose=true&actionToLoad=results&popularLoc=false&fromWidget=true";
            requestParams = requestParams + getUTMParams();

            window.open(affUrl + "/SearchLoaderWidget.do?" + requestParams, "_blank");
        });
    }
});
