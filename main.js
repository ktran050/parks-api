let toSearchList = []; // holds states users want to add *Note: statesList li elements are added independently
let numResults;
const api_key = "DytqKSWlz71A3zpgAJl8m0NxUDMko4SlH5Jmv6Jd";

// https://developer.nps.gov/api/v1/parks?api_key=DytqKSWlz71A3zpgAJl8m0NxUDMko4SlH5Jmv6Jd

function fetchParks(maxQueries, queryString) {
  return fetch(
    `https://developer.nps.gov/api/v1/parks?limit=${maxQueries}&api_key=${api_key}&stateCode=${queryString}`
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

function drawResults(result, numResults) {
  let resultHtml = "";
  if (result.length < numResults) {
    resultHtml =
      "<p>Parks found were less than the number of results requested.</p><ul>";
  } else {
    resultHtml = "<ul>";
  }
  for (let i = 0; i < numResults; ++i) {
    resultHtml += `
    <li> Name: ${result.data[i].name}
      <ol>
        <li>Full name: ${result.data[i].fullName}</li>
        <li>Description: ${result.data[i].description}</li>
        <li>Website: <a href="${result.data[i].url}">${result.data[i].url}</a></li>
      </ol>
    </li>`;
  }
  resultHtml += "</ul>";
  $("#resultsContainer").html(resultHtml);
}

function createQueryString(toSearchList) {
  // helper function to give us the query string for states
  let queryString = "";
  if (toSearchList.length === 1) {
    // simple case where we search one state
    queryString = toSearchList[0];
  } else {
    for (let i = 0; i < toSearchList.length; ++i) {
      queryString += toSearchList[i] + ",";
    }
  }
  return queryString;
}

function handleSubmit() {
  // On form submit it will:
  //   Prep (clean up old data)
  //   Read the number of max results
  //   Read the states to search
  //   Let users know we are loading
  //   Fetch data
  //   Display data and finish loading
  //   Clean up
  $("#form").on("click", "#submit", function (event) {
    event.preventDefault();
    if (toSearchList.length > 0) {
      numResults = 0; // Prep
      let queryString = createQueryString(toSearchList); // Read which states to search
      numResults = $("#numResults").val(); // Read max number of results
      $("#resultsContainer").html("<h2>Results Loading...</h2<"); // display loading
      fetchParks(numResults, queryString).then(function (result) {
        // fetch data
        drawResults(JSON.parse(result), numResults); // display results and finish loading
      });
      toSearchList.length = 0; // Clean up to search list
      $("#statesList").html(""); /// Reset statesList
    } else {
      $("#resultsContainer").html("ERROR: Please chose states to search");
    }
  });
}

function handleEverything() {
  handleAddState();
  handleSubmit();
}

$(handleEverything());
