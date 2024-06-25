"use strict";
/* global eBaDataLayer*/
/*********
Configuration File for: dataLayer
*********/
	
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
  var ONE_DAY = 1000 * 60 * 60 * 24,
    difference_ms = Math.abs(date1_ms - date2_ms);
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
  var jLength = days_between(new Date(sRStartDate), new Date(sREndate)),
    // Sunday Rule
    dDay = gaDate(sRStartDate).getDay(), // departure day - number of the day in week 0-6
    sunRule = '', rDATE, diffDays;
  if(sRStartDate){
    rDATE = gaDate(sREndate);	
		if(jLength <7)
		{
			diffDays = 6 - dDay; // number of days till next saturday
			//document.write("Days till saturday is" + ":" + diffDays);
			if(diffDays === 0 && jLength >0){ // if departure is saturday & return is not on same day...length of journey >=1 day.
				if((rDATE.getDay() == 6) && (jLength == 1)){ // if departure and return on same day saturday and journey time is more than 12 hours
					sunRule = 'Business';
			
				}else if((rDATE.getDay() === 0) && (rDATE.getHours() >= 4)){ // if return day is sunday and time is >= 4am.
					sunRule = 'Leisure'; //departure saturday and return sunday on/after 4am.
				}else{
					sunRule = 'Leisure'; //departure saturday & return not on same day or sunday. length of journey > 1 day.
				}
			}else if(jLength >= (diffDays + 1)){ // If Departure date is not a saturday & a saturday night stay is included in journey
				if((rDATE.getDay() === 0) && (rDATE.getHours() >= 4)){ // if return day is sunday and time is >= 4am.
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

try{

// As the calculation is on the first page, date are not yet valid (customer can change them on calendar page or upsell page)
// So, the calculation will be done on search dates.
var ddate = "",
 rdate = "",
 wt_sunRule = 'N/A (One Way flight)',
 nb_bound = (eBaDataLayer["bound"])? eBaDataLayer["bound"].length : 0,
 rtowin = (eBaDataLayer["trip_type"] !== undefined) ? ""+eBaDataLayer["trip_type"] : "";
			
if(eBaDataLayer["bound"] && eBaDataLayer["bound"][0]){
	// Calculation of departure date and arrival date from bound object
	ddate = reverseDate((eBaDataLayer["bound"][0]["dep_date"] !== undefined) ? ''+eBaDataLayer["bound"][0]["dep_date"] : '');
	// If it is a one way, no returne date
	if(rtowin !='OW'){
		rdate = reverseDate((eBaDataLayer["bound"][nb_bound-1]["dep_date"] !== undefined) ? ''+eBaDataLayer["bound"][nb_bound-1]["dep_date"] : '');
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

///////////////
var dl_flow = 'NOFF';
if (eBaDataLayer["external_id"] && eBaDataLayer["external_id"].split('-')[1]){
  dl_flow =  eBaDataLayer["external_id"].split('-')[1];
}
var dl_market = (eBaDataLayer["market"] !== undefined) ? ""+eBaDataLayer["market"] : "",
  dl_BookingFlow = (eBaDataLayer["trip_flow"] !== undefined) ? ""+eBaDataLayer["trip_flow"] : "",
  dl_bId = (eBaDataLayer["page_code"] !== undefined) ? ""+eBaDataLayer["page_code"] : "",
  dl_rtowin = (eBaDataLayer["trip_type"] !== undefined) ? ""+eBaDataLayer["trip_type"] : "",
  dl_dep = (eBaDataLayer["city_search_out"] !== undefined) ? ""+eBaDataLayer["city_search_out"] : "",
  dl_arr = (eBaDataLayer["city_search_in"] !== undefined) ? ""+eBaDataLayer["city_search_in"] : "",
  dl_depdate = (eBaDataLayer["date_search_out"] !== undefined) ? ""+eBaDataLayer["date_search_out"] : "",
  dl_retdate = (eBaDataLayer["date_search_in"] !== undefined) ? ""+eBaDataLayer["date_search_in"] : "",
  dl_nbtrav = (eBaDataLayer["nb_trav"] !== undefined) ? ""+eBaDataLayer["nb_trav"] : "",
  dl_currency = (eBaDataLayer["currency"] !== undefined) ? ""+eBaDataLayer["currency"] : "",
  dl_pnrnbr = (eBaDataLayer["pnr_nbr"] !== undefined) ? ""+eBaDataLayer["pnr_nbr"] : "",
  dl_language = (eBaDataLayer["language"] !== undefined) ? ""+eBaDataLayer["language"] : "",
  dl_pnrTotal = (eBaDataLayer["total_price"] !== undefined) ? ""+eBaDataLayer["total_price"] : "",
  dl_officeId = (eBaDataLayer["office_id"] !== undefined) ? ""+eBaDataLayer["office_id"] : "",
  dl_sunRule = wt_sunRule,
  nb_bound = (eBaDataLayer["bound"])? eBaDataLayer["bound"].length : 0,
  selectedOutboundFF = '',
  selectedInboundFF = '',
  da_flightob = '',
  dl_flightret = '',
  dl_ffSelected = '',
  dl_flightnbs = '',
  bound = (eBaDataLayer["bound"]!== undefined) ? ""+eBaDataLayer["bound"] : "";
if(bound !== ''){
	selectedOutboundFF = (eBaDataLayer["bound"][0].selected_ff_code !== undefined) ? ""+eBaDataLayer["bound"][0].selected_ff_code : "";
	selectedInboundFF = (eBaDataLayer["bound"][nb_bound-1].selected_ff_code !== undefined) ? ""+eBaDataLayer["bound"][nb_bound-1].selected_ff_code : "";
	dl_ffSelected = selectedOutboundFF + '-' + selectedInboundFF;
	da_flightob = (eBaDataLayer["bound"][0].airlines_code !== undefined) ? ""+eBaDataLayer["bound"][0].airlines_code : ""; 
	dl_flightret =(eBaDataLayer["bound"][1].airlines_code !== undefined) ? ""+eBaDataLayer["bound"][1].airlines_code : "";
	dl_flightnbs = da_flightob + '-' + dl_flightret;
}

var dataLayer = [{ 	
	'market':dl_market, 
	'language':dl_language, 
	'flow':dl_flow,
	'bookingflow':dl_BookingFlow,
	'pageid':dl_bId,
	'triptype':dl_rtowin,
	'departureloc':dl_dep,
	'arrivalloc':dl_arr,
	'depdate':dl_depdate,
	'retdate':dl_retdate,
	'numoftravellers':dl_nbtrav,
	'currency':dl_currency,
	'pnrnumber':dl_pnrnbr,
	'pnrtotal':dl_pnrTotal,
	'officeid':dl_officeId,
	'selectedFF':dl_ffSelected,
	'flights':dl_flightnbs,
	'sundayrule':dl_sunRule
}]; 

}catch(err){
//console.log(err);
}