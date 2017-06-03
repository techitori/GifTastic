// Initial array of gifs
var gifs = ["The Matrix", "Basketball", "Math", "Food"];
// displaygifInfo function re-renders the HTML to display the appropriate content
function displaygifInfo() {

  // empty div
  $( "#gifsView" ).empty();

  var gif = $(this).attr("data-gif");



  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    gif + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {

      var results = response.data;

      //loop through the images (cont.)
      for (var i = 0; i < results.length; i++) {

        // ... and do not pull R rated or pg-13 rated images
        if (results[ i ].rating == "r" || results[ i ].rating == "pg-13") {

        } else {
          console.log(response)

          //gather the images" ratings
          var rating = results[ i ].rating;

          //displays the rating of the image on the page
          var p = $( "<p>" ).text( "Rating: " + rating);

          var gifImage = $("<img>");

          gifImage.attr("src", results[ i ].images.fixed_height_still.url);
          gifImage.attr("data-still", results[ i ].images.fixed_height_still.url);
          gifImage.attr("data-animate", results[ i ].images.fixed_height.url);
          gifImage.attr("data-state", "still");
          gifImage.addClass("gifImage");

          $("#gifsView").append(p);
          $("#gifsView").append(gifImage);
        }

      }

      // when clicking on an gif"s image (cont.)
      $(".gifImage").on("click", function() {
          // event.preventDefault();

          // ...add a specific state for the image
          var state = $(this).attr("data-state");
          console.log(state);

           // if the image is STILl, upon clicking, change it to ANIMATE and vice-versa
          if (state == "still") {
            $(this).attr( "src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
          }
            else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
          }
        });
    });
  }

  // Function to render the buttons
  function renderButtons() {

  // Deletes the current images before adding new buttons
  $("#buttonsView")
    .empty();

  // Loops through the gifs array
  for (var i = 0; i < gifs.length; i++) {

    //For each gif...
    // give it a button
    var a = $("<button>")
    // add the class "gif"
    a.addClass("gif");
    // add a data attribute
    a.attr("data-gif", gifs[ i ]);
    // display button text
    a.text(gifs[ i ]);
    $("#buttonsView").append(a);
  }
  }

  // If the submit button is clicked...
  $("#addgif").on("click", function() {
    event.preventDefault();

    // Grab the text from the form...
    var gif = $("#gif-input").val().trim();

    // The gif from the textbox is then added to our array
    gifs.push(gif);

    // the renderButtons function then adds the new gif to the list of buttons
    renderButtons();

  } )

  // =========

  // displays gifInfo
  $(document).on("click", ".gif", displaygifInfo);

  // runs the renderButtons function
  renderButtons();
