var launchTrackingFlag = 0,
  gaEnvVar, wt_finalCurrency;
function launchGlobalTracking(){
	try{

		
		// FOR NEW UI : use a custom var (page level) for airline code if we have it
		/**
		 * JSON serialization / deserialization
		 * basic implementation for older browsers (IE6-7): http://caniuse.com/json
		 */
		if (typeof JSON === "undefined") {
			window.JSON = {
				parse: function(str) {
					return eval("(" + str + ")");
				},
				stringify: function(obj) {
					if (obj instanceof Object) {
						var str = "";
						if (obj.constructor === Array) {
							for (var k = 0; k < obj.length; str += this.stringify(obj[k]) + ",", k++);
							return "[" + str.slice(0, -1) + "]";
						}
						if (obj.toString !== Object.prototype.toString) {
							return "\"" + obj.toString().replace(/"/g, "\\$&") + "\"";
						}
						for (var key in obj) {
							str += "\"" + key.replace(/"/g, "\\$&") + "\":" + this.stringify(obj[key]) + ",";
						}
						return "{" + str.slice(0, -1) + "}";
					}
					return (typeof obj === "string") ? "\"" + obj.replace(/"/g, "\\$&") + "\"" : String(obj);
				}
			};
		}

		/*****
		** global variables
		******/
		eBaDataLayer = {},eBACustomer={}
		gaEnvVar = {
			currdomain : document.domain,
			refurl : document.referrer.toString().replace("http://","").replace("https://",""),
			bflown : 0, //
			BEpageName : "", //
			pageName : (eBaDataLayer['page_code'] !== undefined) ? ''+eBaDataLayer['page_code'] : '', //
			tripFlow : (eBaDataLayer['trip_flow'] !== undefined) ? ''+eBaDataLayer['trip_flow'] : 'REVENUE', //fix BI missing tripFlow
			wt_env : eBACustomer["env"],
			wt_sitecode : (eBaDataLayer['site_code'] !== undefined) ? ''+eBaDataLayer['site_code'] : '',
			wt_office : (eBaDataLayer['office_id'] !== undefined) ? ''+eBaDataLayer['office_id'] : '',
			wt_language : (eBaDataLayer['language'] !== undefined) ? ''+eBaDataLayer['language'] : '',
			// The airline must override the market id in the call to BE : SO_SITE_MARKET_ID
			wt_market : (eBaDataLayer['market'] !== undefined) ? ''+eBaDataLayer['market'] : '',
			wt_nbPax : (eBaDataLayer['nb_trav'] !== undefined) ? ''+eBaDataLayer['nb_trav'] : '' //
		};
		wt_finalCurrency = '';

		/*****
		** Global initialisation
		******/
		isUsingDoubleClick = false;
		isErrorManaging = false;
		isFuelSurchageCalculate = false;
		isIframedSite = false;
		isFFNameEnglish = false;
		isUsingSameUrl = false;
		isSessionIdSkipped = true;
		
		var isECEnable = true;
		
		if(eBACustomer["modules"]){
			if(eBACustomer.modules["doubleClick"]){
				isUsingDoubleClick = true;
			}
			if(eBACustomer.modules["errorManage"]){
				isErrorManaging = true;
			}
			if(eBACustomer.modules["fuelCharge"]){
				isFuelSurchageCalculate = true;
			}
			if(eBACustomer.modules["ffnameEnglish"]){
				isFFNameEnglish = eBACustomer.modules.ffnameEnglish;
			}
			if(eBACustomer.modules["sessionIdSkipp"]){
				isSessionIdSkipped = eBACustomer.modules.sessionIdSkipp;
			}
		}

		if (eBACustomer["trackURL"] && eBACustomer["trackURL"] != ""){
			isIframedSite = true;
		}

		if (eBACustomer["sameUrlUsed"] && eBACustomer["sameUrlUsed"] == true){
			isUsingSameUrl = true;
		}

		/*****
		** Initialisation and flow detection
		******/
		setBEpage();//set bflown & BEpageName;
		var refdomain = gaEnvVar.refurl.slice(0,gaEnvVar.refurl.indexOf("/"));
		// By default, websites are using a subdomain for their BE pages, so, the isSearchResultPage will be calculated it in this way
		isSearchResultPage = (gaEnvVar.currdomain != refdomain &&(gaEnvVar.bflown==1 || gaEnvVar.bflown==2 || gaEnvVar.bflown==3));
		if(isUsingSameUrl){
			// For websites which are using the same URL all across the website both o Portal & IBE
			isSearchResultPage = gaEnvVar.bflown==1 || gaEnvVar.bflown==2 || gaEnvVar.bflown==3;
		}
		isConfirmationPage = (gaEnvVar.pageName == "CONF" || gaEnvVar.pageName == "MCONF" || gaEnvVar.pageName == "COFS" || gaEnvVar.pageName == "COFR");

		// Launch appropriate tracking flow
		if (gaEnvVar.tripFlow.toLowerCase() == 'car'){
			// carTracking(); Not yet implemented for Aster.
		}else if (gaEnvVar.tripFlow.toLowerCase()=='revenue' || gaEnvVar.tripFlow.toLowerCase()=='award'){	
			airBookingTracking(eBACustomer);
		}
		launchTrackingFlag = 1;
	}catch(e){
		if(window.console!==undefined) {
			console.log(e);
		}
	}
}

/*****
** Main function to track booking flows
******/
function airBookingTracking(eBACustomer){
	/*****
	** Initialisation of variables used all the file
	******/
	var ga_dep_search = (eBaDataLayer['city_search_out'] !== undefined) ? ''+eBaDataLayer['city_search_out'] : '',
	  ga_arr_search = (eBaDataLayer['city_search_in'] !== undefined) ? ''+eBaDataLayer['city_search_in'] : '',
	//var citiesSearched = (eBaDataLayer.bound != undefined) ? eBaDataLayer.bound[0].route : ga_dep_search + "-" + ga_arr_search;
	  citiesSearched = ga_dep_search + "-" + ga_arr_search,
	  rtowin = (eBaDataLayer['trip_type'] !== undefined) ? ''+eBaDataLayer['trip_type'] : '',
    searchFlights = (eBaDataLayer['search'] !== undefined) ? eBaDataLayer['search']['flights'] : [],
    i, l;

  if(rtowin === "" && gaEnvVar.pageName == "FDFFCPX"){
    // Fix on FDFFCPX: missing trip_type, city_search_in, city_search_out
    rtowin = "CP";
    // TO-DO:  - save to localStorage the trip_type from initial page
    //         - go through the bounds and/or search.flights
    l = searchFlights.length;
    citiesSearched = "";
    for(i=0; i<l; i++){
      citiesSearched += searchFlights[i]["departure"]["location_code"] + "-" + searchFlights[i]["arrival"]["location_code"] + "|";
    }
    citiesSearched = citiesSearched.slice(0, -1);
  }
  //var bound_length = (eBaDataLayer["bound"]) ? eBaDataLayer.bound.length : 0;

	/*****
	** code for page views : get informations
	******/
	// NotBookingEngine
	if (!eBaDataLayer || !eBaDataLayer['page_code'] || eBaDataLayer['page_code']===''){
		tag = "NotBookingEngine";
	} 
	else {tag = eBaDataLayer['page_code'];}

	// Remove the jsession Id
	var urlPage = document.location.href;
	if(isSessionIdSkipped){
		if (urlPage.indexOf(';')>0){
			urlPage = urlPage.substr(0,document.location.href.indexOf(';'));
		}
	}

	// Remove parameters (override parameters sent to the BE via GET method)
	if ( urlPage.indexOf('?') != -1 ){
		urlPage = urlPage.substr(0, urlPage.indexOf('?'));
	}

	// URL format - in order to add our parameters to the new url
	urlPage += (urlPage.indexOf('?') == -1) ? '?' : '';
	urlPage += (urlPage.indexOf('?') > 0 && urlPage.indexOf('&') > 0) ? '&' : '';
  if (isSearchResultPage && (urlPage.indexOf('#')>0)){
    urlPage = urlPage.replace('#','');
  }

	// Calculation of the sunday rule
	// As the calculation is on the first page, date are not yet valid (customer can change them on calendar page or upsell page)
	// So, the calculation will be done on search dates.
	var ddate = "",
	  rdate = "",
	  wt_sunRule = 'N/A (One Way flight)',
	  nb_bound = (eBaDataLayer["bound"])? eBaDataLayer.bound.length : 0;

	if(eBaDataLayer["bound"] && eBaDataLayer.bound[0]){
		// Calculation of departure date and arrival date from bound object
		ddate = reverseDate((eBaDataLayer.bound[0]['dep_date'] !== undefined) ? ''+eBaDataLayer.bound[0]['dep_date'] : '');
		// If it is a one way, no returne date
		if(rtowin !='OW'){
			rdate = reverseDate((eBaDataLayer.bound[nb_bound-1]['dep_date'] !== undefined) ? ''+eBaDataLayer.bound[nb_bound-1]['dep_date'] : '');
		}
	}else{
		ddate = reverseDate((eBaDataLayer['date_search_out'] !== undefined) ? ''+eBaDataLayer['date_search_out'] : '');
		rdate = reverseDate((eBaDataLayer['date_search_in'] !== undefined) ? ''+eBaDataLayer['date_search_in'] : '');
	}
	
	if (rtowin !='OW'){
		if(ddate && rdate){
			wt_sunRule = sundayRule(ddate, rdate); 
		}
	}
	
	gaURL = urlPage +
		'wt_company=' + eBACustomer.company +
		'&wt_flow=' + gaEnvVar.tripFlow +
		'&wt_market=' + gaEnvVar.wt_market +
		'&wt_language=' + gaEnvVar.wt_language +
		'&wt_env=' + gaEnvVar.wt_env +
		'&wt_domain=' + gaEnvVar.currdomain +
		'&wt_office=' + gaEnvVar.wt_office +
		'&wt_page=' + gaEnvVar.BEpageName +
		'&wt_pagecode=' + gaEnvVar.pageName +
		'&wt_sitecode=' + gaEnvVar.wt_sitecode;

	if 	(isSearchResultPage){
		var cabin = (eBaDataLayer.bound && eBaDataLayer.bound[0] && eBaDataLayer.bound[0].cabin !== undefined) ? '' + eBaDataLayer.bound[0].cabin : 
		((eBaDataLayer.pnr_cabin && eBaDataLayer.pnr_cabin !== undefined)? '' + eBaDataLayer.pnr_cabin : '');
		//on first page of BE we are tracking site search
		gaURL = gaURL +
			'&wt_search2=' + encodeURI(cabin) + //encode to avoid special char issues
			'&wt_search=' + citiesSearched + '_' + rtowin +
			'&wt_spax=' + gaEnvVar.wt_nbPax +
			'&wt_sflow=' + gaEnvVar.tripFlow +
			'&wt_soffice=' + gaEnvVar.wt_office +
			'&wt_ssitecode=' + gaEnvVar.wt_sitecode ;
	
			Set_Cookie('citiesSearched', citiesSearched + '.' + rtowin + '.' + gaEnvVar.wt_office + '.' + ddate + '-' + rdate  + '.' + gaEnvVar.wt_sitecode + '.' + gaEnvVar.wt_market, 0, '/', '', '');			
	
	}else if (tag == "NotBookingEngine") {
		gaURL = urlPage + "?company=" + eBACustomer.company;
	}


	
	// Manage errors (AA)
	var ibe_errors = "";
	if (isErrorManaging){
		if(document.custom){
			if(document.custom.errorCode0){ibe_errors+="&wt_E0="+document.custom.errorType0.value+document.custom.errorCode0.value;}
			if(document.custom.errorCode1){ibe_errors+="&wt_E1="+document.custom.errorType1.value+document.custom.errorCode1.value;}
			if(document.custom.errorCode2){ibe_errors+="&wt_E2="+document.custom.errorType2.value+document.custom.errorCode2.value;}
			if(document.custom.errorCode3){ibe_errors+="&wt_E3="+document.custom.errorType3.value+document.custom.errorCode3.value;}
			gaURL += ibe_errors;
		}
	}

		// Calculate the upsell
		var upsellOutboundString = "OUP NONE";
		var upsellInboundString = "IUP NONE";
		var lowestOutboundFF = "";
		var lowestInboundFF = "";
		var selectedOutboundFF = "";
		var selectedInboundFF = "";
		// Route data (airport codes) and flight data (airlines code)
		var wt_airrouteob = "";
		var wt_flightob = "";
		var wt_airrouteret = ""; // Inbound
		var wt_flightret = ""; // Inbound		
		var wt_netprice = 0;

		if(eBaDataLayer['bound'] !== undefined) {
			
			lowestOutboundFF = (eBaDataLayer.bound[0]["lowest_ff_code"] !== undefined) ? ""+eBaDataLayer.bound[0]["lowest_ff_code"] : (eBaDataLayer["lowest_ff_code"] !== undefined ? eBaDataLayer["lowest_ff_code"] : "");
			lowestInboundFF = "";
			selectedOutboundFF = (eBaDataLayer.bound[0]["selected_ff_code"] !== undefined) ? ""+eBaDataLayer.bound[0]["selected_ff_code"] : (eBaDataLayer["selected_ff_code"] !== undefined ? eBaDataLayer["selected_ff_code"] : "");
			selectedInboundFF = "";
		
		
		// We use first FF code and if ff name are in English for all languages, then, we can use FF name.
			if(isFFNameEnglish)
			{
				lowestOutboundFF = (eBaDataLayer.bound[0]["lowest_ff_name"] !== undefined) ? ""+eBaDataLayer.bound[0]["lowest_ff_name"] : (eBaDataLayer["lowest_ff_name"] !== undefined ? eBaDataLayer["lowest_ff_name"] : "");
				selectedOutboundFF = (eBaDataLayer.bound[0]["selected_ff_name"] !== undefined) ? ""+eBaDataLayer.bound[0]["selected_ff_name"] : (eBaDataLayer["selected_ff_name"] !== undefined ? eBaDataLayer["selected_ff_name"] : "");

				if (rtowin =="RT")
				{
					lowestInboundFF = (eBaDataLayer.bound[nb_bound-1]["lowest_ff_name"] !== undefined) ? ""+eBaDataLayer.bound[nb_bound-1]["lowest_ff_name"] : (eBaDataLayer["lowest_ff_name"] !== undefined ? eBaDataLayer["lowest_ff_name"] : "");
					selectedInboundFF = (eBaDataLayer.bound[nb_bound-1]["selected_ff_name"] !== undefined) ? ""+eBaDataLayer.bound[nb_bound-1]["selected_ff_name"] : (eBaDataLayer["selected_ff_name"] !== undefined ? eBaDataLayer["selected_ff_name"] : "");
				} else if (rtowin =='CP'){
					// Complex flight, I add all information in the outbound values
					for(var i=1; i < nb_bound; i++){
						if( i!=1 ){
							lowestOutboundFF += " ";
							selectedOutboundFF += " ";
						}
						lowestOutboundFF += (eBaDataLayer.bound[i]["lowest_ff_name"] !== undefined) ? ""+eBaDataLayer.bound[i]["lowest_ff_name"] : (eBaDataLayer["lowest_ff_name"] !== undefined ? eBaDataLayer["lowest_ff_name"] : "");
						selectedOutboundFF += (eBaDataLayer.bound[i]["selected_ff_name"] !== undefined) ? ""+eBaDataLayer.bound[i]["selected_ff_name"] : (eBaDataLayer["selected_ff_name"] !== undefined ? eBaDataLayer["selected_ff_name"] : "");
					}
				}
			}else{
				// FFname are localised, we use fare family code
				if (rtowin =="RT")
				{
					lowestInboundFF = (eBaDataLayer.bound[nb_bound-1]["lowest_ff_code"] !== undefined) ? ""+eBaDataLayer.bound[nb_bound-1]["lowest_ff_code"] : (eBaDataLayer["lowest_ff_code"] !== undefined ? eBaDataLayer["lowest_ff_code"] : "");
					selectedInboundFF = (eBaDataLayer.bound[nb_bound-1]["selected_ff_code"] !== undefined) ? ""+eBaDataLayer.bound[nb_bound-1]["selected_ff_code"] : (eBaDataLayer["selected_ff_code"] !== undefined ? eBaDataLayer["selected_ff_code"] : "");
					////upsell capture RT
					if (lowestOutboundFF != selectedOutboundFF)
					upsellOutboundString = 'OUP '+ lowestOutboundFF + ' - ' + selectedOutboundFF;
					if (lowestInboundFF != selectedInboundFF)
					upsellInboundString = 'IUP '+ lowestInboundFF + ' - ' + selectedInboundFF;
					////
				} else if (rtowin =='CP'){
					// Complex flight, I add all information in the outbound values
					for(var i=1; i < nb_bound; i++){
						if( i!=1 ){
							lowestOutboundFF += " ";
							selectedOutboundFF += " ";
						}
						lowestOutboundFF += (eBaDataLayer.bound[i]["lowest_ff_code"] !== undefined) ? ""+eBaDataLayer.bound[i]["lowest_ff_code"] : (eBaDataLayer["lowest_ff_code"] !== undefined ? eBaDataLayer["lowest_ff_code"] : "");
						selectedOutboundFF += (eBaDataLayer.bound[i]["selected_ff_code"] !== undefined) ? ""+eBaDataLayer.bound[i]["selected_ff_code"] : (eBaDataLayer["selected_ff_code"] !== undefined ? eBaDataLayer["selected_ff_code"] : "");
					}
				}
			}
			
		
			if (lowestOutboundFF != selectedOutboundFF)
				upsellOutboundString = 'OUP '+ lowestOutboundFF + ' - ' + selectedOutboundFF;
			if (lowestInboundFF != selectedInboundFF)
				upsellInboundString = 'IUP '+ lowestInboundFF + ' - ' + selectedInboundFF;			
			
			// Route data (airport codes) and flight data (airlines code)
			wt_airrouteob =(eBaDataLayer.bound[0]["route"] !== undefined) ? ""+eBaDataLayer.bound[0]["route"] : ""; // Outbound
			wt_flightob = (eBaDataLayer.bound[0]["flight_numbers"] !== undefined) ? ""+eBaDataLayer.bound[0]["flight_numbers"] : ""; // Outbound

			wt_netprice =(eBaDataLayer.bound[0]["selected_ff_price"] !== undefined) ? eBaDataLayer.bound[0]["selected_ff_price"] : (eBaDataLayer["selected_ff_price"] !== undefined ? eBaDataLayer["selected_ff_price"] : 0); // Outbound
			
			
			if (rtowin=='CP'){
				for(i=1; i < nb_bound; i++){
					if( i!=1 ){
						wt_airrouteret += "|";
						wt_flightret += "|";
					}
					wt_airrouteret += (eBaDataLayer.bound[i]["route"] !== undefined) ? ""+eBaDataLayer.bound[i]["route"] : "";
					wt_flightret += (eBaDataLayer.bound[i]["flight_numbers"] !== undefined) ? ""+eBaDataLayer.bound[i]["flight_numbers"] : "";
					
				}
			}else if (rtowin=='RT'){
				wt_airrouteret = (eBaDataLayer.bound[1]["route"] !== undefined) ? ""+eBaDataLayer.bound[1]["route"] : "";
				wt_flightret += (eBaDataLayer.bound[1]["flight_numbers"] !== undefined) ? ""+eBaDataLayer.bound[1]["flight_numbers"] : "";
				wt_netprice = wt_netprice + eBaDataLayer.bound[1].selected_ff_price;
			}
			wt_netprice = Math.floor(wt_netprice / +eBaDataLayer.nb_trav);
			wt_netprice = convertFormatPrice(wt_netprice,eBaDataLayer.currency);
	
		}
	/*****
	** code for confirmation page - Ecommerce tracking
	******/
	if 	(isConfirmationPage){
		
		//Date Calculations : we can use now real dates of journey, in the bound
		var todaydate = new Date();				
	    var pnrDate = new Date();
		if(eBaDataLayer.pnr_creation_date !== undefined) 
			pnrDate = new Date(eBaDataLayer.pnr_creation_date);
		
		
		var ga_advance = (eBaDataLayer.advance_purchase !== undefined) ? eBaDataLayer.advance_purchase : 0;
		var wt_adPurch = timeCategorization(ga_advance);//for adv purchase
		var wt_jLength = 'N/A (One Way flight)';
		 
		if (rtowin !='OW'){
			wt_jLength = timeCategorization(days_between(new Date(ddate), new Date(rdate)));
		}
		
		nssret = 0;
		var nb_pax = (eBaDataLayer.nb_trav !== undefined) ? eBaDataLayer.nb_trav : 1;
		if (rtowin == "RT"){
			nss = nb_pax * 2; 
			nssret = nb_pax;
		} else {nss = nb_pax;}

		wt_selectedCurrency = (eBaDataLayer.currency !== undefined) ? ""+eBaDataLayer.currency : "";
		
		//var convertToCurr = '';
		var convertToCurr = wt_selectedCurrency;
		//if (eBACustomer.compcur != wt_selectedCurrency){
		//	convertToCurr = wt_selectedCurrency;
		//}
		
		var tax_amount = (eBaDataLayer.tax_amount !== undefined) ? eBaDataLayer.tax_amount : 0;
		var pnr_fee = (eBaDataLayer.service_fee !== undefined) ? eBaDataLayer.service_fee : 0;
		wt_tax = convertFormatPrice(tax_amount,convertToCurr);		 
		wt_fee= convertFormatPrice(pnr_fee,convertToCurr);
		
		//fuel surcharge in shipping - Air Mauritius
		if (isFuelSurchageCalculate){
			//retrieve fuelSurcharge
			wt_fee ='0.00';
			if (Get_Cookie('YACQ')) {
				YACQ = Get_Cookie('YACQ');
				wt_fee = convertFormatPrice(YACQ,convertToCurr);
			}
			Delete_Cookie('YACQ', '/', '');
		}

		wt_ttc= convertFormatPrice(((eBaDataLayer.total_price !== undefined) ? eBaDataLayer.total_price : 0),convertToCurr);
		
		tmppricewotax = (eBaDataLayer.base_fare_price !== undefined) ? eBaDataLayer.base_fare_price : 0;
		pricepax = tmppricewotax/nb_pax;
		
		wt_netpax = convertFormatPrice(pricepax,convertToCurr);//final currency to not convert it again
		wt_city = (eBaDataLayer.payment_cc_city !== undefined) ? ""+eBaDataLayer.payment_cc_city : "";
		wt_country = (eBaDataLayer.payment_cc_country !== undefined) ? ""+eBaDataLayer.payment_cc_country : "";

		// Take a look deeper to know if we really need the snippet of code below (until ***)
		deferred = "TRUE";
    try{
  		fullHTML = document.body.innerHTML;
  		var deferred_index2 = fullHTML.indexOf('paymentExternalPayment');
  		if(deferred_index2 >= 0){deferred = "FALSE";}
    }catch(e){
      if(console) console.log(e);
    }
		// *****

		var ga_lang = (eBaDataLayer['language'] !== undefined) ? ""+eBaDataLayer.language : "";
		var ga_office_id = (eBaDataLayer['office_id'] !== undefined) ? ""+eBaDataLayer.office_id : "";
		var ga_pnr_number = (eBaDataLayer['pnr_nbr'] !== undefined) ? ""+eBaDataLayer.pnr_nbr : "";
		var wt_countryob = (eBaDataLayer.bound[0]['dep_country'] !== undefined) ? ""+eBaDataLayer.bound[0].dep_country : "";
		var wt_countryret = (eBaDataLayer.bound[0]['arr_country'] !== undefined) ? ""+eBaDataLayer.bound[0].arr_country : "";
		var wt_mop = (eBaDataLayer['payment_method'] !== undefined) ? ""+eBaDataLayer.payment_method : "";
		var wt_cctype = (eBaDataLayer['payment_cc_name'] !== undefined) ? ""+eBaDataLayer.payment_cc_name : "";
		var wt_cabin = (eBaDataLayer['pnr_cabin'] !== undefined) ? ""+eBaDataLayer.pnr_cabin : "";
		var wt_dep = (eBaDataLayer.bound[0]['dep_airport'] !== undefined) ? ""+eBaDataLayer.bound[0].dep_airport : "";
		var wt_arr = (eBaDataLayer.bound[0]['arr_airport'] !== undefined) ? ""+eBaDataLayer.bound[0].arr_airport : "";
		var wt_cityPair = wt_dep + "-" + wt_arr;


		wt_transID= 'wt_company=' + eBACustomer.company +
			'&wt_country=' + wt_country +
			'&wt_language=' + ga_lang +
			'&wt_env=' + gaEnvVar.wt_env +
			'&wt_domain=' + gaEnvVar.currdomain +
			'&wt_office=' + ga_office_id +
			'&wt_flow=' + gaEnvVar.tripFlow +
			'&wt_cpair=' + citiesSearched +
			'&wt_rtowin=' + rtowin +
			'&wt_pnrloc=' + ga_pnr_number +
			'&wt_dateob=' + ddate +
			'&wt_dateret=' + rdate +
			'&wt_countryob=' + wt_countryob +
			'&wt_countryret=' + wt_countryret +
			'&wt_mop=' + wt_mop +
			'&wt_cctype=' + wt_cctype +
			'&wt_cabin=' + wt_cabin +
			'&wt_apurchcat=' + wt_adPurch +
			'&wt_defpay=' + deferred +
			'&wt_market=' + gaEnvVar.wt_market +
			'&wt_sunRule=' + wt_sunRule +
			'&wt_selectedCurrency=' + wt_selectedCurrency +
			'&wt_finalCurrency=' + wt_finalCurrency +
			'&wt_jLength=' + wt_jLength + ibe_errors;

		wt_sku = 'wt_company=' + eBACustomer.company +
  		'&wt_country=' + wt_country +
  		'&wt_market=' + gaEnvVar.wt_market +
  		'&wt_language=' + ga_lang +
  		'&wt_office=' + ga_office_id+
  		'&wt_flow=' + gaEnvVar.tripFlow +
  		'&wt_itemtype=aircomppax';

		wt_productName = '&wt_cpair='+ citiesSearched +
			'&wt_rtowin=' + rtowin +
			'&wt_airrouteob=' + wt_airrouteob +
			'&wt_airrouteret=' + wt_airrouteret+
			'&wt_flightob=' + wt_flightob+
			'&wt_flightret=' + wt_flightret;
		
		wt_category = '&wt_pax=' + nb_pax +
			'&wt_dateob=' + ddate +
			'&wt_dateret=' + rdate +					
			'&wt_countryob=' + wt_countryob +
			'&wt_countryret=' + wt_countryret +
			'&wt_mop=' + wt_mop +
			'&wt_cctype=' + wt_cctype +
			'&wt_lowfarefamob=' + lowestOutboundFF +
			'&wt_lowfarefamret=' + lowestInboundFF +
			'&wt_selfarefamob=' + selectedOutboundFF + 
			'&wt_selfarefamret=' + selectedInboundFF +
			'&wt_cabin=' + wt_cabin +
			'&wt_nssob=' + nb_pax +
			'&wt_nssret=' + nssret +
			'&wt_nss=' + nss +
			'&wt_upsellob=' + upsellOutboundString +
			'&wt_upsellret=' + upsellInboundString; 		
	}

	/*****
	** Tracking part
	******/
	if (!isIframedSite){
		_gaq =  [];
		var gaAccount = eBACustomer.ga_UA;
		//for(i=0;i<eBACustomer.ga.length;i++){

		/*****
		** call to ga.js
		******/
		/*(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			//ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			if(isUsingDoubleClick){
				// If the customer want to have interest of their users, we need to use double click code.
				// It will replace the ga.src if enabled
				ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
			}
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();*/
	}else{
		/*****
		** IFrame tracking
		******/
		//Transform url and utm transaction and item using -SEP- for separator
		gaURL = gaURL.replace(/&/g,"-SEP-");
			
		var transStringFinal="";
		var itemStringFinal = "";
		//code for the confirmation page revenue
		if (pageName== "CONF" && wt_flow=='revenue'){
			transStringFinal = wt_transID+","+ ga_office_id +","+ wt_ttc +","+ wt_tax +","+ wt_fee +","+ "paymentCCCity, NA, paymentCCCountry";
			itemStringFinal = wt_transID +","+ wt_sku +","+ wt_productName +","+ wt_category +","+ wt_netpax +","+ nb_pax;
			
			transStringFinal = transStringFinal.replace(/&/g,"-SEP-");
			itemStringFinal = itemStringFinal.replace(/&/g,"-SEP-");
		}
		utmparams = "";
		//Redirect cookie information if available in the page url
		var curl = document.location.toString();
		val1 = curl.lastIndexOf("__utma");
		if (val1 != "-1"){
			utmparams = curl.slice(val1,curl.length) + "&";
		}
		
		// TODO a finir en simplifiant le code (si si c'est possible!!)
		
	}
}

function setBEpage(){
// TODO : One list for each web site (at least, one for DDS (each DDS customer) and one for XHTML) with a common part because there are difference between them
	switch (gaEnvVar.pageName){
		//List of pages for DDS and new UI
		case "ADVS": gaEnvVar.BEpageName = "1-AirSearch"					;gaEnvVar.bflown=1;break;
		case "MODS": gaEnvVar.BEpageName = "1-ModifySearch"					;gaEnvVar.bflown=1;break;
		case "FFCR": gaEnvVar.BEpageName = "2-Calendar"						;gaEnvVar.bflown=2;break;
		case "FDCS": gaEnvVar.BEpageName = "2-FlexPricerCalendar-ITI"		;gaEnvVar.bflown=2;break;
    case "FDCSCPX": gaEnvVar.BEpageName = "2-FlexPricerCalendar-Complex"  ;gaEnvVar.bflown=2;break;
		case "ITCL": gaEnvVar.BEpageName = "2-FlexPricerCalendar-ITI"		;gaEnvVar.bflown=2;break;
		case "FDCT": gaEnvVar.BEpageName = "2-FlexPricerCalendar-OWD"		;gaEnvVar.bflown=2;break;
		case "FFCC": gaEnvVar.BEpageName = "2-ComplexFlexCalendar"			;gaEnvVar.bflown=2;break;
		case "OWDA": gaEnvVar.BEpageName = "3-Upsell-OWD"					;gaEnvVar.bflown=3;break;
		case "OWDO": gaEnvVar.BEpageName = "3-Upsell-OWD OW"				;gaEnvVar.bflown=3;break;
		case "OWCO": gaEnvVar.BEpageName = "3-Upsell-OWC"					;gaEnvVar.bflown=3;break;
		case "FFPR": gaEnvVar.BEpageName = "3-Upsell"						;gaEnvVar.bflown=3;break;
		case "FFCO": gaEnvVar.BEpageName = "3-Upsell-OW"					;gaEnvVar.bflown=3;break; //AY
		case "ODUP": gaEnvVar.BEpageName = "3-FlexPricerUpsell-OWD"			;gaEnvVar.bflown=3;break;
		case "FFPC": gaEnvVar.BEpageName = "3-ComplexFlexAvailability"		;gaEnvVar.bflown=3;break;
		case "SDAI": gaEnvVar.BEpageName = "3-AirAvailability-SD"			;gaEnvVar.bflown=3;break;
		case "FDFF": gaEnvVar.BEpageName = "3-AirAvailability-FPC-ITI"		;gaEnvVar.bflown=3;break;
    case "FDFFCPX": gaEnvVar.BEpageName = "3-AirAvailability-Complex"   ;gaEnvVar.bflown=3;break;
		case "FPC":  gaEnvVar.BEpageName = "3-AirAvailability-FPC-OW"		;gaEnvVar.bflown=3;break;
		case "FPOW": gaEnvVar.BEpageName = "3-AirAvailability-FPC-OWD"		;gaEnvVar.bflown=3;break;
		case "AVAI": gaEnvVar.BEpageName = "3-Availability-ScheduleDriven MultiCity"	;gaEnvVar.bflown=3;break;
    case "FPRM": gaEnvVar.BEpageName = "3-AirAvailability-FPPremium";gaEnvVar.bflown=3;break;
		case "FARE": gaEnvVar.BEpageName = "4-Fare-Pricing"					;gaEnvVar.bflown=4;break;
		case "ALPI": gaEnvVar.BEpageName = "5-Passenger-Info"				;gaEnvVar.bflown=5;break;
		case "APIM": gaEnvVar.BEpageName = "5-Passenger-And-Additional-Passenger-info";gaEnvVar.bflown=5;break;		
		case "APIS": gaEnvVar.BEpageName = "5b-Additional-Passenger-Info"	;gaEnvVar.bflown=5;break;
		case "PAXS": gaEnvVar.BEpageName = "5b-Passenger-Servicing"      	;gaEnvVar.bflown=5;break;
		case "SEAT": gaEnvVar.BEpageName = "5b-SeatMap-MealSelection"    	;gaEnvVar.bflown=5;break;
		case "FSR":  gaEnvVar.BEpageName = "5c-Additional-Services"      	;gaEnvVar.bflown=5;break;
		case "PURC": gaEnvVar.BEpageName = "6-Purchase"						;gaEnvVar.bflown=6;break;
		case "CONF": gaEnvVar.BEpageName = "7-Reservation"					;gaEnvVar.bflown=7;break;
		case "CPNR": gaEnvVar.BEpageName = "8-Cancellation"				;gaEnvVar.bflown=8;break;
		case "TIMS": gaEnvVar.BEpageName = "Timetable Search Page"			;gaEnvVar.bflown=0;break;
		case "TIMR": gaEnvVar.BEpageName = "Timetable Results Page"			;gaEnvVar.bflown=0;break;
		case "TLIST": gaEnvVar.BEpageName = "Trip list"						;gaEnvVar.bflown=0;break;
		case "GENERR": gaEnvVar.BEpageName = "BE Generric Error Page"		;gaEnvVar.bflown=0;break;
		case "MPURC": gaEnvVar.BEpageName = "6-Purchase servicing"			;gaEnvVar.bflown=6;break;
		case "MCONF": gaEnvVar.BEpageName = "7-Reservation servicing"		;gaEnvVar.bflown=7;break;
		case "BKGD": gaEnvVar.BEpageName = "Booking details"				;gaEnvVar.bflown=0;break;
		case "BKGS": gaEnvVar.BEpageName = "Booking Modifications"			;gaEnvVar.bflown=0;break;
		case "OWRO": gaEnvVar.BEpageName = "One Way Rebooking"				;gaEnvVar.bflown=2;break;
		case "FARR": gaEnvVar.BEpageName = "4-Fare-Rebooking"				;gaEnvVar.bflown=2;break;
		case "PURR": gaEnvVar.BEpageName = "6-Purchase-Rebooking"			;gaEnvVar.bflown=6;break;
		case "VERI": gaEnvVar.BEpageName = "6-Purchase-Verification"		;gaEnvVar.bflown=6;break;
		case "COFR": gaEnvVar.BEpageName = "7-Reservation Rebooking"		;gaEnvVar.bflown=6;break;
		case "PNRS": gaEnvVar.BEpageName = "Passenger modification"			;gaEnvVar.bflown=1;break;	//CZ
		case "COFS": gaEnvVar.BEpageName = "Servicing Confirmation"			;gaEnvVar.bflown=4;break;	//CZ
		case "HTLA": gaEnvVar.BEpageName = "Hotel"							;gaEnvVar.bflown=4;break;
		case "CARA": gaEnvVar.BEpageName = "Car"							;gaEnvVar.bflown=4;break;
		default: gaEnvVar.BEpageName = gaEnvVar.pageName; gaEnvVar.bflown=0;
	}
}

/****
** dataLayerDate : MON AUG 11 12:00:00 GMT 2014 (example of expected format)
** Return date in string format yyyy/MM/dd
****/
function gaStringDate(dataLayerDate){
	var dateString ="";
	if (dataLayerDate){
		var ddateumt = gaDate(dataLayerDate);
		if (ddateumt != 'Invalid Date') {
			var day = ddateumt.getDate();
			var month = ddateumt.getMonth() + 1;
			var year = ddateumt.getFullYear();
			dateString = year + '/' + month + '/' + day;
		} 
	}
	return dateString;
}

/****
**	Reverse the date, in order to use any date function in the code
**  Format of date expected : DD/MM/YYYY
**  Return date with the format : YYYY/MM/DD
****/
function reverseDate(date) {
	if(date && date.length==10 && date.indexOf("/") == 2){
		date=date.substring(6)+"/"+date.substring(3,5)+"/"+date.substring(0,2);
	}
	return date;
}

/****
**	Return number of days between two object Date
****/
function days_between(date1_ms, date2_ms) {
	var ONE_DAY = 1000 * 60 * 60 * 24;
	var difference_ms = Math.abs(date1_ms - date2_ms);
	return Math.round(difference_ms/ONE_DAY);
}

/****
**	Return date in DATE object 
**	param = date string in yyyyMMdd or yyyyMMddhhmm or long date string UTC
****/
function gaDate(dataLayerDate){
	var gaObjDate="";
	if (dataLayerDate){
		if (dataLayerDate.length==12 || dataLayerDate.length==8){
			dataLayerDate=dataLayerDate.substring(0,4)+"/"+dataLayerDate.substring(4,6)+"/"+dataLayerDate.substring(6,8);
		}
		gaObjDate = new Date(dataLayerDate);
		if (gaObjDate == 'Invalid Date' || isNaN(gaObjDate.getDate())) {
			//case of IE9 or IE8
			var dateFix = dataLayerDate.replace('+','UTC+');
			dateFix = dateFix.replace('-','UTC-');
			gaObjDate= new Date(dateFix);
		}
	}
	return gaObjDate;
}

/****
**	Calculate the sunday rule (if the saturday night is in the journey)
**  Format date required : YYYY/MM/DD
****/
function sundayRule(sRStartDate, sREndate) {
	
	jLength = days_between(new Date(sRStartDate), new Date(sREndate));
		
	// Sunday Rule
	var dDay = gaDate(sRStartDate).getDay(); // departure day - number of the day in week 0-6
	var sunRule = '';
	if(sRStartDate){
	var rDATE = gaDate(sREndate);	
		if(jLength <7)
		{
			var diffDays = 6 - dDay; // number of days till next saturday
			//document.write("Days till saturday is" + ":" + diffDays);
			if(diffDays == 0 && jLength >0){ // if departure is saturday & return is not on same day...length of journey >=1 day.
				if((rDATE.getDay() == 6) && (jLength == 1)){ // if departure and return on same day saturday and journey time is more than 12 hours
					sunRule = 'Business';
			
				}else if((rDATE.getDay() == 0) && (rDATE.getHours() >= 4)){ // if return day is sunday and time is >= 4am.
					sunRule = 'Leisure'; //departure saturday and return sunday on/after 4am.
				}else{
					sunRule = 'Leisure'; //departure saturday & return not on same day or sunday. length of journey > 1 day.
				}
			}else if(jLength >= (diffDays + 1)){ // If Departure date is not a saturday & a saturday night stay is included in journey
				if((rDATE.getDay() == 0) && (rDATE.getHours() >= 4)){ // if return day is sunday and time is >= 4am.
					sunRule = 'Leisure';
				}else { // if return not a sunday 
					sunRule = 'Leisure';
				}
			}else{ // If a saturday night stay is NOT included in journey		
				sunRule = 'Business';			
			}
		} else{ // Journey length more >= 7 so obvious that there will be a saturday night stay
			sunRule = 'Leisure';
		} 
	}else{
		sunRule = '';
	}
	
	return sunRule;
			
// End of Sunday Rule
}

/****
**	Return the category of days for the number of days in parameter
*/
function timeCategorization(days){
var res;
	for(i=0;i<=151;i=i+30){
		j=i+30;
		if (days <= 3) {res = days +" day(s)"; break;}
		if (days > 3 && days <= 7) {res = "4 to 7 days "; break;}
		if (days > 7 && days <= 14) {res = "7 to 14 days"; break;}
		if (days > 14 && days <= 21) {res = "15 to 21 days"; break;}
		if (days > 21 && days <= 30) {res = "22 to 30 days"; break;}
		else if (days > i && days <= j) {res = (i+1) + " to " + j + " days"; break;}
	}
	if (days > 180) res = "more than 180 days";
	return res;
}

/****
**	This function avoid to have several tracking for the same PNR (if the user does not clean their cookies)
*/
function launchTracking(flowAndPnrValue){
	var ckExpiration = 60*24*365;//cookies expiration time set to one year.
	if ( Get_Cookie(flowAndPnrValue) > 1 ) {
		return false;//PNR already tracked
	}
	//if all is ok we store pnr in a cookie:
	Set_Cookie(flowAndPnrValue, '2', ckExpiration, '/', '', '');
	return true;
}

/****
**	This function create a cookie using data in parameter
*/
function Set_Cookie( name, value, expires, path, domain, secure ){
	var today = new Date();
	today.setTime( today.getTime() );
	if (expires ){
		expires = expires * 1000 * 60;//translate in ms
	}
	var expires_date = new Date( today.getTime() + (expires) );
	document.cookie = name + "=" +escape( value ) +
		( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
		( ( path ) ? ";path=" + path : "" ) +
		( ( domain ) ? ";domain=" + domain : "" ) +
		( ( secure ) ? ";secure" : "" );
}

/****
**	This function get a cookie value (the name of the cookie is the parameter)
*/
function Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f
	for ( i = 0; i < a_all_cookies.length; i++ ){
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );
		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
		// if the extracted name matches passed check_name
		if ( cookie_name == check_name ){
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )	{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value; 
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( b_cookie_found ){
		return null;
	}
}

/****
**	This function delete a cookie - give a past date to the cookie = delete it
*/
function Delete_Cookie( name, path, domain ) {
	if ( Get_Cookie( name ) ) document.cookie = name + "=" +
	( ( path ) ? ";path=" + path : "") +
	( ( domain ) ? ";domain=" + domain : "" ) +
	";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

/****
**	This function for price format required by GA
**  Set pCurrency to '' for no convertion
*/
function convertFormatPrice(amount,pCurrency){
	//currencyConvertions.
	var s = "0.00";
	var i = parseFloat(amount);
	if(!isNaN(i)) { 
		if (pCurrency!=''){
			i = convert(i,pCurrency);
		}
		var minus = '';
		if(i < 0) { 
			minus = '-'; 
		}
		i = Math.abs(i); 
		i = parseInt((i + .005) * 100);
		i = i / 100; 
		s = new String(i);
		if(s.indexOf('.') < 0) {
			s += '.00'; 
		}
		if(s.indexOf('.') == (s.length - 2)) {
			s += '0'; 
		}
		s = minus + s;  
	}		
	return s;
}

/****
**	This function convert an amount in another currency
*/
function convert(pAmount,pCurrency){
	var newAmount = pAmount;
	wt_finalCurrency = pCurrency;
	
	//if(typeof currMultConv !== "undefined" && 
	//	currMultConv[eBACustomer.compcur] != undefined && 
	//	currMultConv[eBACustomer.compcur][pCurrency] != undefined &&
	//	currMultConv[eBACustomer.compcur][pCurrency] != null){
	//	
	//	newAmount = pAmount * currMultConv[eBACustomer.compcur][pCurrency];
	//	wt_finalCurrency = eBACustomer.compcur;
	//}else{
		if (currFinalConv[pCurrency]!=undefined && currFinalConv[pCurrency]!=null){
				// If the currMultConv is not available, we use the array defined in the account file
				newAmount = pAmount * currFinalConv[pCurrency];
				wt_finalCurrency = currBase; //eBACustomer.compcur; 
		}
	//}
	
	return newAmount;				
}

// Function called by popin for track page views
function eBaPvPopin(popinCode){

	gaEnvVar.pageName = gaEnvVar.pageName || "";
	gaEnvVar.pageName = popinCode;
	
	setBEpage();
	
	// Call the main function
	airBookingTracking(eBACustomer);
}



/*Cross-browser version to Add an event*/
function addEvent( obj, type, fn ) {
	  if ( obj.attachEvent ) {
	    //obj['e'+type+fn] = fn;
	    //obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
	    obj.attachEvent( 'on'+type, fn );
	  } else
	    obj.addEventListener( type, fn, false );
}
/*Detect IE8*/
if(document.all && typeof document.addEventListener == "undefined"){
	addEvent(document, "readystatechange", launchGlobalTracking);
	
}
else{
	launchGlobalTracking();
}