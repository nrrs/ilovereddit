$(document).ready( function() {
	console.log('options.js ran successfully.')
	loadSubs();

	$('#save-subs').on('click', function() {
		saveSubs();
	});

	$('#restore').on('click', function() {
		restoreSubs();
	});

});

var defaultSubs = ['news','funny','pics','videos','gadgets'];
var subInputs = document.getElementsByTagName('input');

function loadSubs() {
	console.log('loadOptions() ran successfully.');

	if (localStorage['subreddits'] == undefined) {
		localStorage['subreddits'] = JSON.stringify(defaultSubs);
		for (var i = 0; i < subInputs.length; i++) {
			subInputs[i].value = defaultSubs[i].toString();	
		}
	}

	if (subInputs.value == undefined) {
		var subreddits = JSON.parse(localStorage['subreddits']);
		for (var i = 0; i < subInputs.length; i++) {
			var test = subInputs[i].value = subreddits[i].toString();	
			console.log(test);
		}
	}
}


function restoreSubs() {
	console.log('restoreSubs() ran.');
	localStorage.removeItem('subreddits');
	location.reload();
}

function saveSubs() {
	console.log('saveSubs() ran sucessfully.');
	var subs = [];
	for (var i = 0; i < subInputs.length; i++) {
		var name = subInputs[i].value;
		subs.push(name);
		localStorage['subreddits'] = JSON.stringify(subs);
	}
}

