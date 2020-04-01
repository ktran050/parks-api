let toSearchList = []; // holds states users want to add *Note: statesList li elements are added independently
let apiKey = "DytqKSWlz71A3zpgAJl8m0NxUDMko4SlH5Jmv6Jd";

function fetchParks() {
  fetch("developer.nps.gov/api/v1");
}

function handleAddState() {
  $("#form").on("click", "#addStateButton", function(event) {
    event.preventDefault();
    let userInput = $("#state").val();
    $("#statesList").append(`<li>${userInput}</li>`);
    toSearchList.push(userInput);
  });
}

function handleSubmit() {
  $("#form").on("click", "#submit", function(event) {
    event.preventDefault();
    fetchParks();
  });
}

function handleEverything() {
  handleAddState();
  handleSubmit();
}

$(handleEverything());
