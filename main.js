let toSearchList = []; // holds states users want to add *Note: statesList li elements are added independently
const options = {
  headers: new Headers({
    "X-Api-Key": "DytqKSWlz71A3zpgAJl8m0NxUDMko4SlH5Jmv6Jd",
  }),
};

// https://developer.nps.gov/api/v1/parks?api_key=DytqKSWlz71A3zpgAJl8m0NxUDMko4SlH5Jmv6Jd

function fetchParks() {
  return fetch(
    "https://developer.nps.gov/api/v1/parks?limit=5&api_key=DytqKSWlz71A3zpgAJl8m0NxUDMko4SlH5Jmv6Jd"
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
  $("#form").on("click", "#submit", function (event) {
    event.preventDefault();
    $("#resultsContainer").html("<h2>Results Loading...</h2<");
    fetchParks().then(function (result) {
      $("#resultsContainer").html(`${result}`);
    });
  });
}

function handleEverything() {
  handleAddState();
  handleSubmit();
}

$(handleEverything());
