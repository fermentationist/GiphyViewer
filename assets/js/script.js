$(document).ready(function() {
	console.log("so far, so good");

	var numberOfGIFs = 25;

	$("#submit-button").on("click", function(){
		var newButton = $("#new-button").val();
		newButton = newButton.split(" ").join("_");
		console.log(newButton);
		$("#new-button").val("");
		populateButtons([newButton]);

	});

	var tagArraySample = ["beer", "brewing", "brewer", "brewery", "Duff", "hops", "malt", "barley", "water", "yeast"];
	
	function populateButtons(tagArray){
		var button, removeButton, btnGroup;
		tagArray.forEach(function(tag){
			var self = this;

			button = $('<button type="button" class="btn btn-warning">').attr("id", tag).text(tag);
			btnGroup = $('<div class="btn-group" id="#'+tag+'-group">').append(button);
			removeButton = '<button type="button" class="btn btn-warning dropdown-toggle" id="'+tag+'-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu" id="'+tag+'-dropdown-menu"><li><a href="#" id="'+ tag +'-delete">delete button</a></li></ul>';
			btnGroup.append(removeButton);
			button.on("click", function(event){
				console.log("tag = " + tag);
				getGifs(tag, numberOfGIFs);
			})
			$(document).on("click", "#"+tag+"-delete", function(){
				console.log("#"+tag+"-delete clicked");
				deleteButton(tag);
			});
			$("#buttonArea").append(btnGroup);
	});

	function deleteButton(tag){
		console.log("deleteButton("+tag+")");
		$("#"+tag).parent().remove();
	}

	function getGifs(tag, numberOfGIFs){
		$("#gifArea").empty();
		console.log("getGifs(", tag, ", " + numberOfGIFs + ") called");
		var APIKey = "n0vQqF6LSLU0o20aL1osFF3KBFhB4qhq";
		var gifURL, stillURL, gifURLsmall, gif, gifStill;
		var queryURL="https://api.giphy.com/v1/gifs/search?q=" + tag + "&limit="+numberOfGIFs+"&api_key=" +APIKey;
		$.ajax({
			accepts : {
				image: "image/*"
			},
			method: "GET",
			url: queryURL
		}).done(function(response){
			var dataArray = response.data;
			console.log(response);
			dataArray.forEach(displayGif);
			});
	}

	function displayGif(gif){
		console.log("gif = "+gif);
		var stillURL = gif.images.original_still.url;
		var gifURL = gif.images.original.url;
		var gifStill = $("<img>").attr("src", stillURL);
			gifStill.on("click", function(event){
				console.log("click");
				if ($(event.target).attr("src") === stillURL){
					gif = gifURL;
				}else{
					gif = stillURL
				}
				$(event.target).attr("src", gif);
			})
			gifStill.append('<label for="')
			$("#gifArea").append(gifStill);

	}


	};	
	populateButtons(tagArraySample);
});

