import React, { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
  //State de la app
  const [busqueda, guardarBusqueda] = useState("");
  //State de las imágenes
  const [imagenes, guardarImagenes] = useState([]);
  //State para paginación
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  //Realizar la búsqueda
  useEffect(
    () => {
      //Validación para saber si es la primer carga, ya que no queremos que haga ninguna consulta
      if (busqueda === "") {
        return;
      }

      const consultarAPI = async () => {
        const imagenesPorPagina = 30;
        const key = "29321465-d95ff742352fd9f9167485be6";

        //"per_page" es un parametro que está en la documentación, sirve para paginación
        const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarImagenes(resultado.hits);

        //calcular el total de páginas
        const calcularTotalPaginas = Math.ceil(
          resultado.totalHits / imagenesPorPagina
        );
        guardarTotalPaginas(calcularTotalPaginas);

        //Mover la pantalla hacia arriba para mostrar el comienzo
        const jumbotron = document.querySelector(".jumbotron");
        jumbotron.scrollIntoView({ behavior: "smooth" });
      };
      consultarAPI();
    },
    //Queremos que se vuelva a hacer el llamado cuando se cambie busqueda o paginaactual(se cambia con anterior y siguiente)
    [busqueda, paginaactual]
  );

  //Definir la página anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    //Evitar números negativos
    if (nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  };

  //Definir la página siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if (nuevaPaginaActual > totalpaginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center"></p>
        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />

        {paginaactual === 1 ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          >
            &laquo; Anterior
          </button>
        )}

        {paginaactual === totalpaginas ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
