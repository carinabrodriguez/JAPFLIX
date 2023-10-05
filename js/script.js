document.addEventListener("DOMContentLoaded", () => {
    const inputSearch = document.getElementById("inputBuscar");
    const btnSearch = document.getElementById("btnBuscar");
    const list = document.getElementById("lista");

    let movies = [];

    fetch("https://japceibal.github.io/japflix_api/movies-data.json")
        .then(response => response.json())
        .then(data => {
            movies = data;
        });

    function createStarRating(rating) {
        const maxRating = parseFloat(rating / 2);
        let starHTML = "";
        for (let i = 1; i <= maxRating; i++) {
            if (i <= rating) {
                starHTML += '<span class="fa fa-star checked"></span>';
            } else {
                starHTML += '<span class="fa fa-star"></span>';
            }
        }
        return starHTML;
    }

    function showMovies(moviess) {
        list.innerHTML = "";
        moviess.forEach(movie => {
            const starsHTML = createStarRating(movie.vote_average)
            const movieCard = document.createElement("li");
            movieCard.classList.add('list-group-item');
            movieCard.dataset.bsToggle = 'offcanvas';
            movieCard.dataset.bsTarget = '#detalleMovie';
            movieCard.dataset.bsIdMovie = movie.id;
            movieCard.innerHTML = `
                <div class="row">
                    <div class="col-md-9">
                        <h2>${movie.title}</h2>
                        <p> ${movie.tagline}</p>
                    </div>
                    <div class="col-md-3 text-end">
                        <p> <span class="estrellas">${starsHTML}</span></p>
                    </div>
                </div>
            `;
            list.appendChild(movieCard);
        });
    }

    btnSearch.addEventListener("click", function () {
        const searchTerm = inputSearch.value.toLowerCase();

        // Filtrar las películas según el término de búsqueda
        const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));

        // Mostrar las películas filtradas
        showMovies(filteredMovies);
    });
});