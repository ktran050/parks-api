let toSearchList = []; // holds states users want to add *Note: statesList li elements are added independently
const api_key = "DytqKSWlz71A3zpgAJl8m0NxUDMko4SlH5Jmv6Jd";

// https://developer.nps.gov/api/v1/parks?api_key=DytqKSWlz71A3zpgAJl8m0NxUDMko4SlH5Jmv6Jd

function fetchParks(maxQueries) {
  return fetch(
    `https://developer.nps.gov/api/v1/parks?limit=${maxQueries}&api_key=${api_key}`
  )
    .then(function (result) {
      if (result.ok) {
        return result.text();
      } else {
        throw new Error("fetch failed");
      }
    })
    .then(function (result) {
      return result;
    });
}

function handleAddState() {
  $("#form").on("click", "#addStateButton", function (event) {
    event.preventDefault();
    let userInput = $("#state").val();
    $("#statesList").append(`<li>${userInput}</li>`);
    toSearchList.push(userInput);
  });
}

function handleSubmit() {
  // Calls fetchParks to do the actual fetching
  $("#form").on("click", "#submit", function (event) {
    event.preventDefault();
    $("#resultsContainer").html("<h2>Results Loading...</h2<");
    fetchParks($("#numResults").val()).then(function (result) {
      // #numResults is the select where users chose the number of queries
      $("#resultsContainer").html(`${result}`);
    });
  });
}

function handleEverything() {
  handleAddState();
  handleSubmit();
}

$(handleEverything());
