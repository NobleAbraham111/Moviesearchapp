const form = document.querySelector('form');
const container = document.querySelector('.image-container');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let query = form.querySelector('input').value.trim();
    console.log(query);

    if (query === "") {
        query = "marvel";
    }
    omdbApi(query);

});

async function omdbApi(query) {
    try {

        const req = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=2b2fed5b&s=${query}`);

        const movies = await req.json();

        if (movies.Response === "True") {
            displayMovieDetails(movies.Search);

        } else {
            container.innerHTML = `<p>No movies found for "${query}".</p>`;
        }
    } catch (error) {
        console.error("Error fetching data from OMBD API:", error);
    }
}

function displayMovieDetails(movies) {
    container.innerHTML = "";

    for (let movie of movies) {
        const src = movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"


        const img = document.createElement('img');
        img.src = src;
        img.alt = movie.Title;

        container.appendChild(img);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    omdbApi("steve jobs");
});

function displayMovieDetails(movies) {
    container.innerHTML = ""; 

    for (let movie of movies) {
        const src = movie.Poster !== "N/A" ? movie.Poster : "placeholder.jpg"; 
        
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card'); 


        const img = document.createElement('img');
        img.src = src;
        img.alt = movie.Title;

        const title = document.createElement('h3');
        title.textContent = movie.Title;

        const year = document.createElement('p');
        year.textContent = `Release Year: ${movie.Year}`;

        
        movieCard.appendChild(img);
        movieCard.appendChild(title);
        movieCard.appendChild(year);

        fetch(`http://www.omdbapi.com/?apikey=2b2fed5b&i=${movie.imdbID}`)
            .then((response) => response.json())
            .then((movieDetails) => {
                if (movieDetails.Response === "True") {
                    const plot = document.createElement('p');
                    plot.textContent = `Plot: ${movieDetails.Plot}`;
                    movieCard.appendChild(plot);
                }
            })
            .catch((error) => {
                console.error("Error finding the details details:", error);
            });

        container.appendChild(movieCard);
    }
}
