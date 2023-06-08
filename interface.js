function displayMovies(movies) {
    const moviesDiv = document.getElementById("movies");
    moviesDiv.innerHTML = "";

    movies.forEach((movie) => {
        const movieContainer = document.createElement("div");
        movieContainer.className = "movie-container";

        const movieImage = document.createElement("img");
        movieImage.className = "movie-image";
        movieImage.src = movie.image;

        const movieDetails = document.createElement("div");
        movieDetails.className = "movie-details";

        const movieTitle = document.createElement("h2");
        movieTitle.className = "movie-title";
        movieTitle.textContent = movie.title;

        const movieDescription = document.createElement("p");
        movieDescription.className = "movie-description";
        movieDescription.textContent = movie.description;

        const movieRating = document.createElement("div");
        movieRating.className = "movie-rating";
        movieRating.textContent = `Rating: ${movie.rating.toFixed(1)}`;

        const rateButton = document.createElement("button");
        rateButton.textContent = "Rate Movie";
        rateButton.addEventListener("click", () => showRatingForm(movie));

        movieDetails.appendChild(movieTitle);
        movieDetails.appendChild(movieDescription);
        movieDetails.appendChild(movieRating);
        movieDetails.appendChild(rateButton);

        movieContainer.appendChild(movieImage);
        movieContainer.appendChild(movieDetails);

        moviesDiv.appendChild(movieContainer);
    });
}

function showRatingForm(movie) {
    const ratingForm = document.getElementById("rating-form");
    const ratingInput = document.getElementById("rating-input");
    const submitButton = document.getElementById("submit-rating");

    ratingForm.style.display = "block";
    ratingInput.value = "";

    submitButton.addEventListener("click", () => {
        const rating = parseFloat(ratingInput.value);
        if (!isNaN(rating) && rating >= 0 && rating <= 10) {
            addRating(movie, rating);
            ratingForm.style.display = "none";
        } else {
            alert("Invalid rating. Please enter a number between 0 and 10.");
        }
    });
}
