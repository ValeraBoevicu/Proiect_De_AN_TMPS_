// Singleton
const MovieSystem = (function () {
    let instance;

    function init() {
        const movies = [];

        return {
            addMovie: function (movie) {
                movies.push(movie);
            },
            deleteMovie: function (movie) {
                const index = movies.indexOf(movie);
                if (index !== -1) {
                    movies.splice(index, 1);
                }
            },
            getMovies: function () {
                return movies;
            },
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        },
    };
})();

// Builder
class MovieBuilder {
    constructor() {
        this.title = '';
        this.description = '';
        this.image = '';
        this.rating = 0;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setDescription(description) {
        this.description = description;
        return this;
    }

    setImage(image) {
        this.image = image;
        return this;
    }

    setRating(rating) {
        this.rating = rating;
        return this;
    }

    build() {
        return {
            title: this.title,
            description: this.description,
            image: this.image,
            rating: this.rating,
        };
    }
}

// Prototype
class MoviePrototype {
    constructor(title, description, image, rating) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.rating = rating;
    }

    clone() {
        return new MoviePrototype(this.title, this.description, this.image, this.rating);
    }
}

// Facade
class MovieFacade {
    constructor(movie) {
        this.movie = movie;
    }

    getFullInfo() {
        return `Title: ${this.movie.title}\nDescription: ${this.movie.description}\nRating: ${this.movie.rating.toFixed(1)}`;
    }
}

// Decorator
class MovieDecorator {
    constructor(movie) {
        this.movie = movie;
    }

    getFullInfo() {
        return this.movie.getFullInfo();
    }
}

class MovieRatingDecorator extends MovieDecorator {
    constructor(movie, rating) {
        super(movie);
        this.rating = rating;
    }

    getFullInfo() {
        return `${super.getFullInfo()}\nUser Rating: ${this.rating.toFixed(1)}`;
    }
}

// Iterator
class MovieIterator {
    constructor(movies) {
        this.movies = movies;
        this.index = 0;
    }

    hasNext() {
        return this.index < this.movies.length;
    }

    next() {
        return this.movies[this.index++];
    }
}

const movieSystem = MovieSystem.getInstance();

const movie1 = new MovieBuilder()
    .setTitle("Movie 1")
    .setDescription("Description of Movie 1")
    .setImage("movie1.jpg")
    .setRating(8.2)
    .build();

const movie2 = new MovieBuilder()
    .setTitle("Movie 2")
    .setDescription("Description of Movie 2")
    .setImage("movie2.jpg")
    .setRating(7.9)
    .build();
movieSystem.addMovie(movie1);
movieSystem.addMovie(movie2);

const movieIterator = new MovieIterator(movieSystem.getMovies());

displayMovies(movieSystem.getMovies());

function addRating(movie, rating) {
    const movieFacade = new MovieFacade(movie);
    const movieDecorator = new MovieRatingDecorator(movieFacade, rating);

    const fullInfo = movieDecorator.getFullInfo();
    const [title, description, ratingInfo, userRating] = fullInfo.split("\n");

    console.log("Movie Details:");
    console.log("Title:", title.split(": ")[1]);
    console.log("Description:", description.split(": ")[1]);
    console.log("Rating:", ratingInfo.split(": ")[1]);
    console.log("User Rating:", userRating.split(": ")[1]);
}


function addRating(movie, rating) {
    const movieFacade = new MovieFacade(movie);
    const movieDecorator = new MovieRatingDecorator(movieFacade, rating);

    const fullInfo = movieDecorator.getFullInfo();
    const [title, description, ratingInfo, userRating] = fullInfo.split("\n");

    console.log("Movie Details:");
    console.log("Title:", title.split(": ")[1]);
    console.log("Description:", description.split(": ")[1]);
    console.log("Rating:", ratingInfo.split(": ")[1]);
    console.log("User Rating:", userRating.split(": ")[1]);

    movie.rating = rating;
    console.log("Updated Movie Rating:", movie.rating.toFixed(1));

    displayMovies(movieSystem.getMovies());
}




function addMovie(name, description, rating) {
    const movie = new MovieBuilder()
        .setTitle(name)
        .setDescription(description)
        .setRating(rating)
        .build();

    movieSystem.addMovie(movie);
    displayMovies(movieSystem.getMovies());
}


addMovie("Movie 3", "Description of Movie 3", 9.5);



function promptAddMovie() {
    const name = prompt("Enter the movie name:");
    const description = prompt("Enter the movie description:");
    const rating = parseFloat(prompt("Enter the movie rating (0-10):"));

    if (name && description && !isNaN(rating) && rating >= 0 && rating <= 10) {
        addMovie(name, description, rating);
    } else {
        alert("Invalid input. Please enter valid movie details.");
    }
}


promptAddMovie();
