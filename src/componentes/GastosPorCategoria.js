import React from 'react';
import { Header, Titulo } from './../elementos/Header';
import Helmet from 'react-helmet';
import BtnRegresar from './../elementos/BtnRegresar';

const GastosPorCategoria = () => {
    return (
        <>
            <Helmet>
                <title>Categorías - Penny pinching</title>
            </Helmet>

            <Header>
                <BtnRegresar></BtnRegresar>
                <Titulo>Gastos por categoría</Titulo>
            </Header>
        </>
    );
}

export default GastosPorCategoria;