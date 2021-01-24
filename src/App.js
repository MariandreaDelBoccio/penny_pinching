import React from 'react';
import Helmet from 'react-helmet';
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from './elementos/Header';
import Boton from './elementos/Boton';
import BotonCerrarSesion from './elementos/BotonLogout';

const App = () => {
  return (
    <>
      <Helmet>
        <title>Agregar gasto - Penny pinching</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Agregar gasto</Titulo>
          <ContenedorBotones>
            <Boton to="/categorias">Categorías</Boton>
            <Boton to="/lista">Lista de gastos</Boton>
            <BotonCerrarSesion></BotonCerrarSesion>
          </ContenedorBotones>
        </ContenedorHeader>

      </Header>
    </>
  );
}

export default App;