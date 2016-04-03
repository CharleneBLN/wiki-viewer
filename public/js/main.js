var displayResults = function(data) {
  var found = data["query"]["searchinfo"]["totalhits"];
  if (found > 0) {
    var array = data["query"]["search"];
    var mainLink = "https://en.wikipedia.org/wiki/";
    array.forEach(function(searchResult) {
      var pgLink = mainLink + searchResult["title"].split(" ").join("_");
      $("#results").append(
        "<div class='unit'><a target ='_blank' href='" + pgLink + "'> <div class = 'title'>" +
        searchResult["title"] +
        "</div><div class='description'>" +
        searchResult["snippet"] +
        "</div></a></div>");
    });
  } else {
    $("#analysis").html("No result found");
  }
}

$(document).ready(function() {
  $("#submitButton").click(function() {
    $("#analysis").empty();
    var searchInput = $(".search").val();
    $.ajax({
      url: "https://en.wikipedia.org//w/api.php?action=query&format=json&formatversion=2&list=search&srsearch=" + searchInput,
      dataType: "jsonp",
      jsonp: "callback",
      success: displayResults,
    });
  });
});
