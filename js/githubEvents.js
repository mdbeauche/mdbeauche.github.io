var gitAPI = "https://api.github.com";

$(document).ready(function() {

  //
  $("#submitButton").on("click", function(e) {
    e.preventDefault();

    // get form input
    var owner = $("#owner").val();
    var repo = $("#repo").val();
    var eventType = $("#eventType").val();

    // verify input
    if (!owner) {
      $("#results").empty().append("You must specify an owner");
      return;
    }

    if (!repo) {
      $("#results").empty().append("You must specify a repository");
      return;
    }

    // build query
    // GET /repos/:owner/:repo/issues/events
    //var queryURL = gitAPI + "/repos/" + owner + "/" + repo + "/events";

    // test
    //var queryURL = "https://api.github.com/users/torvalds/events";

    var queryURL = "https://api.github.com/repos/torvalds/pesconvert/events";

    // submit query to github
    $.ajax( {
      url: queryURL,
      dataType: 'jsonp',
      headers: { 'User-Agent': 'mdbeauche' },
      success: function(data) {
        // do something with data
        $("#results").empty().append("Queried " + queryURL + "<br>");
        $("#results").append(data);
        console.log(data);
      },
      error: function(error) {
        $("#results").empty().append("Error: " + error.statusText + ", " + error.status);
      }
    });

  });
});
