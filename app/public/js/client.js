$j("link").each(function(){
	var href = $j(this).attr("href");
	var connector = (href.indexOf("?") > -1) ? "&" : "?";
	var href = href + connector + "_=" + (new Date()).getTime()
	$j(this).attr("href",href);
});
