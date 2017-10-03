$(document).ready(function() {
	console.log("so far, so good");

	var tagArraySample = ["beer", "brewing", "brewer", "brewery", "Duff", "hops", "malt", "barley", "water", "yeast"];
	
	function populateButtons(tagArray){
		var button;
		tagArray.forEach(function(tag){
			button = $("<button>").attr("id", tag).text(tag);
			$("#gifArea").append(button);
	});

	function getGifs(tag, numberOfGIFs){
		var APIKey = "n0vQqF6LSLU0o20aL1osFF3KBFhB4qhq";
		var gifURL, stillURL, gifURLsmall, gif, gifStill;
		var queryURL="http://api.giphy.com/v1/gifs/random?tag=" +tag+ "&api_key=" +APIKey;
		$.ajax({
			accept : {
				image: "image/*"
			},
			method: "GET",
			url: queryURL
		}).done(function(response){
			console.log(response);
			gifURL = response.data.image_url;
			console.log(gifURL);
			gifURLsmall = response.data.fixed_height_small_url;
			console.log(gifURLsmall);
			stillURL = response.data.fixed_height_small_still_url;
			console.log(stillURL);
			// for(datum in response.data){
			// 	console.log(response.data[datum]);
			// }
			gifStill = $("<img>").attr("src", stillURL);
			console.log("gifStill = ", gifStill);
			gifStill.on("click", function(event){
				console.log("click");
				$(event.target).attr("src", gifURL);
			})
			$("#gifArea").append(gifStill);
	});
	}

	};	
	// populateButtons(tagArraySample,10);
});