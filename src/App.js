import React, { useEffect, useState } from "react";
import Formulario from "./components/Formulario";

function App() {
  //State de la app
  const [busqueda, guardarBusqueda] = useState("");

  //Realizar la búsqueda
  useEffect(() => {
    //Validación para saber si es la primer carga, ya que no queremos que haga ninguna consulta
    if (busqueda === "") {
      return;
    }

    const consultarAPI = async () => {
      const imagenesPorPagina = 30;
      const key = "29321465-d95ff742352fd9f9167485be6";

      //"per_page" es un parametro que está en la documentación, sirve para paginación
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarBusqueda(resultado.hits);
    };
    consultarAPI();
  }, [busqueda]);

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center"></p>

        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>
    </div>
  );
}

export default App;
