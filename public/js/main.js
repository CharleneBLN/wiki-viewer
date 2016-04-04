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
    $("#results").append("<div class='notFound'>No result found</div>");
  }
}
var submitQuery = function() {
  $("#analysis").empty();
  var searchInput = encodeURIComponent($(".searchBar").val()); //In case searchBar contains value such as "&" or "/"
  $.ajax({
    url: "https://en.wikipedia.org//w/api.php?action=query&format=json&formatversion=2&list=search&srsearch=" + searchInput,
    dataType: "jsonp",
    jsonp: "callback",
    success: displayResults,
  });
}

$(document).ready(function() {
  $(".searchBar").keypress(function(event){
    if (event.which===13) {
      submitQuery();
    }
  });
  $("#submitButton").click(function() {
    submitQuery();
  });
});
