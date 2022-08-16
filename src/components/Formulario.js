import React, { useState } from "react";
import Error from "./Error";

const Formulario = ({ guardarBusqueda }) => {
  //State para guardar lo que escribe el usuario en el buscador
  const [termino, guardarTermino] = useState("");
  //State para el error
  const [error, guardarError] = useState(false);

  //Función que se ejecuta en el submit
  const buscarImagenes = (e) => {
    e.preventDefault();

    //Validar
    if (termino.trim() === "") {
      guardarError(true);
      return;
    }
    //Esta parte funciona como un else, porque si cumple la condición no sigue ejecutando, hace un return
    guardarError(false);

    //Enviar el termino de búsqueda hacia el componente principal
    guardarBusqueda(termino);
  };

  return (
    <form onSubmit={buscarImagenes}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, por ejemplo: futbol o cafe"
            onChange={(e) => guardarTermino(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {error ? (
        <Error mensaje="Por favor, agrega un termino de búsqueda" />
      ) : null}
    </form>
  );
};

export default Formulario;
