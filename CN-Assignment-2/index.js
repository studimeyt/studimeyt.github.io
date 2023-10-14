// Initialize an empty set to store favorite movie IDs
window.fav_list = new Set();

// When the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get query parameters from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const encodedData = urlParams.get("data");
  const favcodedData = urlParams.get("favdata");

  if (encodedData) {
    // Decode the base64-encoded data
    const dataString = atob(encodedData);

    // Parse the JSON string back into an object
    const data = JSON.parse(dataString);

    // Assuming you have an array of data called data.Search
    const cardContainer = document.getElementById("card-container");

    for (var i = 0; i < data.Search.length; i++) {
      const currentData = data.Search[i]; // Current card's data

      // Create a new card element
      const card = document.createElement("div");
      card.className = "col-lg-3 col-md-4 col-sm-6 mb-4 movie-card";

      // Create the card's content
      const cardInner = document.createElement("div");
      cardInner.className = "card";

      const cardImage = document.createElement("img");
      cardImage.src = currentData.Poster;
      cardImage.className = "card-img-top movie-pic";
      cardImage.alt = "Movie Poster";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const cardTitle = document.createElement("h5");
      cardTitle.className = "card-title";
      cardTitle.textContent = currentData.Title;

      // If the plot is added to the API in the future
      const cardText = document.createElement("p");
      cardText.className = "card-text";
      cardText.textContent = currentData.Plot;

      const favButton = document.createElement("a");
      favButton.className = "btn btn-outline-light fav-btn";
      favButton.id = "favorite";
      favButton.innerHTML = '<i class="fa-solid fa-star"></i>';

      // Append elements to the card
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardBody.appendChild(favButton);

      cardInner.appendChild(cardImage);
      cardInner.appendChild(cardBody);

      card.appendChild(cardInner);

      // Set up a unique event listener for each card
      favButton.addEventListener("click", function () {
        if (window.fav_list.has(currentData.imdbID)) {
          window.fav_list.delete(currentData.imdbID);
        } else {
          window.fav_list.add(currentData.imdbID);
        }
        this.classList.toggle("favorite-active");
      });

      // Update the title for each card
      const cardTitleElement = card.querySelector(".card-title");
      cardTitleElement.innerHTML = `<b>${currentData.Title}</b>`;

      // Append the card to the card container
      cardContainer.appendChild(card);
    }
  }

  if (favcodedData) {
    // Decode the base64-encoded favorite list data
    const fdata = atob(favcodedData);

    // Parse the JSON string back into an object
    const fList = JSON.parse(fdata);
  }
});

const fav_page = document.getElementById("favorite-page");
fav_page.addEventListener("click", function () {
  // Check if there are favorite movie IDs to encode and redirect
  if (window.fav_list.size > 0) {
    // Convert favorite movie IDs to a string and encode it
    const favListString = JSON.stringify([...window.fav_list]);
    const encodedDataOfList = btoa(favListString);

    // Redirect to the favorite page with the encoded favorite list
    window.location.assign(`favorite.html?data=${encodedDataOfList}`);
  } else {
    // Display an alert if the favorite set is empty
    alert("Your List is empty! T-T");
  }
});
