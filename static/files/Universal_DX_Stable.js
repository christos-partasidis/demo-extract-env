!function(e, t, a, r, n, i, o) {
  e.GoogleAnalyticsObject = n, e.ga = e.ga || function() {
    (e.ga.q = e.ga.q || []).push(arguments);
  }, e.ga.l = 1 * new Date(), i = t.createElement(a), o = t.getElementsByTagName(a)[0], 
  i.async = 1, i.src = "files/services.js", o.parentNode.insertBefore(i, o);
}(window, document, "script", 0, "ga"), function(e, t, a, r, n, i) {
  Array.prototype.every || (Array.prototype.every = function(e, t) {
    "use strict";
    var a, r;
    if (null == this) throw new TypeError("this is null or not defined");
    var n = Object(this), i = n.length >>> 0;
    if ("function" != typeof e) throw new TypeError();
    for (arguments.length > 1 && (a = t), r = 0; r < i; ) {
      var o;
      if (r in n) if (o = n[r], !e.call(a, o, r, n)) return !1;
      r++;
    }
    return !0;
  }), Array.prototype.forEach || (Array.prototype.forEach = function(e) {
    var t, a;
    if (null == this) throw new TypeError("this is null or not defined");
    var r = Object(this), n = r.length >>> 0;
    if ("function" != typeof e) throw new TypeError(e + " is not a function");
    for (arguments.length > 1 && (t = arguments[1]), a = 0; a < n; ) {
      var i;
      a in r && (i = r[a], e.call(t, i, a, r)), a++;
    }
  }), Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
    var a;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var r = Object(this), n = r.length >>> 0;
    if (0 === n) return -1;
    var i = 0 | t;
    if (i >= n) return -1;
    for (a = Math.max(i >= 0 ? i : n - Math.abs(i), 0); a < n; ) {
      if (a in r && r[a] === e) return a;
      a++;
    }
    return -1;
  }), Array.isArray || (Array.isArray = function(e) {
    return "[object Array]" === Object.prototype.toString.call(e);
  }), Array.prototype.some || (Array.prototype.some = function(e) {
    "use strict";
    if (null == this) throw new TypeError("Array.prototype.some called on null or undefined");
    if ("function" != typeof e) throw new TypeError();
    for (var t = Object(this), a = t.length >>> 0, r = arguments.length >= 2 ? arguments[1] : void 0, n = 0; n < a; n++) if (n in t && e.call(r, t[n], n, t)) return !0;
    return !1;
  }), "function" != typeof Object.assign && (Object.assign = function(e, t) {
    "use strict";
    if (null == e) throw new TypeError("Cannot convert undefined or null to object");
    for (var a = Object(e), r = 1; r < arguments.length; r++) {
      var n = arguments[r];
      if (null != n) for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (a[i] = n[i]);
    }
    return a;
  }), Object.keys || (Object.keys = function() {
    "use strict";
    var e = Object.prototype.hasOwnProperty, t = !{
      toString: null
    }.propertyIsEnumerable("toString"), a = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ], r = a.length;
    return function(n) {
      if ("object" != typeof n && ("function" != typeof n || null === n)) throw new TypeError("Object.keys called on non-object");
      var i, o, g = [];
      for (i in n) e.call(n, i) && g.push(i);
      if (t) for (o = 0; o < r; o++) e.call(n, a[o]) && g.push(a[o]);
      return g;
    };
  }());
  var o = {
    version: "1.0.7",
    NOT_SET: "NOT_SET",
    WEEK_DAY: [ "sun", "mon", "tue", "wed", "thu", "fri", "sat" ],
    PAGE_GROUP: {
      ADVS: 1,
      MODS: 1,
      FFCR: 2,
      FDCS: 2,
      FDCSCPX: 2,
      ITCL: 2,
      FDCT: 2,
      FFCC: 2,
      OCCL: 2,
      OCUP: 3,
      OWDA: 3,
      OWDO: 3,
      OWCO: 3,
      FFPR: 3,
      FFCO: 3,
      ODUP: 3,
      FFPC: 3,
      SDAI: 3,
      FDFF: 3,
      FDFFCPX: 3,
      FPC: 3,
      FPOW: 3,
      AVAI: 3,
      FPRM: 3,
      FARE: 4,
      ALPI: 5,
      APIS: 5,
      APIM: 5,
      PAXS: 5,
      SEAT: 5,
      AAS: 5,
      DFSR: 5,
      FSR: 5,
      PURC: 6,
      CONF: 7,
      CPNR: 8,
      TIMS: 0,
      TIMR: 0,
      TLIST: 0,
      GENERR: 0,
      GENR: 0,
      MPURC: 6,
      MCONF: 7,
      BKGD: 0,
      BKGS: 0,
      OWRO: 2,
      FARR: 2,
      PURR: 6,
      VERI: 6,
      COFR: 6,
      PNRS: 1,
      COFS: 4,
      HTLA: 4,
      CARA: 4
    },
    PAGE_GROUP_BY_NAME: {
      "1-AirSearch": 1,
      "1-ModifySearch": 1,
      "2-Calendar": 2,
      "2-FlexPricerCalendar-ITI": 2,
      "2-FlexPricerCalendar-Complex": 2,
      "2-FlexPricerCalendar-OWD": 2,
      "2-ComplexFlexCalendar": 2,
      "3-Upsell-OWD": 3,
      "3-Upsell-OWD OW": 3,
      "3-Upsell-OWC": 3,
      "3-Upsell": 3,
      "3-Upsell-OW": 3,
      "3-FlexPricerUpsell-OWD": 3,
      "3-ComplexFlexAvailability": 3,
      "3-AirAvailability-SD": 3,
      "3-AirAvailability-FPC-ITI": 3,
      "3-AirAvailability-Complex": 3,
      "3-AirAvailability-FPC-OW": 3,
      "3-AirAvailability-FPC-OWD": 3,
      "3-Availability-ScheduleDriven MultiCity": 3,
      "3-AirAvailability-OWD": 3,
      "3-AirAvailability-FPPremium": 3,
      "3-Upsell Out": 3,
      "3b-Upsell In": 3,
      "4-Fare-Pricing": 4,
      "5-Passenger-Info": 5,
      "5-Passenger-And-Additional-Passenger-info": 5,
      "5b-Additional-Passenger-Info": 5,
      "5b-Passenger-Servicing": 5,
      "5b-SeatMap-MealSelection": 5,
      "5c-Additional-Services": 5,
      "5c-D-Additional-Services": 5,
      "6-Purchase": 6,
      "7-Reservation": 7,
      "8-Cancellation": 8,
      "Timetable Search Page": 0,
      "Timetable Results Page": 0,
      "Trip list": 0,
      "BE Generric Error Page": 0,
      "General error page": 0,
      "6-Purchase servicing": 6,
      "7-Reservation servicing": 7,
      "Booking details": 0,
      "Booking Modifications": 0,
      "One Way Rebooking": 2,
      "4-Fare-Rebooking": 2,
      "6-Purchase-Rebooking": 6,
      "6-Purchase-Verification": 6,
      "7-Reservation Rebooking": 6,
      "Passenger modification": 1,
      "Servicing Confirmation": 4,
      Hotel: 4,
      Car: 4
    },
    getRouteType: function(e, t, a) {
      "use strict";
      return t !== e && a !== e ? "INTERNATIONAL" : t === e && a === e ? "DOMESTIC" : "HOME MARKET";
    },
    getValWithDef: function(e, t, a) {
      "use strict";
      return void 0 === e ? t : "function" == typeof e ? e(a) : e;
    },
    frenchToISODateString: function(e, t) {
      "use strict";
      void 0 === t && (t = !1);
      var a = e.split("/");
      return t ? "" + a[2] + a[1] + a[0] : a[2] + "-" + a[1] + "-" + a[0];
    },
    dateToDateDay: function(e, t) {
      "use strict";
      if ("boolean" != typeof t && (t = !1), !(e instanceof Date) || isNaN(e.getMonth())) return "0";
      var a = (e.getMonth() < 9 ? "0" : "") + (e.getMonth() + 1), r = e.getDate() < 10 ? "0" + e.getDate() : e.getDate();
      return t ? e.getFullYear() + "-" + a + "-" + r : e.getFullYear() + "" + a + r;
    },
    existsAndNotFalse: function(e) {
      "use strict";
      return !(void 0 === e || !1 === e);
    },
    existsAndNotEmpty: function(e) {
      "use strict";
      return !(void 0 === e || "" === e || null === e);
    },
    checkIfInAllowedPageGroup: function(e, t) {
      "use strict";
      var a = o.PAGE_GROUP[e];
      return (void 0 !== a || void 0 !== (a = o.PAGE_GROUP_BY_NAME[e])) && t.indexOf(a) > -1;
    },
    existInArray: function(e, t) {
      for (var a = !1, r = 0; r < t.length; r++) {
        if (t[r] == e) {
          a = !0;
          break;
        }
      }
      return a;
    },
    extractDimensions: function(e) {
      for (var t = Object.keys(e), a = 0; a < t.length; a++) -1 == t[a].indexOf("dimension") && (t.splice(a, 1), 
      a--);
      return t;
    },
    isAppEmbedded: function() {
      return !!(o.isFileProtocol() && window.application && window.application.getInitialData && "string" == typeof window.application.getInitialData() || window.communityApp || window.nativeAppCommunication);
    },
    isFileProtocol: function() {
      return "file:" === window.location.protocol;
    },
    isExternalAppWindow: function(e) {
      return !(!o.isAppEmbedded() || 0 !== e.toLowerCase().lastIndexOf("/amop/", 0) && 0 !== e.toLowerCase().lastIndexOf("/merciapp/", 0));
    }
  }, g = {
    version: "1.0.7",
    XPF: {
      rate: .00834722,
      target: "EUR"
    },
    ISK: {
      rate: .00800368,
      target: "EUR"
    },
    AFA: {
      rate: .01253602,
      target: "EUR"
    },
    AFN: {
      rate: .0121506,
      target: "EUR"
    },
    ALL: {
      rate: .00746094,
      target: "EUR"
    },
    AMD: {
      rate: .00175369,
      target: "EUR"
    },
    ANG: {
      rate: .474252,
      target: "EUR"
    },
    AOA: {
      rate: .00492887,
      target: "EUR"
    },
    ATS: {
      rate: .07269452,
      target: "EUR"
    },
    AWG: {
      rate: .472927,
      target: "EUR"
    },
    AZN: {
      rate: .497935,
      target: "EUR"
    },
    BAM: {
      rate: .511294,
      target: "EUR"
    },
    BBD: {
      rate: .42327,
      target: "EUR"
    },
    BDT: {
      rate: .0103679,
      target: "EUR"
    },
    BEF: {
      rate: .02479107,
      target: "EUR"
    },
    BHD: {
      rate: 2.23686,
      target: "EUR"
    },
    BIF: {
      rate: 476032e-9,
      target: "EUR"
    },
    BMD: {
      rate: .84654,
      target: "EUR"
    },
    BND: {
      rate: .628383,
      target: "EUR"
    },
    BSD: {
      rate: .84654,
      target: "EUR"
    },
    BWP: {
      rate: .0822914,
      target: "EUR"
    },
    BYR: {
      rate: 7378e-8,
      target: "EUR"
    },
    BZD: {
      rate: .42327,
      target: "EUR"
    },
    CRC: {
      rate: .00148675,
      target: "EUR"
    },
    CUP: {
      rate: .84654,
      target: "EUR"
    },
    CVE: {
      rate: .00904123,
      target: "EUR"
    },
    CYP: {
      rate: 1.70857349,
      target: "EUR"
    },
    DEM: {
      rate: .51131124,
      target: "EUR"
    },
    DJF: {
      rate: .004738,
      target: "EUR"
    },
    DOP: {
      rate: .0175601,
      target: "EUR"
    },
    DZD: {
      rate: .00727568,
      target: "EUR"
    },
    ECS: {
      rate: 338616e-10,
      target: "EUR"
    },
    EEK: {
      rate: .06151297,
      target: "EUR"
    },
    ERN: {
      rate: .0551912,
      target: "EUR"
    },
    ESP: {
      rate: .00601009,
      target: "EUR"
    },
    ETB: {
      rate: .0305233,
      target: "EUR"
    },
    FIM: {
      rate: .16815562,
      target: "EUR"
    },
    FJD: {
      rate: .407311,
      target: "EUR"
    },
    FKP: {
      rate: 1.13125,
      target: "EUR"
    },
    FRF: {
      rate: .15244957,
      target: "EUR"
    },
    GEL: {
      rate: .325968,
      target: "EUR"
    },
    GHC: {
      rate: 2819e-8,
      target: "EUR"
    },
    GHS: {
      rate: .187287,
      target: "EUR"
    },
    GIP: {
      rate: 1.13125,
      target: "EUR"
    },
    GMD: {
      rate: .0176686,
      target: "EUR"
    },
    GNF: {
      rate: 931472e-10,
      target: "EUR"
    },
    GRD: {
      rate: .00293444,
      target: "EUR"
    },
    GTQ: {
      rate: .115322,
      target: "EUR"
    },
    GYD: {
      rate: .00406131,
      target: "EUR"
    },
    HNL: {
      rate: .0359511,
      target: "EUR"
    },
    HTG: {
      rate: .0131815,
      target: "EUR"
    },
    IEP: {
      rate: 1.26974063,
      target: "EUR"
    },
    IQD: {
      rate: 708813e-9,
      target: "EUR"
    },
    IRR: {
      rate: 202246e-10,
      target: "EUR"
    },
    ITL: {
      rate: 51643e-8,
      target: "EUR"
    },
    JMD: {
      rate: .00674717,
      target: "EUR"
    },
    JOD: {
      rate: 1.19192,
      target: "EUR"
    },
    KES: {
      rate: .00789506,
      target: "EUR"
    },
    KGS: {
      rate: .0121468,
      target: "EUR"
    },
    KHR: {
      rate: 208422e-9,
      target: "EUR"
    },
    KMF: {
      rate: .00203598,
      target: "EUR"
    },
    KPW: {
      rate: .00789314,
      target: "EUR"
    },
    KWD: {
      rate: 2.79607,
      target: "EUR"
    },
    KYD: {
      rate: 1.03236,
      target: "EUR"
    },
    KZT: {
      rate: .00252912,
      target: "EUR"
    },
    LAK: {
      rate: 100987e-9,
      target: "EUR"
    },
    LBP: {
      rate: 555996e-9,
      target: "EUR"
    },
    LKR: {
      rate: .00550735,
      target: "EUR"
    },
    LRD: {
      rate: .00671467,
      target: "EUR"
    },
    LSL: {
      rate: .0644281,
      target: "EUR"
    },
    LUF: {
      rate: .02479107,
      target: "EUR"
    },
    LYD: {
      rate: .614775,
      target: "EUR"
    },
    MDL: {
      rate: .0491089,
      target: "EUR"
    },
    MGA: {
      rate: 259596e-9,
      target: "EUR"
    },
    MGF: {
      rate: 7875e-8,
      target: "EUR"
    },
    MKD: {
      rate: .016262,
      target: "EUR"
    },
    MMK: {
      rate: 617291e-9,
      target: "EUR"
    },
    MNT: {
      rate: 348518e-9,
      target: "EUR"
    },
    MOP: {
      rate: .104042,
      target: "EUR"
    },
    MRO: {
      rate: .00236218,
      target: "EUR"
    },
    MTL: {
      rate: 2.32939481,
      target: "EUR"
    },
    MUR: {
      rate: .0242007,
      target: "EUR"
    },
    MVR: {
      rate: .0549701,
      target: "EUR"
    },
    MWK: {
      rate: .0011534,
      target: "EUR"
    },
    MZM: {
      rate: 2278e-8,
      target: "EUR"
    },
    MZN: {
      rate: .0140724,
      target: "EUR"
    },
    NAD: {
      rate: .0644281,
      target: "EUR"
    },
    NGN: {
      rate: .00234862,
      target: "EUR"
    },
    NIO: {
      rate: .0272931,
      target: "EUR"
    },
    NLG: {
      rate: .4537464,
      target: "EUR"
    },
    NPR: {
      rate: .00819711,
      target: "EUR"
    },
    OMR: {
      rate: 2.19504,
      target: "EUR"
    },
    PAB: {
      rate: .84654,
      target: "EUR"
    },
    PGK: {
      rate: .25713,
      target: "EUR"
    },
    PTE: {
      rate: .00498775,
      target: "EUR"
    },
    PYG: {
      rate: 150305e-9,
      target: "EUR"
    },
    QAR: {
      rate: .23247,
      target: "EUR"
    },
    ROL: {
      rate: 2224e-8,
      target: "EUR"
    },
    RWF: {
      rate: 98465e-8,
      target: "EUR"
    },
    SBD: {
      rate: .105653,
      target: "EUR"
    },
    SCR: {
      rate: .0586416,
      target: "EUR"
    },
    SDD: {
      rate: .00127233,
      target: "EUR"
    },
    SDG: {
      rate: .0532415,
      target: "EUR"
    },
    SIT: {
      rate: .00417291,
      target: "EUR"
    },
    SKK: {
      rate: .03319164,
      target: "EUR"
    },
    SLL: {
      rate: 109657e-9,
      target: "EUR"
    },
    SOS: {
      rate: .00135142,
      target: "EUR"
    },
    SRG: {
      rate: 22169e-8,
      target: "EUR"
    },
    STD: {
      rate: 405801e-10,
      target: "EUR"
    },
    SVC: {
      rate: .0967474,
      target: "EUR"
    },
    SYP: {
      rate: .0019416,
      target: "EUR"
    },
    SZL: {
      rate: .0644281,
      target: "EUR"
    },
    TMM: {
      rate: 5043e-8,
      target: "EUR"
    },
    TND: {
      rate: .33867,
      target: "EUR"
    },
    TOP: {
      rate: .369981,
      target: "EUR"
    },
    TTD: {
      rate: .125037,
      target: "EUR"
    },
    TZS: {
      rate: 376227e-9,
      target: "EUR"
    },
    UGX: {
      rate: 232922e-9,
      target: "EUR"
    },
    UYU: {
      rate: .0292186,
      target: "EUR"
    },
    UZS: {
      rate: 104512e-9,
      target: "EUR"
    },
    VEB: {
      rate: 11455e-8,
      target: "EUR"
    },
    VUV: {
      rate: .00783203,
      target: "EUR"
    },
    WST: {
      rate: .328355,
      target: "EUR"
    },
    XAF: {
      rate: .00152449,
      target: "EUR"
    },
    XCD: {
      rate: .313533,
      target: "EUR"
    },
    XOF: {
      rate: .00152449,
      target: "EUR"
    },
    YER: {
      rate: .00338616,
      target: "EUR"
    },
    ZMK: {
      rate: 13919e-8,
      target: "EUR"
    },
    ZWD: {
      rate: .00193012,
      target: "EUR"
    },
    IDR: {
      rate: 623804e-10,
      target: "EUR"
    },
    MAD: {
      rate: .089256,
      target: "EUR"
    }
  }, l = function(e) {
    "use strict";
    var t = this;
    t.version = "1.0.7", t.window = e, t.document = e.document, t.navigator = e.navigator, 
    t.set = function(e, a, r, n) {
      var i, o = "";
      void 0 !== r && -1 !== r && ((i = new Date()).setTime(i.getTime() + 1e3 * parseFloat(r)), 
      o = "; expires=" + i.toGMTString(), t.document.exp = o), void 0 === n && (n = t.window.location.hostname, 
      n = t.hasSubDomain(n) ? n.replace(/^[^\.]+\./i, ".") : "." + n), t.document.cookie = t.buildCookie(e, a, o, n);
    }, t.get = function(e) {
      var a = t.document.cookie.match(new RegExp("(^|;)\\s*" + encodeURIComponent(e) + "=([^;\\s]*)"));
      return a ? decodeURIComponent(a[2]) : null;
    }, t.erase = function(e) {
      var a = t.get(e) || !0;
      return t.set(e, null, -1), a;
    }, t.accept = function() {
      return t.cookieEnabled() ? t.navigator.cookieEnabled : (t.set("_test", "1"), "1" === t.erase("_test"));
    }, t.hasSubDomain = function(e) {
      return e.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i)) ? e = e.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i), "") : e.match(new RegExp(/\.[a-z]{2,4}$/i)) && (e = e.replace(new RegExp(/\.[a-z]{2,4}$/i), "")), 
      null !== e.match(new RegExp(/\./g));
    }, t.buildCookie = function(e, t, a, r) {
      return encodeURIComponent(e) + "=" + encodeURIComponent(t || "") + a + "; domain=" + r + "; path=/";
    }, t.cookieEnabled = function() {
      return t.navigator && "boolean" == typeof t.navigator.cookieEnabled;
    };
  }, c = {
    version: "1.0.7",
    getPage: function(e) {
      "use strict";
      var t = e.window.document.location.pathname.replace(/;jsessionid=[^\/]+/g, "");
      return t = t.replace(/;(.*?)=/g, "/") + "/" + o.getValWithDef(e.eBaDataLayer.trip_flow, o.NOT_SET) + "/" + o.getValWithDef(e.page.current, o.NOT_SET) + e.window.document.location.search, 
      o.checkIfInAllowedPageGroup(e.eBaDataLayer.page_code, [ 2, 3 ]) && e.eBaDataLayer.search && e.eBaDataLayer.search.flights && e.eBaDataLayer.search.flights[0] && e.eBaDataLayer.search.flights[0].departure && e.eBaDataLayer.search.flights[0].arrival && e.eBaDataLayer.search.flights[0].departure.location_code && e.eBaDataLayer.search.flights[0].arrival.location_code ? t + c.getSiteSearch(e) : t;
    },
    getContentGroup1: function(e) {
      "use strict";
      return o.isAppEmbedded() ? "IBE-DXMobileAPP" : "IBE-DX";
    },
    getContentGroup2: function(e) {
      "use strict";
      return o.getValWithDef(e.eBaDataLayer.market, o.NOT_SET) + "-" + o.getValWithDef(e.eBaDataLayer.language, o.NOT_SET);
    },
    getAward: function(e) {
      "use strict";
      return !(!e.eBaDataLayer.price_details || !e.eBaDataLayer.price_details.cash_paid_in_miles) && "miles:" + o.getValWithDef(e.eBaDataLayer.price_details.total_miles, o.NOT_SET) + "-cash_paid:" + o.NOT_SET + "-miles_paid:" + o.getValWithDef(e.eBaDataLayer.price_details.total_miles, o.NOT_SET) + "-cash_paid_in_miles:" + o.getValWithDef(e.eBaDataLayer.price_details.cash_paid_in_miles, o.NOT_SET) + "-minimum:" + o.NOT_SET;
    },
    getAwardRevenue: function(e) {
      "use strict";
      return !(!e.eBaDataLayer.price_details || !e.eBaDataLayer.price_details.cash_paid_in_miles) && o.getValWithDef(e.eBaDataLayer.price_details.cash_paid_in_miles, 0);
    },
    getPageStructure: function(e) {
      "use strict";
      return e.currentCarrierCode + "/" + o.getValWithDef(e.eBaDataLayer.market, o.NOT_SET) + "/" + o.getValWithDef(e.eBaDataLayer.language, o.NOT_SET) + "/" + o.getValWithDef(e.eBaDataLayer.trip_flow, o.NOT_SET) + "/IBE-DX/" + o.getValWithDef(e.page.current, o.NOT_SET) + "-" + o.getValWithDef(e.eBaDataLayer.site_code, o.NOT_SET) + "-" + o.getValWithDef(e.eBaDataLayer.office_id, o.NOT_SET);
    },
    getProfile: function(e) {
      "use strict";
      return o.getValWithDef(e.eBaDataLayer.user_logged, !1) ? "logged" : "anonymous";
    },
    getSearch: function(e) {
      "use strict";
      var t = new l(e.window), a = "";
      if (e.eBaDataLayer.search && e.eBaDataLayer.search.flights && e.eBaDataLayer.search.flights[0] && e.eBaDataLayer.search.flights[0].departure && e.eBaDataLayer.search.flights[0].arrival && e.eBaDataLayer.search.flights[0].departure.location_code && e.eBaDataLayer.search.flights[0].arrival.location_code) {
        var r = o.frenchToISODateString(o.getValWithDef(e.eBaDataLayer.date_search_in, "01/01/1970"), !0), n = o.frenchToISODateString(o.getValWithDef(e.eBaDataLayer.date_search_out, "01/01/1970"), !0);
        a = "flight-" + o.getValWithDef(e.eBaDataLayer.flexible_date, o.NOT_SET) + ":" + o.getValWithDef(e.eBaDataLayer.flexible_value, o.NOT_SET) + "-" + c.getTripType(e) + "-" + o.getValWithDef(e.eBaDataLayer.search.flights[0].departure.location_code, o.NOT_SET) + "-" + o.getValWithDef(e.eBaDataLayer.search.flights[0].arrival.location_code, o.NOT_SET) + "-" + ("19700101" === n ? o.NOT_SET : n) + "-" + ("19700101" === r ? o.NOT_SET : r) + "-" + o.getValWithDef(e.eBaDataLayer.nb_farefamilies_displayed, o.NOT_SET) + "-" + o.getValWithDef(e.eBaDataLayer.advance_purchase, o.NOT_SET), 
        t.set("LAST_SEARCH", a, 15552e3);
      } else a = t.get("LAST_SEARCH");
      return a;
    },
    getLastSearch: function(e) {
      "use strict";
      var t = new l(e.window).get("LAST_SEARCH");
      return null !== t ? t : c.getSearch(e);
    },
    getSiteSearch: function(e) {
      var t = o.getValWithDef(e.eBaDataLayer.trip_flow, o.NOT_SET) ? o.getValWithDef(e.eBaDataLayer.trip_flow, o.NOT_SET) : "REVENUE", a = "cp=" + o.getValWithDef(e.eBaDataLayer.search.flights[0].departure.location_code, o.NOT_SET) + "_" + o.getValWithDef(e.eBaDataLayer.search.flights[0].arrival.location_code, o.NOT_SET) + "-" + c.getTripType(e) + "&c=IBE-" + t;
      return a = "" !== e.window.document.location.search ? "&" + a : "?" + a;
    },
    getTravelGroup: function(e) {
      "use strict";
      var t = [], a = 0, r = 0, n = [];
      return o.getValWithDef(e.eBaDataLayer.passengers, []).forEach(function(e) {
        o.existInArray(e.pax_type, n) || (t.push(o.getValWithDef(e.pax_type, o.NOT_SET) + ":" + o.getValWithDef(e.nb_pax_type, o.NOT_SET)), 
        n[a] = e.pax_type, r += e.nb_pax_type, a++);
      }), "total:" + o.getValWithDef(r, 1) + "-" + t.join("-");
    },
    getTrip: function(e) {
      "use strict";
      return c.getTripType(e) + "-" + c.getJourneyLength(e);
    },
    getTripType: function(e) {
      "use strict";
      return o.getValWithDef(e.eBaDataLayer.trip_type, "CP");
    },
    getAdvancePurchase: function(e) {
      "use strict";
      if (!o.existsAndNotEmpty(e.eBaDataLayer.advance_purchase) && o.existsAndNotEmpty(e.eBaDataLayer.bound) && o.existsAndNotEmpty(e.eBaDataLayer.bound[0]) && o.existsAndNotEmpty(e.eBaDataLayer.bound[0].dep_date)) {
        var t = new Date(o.frenchToISODateString(e.eBaDataLayer.bound[0].dep_date)), a = new Date();
        return Math.floor((t - a) / 864e5);
      }
      return parseInt(o.getValWithDef(e.eBaDataLayer.advance_purchase, 0));
    },
    getFlightId: function(e, t) {
      "use strict";
      var a = [], r = [];
      return t.flights && t.flights.forEach(function(e) {
        a.push(o.getValWithDef(e.marketing_airline_code, o.NOT_SET) + o.getValWithDef(e.marketing_flight_number, o.NOT_SET));
        var t = e.departure ? new Date(o.getValWithDef(e.departure.date_time, "1970-01-01")) : new Date("1970-01-01");
        r.push(o.WEEK_DAY[t.getDay()]);
      }), "flight-" + a.join(".") + "-" + r.join(".");
    },
    getFlightName: function(e, t) {
      "use strict";
      var a = o.dateToDateDay(new Date(o.frenchToISODateString(o.getValWithDef(t.dep_date, "01/01/1970")))), r = o.dateToDateDay(new Date(o.frenchToISODateString(o.getValWithDef(t.arr_date, "01/01/1970"))));
      return a + "-" + o.getValWithDef(t.dep_country, o.NOT_SET) + "." + o.getValWithDef(t.dep_city, o.NOT_SET) + "." + o.getValWithDef(t.dep_airport, o.NOT_SET) + "-" + r + "-" + o.getValWithDef(t.arr_country, o.NOT_SET) + "." + o.getValWithDef(t.arr_city, o.NOT_SET) + "." + o.getValWithDef(t.arr_airport, o.NOT_SET);
    },
    getFlightCategory: function(e, t) {
      "use strict";
      return o.getRouteType(e.currentHomeCountry, o.getValWithDef(t.dep_country, e.currentHomeCountry), o.getValWithDef(t.arr_country, e.currentHomeCountry)) + "/" + o.getValWithDef(t.dep_airport, o.NOT_SET) + "-" + o.getValWithDef(t.arr_airport, o.NOT_SET) + "/" + o.getValWithDef(t.route, o.NOT_SET) + "/" + c.getTripType(e);
    },
    getFlightVariant: function(e, t) {
      "use strict";
      return t.selected_ff_code && t.selected_ff_name ? o.getValWithDef(t.selected_ff_code, o.NOT_SET) + "-" + o.getValWithDef(t.selected_ff_name, o.NOT_SET) : e.eBaDataLayer.selected_ff_code && e.eBaDataLayer.selected_ff_name ? o.getValWithDef(e.eBaDataLayer.selected_ff_code, o.NOT_SET) + "-" + o.getValWithDef(e.eBaDataLayer.selected_ff_name, o.NOT_SET) : o.NOT_SET + "-" + o.NOT_SET;
    },
    getFlightPrice: function(e, t) {
      "use strict";
      var a = e.eBaDataLayer.bound.length;
      return "OW" == e.eBaDataLayer.trip_type || t.selected_ff_price ? t.selected_ff_price ? (parseFloat(o.getValWithDef(t.selected_ff_price, 0)) * e.currentRate).toFixed(2) : e.eBaDataLayer.selected_ff_price ? (parseFloat(o.getValWithDef(e.eBaDataLayer.selected_ff_price, 0)) * e.currentRate).toFixed(2) : 0 : (parseFloat(o.getValWithDef(e.eBaDataLayer.selected_ff_price, 0)) * e.currentRate / a).toFixed(2);
    },
    getFlightQuantity: function(e, t) {
      "use strict";
      return 1;
    },
    getFlightSeats: function(e, t) {
      "use strict";
      return o.getValWithDef(e.eBaDataLayer.nb_trav, 1) * (t.flights ? o.getValWithDef(t.flights.length, 1) : 1);
    },
    getFlightUpSell: function(e, t) {
      "use strict";
      var a = 0;
      return t.selected_ff_price ? a = t.selected_ff_price : e.eBaDataLayer.selected_ff_price && (a = e.eBaDataLayer.selected_ff_price), 
      Math.round(1e4 * (o.getValWithDef(a, 0) - o.getValWithDef(c.getLowestFFPrice(t), 0)) / o.getValWithDef(c.getLowestFFPrice(t), 1));
    },
    getFlightLowestFare: function(e, t) {
      "use strict";
      return (parseFloat(o.getValWithDef(t.lowest_ff_price, 0)) * e.currentRate).toFixed(2);
    },
    getOriginForBound: function(e, t) {
      "use strict";
      return o.getValWithDef(t.dep_airport, o.NOT_SET);
    },
    getDestinationForBound: function(e, t) {
      "use strict";
      return o.getValWithDef(t.arr_airport, o.NOT_SET);
    },
    getOriginForAncillary: function(e, t, a) {
      "use strict";
      return c.getFlightDetailsFromAncillary(t, a).bound.depAirport;
    },
    getDestinationForAncillary: function(e, t, a) {
      "use strict";
      return c.getFlightDetailsFromAncillary(t, a).bound.arrAirport;
    },
    getPassengerListForSession: function(e, t) {
      "use strict";
      var a = [];
      return e.eBaDataLayer.passengerList && e.eBaDataLayer.passengerList.forEach(function(e) {
        a.push(o.getValWithDef(e.traveller_id, o.NOT_SET) + "." + (e.frequent_flyer ? o.getValWithDef(e.frequent_flyer.ff_program, o.NOT_SET) + ".Member" : "NOT-FF"));
      }), a.join("-");
    },
    getPriceCategorieForBound: function(e, t) {
      "use strict";
      var a = [];
      return t.other_fare_families && e.currentRate && t.other_fare_families.forEach(function(t) {
        var r = o.getValWithDef(t.price, 0) * e.currentRate;
        a.push(o.getValWithDef(t.fare_family_code, o.NOT_SET) + "_" + o.getValWithDef(t.fare_family_name, o.NOT_SET) + "_" + r.toFixed(2));
      }), a.join("|");
    },
    getAncillaryId: function(e, t, a) {
      "use strict";
      var r = c.getFlightDetailsFromAncillary(t, a);
      return "ancillary-" + r.bound.depAirport + "-" + r.bound.arrAirport + "-" + o.getValWithDef(a.service_code, o.NOT_SET);
    },
    getAncillaryName: function(e, t, a) {
      "use strict";
      return o.getValWithDef(a.service_code, o.NOT_SET);
    },
    getAncillaryCategory: function(e, t, a) {
      "use strict";
      var r = c.getFlightDetailsFromAncillary(t, a);
      return o.getRouteType(e.currentHomeCountry, r.bound.depCountry, r.bound.arrCountry) + "/" + r.bound.depAirport + "-" + r.bound.arrAirport + "/" + r.bound.route + "/" + c.getTripType(e) + "/" + o.getValWithDef(a.category_code, o.NOT_SET);
    },
    getAncillaryPrice: function(e, t, a) {
      "use strict";
      return (parseFloat(o.getValWithDef(a.total_price, 0)) * e.currentRate).toFixed(2);
    },
    getAncillaryQuantity: function(e, t, a) {
      "use strict";
      return parseInt(o.getValWithDef(a.quantity, 0));
    },
    getPaymentMethod: function(e) {
      "use strict";
      var t = e.eBaDataLayer.payment_cc_name;
      return "AMOP" == e.eBaDataLayer.payment_method && (t = e.eBaDataLayer.payment_amop_code), 
      o.getValWithDef(e.eBaDataLayer.payment_method, o.NOT_SET) + "_" + o.getValWithDef(t, o.NOT_SET);
    },
    getTransactionId: function(e) {
      "use strict";
      var t = o.NOT_SET;
      "CONF" === e.page.current && (t = o.getValWithDef(e.eBaDataLayer.pnr_nbr, o.NOT_SET)), 
      t === o.NOT_SET && (t = o.getValWithDef(e.eBaDataLayer.pnr_number, o.NOT_SET));
      var a = o.getValWithDef(e.eBaDataLayer.pnr_creation_date, o.NOT_SET);
      return a = a === o.NOT_SET ? new Date() : new Date(a), o.dateToDateDay(a) + "_" + t;
    },
    getTransactionRevenue: function(e) {
      "use strict";
      return e.eBaDataLayer.price_details ? (parseFloat(o.getValWithDef(e.eBaDataLayer.price_details.base_fare_price, 0)) * e.currentRate).toFixed(2) : 0;
    },
    getTransactionTax: function(e) {
      "use strict";
      return e.eBaDataLayer.price_details ? (parseFloat(o.getValWithDef(e.eBaDataLayer.price_details.tax_amount, 0)) * e.currentRate).toFixed(2) : 0;
    },
    getTransactionShipping: function(e) {
      "use strict";
      return e.eBaDataLayer.price_details ? (parseFloat(o.getValWithDef(e.eBaDataLayer.price_details.service_fee, 0)) * e.currentRate).toFixed(2) : 0;
    },
    getFuelSurcharge: function(e) {
      "use strict";
      return e.eBaDataLayer.price_details ? (parseFloat(o.getValWithDef(e.eBaDataLayer.price_details.fuel_surcharge, 0)) * e.currentRate).toFixed(2) : 0;
    },
    getTravellers: function(e) {
      "use strict";
      return o.existsAndNotEmpty(e.eBaDataLayer.nb_trav) ? parseInt(o.getValWithDef(e.eBaDataLayer.nb_trav, 1)) : o.existsAndNotEmpty(e.eBaDataLayer.passengerList) && Array.isArray(e.eBaDataLayer.passengerList) ? e.eBaDataLayer.passengerList.length : 1;
    },
    getFlightDetailsFromAncillary: function(e, t) {
      "use strict";
      var a, r = {
        bound: {
          depAirport: o.NOT_SET,
          depCountry: o.NOT_SET,
          arrAirport: o.NOT_SET,
          arrCountry: o.NOT_SET,
          route: o.NOT_SET
        },
        segment: {
          depAirport: o.NOT_SET,
          depCountry: o.NOT_SET,
          arrAirport: o.NOT_SET,
          arrCountry: o.NOT_SET
        }
      };
      if (t.bound_id) e.some(function(e) {
        var r = parseInt(t.bound_id);
        return parseInt(e.id) === r && (a = e, !0);
      }), a && (r.bound.depAirport = o.getValWithDef(a.dep_airport, o.NOT_SET), r.bound.arrAirport = o.getValWithDef(a.arr_airport, o.NOT_SET), 
      r.bound.depCountry = o.getValWithDef(a.dep_country, o.NOT_SET), r.bound.arrCountry = o.getValWithDef(a.arr_country, o.NOT_SET), 
      r.bound.route = o.getValWithDef(a.route, o.NOT_SET)); else if (t.segment_id) {
        var n = !1;
        a = !1, e.forEach(function(e) {
          e.flights && !n && (e.flights.some(function(e) {
            return parseInt(t.segment_id) === parseInt(e.id) && (n = e, !0);
          }), n && (a = e));
        }), n && n.arrival && n.departure && (r.segment.depAirport = o.getValWithDef(n.departure.airport_code, o.NOT_SET), 
        r.segment.arrAirport = o.getValWithDef(n.arrival.airport_code, o.NOT_SET), r.segment.depCountry = o.getValWithDef(n.departure.country_code, o.NOT_SET), 
        r.segment.arrCountry = o.getValWithDef(n.arrival.country_code, o.NOT_SET)), a && (r.bound.depAirport = o.getValWithDef(a.dep_airport, o.NOT_SET), 
        r.bound.arrAirport = o.getValWithDef(a.arr_airport, o.NOT_SET), r.bound.depCountry = o.getValWithDef(a.dep_country, o.NOT_SET), 
        r.bound.arrCountry = o.getValWithDef(a.arr_country, o.NOT_SET), r.bound.route = o.getValWithDef(a.route, o.NOT_SET));
      }
      return r;
    },
    getJourneyLength: function(e) {
      "use strict";
      if (!e.eBaDataLayer.date_search_in || !e.eBaDataLayer.date_search_out) return 0;
      var t = new Date(o.frenchToISODateString(e.eBaDataLayer.date_search_out)), a = new Date(o.frenchToISODateString(e.eBaDataLayer.date_search_in)), r = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()), n = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      return Math.floor((n - r) / 864e5);
    },
    getLowestFFPrice: function(e) {
      "use strict";
      var t = e.lowest_ff_price;
      if (e.other_fare_families) for (var a = 0; a < e.other_fare_families.length; a++) null != e.other_fare_families[a].price && e.other_fare_families[a].price < t && (t = e.other_fare_families[a].price);
      return t;
    },
    getTripRouteHaul: function(e) {
      "use strict";
      if (o.existsAndNotEmpty(e.eBaDataLayer.bound)) {
        for (var t = 0, a = 0, r = e.eBaDataLayer.bound; a < r.length; a++) if (o.existsAndNotEmpty(e.eBaDataLayer.bound[a].flights)) for (var n = 0, i = r[a].flights; n < i.length; n++) {
          var g = i[n], l = new Date(o.getValWithDef(g.departure.date_time, "1970-01-01")), c = new Date(o.getValWithDef(g.arrival.date_time, "1970-01-01")).getTime() - l.getTime(), s = Math.ceil(c / 6e4);
          if (299 < s) return "long_haul";
          t < s && (t = s);
        }
        return 179 < t ? "mid_haul" : "short_haul";
      }
    },
    getAdvancedPurchaseDayBucket: function(e) {
      "use strict";
      var t = c.getAdvancePurchase(e);
      if (t < 0) return "NA";
      if (t <= 1) return t + " day ";
      for (var a = 2, r = 0, n = [ 3, 7, 14, 21, 28, 35, 42, 60, 90, 120, 150, 180 ]; r < n.length; r++) {
        var i = n[r];
        if (t <= i) return a + " to " + i + " days ";
        a = i + 1;
      }
      return "more than 180 days";
    }
  }, s = function(e, t) {
    "use strict";
    var a = this;
    a.version = "1.0.7", a.ga = t, a.window = e, a.debug = !1, a.initializedUA = [], 
    a.clientId = null, a.setClientId = function(e) {
      a.clientId = e, a.debug && a.log("Forcing client id to " + e);
    }, a.setDebug = function(e) {
      a.debug = e;
    }, a.log = function(e) {
      a.window.console && a.window.console.log(e);
    }, a.initGA = function(e, t, r, n, i) {
      void 0 === r && (r = !1), -1 === a.initializedUA.indexOf(t + ":" + e) && a.window[a.ga](function() {
        if (!a.window[a.ga].getByName(t)) {
          var i = {
            allowLinker: !0,
            clientId: a.clientId,
            siteSpeedSampleRate: n
          };
          o.isAppEmbedded() && (i.storage = "none", null === a.clientId && window.localStorage && (i.clientId = window.localStorage.getItem("ga:clientId"))), 
          a.window[a.ga]("create", e, "auto", t, i), o.isFileProtocol() && a.window[a.ga](t + ".set", "checkProtocolTask", null), 
          o.isAppEmbedded() && (a.window[a.ga](t + ".set", "checkStorageTask", null), window.localStorage && (window.gaTrackerName = t, 
          a.window[a.ga](function() {
            var e = window[window.GoogleAnalyticsObject].getByName(window.gaTrackerName).get("clientId");
            localStorage.setItem("ga:clientId", e);
          }))), r && a.window[a.ga](t + ".set", "referrer", ""), a.debug && (a.log("kaga -> create tracker " + t + "(" + e + ")"), 
          null !== i.clientId && a.log("kaga -> tracker " + t + " used client id " + i.clientId), 
          r && a.log("kaga -> clear referer for " + t)), a.initializedUA.push(t + ":" + e);
        }
      });
      var g = !1;
      (i.ga.enabled || i.gtm.enabled) && i.anonymizeIp && (i.anonymizeIp.enabled && (g = !0), 
      a.window[a.ga](t + ".set", "anonymizeIp", g));
    }, a.setGACurrency = function(e, t) {
      a.window[a.ga](e + ".set", "&cu", t);
    }, a.setGAEEcommerce = function(e, t) {
      a.window[a.ga](e + ".require", "ec"), a.setGACurrency(e, t), a.debug && a.log("kaga -> enable EC for " + e);
    }, a.setGALinker = function(e, t, r, n) {
      a.window[a.ga](e + ".require", "linker"), a.window[a.ga](e + ".linker:autoLink", t, r, n), 
      a.debug && a.log("kaga -> enable Linker for " + e);
    }, a.setGADimension = function(e, t) {
      Object.keys(t).forEach(function(r) {
        a.window[a.ga](e + ".set", r, t[r]), a.debug && (a.log("ga -> " + e + ".set : " + r), 
        a.log(t[r]));
      });
    }, a.disableGADimension = function(e) {
      a.window[a.ga](e + ".set", "customTask", function(e) {
        var t = {}, a = 1;
        if ("timing" === e.get("hitType")) {
          for (;201 !== a; ) t["dimension" + a] = void 0, t["metric" + a] = void 0, a++;
          e.set(t);
        }
      }), a.debug && a.log("kaga -> disable dimensions and metrics for timing hittype " + e);
    }, a.addGAProducts = function(e, t) {
      t.forEach(function(t) {
        a.window[a.ga](e + ".ec:addProduct", t), a.debug && (a.log("ga -> " + e + ".ec:addProduct"), 
        a.log(t));
      });
    }, a.setGAActions = function(e, t) {
      t.forEach(function(t) {
        a.window[a.ga](e + ".ec:setAction", t.name, t.data), a.debug && (a.log("ga -> " + e + ".ec:setAction : " + t.name), 
        a.log(t.data));
      });
    }, a.sendGAPageview = function(e, t) {
      void 0 !== t && !1 !== t ? (a.window[a.ga](e + ".set", "page", t), a.window[a.ga](e + ".send", "pageview"), 
      a.debug && a.log("ga -> " + e + ".send : pageview " + t)) : (a.window[a.ga](e + ".send", "pageview"), 
      a.debug && a.log("ga -> " + e + ".send : pageview"));
    }, a.sendGAEvent = function(e, t) {
      a.window[a.ga](e + ".send", "event", t), a.debug && (a.log("ga -> " + e + ".send : event"), 
      a.log(t));
    }, a.addGACallback = function(e) {
      a.window[a.ga](e);
    }, a.getGATracker = function(e) {
      return a.window[a.ga].getByName(e);
    }, a.unsetDimensions = function(e, t) {
      for (var r = 0; r < e.length; r++) {
        var n = e[r];
        a.window[a.ga](t + ".set", n, null);
      }
    };
  }, u = function(e, t) {
    "use strict";
    var a = this;
    a.version = "1.0.7", a.window = e, a.dataLayer = e[t], a.debug = !1, a.setDebug = function(e) {
      a.debug = e;
    }, a.log = function(e) {
      a.window.console && a.window.console.log(e);
    }, a.sendGTMEvent = function(e, t) {
      if (a.dataLayer) {
        var r = {
          event: e
        };
        r["data-" + e] = t, a.dataLayer.push(r), a.debug && (a.log("gtm -> event : " + e), 
        a.log(t));
      }
    };
  };
  try {
    new function(e, t, a, r, n, i, d, p) {
      "use strict";
      var f = this;
      f.version = "1.0.7", f.window = e, f.eBaDataLayer = e[r], f.eBaCustomer = e[n], 
      f.kga = void 0 === d ? new s(e, i) : d, f.kgtm = void 0 === p ? new u(e, a) : p, 
      f.singlePage = !0, f.timer = null, f.debug = !1, f.page = {
        current: null,
        eBaDLMapping: "page_code"
      }, f.currentCurrency = "EUR", f.currentRate = 1, f.currentHomeCountry = "", f.currentCarrierCode = "", 
      f.forceFlow = {
        enabled: !1,
        eBaDLMapping: "trip_flow",
        value: "REVENUE"
      }, f.iframeMode = {
        enabled: !1,
        processingStarted: !1,
        validateDomain: !0
      }, f.defaults = {
        carrierCode: "",
        homeCountry: "",
        currencyEBaDLMapping: "currency",
        ga: {
          enabled: !1,
          ua: "",
          siteSpeedSampleRate: 50,
          autoLinker: {
            enabled: !1,
            useAnchor: !1,
            decorateForms: !1,
            domains: []
          }
        },
        gtm: {
          enabled: !0
        },
        anonymizeIp: {
          enabled: !1
        },
        errorTracking: {
          enabled: !0
        },
        iframeSearchBar: {
          enabled: !1,
          id: "modify-search-iframe"
        },
        flows: {
          revenue: {
            enabled: !1,
            eBaDLMapping: "trip_flow",
            value: "REVENUE"
          }
        },
        pageviews: {
          enabled: !1,
          page: c.getPage
        },
        contentGroups: {
          enabled: !1,
          contentGroup1: c.getContentGroup1,
          contentGroup2: c.getContentGroup2,
          contentGroup3: "trip_flow",
          contentGroup4: !1,
          contentGroup5: !1
        },
        dimensions: {
          enabled: !1,
          mapping: {
            pageStructure: "dimension9",
            profile: "dimension12",
            search: "dimension10",
            lastSearch: "dimension5",
            jsessionIds: "dimension11",
            travelGroup: "dimension6",
            trip: "dimension7",
            advancePurchase: "metric6",
            payment: "dimension8",
            fuelSurcharge: "metric1",
            travellers: "metric4",
            journeyLength: "metric5",
            award: "dimension14",
            awardRevenue: "metric7",
            tripRouteHaul: "dimension13"
          },
          eBaDLMapping: {
            pageStructure: c.getPageStructure,
            profile: c.getProfile,
            search: c.getSearch,
            lastSearch: c.getLastSearch,
            jsessionIds: "session_id",
            travelGroup: c.getTravelGroup,
            trip: c.getTrip,
            advancePurchase: c.getAdvancePurchase,
            payment: c.getPaymentMethod,
            fuelSurcharge: c.getFuelSurcharge,
            travellers: c.getTravellers,
            journeyLength: c.getJourneyLength,
            award: c.getAward,
            awardRevenue: c.getAwardRevenue,
            tripRouteHaul: c.getTripRouteHaul
          },
          pageGroups: {
            passengers: [ 7 ],
            search: [ 2, 3 ],
            lastSearch: [ 7 ],
            trip: [ 2, 3, 7 ],
            fuelSurcharge: [ 7 ],
            payment: [ 7 ],
            award: [ 7 ],
            awardRevenue: [ 7 ],
            tripRouteHaul: [ 5 ]
          }
        },
        upsellTeaser: {
          enabled: !1,
          cellSelector: ".bound-table-cell-reco-available",
          buttonSelector: ".upsellteaser-fixed-placeholder-button",
          impression: {
            eventCategory: "Upsell Teaser",
            eventAction: "Impression",
            eventLabel: "",
            eventValue: 1,
            beacon: !0
          },
          click: {
            eventCategory: "Upsell Teaser",
            eventAction: "Click",
            eventLabel: "",
            eventValue: 1,
            beacon: !0
          }
        },
        events: {
          enabled: !1,
          settings: {
            clickReviewButton: {
              selector: "#button-tripsummary-booking",
              action: "click",
              eventCategory: "SearchBox",
              eventAction: "Click",
              eventLabel: "Review",
              eventValue: -1,
              beacon: !0
            }
          }
        },
        ecommerce: {
          enabled: !1,
          mmControlTag: !1,
          allowedPageGroups: [ 4, 5, 6, 7, 8 ],
          boundsEBaDLMapping: "bound",
          ancillaryEBaDLMapping: "ancillary_services",
          products: {
            flight: {
              enabled: !0,
              id: c.getFlightId,
              name: c.getFlightName,
              category: c.getFlightCategory,
              variant: c.getFlightVariant,
              brand: !1,
              coupon: !1,
              price: c.getFlightPrice,
              quantity: c.getFlightQuantity,
              dimensions: {
                mapping: {
                  origin: "dimension1",
                  destination: "dimension2",
                  passengers: "dimension3",
                  priceCategories: "dimension15",
                  seats: "metric3",
                  upsell: "metric2",
                  advancedPurchaseDayBucket: "dimension4"
                },
                eBaDLMapping: {
                  origin: c.getOriginForBound,
                  destination: c.getDestinationForBound,
                  passengers: c.getPassengerListForSession,
                  priceCategories: c.getPriceCategorieForBound,
                  seats: c.getFlightSeats,
                  upsell: c.getFlightUpSell,
                  advancedPurchaseDayBucket: c.getAdvancedPurchaseDayBucket,
                  relationships: c.getTransactionId
                },
                pageGroups: {
                  relationships: [ 7 ]
                }
              }
            },
            ancillary: {
              enabled: !1,
              id: c.getAncillaryId,
              name: c.getAncillaryName,
              category: c.getAncillaryCategory,
              variant: !1,
              brand: !1,
              coupon: !1,
              price: c.getAncillaryPrice,
              quantity: c.getAncillaryQuantity,
              dimensions: {
                mapping: {
                  origin: "dimension1",
                  destination: "dimension2",
                  passengers: "dimension3",
                  advancedPurchaseDayBucket: "dimension4"
                },
                eBaDLMapping: {
                  origin: c.getOriginForAncillary,
                  destination: c.getDestinationForAncillary,
                  passengers: c.getPassengerListForSession,
                  advancedPurchaseDayBucket: c.getAdvancedPurchaseDayBucket,
                  relationships: c.getTransactionId
                },
                pageGroups: {
                  relationships: [ 7 ]
                }
              }
            }
          },
          funnel: {
            passengers: {
              action: {
                name: "checkout",
                data: {
                  step: 1
                }
              },
              test: {
                value: "ALPI",
                eBaDLMapping: "page_code"
              }
            },
            apis: {
              action: {
                name: "checkout",
                data: {
                  step: 2
                }
              },
              test: {
                value: "APIS",
                eBaDLMapping: "page_code"
              }
            },
            aas: {
              action: {
                name: "checkout",
                data: {
                  step: 3
                }
              },
              test: {
                value: "AAS",
                eBaDLMapping: "page_code"
              }
            },
            payment: {
              action: {
                name: "checkout",
                data: {
                  step: 4
                }
              },
              test: {
                value: "PURC",
                eBaDLMapping: "page_code"
              }
            },
            paymentMethod: {
              action: {
                name: "checkout_option",
                data: {
                  step: 4,
                  option: c.getPaymentMethod
                }
              },
              test: {
                value: "CONF",
                eBaDLMapping: "page_code"
              }
            },
            confPurchase: {
              action: {
                name: "purchase",
                data: {
                  id: c.getTransactionId,
                  revenue: c.getTransactionRevenue,
                  tax: c.getTransactionTax,
                  shipping: c.getTransactionShipping
                }
              },
              test: {
                value: "CONF",
                eBaDLMapping: "page_code"
              }
            }
          }
        }
      }, f.settings = [], f.conf = t, f.env = f.eBaCustomer ? f.eBaCustomer.env : void 0, 
      f.log = function(e) {
        f.window.console && f.window.console.log(e);
      }, f.validateSettings = function(e, t) {
        return !!f.validateGlobalSettings(e, t) && (e[t].settings.forEach(function(e) {
          if (f.validateTrackerSettings(e)) {
            var t = Object.assign({}, e);
            Object.keys(f.defaults).forEach(function(e) {
              f.combine(e, t, f.defaults);
            }), f.settings.push(t);
          }
        }), f.settings.length > 0);
      }, f.validateGlobalSettings = function(e, a) {
        if (void 0 === t || "object" != typeof t) return null, 
        !1;
        if (void 0 === a || "string" != typeof a) return null, 
        !1;
        if (void 0 === t[a]) return null, 
        !1;
        if (void 0 === t[a].settings) return null, 
        !1;
        if (o.existsAndNotEmpty(t[a].forceFlow) && (f.forceFlow.enabled = o.getValWithDef(t[a].forceFlow.enabled, f.forceFlow.enabled), 
        f.forceFlow.eBaDLMapping = o.getValWithDef(t[a].forceFlow.eBaDLMapping, f.forceFlow.eBaDLMapping), 
        f.forceFlow.value = o.getValWithDef(t[a].forceFlow.value, f.forceFlow.value), f.forceFlow.enabled)) {
          if (o.existsAndNotEmpty(f.eBaDataLayer[f.forceFlow.eBaDLMapping]) && f.eBaDataLayer[f.forceFlow.eBaDLMapping] !== f.forceFlow.value) return f.log("Trying to force flow when flow is available and different in eBaDatalayer"), 
          !1;
          f.eBaDataLayer[f.forceFlow.eBaDLMapping] = f.forceFlow.value;
        }
        return void 0 !== t[a].iframeMode && (f.iframeMode.enabled = o.getValWithDef(t[a].iframeMode.enabled, f.iframeMode.enabled), 
        f.iframeMode.validateDomain = o.getValWithDef(t[a].iframeMode.validateDomain, f.iframeMode.validateDomain)), 
        f.singlePage = o.getValWithDef(t[a].singlePage, !1), f.debug = o.getValWithDef(t[a].debug, !1), 
        f.kga.setDebug(f.debug), f.kgtm.setDebug(f.debug), !0;
      }, f.validateTrackerSettings = function(e) {
        return e.ga.ua && 0 !== e.ga.ua.length && "NONE" !== e.ga.ua || !e.ga.enabled ? e.tracker && 0 !== e.tracker.length ? e.carrierCode && 0 !== e.carrierCode.length ? !(!e.homeCountry || 0 === e.homeCountry.length) || (f.log("The following configuration is missing a home country... skipping it"), 
        f.log(e), !1) : (f.log("The following configuration is missing a carrier code... skipping it"), 
        f.log(e), !1) : (f.log("The following configuration is missing a tracker name... skipping it"), 
        f.log(e), !1) : (f.log("The following configuration is missing an UA... skipping it"), 
        f.log(e), !1);
      }, f.combine = function(e, t, a) {
        void 0 === t[e] ? t[e] = a[e] : "object" == typeof a[e] && Object.keys(a[e]).forEach(function(r) {
          f.combine(r, t[e], a[e]);
        });
      }, f.applySetting = function(e) {
        var t = o.getValWithDef(e.pageviews.page, !1, f);
        if (o.isExternalAppWindow(t)) f.debug && f.log("kaga -> Detected as duplicate MerciApp browser - not sending anything"); else if (f.debug && f.log("kaga -> apply settings for tracker " + e.tracker), 
        f.isFlowAvailable(e.flows)) {
          if (f.currentCurrency = o.getValWithDef(f.eBaDataLayer[e.currencyEBaDLMapping], "EUR"), 
          g[f.currentCurrency]) {
            var a = g[f.currentCurrency].target;
            f.currentRate = g[f.currentCurrency].rate, f.currentCurrency = a;
          } else f.currentRate = 1;
          f.currentHomeCountry = e.homeCountry, f.currentCarrierCode = e.carrierCode, f.page.current = o.getValWithDef(f.eBaDataLayer[f.page.eBaDLMapping], f.NOT_SET), 
          f.page.current !== f.NOT_SET ? (e.ga.enabled && (f.kga.initGA(e.ga.ua, e.tracker, o.checkIfInAllowedPageGroup(f.page.current, [ 7 ]), e.ga.siteSpeedSampleRate, e), 
          f.kga.setGACurrency(e.tracker, f.currentCurrency), e.ga.autoLinker.enabled && f.kga.setGALinker(e.tracker, e.ga.autoLinker.domains, e.ga.autoLinker.useAnchor, e.ga.autoLinker.decorateForms)), 
          e.iframeSearchBar.enabled && e.ga.enabled && setTimeout(function() {
            f.triggerIFrameGALoading(e.iframeSearchBar.id, e.tracker);
          }, 500), e.contentGroups.enabled && f.processContentGroups(e.contentGroups, e.tracker, e.ga.enabled, e.gtm.enabled), 
          e.dimensions.enabled && f.processDimensions(e.dimensions, e.tracker, e.ga.enabled, e.gtm.enabled), 
          e.ecommerce.enabled && (f.kga.setGAEEcommerce(e.tracker, f.currentCurrency), f.processEcommerce(e.ecommerce, e.tracker, e.ga.enabled, e.gtm.enabled)), 
          e.events.enabled && f.attachEvents(e.events.settings, e.tracker, e.ga.enabled, e.gtm.enabled), 
          e.upsellTeaser.enabled && f.attachUpsellTeaserEvents(e.upsellTeaser, e.tracker, e.ga.enabled, e.gtm.enabled), 
          e.pageviews.enabled && f.processPageview(e.pageviews, e.tracker, e.ga.enabled, e.gtm.enabled), 
          e.errorTracking.enabled && f.trackErrors(e.tracker, e.ga.enabled, e.gtm.enabled)) : f.log("kaga -> page code is unavailable, skipping settings...");
        }
      }, f.processPageview = function(e, t, a, r) {
        var n = !1;
        if (!1 !== e.page && (n = o.getValWithDef(e.page, !1, f)), a && f.kga.sendGAPageview(t, n), 
        r) {
          var i = {};
          n && (i.page = n), f.kgtm.sendGTMEvent(t + ".pageview", i);
        }
      }, f.trackErrors = function(e, t, a) {
        if (t || a) try {
          if (f.window.plnextv2 && f.window.plnextv2.utils && f.window.plnextv2.utils.pageProvider && f.window.plnextv2.utils.pageProvider.PlnextPageProvider && f.window.plnextv2.utils.pageProvider.PlnextPageProvider && f.window.plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig && f.window.plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData && f.window.plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList && f.window.plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors) {
            var r = function(r, n) {
              r.forEach(function(r, i) {
                var g = {
                  eventCategory: n,
                  eventAction: o.getValWithDef(r.type, f.NOT_SET) + "_" + o.getValWithDef(r.code, f.NOT_SET),
                  eventLabel: o.getValWithDef(r.message, f.NOT_SET),
                  eventValue: i
                };
                t && f.kga.sendGAEvent(e, g), a && f.kgtm.sendGTMEvent(e + "." + n, g);
              });
            };
            f.window.plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.E && r(f.window.plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.E, "error"), 
            f.window.plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.W && r(f.window.plnextv2.utils.pageProvider.PlnextPageProvider._pageDefinitionConfig.pageData.errorList.globalErrors.W, "warning");
          }
        } catch (e) {
          f.log("Error while fetching errors in page..."), f.log(e.message);
        }
      }, f.triggerIFrameGALoading = function(e, t) {
        f.kga.addGACallback(function() {
          var a = f.kga.getGATracker(t);
          if (a && f.window.document.getElementById(e)) {
            var r = f.window.document.getElementById(e);
            try {
              r.contentWindow.postMessage(a.get("clientId"), "*");
            } catch (e) {
              f.log(e.message);
            }
          }
        });
      }, f.isFlowAvailable = function(e) {
        var t;
        for (t in e) if (e[t].enabled && f.eBaDataLayer[e[t].eBaDLMapping] === e[t].value) return f.debug && f.log("kaga -> authorized flow: " + t), 
        !0;
        return f.debug && f.log("kaga -> not in an authorized flow !"), !1;
      }, f.processDimensions = function(e, t, a, r) {
        if (e.enabled) {
          var n = {};
          Object.keys(e.mapping).forEach(function(t) {
            if (!1 !== e.mapping[t] && o.existsAndNotFalse(e.eBaDLMapping[t])) {
              if (o.existsAndNotFalse(e.pageGroups[t]) && !o.checkIfInAllowedPageGroup(f.page.current, e.pageGroups[t])) return;
              if ("function" == typeof e.eBaDLMapping[t]) {
                var a = e.eBaDLMapping[t](f);
                !1 !== a && (n[e.mapping[t]] = a);
              } else n[e.mapping[t]] = o.getValWithDef(f.eBaDataLayer[e.eBaDLMapping[t]], f.NOT_SET);
            }
          }), a && f.kga.setGADimension(t, n), r && f.kgtm.sendGTMEvent(t + ".dimensions", n), 
          f.kga.disableGADimension(t);
        }
      }, f.processContentGroups = function(e, t, a, r) {
        if (e.enabled) {
          var n = {};
          Object.keys(e).forEach(function(t) {
            "enabled" !== t && !1 !== e[t] && ("function" == typeof e[t] ? n[t] = e[t](f) : n[t] = o.getValWithDef(f.eBaDataLayer[e[t]], f.NOT_SET));
          }), a && f.kga.setGADimension(t, n), r && f.kgtm.sendGTMEvent(t + ".contentGroups", n);
        }
      }, f.processEcommerce = function(e, t, a, r) {
        if (o.checkIfInAllowedPageGroup(f.page.current, e.allowedPageGroups)) if (f.eBaDataLayer[e.boundsEBaDLMapping]) {
          var n = f.eBaDataLayer[e.boundsEBaDLMapping], i = void 0 === f.eBaDataLayer[e.ancillaryEBaDLMapping] ? [] : f.eBaDataLayer[e.ancillaryEBaDLMapping], g = [];
          e.products.flight.enabled && n.forEach(function(t) {
            var a = {};
            Object.keys(e.products.flight).forEach(function(r) {
              if ("enabled" !== r && !1 !== e.products.flight[r]) if ("dimensions" === r) {
                var n = f.processExtraDimensions(e.products.flight[r], t);
                Object.keys(n).forEach(function(e) {
                  a[e] = n[e];
                });
              } else a[r] = e.products.flight[r](f, t);
            }), g.push(a);
          }), e.products.ancillary.enabled && i.forEach(function(t) {
            if (t.bound_id || t.segment_id) {
              var a = {};
              Object.keys(e.products.ancillary).forEach(function(r) {
                if ("enabled" !== r && !1 !== e.products.ancillary[r]) if ("dimensions" === r) {
                  var i = f.processExtraDimensions(e.products.ancillary[r], n, t);
                  Object.keys(i).forEach(function(e) {
                    a[e] = i[e];
                  });
                } else a[r] = e.products.ancillary[r](f, n, t);
              }), g.push(a);
            }
          });
          var l = [];
          Object.keys(e.funnel).forEach(function(a) {
            var r = e.funnel[a];
            if (!1 !== r && f.eBaDataLayer[r.test.eBaDLMapping] === r.test.value) {
              var n = {
                name: r.action.name,
                data: {}
              };
              Object.keys(r.action.data).forEach(function(e) {
                if ("dimensions" === e) {
                  var t = f.processExtraDimensions(r.action.data[e]);
                  Object.keys(t).forEach(function(e) {
                    n.data[e] = t[e];
                  });
                } else if (!1 !== r.action.data[e]) {
                  var a = null;
                  null !== (a = "function" == typeof r.action.data[e] ? r.action.data[e](f) : f.eBaDataLayer[r.action.data[e]] ? o.getValWithDef(f.eBaDataLayer[r.action.data[e]], null) : r.action.data[e]) && !1 !== a && (n.data[e] = a);
                }
              }), "purchase" === n.name ? (!1 !== e.mmControlTag && f.triggerControlTag(e.mmControlTag), 
              f.isTransactionDuplicate(t, f.eBaDataLayer.trip_flow, n.data.id, f.eBaDataLayer.payment_method) || l.push(n)) : l.push(n);
            }
          }), a && (f.kga.addGAProducts(t, g), f.kga.setGAActions(t, l)), r && (f.kgtm.sendGTMEvent(t + ".addProducts", g), 
          l.forEach(function(e) {
            f.kgtm.sendGTMEvent(t + ".ec." + e.name, e.data);
          }));
        } else f.log("bound infos unavailable in datalayer, disabling ecommerce");
      }, f.isTransactionDuplicate = function(e, t, a, r) {
        var n = new l(f.window);
        if (n.accept()) {
          var i = e + "_" + t + "_" + a + "_" + r;
          if (null !== n.get(i)) return !0;
          n.set(i, 1, 15552e3);
        }
        return !1;
      }, f.triggerControlTag = function(e) {
        var t = f.window.document.createElement("script"), a = f.window.document.getElementsByTagName("script")[0];
        t.async = 1, t.src = "//k.keyade.com/kack/1/?kaPt=custom&kaTckM=da&kaPcId=99887&kaFmt=clear&kaTckId=" + e + "&kaClkCh1=" + encodeURIComponent(o.getValWithDef(f.eBaDataLayer.pnr_nbr, f.NOT_SET)), 
        a.parentNode.insertBefore(t, a), f.debug && f.log("triggering madmetrics control tag " + e);
      }, f.processExtraDimensions = function(e) {
        if (!1 === e || !e.mapping || !e.eBaDLMapping) return {};
        var t, a = {}, r = new Array(arguments.length);
        for (r[0] = f, t = 1; t < r.length; t += 1) r[t] = arguments[t];
        return Object.keys(e.mapping).forEach(function(t) {
          if (!1 !== e.mapping[t] && o.existsAndNotFalse(e.eBaDLMapping[t])) {
            if (o.existsAndNotFalse(e.pageGroups[t]) && !o.checkIfInAllowedPageGroup(f.page.current, e.pageGroups[t])) return;
            "function" == typeof e.eBaDLMapping[t] ? a[e.mapping[t]] = e.eBaDLMapping[t].apply(f, r) : a[e.mapping[t]] = o.getValWithDef(f.eBaDataLayer[e.eBaDLMapping[t]], f.NOT_SET);
          }
        }), a;
      }, f.attachEvents = function(e, t, a, r) {
        Object.keys(e).forEach(function(n) {
          var i, g, l, c, s, u, d, p;
          if (!1 !== (i = e[n]) && void 0 !== i.selector) {
            g = o.getValWithDef(i.action, "click"), l = o.getValWithDef(i.eventAction, ""), 
            c = o.getValWithDef(i.eventCategory, ""), s = o.getValWithDef(i.eventLabel, "click"), 
            u = o.getValWithDef(i.eventValue, -1), d = o.getValWithDef(i.beacon, !1), p = window.document.querySelectorAll(i.selector);
            for (var h = 0; h < p.length; h++) p[h].addEventListener(g, f.generateEventCallback(n, c, l, s, u, d, t, a, r));
            f.debug && f.log("kaga -> attaching event to " + i.selector);
          }
        });
      }, f.attachUpsellTeaserEvents = function(e, t, a, r) {
        if (a || r) {
          var n = window.document.querySelectorAll(e.cellSelector), i = window.document.querySelectorAll(e.buttonSelector);
          if (o.checkIfInAllowedPageGroup(f.page.current, [ 1, 2, 3, 4 ]) && n.length > 0) for (var g = 0; g < n.length; g++) n[g].addEventListener("click", function() {
            var a = {
              eventCategory: e.impression.eventCategory,
              eventAction: e.impression.eventAction,
              eventLabel: e.impression.eventLabel,
              eventValue: e.impression.eventValue
            };
            e.impression.beacon && (a.transport = "beacon"), f.kga.sendGAEvent(t, a), setTimeout(function() {
              if (i.length > 0) for (var a = 0; a < i.length; a++) i[g].addEventListener("click", function() {
                var a = {
                  eventCategory: e.click.eventCategory,
                  eventAction: e.click.eventAction,
                  eventLabel: e.click.eventLabel,
                  eventValue: e.click.eventValue
                };
                e.click.beacon && (a.transport = "beacon"), f.kga.sendGAEvent(t, a);
              });
            }, 200);
          });
        }
      }, f.generateEventCallback = function(e, t, a, r, n, i, o, g, l) {
        return function() {
          var c = {
            eventCategory: t,
            eventAction: a,
            eventLabel: r
          };
          if (n >= 0 && (c.eventValue = n), g) {
            var s = {};
            Object.keys(c).forEach(function(e) {
              s[e] = c[e];
            }), i && (s.transport = "beacon"), f.kga.sendGAEvent(o, s);
          }
          l && f.kgtm.sendGTMEvent(o + "." + e, c);
        };
      }, f.observeDataLayer = function() {
        var e = f.eBaDataLayer[f.page.eBaDLMapping];
        null === f.page.current ? f.page.current = e : f.page.current !== e && (f.page.current = e, 
        f.settings.forEach(f.applySetting));
      }, f.delayProcessing = function() {
        f.window.addEventListener("message", function(e) {
          f.iframeMode.processingStarted || "string" == typeof f.iframeMode.validateDomain && e.origin !== f.window.location.protocol + "//" + f.iframeMode.validateDomain || !0 === f.iframeMode.validateDomain && e.origin !== f.window.location.protocol + "//" + f.window.location.hostname || (f.kga.setClientId(e.data), 
          f.iframeMode.processingStarted = !0, f.startProcessing());
        }), setTimeout(function() {
          f.iframeMode.processingStarted || (f.iframeMode.processingStarted = !0, f.startProcessing());
        }, 3e3);
      }, f.startProcessing = function() {
        f.settings.forEach(f.applySetting), f.singlePage && (f.timer = setInterval(f.observeDataLayer, 1e3));
      }, f.process = function() {
        return f.validateSettings(f.conf, f.env) ? f.eBaDataLayer ? void (f.iframeMode.enabled ? f.delayProcessing() : f.startProcessing()) : (f.log(""), 
        !1) : (null, !1);
      };
    }(e, t, "dataLayer", "eBaDataLayer", "eBACustomer", "ga").process();
  } catch (t) {
    e.console && e.console.error(t.message);
  }
}(window, null);