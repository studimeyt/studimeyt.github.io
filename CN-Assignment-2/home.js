document.addEventListener("DOMContentLoaded", function () {
    // API URL for movie search
    const apiUrl = "http://www.omdbapi.com/?apikey=56420f32&s=";
  
    // DOM elements
    const searchInput = document.querySelector(".search-bar");
    const datalist = document.getElementById("search-suggestions");
  
    // Function for fetching data from the API
    function apiFetch(apiUrl) {
      return fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network error");
          }
          return response.json();
        });
    }
  
    // Function to handle search input and display suggestions
    function handleSearchInput() {
      const title = searchInput.value.trim();
  
      if (title) {
        const url = apiUrl + title;
        apiFetch(url)
          .then((data) => {
            datalist.innerHTML = "";
  
            if (data.Response === "True") {
              for (let i = 0; i < data.Search.length; i++) {
                const item = data.Search[i];
                const option = document.createElement("option");
                option.value = item.Title;
                option.innerText = item.Title;
                datalist.appendChild(option);
              }
            } else {
              console.log("Search results are undefined.");
            }
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      } else {
        datalist.innerHTML = "";
      }
    }
  
    // Event listener for input changes
    searchInput.addEventListener("input", handleSearchInput);
  
    // Event listener for form submission
    const searchForm = document.querySelector(".search-form");
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const title = searchInput.value;
      if (title) {
        const url = apiUrl + title;
        apiFetch(url)
          .then((data) => {
            const dataString = JSON.stringify(data);
            const encodedData = btoa(dataString);
            window.location.assign(`index.html?data=${encodedData}`);
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      }
    });
  });
  