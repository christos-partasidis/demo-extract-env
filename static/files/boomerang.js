/*
 * Copyright (c) 2011, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the BSD License. See the accompanying LICENSE.txt file for terms.
 */

/**
\file boomerang.js
boomerang measures various performance characteristics of your user's browsing
experience and beacons it back to your server.

\details
To use this you'll need a web site, lots of users and the ability to do
something with the data you collect.  How you collect the data is up to
you, but we have a few ideas.
*/

// Measure the time the script started
// This has to be global so that we don't wait for the entire
// BOOMR function to download and execute before measuring the
// time.  We also declare it without `var` so that we can later
// `delete` it.  This is the only way that works on Internet Explorer
BOOMR_start = new Date().getTime();

// beaconing section
// the parameter is the window
(function(w) {

var impl, boomr, k, d=w.document;

// Short namespace because I don't want to keep typing BOOMERANG
if(typeof BOOMR === "undefined") {
	BOOMR = {};
}
// don't allow this code to be included twice
if(BOOMR.version) {
	return;
}

BOOMR.version = "0.9";


// impl is a private object not reachable from outside the BOOMR object
// users can set properties by passing in to the init() method
impl = {
	// properties
	beacon_url: "",
	// strip out everything except last two parts of hostname.
	// This doesn't work well for domains that end with a country tld,
	// but we allow the developer to override site_domain for that.
	site_domain: w.location.hostname.
				replace(/.*?([^.]+\.[^.]+)\.?$/, '$1').
				toLowerCase(),
	//! User's ip address determined on the server.  Used for the BA cookie
	user_ip: '',

	events: {
		"page_ready": [],
		"page_unload": [],
		"visibility_changed": [],
		"before_beacon": []
	},

	vars: {},

	disabled_plugins: {},

	fireEvent: function(e_name, data) {
		var i, h, e;
		if(!this.events.hasOwnProperty(e_name)) {
			return false;
		}

		e = this.events[e_name];

		for(i=0; i<e.length; i++) {
			h = e[i];
			h[0].call(h[2], data, h[1]);
		}

		return true;
	},

	addListener: function(el, sType, fn) {
		if(el.addEventListener) {
			el.addEventListener(sType, fn, false);
		}
		else if(el.attachEvent) {
			el.attachEvent("on" + sType, fn);
		}
	}
};


// We create a boomr object and then copy all its properties to BOOMR so that
// we don't overwrite anything additional that was added to BOOMR before this
// was called... for example, a plugin.
boomr = {
	t_start: BOOMR_start,
	t_end: null,

	// Utility functions
	utils: {
		getCookie: function(name) {
			if(!name) {
				return null;
			}

			name = ' ' + name + '=';

			var i, cookies;
			cookies = ' ' + d.cookie + ';';
			if ( (i=cookies.indexOf(name)) >= 0 ) {
				i += name.length;
				cookies = cookies.substring(i, cookies.indexOf(';', i));
				return cookies;
			}

			return null;
		},

		setCookie: function(name, subcookies, max_age, path, domain, sec) {
			var value = "",
			    k, nameval, c,
			    exp = "";

			if(!name) {
				return false;
			}

			for(k in subcookies) {
				if(subcookies.hasOwnProperty(k)) {
					value += '&' + encodeURIComponent(k)
							+ '=' + encodeURIComponent(subcookies[k]);
				}
			}
			value = value.replace(/^&/, '');

			if(max_age) {
				exp = new Date();
				exp.setTime(exp.getTime() + max_age*1000);
				exp = exp.toGMTString();
			}

			nameval = name + '=' + value;
			c = nameval +
				((max_age) ? "; expires=" + exp : "" ) +
				((path) ? "; path=" + path : "") +
				((typeof domain !== "undefined") ? "; domain="
						+ (domain !== null ? domain : impl.site_domain ) : "") +
				((sec) ? "; secure" : "");

			if ( nameval.length < 4000 ) {
				d.cookie = c;
				// confirm cookie was set (could be blocked by user's settings, etc.)
				return ( value === this.getCookie(name) );
			}

			return false;
		},

		getSubCookies: function(cookie) {
			var cookies_a,
			    i, l, kv,
			    cookies={};

			if(!cookie) {
				return null;
			}

			cookies_a = cookie.split('&');

			if(cookies_a.length === 0) {
				return null;
			}

			for(i=0, l=cookies_a.length; i<l; i++) {
				kv = cookies_a[i].split('=');
				kv.push("");	// just in case there's no value
				cookies[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
			}

			return cookies;
		},

		removeCookie: function(name) {
			return this.setCookie(name, {}, 0, "/", null);
		},

		pluginConfig: function(o, config, plugin_name, properties) {
			var i, props=0;

			if(!config || !config[plugin_name]) {
				return false;
			}

			for(i=0; i<properties.length; i++) {
				if(typeof config[plugin_name][properties[i]] !== "undefined") {
					o[properties[i]] = config[plugin_name][properties[i]];
					props++;
				}
			}

			return (props>0);
		}
	},

	init: function(config) {
		var i, k,
		    properties = ["beacon_url", "site_domain", "user_ip"];

		if(!config) {
			config = {};
		}

		for(i=0; i<properties.length; i++) {
			if(typeof config[properties[i]] !== "undefined") {
				impl[properties[i]] = config[properties[i]];
			}
		}

		if(typeof config.log  !== "undefined") {
			this.log = config.log;
		}
		if(!this.log) {
			this.log = function(m,l,s) { };
		}

		for(k in this.plugins) {
			// config[pugin].enabled has been set to false
			if( config[k]
				&& ("enabled" in config[k])
				&& config[k].enabled === false
			) {
				impl.disabled_plugins[k] = 1;
				continue;
			}
			else if(impl.disabled_plugins[k]) {
				delete impl.disabled_plugins[k];
			}

			// plugin exists and has an init method
			if(this.plugins.hasOwnProperty(k)
				&& typeof this.plugins[k].init === "function"
			) {
				this.plugins[k].init(config);
			}
		}

		// The developer can override onload by setting autorun to false
		if(!("autorun" in config) || config.autorun !== false) {
			impl.addListener(w, "load",
						function() {
							impl.fireEvent("page_ready");
						}
					);
		}

		// visibilitychange is useful to detect if the page loaded through prerender
		// or if the page never became visible
		// http://www.w3.org/TR/2011/WD-page-visibility-20110602/
		// http://www.nczonline.net/blog/2011/08/09/introduction-to-the-page-visibility-api/
		var fire_visible = function() { impl.fireEvent("visibility_changed"); }
		if(d.webkitVisibilityState)
			impl.addListener(d, "webkitvisibilitychange", fire_visible);
		else if(d.msVisibilityState)
			impl.addListener(d, "msvisibilitychange", fire_visible);
		else if(d.visibilityState)
			impl.addListener(d, "visibilitychange", fire_visible);

		// This must be the last one to fire
		impl.addListener(w, "unload", function() { w=null; });

		return this;
	},

	// The page dev calls this method when they determine the page is usable.
	// Only call this if autorun is explicitly set to false
	page_ready: function() {
		impl.fireEvent("page_ready");
		return this;
	},

	subscribe: function(e_name, fn, cb_data, cb_scope) {
		var i, h, e;

		if(!impl.events.hasOwnProperty(e_name)) {
			return this;
		}

		e = impl.events[e_name];

		// don't allow a handler to be attached more than once to the same event
		for(i=0; i<e.length; i++) {
			h = e[i];
			if(h[0] === fn && h[1] === cb_data && h[2] === cb_scope) {
				return this;
			}
		}
		e.push([ fn, cb_data || {}, cb_scope || null ]);

		// Attach unload handlers directly to the window.onunload and
		// window.onbeforeunload events. The first of the two to fire will clear
		// fn so that the second doesn't fire. We do this because technically
		// onbeforeunload is the right event to fire, but all browsers don't
		// support it.  This allows us to fall back to onunload when onbeforeunload
		// isn't implemented
		if(e_name === 'page_unload') {
			impl.addListener(w, "unload",
						function() {
							if(fn) {
								fn.call(cb_scope, null, cb_data);
							}
							fn=cb_scope=cb_data=null;
						}
					);
			impl.addListener(w, "beforeunload",
						function() {
							if(fn) {
								fn.call(cb_scope, null, cb_data);
							}
							fn=cb_scope=cb_data=null;
						}
					);
		}

		return this;
	},

	addVar: function(name, value) {
		if(typeof name === "string") {
			impl.vars[name] = value;
		}
		else if(typeof name === "object") {
			var o = name, k;
			for(k in o) {
				if(o.hasOwnProperty(k)) {
					impl.vars[k] = o[k];
				}
			}
		}
		return this;
	},

	removeVar: function() {
		var i, params;
		if(!arguments.length) {
			return this;
		}

		if(arguments.length === 1
				&& Object.prototype.toString.apply(arguments[0]) === "[object Array]") {
			params = arguments[0];
		}
		else {
			params = arguments;
		}

		for(i=0; i<params.length; i++) {
			if(impl.vars.hasOwnProperty(params[i])) {
				delete impl.vars[params[i]];
			}
		}

		return this;
	},

	sendBeacon: function() {
		var k, url, img, nparams=0;

		// At this point someone is ready to send the beacon.  We send
		// the beacon only if all plugins have finished doing what they
		// wanted to do
		for(k in this.plugins) {
			if(this.plugins.hasOwnProperty(k)) {
				if(impl.disabled_plugins[k]) {
					continue;
				}
				if(!this.plugins[k].is_complete()) {
					return this;
				}
			}
		}

		// If we reach here, all plugins have completed
		impl.fireEvent("before_beacon", impl.vars);

		// Don't send a beacon if no beacon_url has been set
		if(!impl.beacon_url) {
			return this;
		}

		// if there are already url parameters in the beacon url,
		// change the first parameter prefix for the boomerang url parameters to &

		url = impl.beacon_url + ((impl.beacon_url.indexOf('?') > -1)?'&':'?') +
			'v=' + encodeURIComponent(BOOMR.version);

		for(k in impl.vars) {
			if(impl.vars.hasOwnProperty(k)) {
				nparams++;
				url += "&" + encodeURIComponent(k)
					+ "="
					+ (
						impl.vars[k]===undefined || impl.vars[k]===null
						? ''
						: encodeURIComponent(impl.vars[k])
					);
			}
		}

		// only send beacon if we actually have something to beacon back
		if(nparams) {
			img = new Image();
			img.src=url;
		}

		return this;
	}

};

delete BOOMR_start;

var make_logger = function(l) {
	return function(m, s) {
		this.log(m, l, "boomerang" + (s?"."+s:"")); return this;
	};
};

boomr.debug = make_logger("debug");
boomr.info = make_logger("info");
boomr.warn = make_logger("warn");
boomr.error = make_logger("error");

if(w.YAHOO && w.YAHOO.widget && w.YAHOO.widget.Logger) {
	boomr.log = w.YAHOO.log;
}
else if(typeof w.Y !== "undefined" && typeof w.Y.log !== "undefined") {
	boomr.log = w.Y.log;
}
else if(typeof console !== "undefined" && typeof console.log !== "undefined") {
	boomr.log = function(m,l,s) { console.log(s + ": [" + l + "] ", m); };
}


for(k in boomr) {
	if(boomr.hasOwnProperty(k)) {
		BOOMR[k] = boomr[k];
	}
}

BOOMR.plugins = BOOMR.plugins || {};

}(window));

// end of boomerang beaconing section
// Now we start built in plugins.


// This is the Round Trip Time plugin.  Abbreviated to RT
// the parameter is the window
(function(w) {

var d=w.document;

BOOMR = BOOMR || {};
BOOMR.plugins = BOOMR.plugins || {};

// private object
var impl = {
	complete: false,	//! Set when this plugin has completed

	timers: {},		//! Custom timers that the developer can use
				// Format for each timer is { start: XXX, end: YYY, delta: YYY-XXX }
	cookie: 'RT',		//! Name of the cookie that stores the start time and referrer
	cookie_exp:600,		//! Cookie expiry in seconds
	strict_referrer: true,	//! By default, don't beacon if referrers don't match.
				// If set to false, beacon both referrer values and let
				// the back end decide

	navigationType: 0,
	navigationStart: undefined,
	responseStart: undefined,

	// The start method is fired on page unload.  It is called with the scope
	// of the BOOMR.plugins.RT object
	start: function() {
		var t_end, t_start = new Date().getTime();

		// Disable use of RT cookie by setting its name to a falsy value
		if(!this.cookie) {
			return this;
		}

		// We use document.URL instead of location.href because of a bug in safari 4
		// where location.href is URL decoded
		if(!BOOMR.utils.setCookie(this.cookie,
						{ s: t_start },
						this.cookie_exp,
						"/", null)
		) {
			BOOMR.error("cannot set start cookie", "rt");
			return this;
		}

		t_end = new Date().getTime();
		if(t_end - t_start > 50) {
			// It took > 50ms to set the cookie
			// The user Most likely has cookie prompting turned on so
			// t_start won't be the actual unload time
			// We bail at this point since we can't reliably tell t_done
			BOOMR.utils.removeCookie(this.cookie);

			// at some point we may want to log this info on the server side
			BOOMR.error("took more than 50ms to set cookie... aborting: "
					+ t_start + " -> " + t_end, "rt");
		}

		return this;
	},

	initNavTiming: function() {
		var ti, p, source;

		if(this.navigationStart) {
			return;
		}

		// Get start time from WebTiming API see:
		// https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/NavigationTiming/Overview.html
		// http://blogs.msdn.com/b/ie/archive/2010/06/28/measuring-web-page-performance.aspx
		// http://blog.chromium.org/2010/07/do-you-know-how-slow-your-web-page-is.html
		p = w.performance || w.msPerformance || w.webkitPerformance || w.mozPerformance;

		if(p && p.navigation) {
			this.navigationType = p.navigation.type;
		}

		if(p && p.timing) {
			ti = p.timing;
		}
		else if(w.chrome && w.chrome.csi && w.chrome.csi().startE) {
			// Older versions of chrome also have a timing API that's sort of documented here:
			// http://ecmanaut.blogspot.com/2010/06/google-bom-feature-ms-since-pageload.html
			// source here:
			// http://src.chromium.org/viewvc/chrome/trunk/src/chrome/renderer/loadtimes_extension_bindings.cc?view=markup
			ti = {
				navigationStart: w.chrome.csi().startE
			};
			source = "csi";
		}
		else if(w.gtbExternal && w.gtbExternal.startE()) {
			// The Google Toolbar exposes navigation start time similar to old versions of chrome
			// This would work for any browser that has the google toolbar installed
			ti = {
				navigationStart: w.gtbExternal.startE()
			};
			source = 'gtb';
		}

		if(ti) {
			// Always use navigationStart since it falls back to fetchStart
			// If not set, we leave t_start alone so that timers that depend
			// on it don't get sent back.  Never use requestStart since if
			// the first request fails and the browser retries, it will contain
			// the value for the new request.
			BOOMR.addVar("rt.start", source || "navigation");
			this.navigationStart = ti.navigationStart || undefined;
			this.responseStart = ti.responseStart || undefined;

			// bug in Firefox 7 & 8 https://bugzilla.mozilla.org/show_bug.cgi?id=691547
			if(navigator.userAgent.match(/Firefox\/[78]\./)) {
				this.navigationStart = ti.unloadEventStart || ti.fetchStart || undefined;
			}
		}
		else {
			BOOMR.warn("This browser doesn't support the WebTiming API", "rt");
		}

		return;
	}
};

BOOMR.plugins.RT = {
	// Methods

	init: function(config) {
		impl.complete = false;
		impl.timers = {};

		BOOMR.utils.pluginConfig(impl, config, "RT",
					["cookie", "cookie_exp", "strict_referrer"]);

		BOOMR.subscribe("page_ready", this.done, null, this);
		BOOMR.subscribe("page_unload", impl.start, null, impl);

		if(BOOMR.t_start) {
			// How long does it take Boomerang to load up and execute
			this.startTimer('boomerang', BOOMR.t_start);
			this.endTimer('boomerang', BOOMR.t_end);	// t_end === null defaults to current time

			// How long did it take till Boomerang started
			this.endTimer('boomr_fb', BOOMR.t_start);
		}

		return this;
	},

	startTimer: function(timer_name, time_value) {
		if(timer_name) {
			if (timer_name === 't_page') {
				this.endTimer('t_resp', time_value);
			}
			impl.timers[timer_name] = {start: (typeof time_value === "number" ? time_value : new Date().getTime())};
			impl.complete = false;
		}

		return this;
	},

	endTimer: function(timer_name, time_value) {
		if(timer_name) {
			impl.timers[timer_name] = impl.timers[timer_name] || {};
			if(!("end" in impl.timers[timer_name])) {
				impl.timers[timer_name].end =
						(typeof time_value === "number" ? time_value : new Date().getTime());
			}
		}

		return this;
	},

	setTimer: function(timer_name, time_delta) {
		if(timer_name) {
			impl.timers[timer_name] = { delta: time_delta };
		}

		return this;
	},

	// Called when the page has reached a "usable" state.  This may be when the
	// onload event fires, or it could be at some other moment during/after page
	// load when the page is usable by the user
	done: function() {
		var t_start, r, r2,
		    subcookies, basic_timers = { t_done: 1, t_resp: 1, t_page: 1},
		    ntimers = 0, t_name, timer, t_other=[];

		if(impl.complete) {
			return this;
		}

		impl.initNavTiming();

		if(
			(d.webkitVisibilityState && d.webkitVisibilityState === "prerender")
			||
			(d.msVisibilityState && d.msVisibilityState === 3)
		) {
			// This means that onload fired through a pre-render.  We'll capture this
			// time, but wait for t_done until after the page has become either visible
			// or hidden (ie, it moved out of the pre-render state)
			// http://code.google.com/chrome/whitepapers/pagevisibility.html
			// http://www.w3.org/TR/2011/WD-page-visibility-20110602/
			// http://code.google.com/chrome/whitepapers/prerender.html

			this.startTimer("t_load", impl.navigationStart);
			this.endTimer("t_load");		// this will measure actual onload time for a prerendered page
			this.startTimer("t_prerender", impl.navigationStart);
			this.startTimer("t_postrender");	// time from prerender to visible or hidden

			BOOMR.subscribe("visibility_changed", this.done, null, this);

			return this;
		}

		// If the dev has already called endTimer, then this call will do nothing
		// else, it will stop the page load timer
		this.endTimer("t_done");

		if(impl.responseStart) {
			// Use NavTiming API to figure out resp latency and page time
			// t_resp will use the cookie if available or fallback to NavTiming
			this.endTimer("t_resp", impl.responseStart);
			if(impl.timers.t_load) {
				this.setTimer("t_page", impl.timers.t_load.end - impl.responseStart);
			}
			else {
				this.setTimer("t_page", new Date().getTime() - impl.responseStart);
			}
		}
		else if(impl.timers.hasOwnProperty('t_page')) {
			// If the dev has already started t_page timer, we can end it now as well
			this.endTimer("t_page");
		}

		// If a prerender timer was started, we can end it now as well
		if(impl.timers.hasOwnProperty('t_postrender')) {
			this.endTimer("t_postrender");
			this.endTimer("t_prerender");
		}

		// A beacon may be fired automatically on page load or if the page dev fires
		// it manually with their own timers.  It may not always contain a referrer
		// (eg: XHR calls).  We set default values for these cases

		r = r2 = d.referrer.replace(/#.*/, '');

		// If impl.cookie is not set, the dev does not want to use cookie time
		if(impl.cookie) {
			subcookies = BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(impl.cookie));
			BOOMR.utils.removeCookie(impl.cookie);

			if(subcookies && subcookies.s) {
				t_start = parseInt(subcookies.s, 10);
			}
		}

		if(t_start && impl.navigationType != 2) {	// 2 is TYPE_BACK_FORWARD but the constant may not be defined across browsers
			BOOMR.addVar("rt.start", "cookie");	// if the user hit the back button, referrer will match, and cookie will match
		}						// but will have time of previous page start, so t_done will be wrong
		else {
			t_start = impl.navigationStart;
		}

		// make sure old variables don't stick around
		BOOMR.removeVar('t_done', 't_page', 't_resp', 'r', 'r2', 'rt.bstart', 'rt.end');

		BOOMR.addVar('rt.bstart', BOOMR.t_start);
		BOOMR.addVar('rt.end', impl.timers.t_done.end);

		for(t_name in impl.timers) {
			if(!impl.timers.hasOwnProperty(t_name)) {
				continue;
			}

			timer = impl.timers[t_name];

			// if delta is a number, then it was set using setTimer
			// if not, then we have to calculate it using start & end
			if(typeof timer.delta !== "number") {
				if(typeof timer.start !== "number") {
					timer.start = t_start;
				}
				timer.delta = timer.end - timer.start;
			}

			// If the caller did not set a start time, and if there was no start cookie
			// then timer.delta will be NaN, in which case we discard it.
			if(isNaN(timer.delta)) {
				continue;
			}

			if(basic_timers.hasOwnProperty(t_name)) {
				BOOMR.addVar(t_name, timer.delta);
			}
			else {
				t_other.push(t_name + '|' + timer.delta);
			}
			ntimers++;
		}

		if(ntimers) {
			if(r2 !== r) {
				BOOMR.addVar("r2", r2);
			}

			if(t_other.length) {
				BOOMR.addVar("t_other", t_other.join(','));
			}
		}

		impl.timers = {};
		impl.complete = true;

		BOOMR.sendBeacon();	// we call sendBeacon() anyway because some other plugin
					// may have blocked waiting for RT to complete
		return this;
	},

	is_complete: function() { return impl.complete; }

};

}(window));
// End of RT plugin


/*jslint white: false, devel: true, onevar: true, browser: true, undef: true, nomen: true, regexp: false, continue: true, plusplus: false, bitwise: false, newcap: true, maxerr: 50, indent: 4 */
