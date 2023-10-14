// Initialize an empty array to store favorite movie data
window.favArr = new Array();

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedDataOfList = urlParams.get("data");

    if (encodedDataOfList) {
        const favListString = atob(encodedDataOfList);
        const listData = JSON.parse(favListString);
        const fav_list = listData;
        let responsesReceived = 0;

        for (var i = 0; i < fav_list.length; i++) {
            callForPlot(fav_list[i]);
        }

        function callForPlot(id) {
            const key = "56420f32";
            const api_website = "https://www.omdbapi.com/?apikey=" + key + "&i=" + id;
            apiFetch(api_website);
        }

        function apiFetch(apiUrl) {
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    window.favArr.push(data);
                    responsesReceived++;

                    if (responsesReceived === fav_list.length) {
                        createMovieList();
                    }
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }

        function createMovieList() {
            const favListContainer = document.querySelector('.fav-list');

            for (let i = 0; i < window.favArr.length; i++) {
                const movieData = window.favArr[i];
                const favItem = document.createElement('div');
                favItem.className = 'fav-item';
                const img = document.createElement('img');
                img.src = movieData.Poster;
                img.alt = 'Movie Poster';
                img.className = 'fav-movie-pic';
                const title = document.createElement('h6');
                title.textContent = movieData.Title +" ("+movieData.Year+")";
                const description = document.createElement('p');
                description.textContent = movieData.Plot;

                favItem.appendChild(img);
                favItem.appendChild(title);
                favItem.appendChild(description);

                favListContainer.appendChild(favItem);
            }
        }
    }
});

const index_page = document.getElementById("index-page");
index_page.addEventListener("click", function () {
    if (favArr.length > 0) {
        const favorites = JSON.stringify(favArr);
        const favcodedList = btoa(favorites);
        window.location.assign(`index.html?favdata=${favcodedList}`);
    } else {
        alert("Your Array is empty! T-T");
    }
});
