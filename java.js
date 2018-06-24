$(document).ready(function() {
    var topics = ["The Expanse","Colony","Elementary","Breaking Bad","Billions","Taboo","Game of Thrones"];

function showButtons(){
$("#showButtons").empty();
for (i=0;i<topics.length;i++){
    var button = $('<button class="btn btn-warning">');
    button.attr("id", "show");
    button.attr("data-search", topics[i]);
    button.text(topics[i]);
    console.log(topics[i]);
    $("#showButtons").append(button)
    }
}


showButtons();
$(document).on("click","button", function() {

    var show = $(this).attr("data-search");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      show + "&api_key=J2q2iOJBsdcMPc3BVSDTgYYw81uOv5u5&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      })

        .then(function(response) {
            console.log(queryURL);
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
  
            var showDiv = $("<div class='col-md-4'>");
            var p = $("<p>").text("Rating: " + results[i].rating);

              var showImage = $("<img>");
              showImage.attr("src", results[i].images.fixed_height_still.url);
              showImage.attr("data-still",results[i].images.fixed_height_still.url);
              showImage.attr("data-animate",results[i].images.fixed_height.url);
              showImage.attr("data-state","still");
              showImage.attr("class","gif");
              showDiv.append(p);
              showDiv.append(showImage);
              $("#shows").prepend(showDiv);
            }
        });
    });

    $(document).on("click",".gif", function() {
        console.log("gif clicked");
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
                             }
    });

    $(document).on("click", "#addShow", function(event) {
        event.preventDefault();
        var newShow = $("#show-input").val().trim();
        topics.push(newShow);
        $("#show-input").val("");
        showButtons();
      });
});