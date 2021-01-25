import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elementos/Contenedor';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EditarGasto from './componentes/EditarGasto';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import ListaDeGastos from './componentes/ListaDeGastos';
import Login from './componentes/Login';
import SignUp from './componentes/SignUp';
import { Helmet } from "react-helmet";
import favicon from './imagenes/logo.png';
import Fondo from './elementos/Fondo';
import { AuthProvider } from './contextos/AuthContext';
import RutaProtegida from './../src/componentes/RutaPrivada';
import { TotalGastadoProvider } from './contextos/TotalGastadoEnElMesContext';

WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
});

const Index = () => {
  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>

      <AuthProvider>
        <TotalGastadoProvider>
          <BrowserRouter>
            <Contenedor>
              <Switch>
                <Route path="/iniciar-sesion" component={Login} />
                <Route path="/crear-cuenta" component={SignUp} />

                <RutaProtegida path="/categorias">
                  <GastosPorCategoria />
                </RutaProtegida>
                <RutaProtegida path="/lista">
                  <ListaDeGastos />
                </RutaProtegida>
                <RutaProtegida path="/editar/:id">
                  <EditarGasto />
                </RutaProtegida>
                <RutaProtegida path="/">
                  <App />
                </RutaProtegida>

              </Switch>
            </Contenedor>
          </BrowserRouter>
        </TotalGastadoProvider>
      </AuthProvider>

      <Fondo />
    </>
  );
}

export default Index;

ReactDOM.render(<Index />, document.getElementById('root'));
