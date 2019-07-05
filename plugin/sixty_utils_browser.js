//判断浏览器是否支持html5   window.applicationCache

function Sixty(name) {

}

Sixty.funs = function(name) {

}
Sixty.utils = function(name) {

}

// 获得页面名称
Sixty.utils.PageName = function() {
	var sSeparator = "/";

	if(location.protocol.indexOf("file ") > -1) {
		sSeparator = "\\";
	}
	var url = document.URL;
	var ar = url.split(sSeparator);
	var FileName = ar[ar.length - 1];
	var PageName = FileName.replace(/^(.*)\..*/, "$1");
	FileName = FileName.replace(/\?.*$/, " ");

	FileName = FileName.replace(" ", "");
	return FileName;
	//return   [PageName,FileName];
}

// 获得指定querystring返回值, 空为null
Sixty.utils.QueryString = function(fieldName) {
	var urlString = document.location.search;
	if(urlString != null) {
		var typeQu = fieldName + "=";
		var urlEnd = urlString.indexOf(typeQu);
		if(urlEnd != -1) {
			var paramsUrl = urlString.substring(urlEnd + typeQu.length);
			var isEnd = paramsUrl.indexOf('&');
			if(isEnd != -1) {
				return paramsUrl.substring(0, isEnd);
			} else {
				return paramsUrl;
			}
		} else
			return null;
	} else
		return null;
}

Sixty.utils.browser = function(name) {

}

//判断访问终端
Sixty.utils.browser._baseinfo = {
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return {
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
			weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
			qq: u.match(/\sQQ/i) == " qq" //是否QQ
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

//获得浏览器完整信息
Sixty.utils.browser.getFullInfo = function() {

	var _types = Sixty.utils.browser._baseinfo.versions;
	var _core = 'unknown';
	var _equip = 'unknown';
	var _tempArr = Object.keys(_types);

	//取得内核名称
	for(var i = 0; i < 4; i++) {
		if(_types[_tempArr[i]]) _core = _tempArr[i];
	}

	//取得设备名称
	if(_types['ios'] || _types['iPhone'] || _types['iPad'] || _types['android']) {
		if(_types['iPhone'] || _types['iPad']) {
			_equip = _types['iPhone'] ? 'iPhone' : 'iPad';
		} else if(_types['android']) {
			_equip = 'android';
		} else {
			_equip = 'ios';
		}
	}

	//	组装完整json信息
	var _info = {
		core: _core,
		mobile: _types['mobile'],
		equipment: _equip,
		browser: Sixty.utils.browser.versions().type,
		version: Sixty.utils.browser.versions().version,
		language: Sixty.utils.browser._baseinfo.language,
		html5: Sixty.utils.browser.isHtml5Browser(),
		weixin: _types['weixin']
	}

	console.log(_info);
	return _info;
}

//获取浏览器类型以及版本号
Sixty.utils.browser.versions = function() {
	var Sys = {};
	var ua = navigator.userAgent.toLowerCase();
	var s;
	var _browserType, _browserVersions, _browser_data_val;

	(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1]:
		(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
		(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
		(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
		(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

	if(Sys.ie) {
		_browserType = "ie";
		_browserVersions = Sys.ie;
	}
	if(Sys.firefox) {
		_browserType = "firefox";
		_browserVersions = Sys.firefox;
	}
	if(Sys.chrome) {
		_browserType = "chrome";
		_browserVersions = Sys.chrome;
	}
	if(Sys.opera) {
		_browserType = "chrome";
		_browserVersions = Sys.opera;
	}
	if(Sys.safari) {
		_browserType = "safari";
		_browserVersions = Sys.safari;
	}

	var _browser_data_val = {
		type: _browserType,
		version: _browserVersions
	}

	return _browser_data_val;
}

//判断是否是微信
Sixty.utils.browser.isWeixin = function() {
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}

//判断是否移动端
Sixty.utils.browser.isMobileBrowser = function() {
	if(Sixty.utils.browser._baseinfo.versions.mobile || Sixty.utils.browser._baseinfo.versions.android || Sixty.utils.browser._baseinfo.versions.ios) {
		return true; //是移动端
	} else {
		return false;
	}
}

//判断是否为iPad
Sixty.utils.browser.isMobileiPadBrowser = function() {
	if(Sixty.utils.browser._baseinfo.versions.mobile && Sixty.utils.browser._baseinfo.versions.ios && Sixty.utils.browser._baseinfo.versions.iPad) {
		return true; //是移动端
	} else {
		return false;
	}
}

//判断设备，true为IOS，false为安卓
Sixty.utils.browser.isEquipment = function() {
	if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		return true; //iso
	} else if(/(Android)/i.test(navigator.userAgent)) {
		return false;
	}
}

Sixty.utils.browser.isAndroid = function() {
	var u = navigator.userAgent;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
	return isAndroid;
}

Sixty.utils.browser.isiOS = function() {
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	return isiOS;
}

//判断是否IE内核
Sixty.utils.browser.isIE = function() {
	if(Sixty.utils.browser._baseinfo.versions.trident) {
		return true;
	} else {
		return false;
	}
}

//判断是否webKit内核
Sixty.utils.browser.isWebkit = function() {
	if(Sixty.utils.browser._baseinfo.versions.webKit) {
		return true;
	} else {
		return false;
	}
}

//判断是否支持HTML5
Sixty.utils.browser.isHtml5Browser = function() {
	if(window.applicationCache) {
		return true;
	} else {
		return false;
	}
}