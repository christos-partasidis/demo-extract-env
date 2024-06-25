/**
 * @class
 * Icelandair Implementation library
 * DO NOT TOUCH
 *
 * @author: 1A xHTML Implementation team (exclusively)
 *
 *  @version
 *  	2016-05-27: RF: PTR 11489802 (1.1)
 *    2016-05-31: PR: IR 11624900 (1.2)
 *		2016-06-01: RF: Rollaback of PTR 11489802 (cf IR 11685289) (1.3)
 *		2016-06-09: RF: IR 11532044 + restore of PTR 11489802 (1.4)
 *		2016-06-23: RF: WO 11765864 (1.5)
 *		2016-07-06: RF: WO 11864849 (1.6)
 *		2016-08-04: MG: IR_11823681 (1.7)
 *		2016-09-12: RF: IR 12091050 (1.8)
 *		2016-10-04: MG: PTR 12233199 (1.9) - issue with APIS eligibility mode
 *		2016-10-05: PR: IR 12178993 (1.10)
 * 		2016-10-13: WO: 12266902 Remove Optimizely and include VWO, sync and async
 *		2016-10-19: RF: Remove the optimizer as per Icelandair request
 *	    2016-04-19: OC: Remove DEV functions after ACS Migration
 *	    2017-09-14: RF: IR 13969855 (2.0)
 *	    2018-07-03: XC: WO 15361457: Plusgrade banner on CONF and RTPL pages
 *		2018-11-12: XC: WO 16062274: remove office mapping logic for servicing
 *		2019-06-27: XC: WO 17122790: FI:EMEA xHTML e-Retail Engine Request - FI - Disable error msg 7127-10031
 */
function IMPLibDxCustomFI(libraries) {

	var self = this;

	/**
	 * Version of the library: 2.0
	 */
	this.VERSION = "2.0";





	for (var i = 0; i < libraries.length; i++) {
		document.writeln("<script src='" + libraries[i] + "'><" + "/script>");
	}



	/**
	 * Code to execute when Json data is ready
	 */
	this.onJsonReady = function() {

		//Rebooking flow
		self.applyATCcusto();

		// Servicing customization
		self.applyServicingCusto();

		// Apply the general customization
		self.applyGeneralCusto();

		// Plusgrade banner
		var pageCode = implibdx.core.getPage().toUpperCase();

        implibdx.core.hideWarning7127();

		if(pageCode == 'RTPL' || pageCode == 'CONF') {
            implibdx.plusGrade.request("i98Qdn1MFI", {"rtpl": "n1MWlKTJODdk3qXKW7bHnhRv", "conf": ": DKNTfeWfXg5MGLPwRmPq7yMX"}, "#plusgrade-offering-content", implibdx.core.isTestEnvironment());
		}
	};




	/***************************** END UPDATE DATAMODEL ******************************************/

	/***************************** START GENERAL CUSTO ******************************************/
	/**
	 *
	 * Apply customization for sections present in every page
	 */
	this.applyGeneralCusto = function() {


		/*
		 * Change dimensions of new window for IE browsers
		 * PTR 10529312
		 */
		if(aria.core.Browser.isIE){
			var proxied = window.open;
			window.open = function(url, target, args) {
				args = "menubar=no, resizable=yes ,status=no, scrollbars=yes, menubar=no, width=800, height=600";
				return proxied.apply(this, arguments);
			};
		}

		/*
		 * Disable Firefox blinking on page transition
		 */
		if (aria.core.Browser.isFirefox) {
			jQuery(window).on("beforeunload", function() {
				jQuery('#custom_panel_footer').css("display","none");
			})
		}

	};


	/**
	 * Apply the whole servicing customization
	 */
	this.applyServicingCusto = function() {

		if (/mpurc/gi.test(implibdx.core.getPage())) {
			// Add the queueing from the MPURC so that is queued only in case there is a payment
			// Queue Office ID
			var mpurcQueueOID = self.getQueueOfficeId();
			var mpurcQueueProperties = {};
			mpurcQueueProperties["SO_GL"] = '<'+'?xml version="1.0" encoding="iso-8859-1"?><SO_GL><GLOBAL_LIST mode="complete"><NAME>SITE_QUEUE_DEFINITION_LIST</NAME><LIST_ELEMENT><CODE>FI_SRV</CODE><LIST_VALUE>SRV</LIST_VALUE><LIST_VALUE>'+mpurcQueueOID+'</LIST_VALUE><LIST_VALUE>13</LIST_VALUE><LIST_VALUE>0</LIST_VALUE></LIST_ELEMENT></GLOBAL_LIST></SO_GL>';

			//filter action for flights
			plnextv2.utils.ImplementationUtils.addActionFilters({
				action : "RtplActionDispatcher",
				newAction : "Override",
				filterData: function(data) {
					aria.utils.Json.inject(mpurcQueueProperties, data, true);
					data.UI_EMBEDDED_TRANSACTION = "RtplActionDispatcher";
					return data;
				}
			});
		}
	};


	/**
	 * Apply the customization related to ATC flow
	 */
	this.applyATCcusto = function() {

		if(implibdx.core.isRetrievePage()){
			self.ATCmanageOfflineOID();
			self.ATCFlowOverride();
		}

	};

	/**
	 *	For offline PNR, override the DEFAULT_CFF based on the comments inserted by the Ticketing robot
	 */
	this.ATCFlowOverride = function(){


		var overrideParameters = {};

		var defCFF = self.getDefaultCff();
		if (defCFF != null) {
			overrideParameters["SO_SITE_DEFAULT_CFF"] = defCFF;
		}

		// Point of sale override
		var pos = self.getPosPotOverride();
		if (pos != null) {
			overrideParameters["SO_SITE_POINT_OF_SALE"] = pos;
			overrideParameters["SO_SITE_POINT_OF_TICKETING"] = pos;
		}

		// ATC Queue Office ID
		var ATCqueueOID = self.getQueueOfficeId();
		var ATCqueueNumber = "13";
		var ATCqueueCategory = "0";

		overrideParameters["SO_SITE_OFFICE_ID"] = self.getOfflineOfficeId();
		overrideParameters["SO_SITE_QUEUE_OFFICE_ID"] = ATCqueueOID;
		overrideParameters["SO_SITE_QUEUE_CATEGORY"] = ATCqueueNumber + "C" + ATCqueueCategory ;
		overrideParameters["SO_GL"] = '<'+'?xml version="1.0" encoding="iso-8859-1"?><SO_GL><GLOBAL_LIST mode="complete"><NAME>SITE_QUEUE_DEFINITION_LIST</NAME><LIST_ELEMENT><CODE>FI_ATC</CODE><LIST_VALUE>REV</LIST_VALUE><LIST_VALUE>'+ATCqueueOID+'</LIST_VALUE><LIST_VALUE>'+ATCqueueNumber+'</LIST_VALUE><LIST_VALUE>'+ATCqueueCategory+'</LIST_VALUE></LIST_ELEMENT></GLOBAL_LIST></SO_GL>';

		implibdx.atc.overrideChangeFlightButtonWithValues(overrideParameters);

	};

	/**
	 *	If NO corresponding Office ID (unsupported currency) was allocated and the Change Flights button exists,
	 *	hide the Change Flights button
	 */
	this.ATCmanageOfflineOID = function() {
		var officeId = implibdx.core.getInitialOfficeId();
		if(!implibdx.core.isOnlinePnr()) {
			officeId = self.getOfflineOfficeId();
		}


		if (typeof(officeId) == 'undefined' || officeId == "") {
			implibdx.atc.hideChangeFlightButton();
		}
	}
	/**
	 * 2014-08-06: Return the office ID that will be used for offline PNRs.
	 * It replaces the office ID mapping that was put in place based on the currency
	 */
	this.getOfflineOfficeId = function() {

		var officeID = "";
		var city = implibdx.core.getInitialOfficeCity();

		switch(city){
			case "KEF":officeID = "KEFFI08AA";break;
			case "REK":officeID = "KEFFI08AA";break;

			case "LON":officeID = "LONFI08AA";break;

			case "AMS":officeID = "AMSFI08AA";break;
			case "FRA":officeID = "FRAFI08AA";break;
			case "HEL":officeID = "HELFI08AA";break;
			case "MIL":officeID = "MILFI08AA";break;
			case "MOW":officeID = "MOWFI08AA";break;
			case "BCN":officeID = "BCNFI08AA";break;
			case "PAR":officeID = "PARFI08AA";break;
			case "CPH":officeID = "CPHFI08AA";break;
			case "BWI":officeID = "BWIFI08AA";break;
			case "OSL":officeID = "OSLFI08AA";break;
			case "STO":officeID = "STOFI08AA";break;
			case "YTO":officeID = "YTOFI08AA";break;

			case "PRG":officeID = "PRGFI01AA";break;
			case "WAW":officeID = "WAWFI08AA";break;
			case "BRU":officeID = "BRUFI08AA";break;

			case "BOS":officeID = "BWIFI08AA";break;
			case "YHZ":officeID = "YTOFI08AA";break;
			case "YUL":officeID = "YULFI08AA";break;

		}

		return officeID;
	};

	/**
	 * 2014-08-04: Get the office ID in which the PNR will be queued for ticketing in case of ATC or AAAS
	 */
	this.getQueueOfficeId = function() {

		var queueOID = "";
		var city = implibdx.core.getInitialOfficeCity();

		switch(city){
			case "KEF":queueOID = "REKFI0102";break;
			case "REK":queueOID = "REKFI0102";break;

			case "LON":queueOID = "LONFI0101";break;

			case "AMS":queueOID = "FRAFI0101";break;
			case "BRU":queueOID = "FRAFI0101";break;
			case "FRA":queueOID = "FRAFI0101";break;
			case "HEL":queueOID = "FRAFI0101";break;
			case "MIL":queueOID = "FRAFI0101";break;
			case "MOW":queueOID = "FRAFI0101";break;
			case "PRG":queueOID = "FRAFI0101";break;
			case "WAW":queueOID = "FRAFI0101";break;

			case "BCN":queueOID = "PARFI0101";break;
			case "PAR":queueOID = "PARFI0101";break;

			case "CPH":queueOID = "CPHFI0101";break;

			case "BOS":queueOID = "BWIFI0104";break;
			case "BWI":queueOID = "BWIFI0104";break;

			case "OSL":queueOID = "OSLFI0101";break;

			case "STO":queueOID = "STOFI0101";break;

			case "YTO":queueOID = "YHZFI0104";break;
			case "YHZ":queueOID = "YHZFI0104";break;
			case "YUL":queueOID = "YHZFI0104";break;
		}


		return queueOID;
	};


	/**
	 * Retrieve POS override
	 */
	this.getPosPotOverride = function() {
		var pos = null;

		var city = implibdx.core.getInitialOfficeCity();

		switch(city){
			case "MOW":pos = "PAR"; break;
			case "WAW":pos = "PAR"; break;
		}

		return pos;
	};


	/**
	 * Retrieve the CFF from the special remarks
	 * For all PNR, the commercial will be stored in the PNR under a RM.
	 *		RM CFF1:OWCOACHEU/S2/P1
	 *		RM CFF2:OWCOACHEU/S3/P1
	 *
	 * As there is only one CFF for SO_SITE_DEFAULT_CFF, i will pick only the CFF1
	 * Look for id sh_flightNotes
	 *
	 * @returns {String} flight notes data
	 */
	this.getDefaultCff= function(){
		//Retrieve Flight notes data
		var data = plnextv2.utils.context.AppContext.getPageData().business.FlightNotesView;
		if(data && data.listPnrExtraData){
			var remarks = data.listPnrExtraData;
			if(remarks && remarks.length && data.listPnrExtraData[0].type=="RM"){
				//data.listPnrExtraData[0].value -> CFF1:OWCOACHEU/S2/P1
				var cffText = data.listPnrExtraData[0].value.split(/:(.+)?/)[1];
				//cffText -> OWCOACHEU/S2/P1
				if(cffText)
					return cffText.split(/\/(.+)?/)[0];
			}

		}
		return null;
	};

};


//CREATE THE OBJECT.
//As parameter, you must put all the generic libraries that must be loaded.
var implibdx = implibdx || {};
implibdx.custom = new IMPLibDxCustomFI(["./files/IMPLibDxCore.js", "./files/IMPLibDxAtc.js", "./files/IMPLibDxAaas.js", "./files/IMPLibDxPlusGrade.js"]);