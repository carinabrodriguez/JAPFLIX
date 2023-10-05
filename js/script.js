document.addEventListener("DOMContentLoaded", function () {
    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const lista = document.getElementById("lista");
    const detallePelicula = document.getElementById("detallePelicula");
    const tituloDetalle = document.getElementById("tituloDetalle");
    const overviewDetalle = document.getElementById("overviewDetalle");
    const generosDetalle = document.getElementById("generosDetalle");
    const btnMostrarInfo = document.getElementById("btnMostrarInfo");
    const infoAdicional = document.getElementById("infoAdicional");
    const anoLanzamiento = document.getElementById("anoLanzamiento");
    const duracion = document.getElementById("duracion");
    const presupuesto = document.getElementById("presupuesto");
    const ganancias = document.getElementById("ganancias");
  
    let peliculas = [];
  
    // Cargar datos de la API al cargar la página
    fetch("https://japceibal.github.io/japflix_api/movies-data.json")
      .then((response) => response.json())
      .then((data) => {
        peliculas = data;
      });
  
    // Función para mostrar películas que coincidan con la búsqueda
    function mostrarPeliculas(busqueda) {
      lista.innerHTML = "";
      const resultados = peliculas.filter(
        (pelicula) => {
        const genresArray = pelicula.genres.map((genre) => genre.name); // Extraer los nombres de los géneros
        if (Array.isArray(genresArray)) {
          return (
            pelicula.title.toLowerCase().includes(busqueda.toLowerCase()) ||
            genresArray.some((genre) =>
              genre.toLowerCase().includes(busqueda.toLowerCase())
            ) ||
            pelicula.tagline.toLowerCase().includes(busqueda.toLowerCase()) ||
            pelicula.overview.toLowerCase().includes(busqueda.toLowerCase())
          );
        }
        return false;
    });

   //Función para aplicar las estrellas del rating
    
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
  
      resultados.forEach((pelicula) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `<h3>${pelicula.title} ${createStarRating(pelicula.vote_average)}</h3>
                        <p>${pelicula.tagline}</p>`;
        li.addEventListener("click", () => mostrarDetalle(pelicula));
        lista.appendChild(li);
      });
    }
    
  
    // Función para mostrar detalles de la película seleccionada
    function mostrarDetalle(pelicula) {
      tituloDetalle.textContent = pelicula.title;
      overviewDetalle.textContent = pelicula.overview;
      generosDetalle.innerHTML = pelicula.genres.map(
        (genero) => `<li>${genero}</li>`
      ).join("");
  
      // Mostrar el contenedor de detalles
      detallePelicula.style.display = "block";
  
      // Configurar el botón para mostrar información adicional
      btnMostrarInfo.addEventListener("click", () => {
        if (infoAdicional.style.display === "none") {
          infoAdicional.style.display = "block";
          anoLanzamiento.textContent = `Año de lanzamiento: ${pelicula.release_date.substring(0, 4)}`;
          duracion.textContent = `Duración: ${pelicula.runtime} minutos`;
          presupuesto.textContent = `Presupuesto: $${pelicula.budget.toLocaleString()}`;
          ganancias.textContent = `Ganancias: $${pelicula.revenue.toLocaleString()}`;
        } else {
          infoAdicional.style.display = "none";
        }
      });
    }
  
    // Escuchar el evento de clic en el botón de búsqueda
    btnBuscar.addEventListener("click", () => {
      const busqueda = inputBuscar.value.trim();
      if (busqueda !== "") {
        mostrarPeliculas(busqueda);
      }
    });
  });
