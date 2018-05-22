var GIT_API = "https://api.github.com";
var USER_AGENT = "mdbeauche";

function getGitApi(queryUrl) {
  // submit query to github
  $.ajax( {
    url: queryUrl,
    dataType: "jsonp",
    headers: { "User-Agent": USER_AGENT },
    success: function(json) {
      // populate fields
      $("#queried").empty().append("Queried " + queryUrl + "<br>");

      // create table header
      $("#resultsTable").empty().append("<thead><tr><th>ID</th><th>Event Type" +
        "</th><th>Display Login</th><th>Created At</th></tr></thead><tbody>");

      // get event type
      var eventType = $("#eventType").val();

      // loop through each event
      for (var i = 0; i < json.data.length; i++) {
        // show event if type is selected
        if (eventType === "Any" || eventType === json.data[i].type) {
          // parse date and time
          var timestamp = json.data[i].created_at.split("T");
          var date = timestamp[0];
          timestamp = timestamp[1].split("Z");
          var time = timestamp[0];

          // append results in table row
          $("#resultsTable").append("<tr><td>" + json.data[i].id + "</td><td>" +
          json.data[i].type + "</td><td>" + json.data[i].actor.display_login +
          "</td><td>" + date + " " + time + "</td></tr>");
        }
      }

      // close table
      $("#resultsTable").append("</tbody>");
    },
    error: function(error) {
      $("#queried").empty().append("Error: " + error.status + ", " +
      error.statusText);
    }
  });
}

// simple test example
function testGitApi() {
  // test
  // var queryUrl = "https://api.github.com/users/torvalds/events";

  var queryUrl = "https://api.github.com/repos/torvalds/pesconvert/events";

  getGitApi(queryUrl);
}

$(document).ready(function() {

  // submit button clicked
  $("#submitButton").on("click", function(e) {
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
    var queryUrl = GIT_API + "/repos/" + owner + "/" + repo + "/events";

    getGitApi(queryUrl);
  });
});
