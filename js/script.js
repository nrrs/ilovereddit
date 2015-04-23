// popup
console.log('script.js ran');

$(document).ready( function() {
	generateOutput();
});

var link = "http://www.reddit.com/r/",
	subs = JSON.parse(localStorage['subreddits']);

function generateOutput() {
	var output = "";
	for (i = 0; i < subs.length; i++) {
		// generate subreddit list clusters
		var subName = subs[i].toString(),
			url = link + subName,
			subJSON = link + subName + "/new.json?t=hour&limit=3";
		output = output + "<div id='"+subName+"' class='subreddit'><header><strong>" + subName + "</strong><a href='"+url+"' title='"+subName+"' target='_blank' class='url'>("+url+")</a></header><ul></ul></div> <hr/>";
		$('#output').html(output);
		$.ajax({
			type: "GET",
			url: subJSON,
			data: "",
			dataType: "json",
			jsonp: false,
			success: function(goods) {
				var subName = goods.data.children[0].data.subreddit;
				for (i = 0; i < 3; i++) {
					var author = goods.data.children[i].data.author,
						title = goods.data.children[i].data.title,
						url = goods.data.children[i].data.url,
						permalink = goods.data.children[i].data.permalink,
						itemOutput = "";
					itemOutput = "<li><a href='"+url+"' target='_blank'>"+title+"</a></li>";
					$('#' + subName + ' ul').append(itemOutput);
				}
								
			}
		});
	}
}