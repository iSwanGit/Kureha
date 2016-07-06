
function urlify(text) {
var urlRegex = /(https?:\/\/[^\s]+)/g;
	return text.replace(urlRegex, function(url) {
		//return '<a href="' + url + '" target="_blank">' + url + '</a>';
	    return '<a href="javascript:void(0)" onclick="openPopup(\'' + url + '\')">' + url + '</a>';
	})
}

function tagRemove(text) {
var regex = /(<([^>]+)>)/ig;
	return text.replace(regex, "");
}

function openExternal(href) {
	require('nw.gui').Shell.openExternal( href );
	/*if(event)
	{
		event.stopPropagation();
		event.stopImmediatePropagation();
	}*/
}
function openPopup(href) {
	/*
	var gui = require('nw.gui');
	var win = gui.Window.open (href, {
	  position: 'center',
	  width: 1000,
	  height: 800
	});*/

  var w = 1000;
  var h = 800;
  var left = (screen.width/2)-(w/2);
  var top = (screen.height/2)-(h/2);
  var win = window.open(href, 'popup');
  win.resizeTo(w, h);
  win.moveTo(left, top);

  var wind = nw.Window.get(win)
  wind.focus();
}

function openImageview(href, more) {
	if(window.popup) nw.Window.get(window.popup).close(true);
	var w = 1000;
	var h = 650;
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	window.popup = nw.Window.open('app/viewer.html?img=' + encodeURIComponent(href) + '&more=' + encodeURIComponent(more), 
	{x: left, y: top, width: w, height: h},
	function(win) {
		window.popup = win.window;
		win.id = 'popup';
	    win.focus();
  });
}

function isOffscreen(el) {
	return ((el.offsetLeft + el.offsetWidth) < 0 || (el.offsetTop + el.offsetHeight) < 0 ||
		(el.offsetLeft + el.getClientRects()[0].width < home_timeline.scrollLeft || el.offsetleft > home_timeline.scrollLeft + home_timeline.getClientRects()[0].width) ||
		(el.offsetTop + el.getClientRects()[0].height < home_timeline.scrollTop || el.offsetTop > home_timeline.scrollTop + home_timeline.getClientRects()[0].height));
}