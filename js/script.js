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
		output = output + "<div id='"+subName+"' class='subreddit'><header><strong>" + subName + "</strong><a href='"+url+"' title='"+subName+"' target='_blank' class='subreddit-url'>("+url+")</a></header><ul></ul></div>";
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
						isNSFW = goods.data.children[i].data.over_18,
						nsfw = "",
						url = goods.data.children[i].data.url,
						permalink = goods.data.children[i].data.permalink,
						ups = goods.data.children[i].data.ups,
						downs = goods.data.children[i].data.downs,
						score = goods.data.children[i].data.score,
						itemOutput = "";
					if(isNSFW) {
						var nsfw = "over-18";
					}
					itemOutput = "<li><a href='"+url+"' target='_blank' class='post-link'>"+title+"</a><span class='author'><strong>Posted By: </strong>"+author+"</span><a href='"+permalink+"' title='permalink' target='_blank' class='permalink'>permalink</a><span class='score'>ups: "+ups+", downs: "+downs+", score: "+score+"<span class='"+nsfw+"'></span></li>";

					$('#' + subName + ' ul').append(itemOutput);
					
				}
								
			}
		});
	}
}