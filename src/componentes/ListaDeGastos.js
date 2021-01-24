import React from 'react';
import { Header, Titulo } from './../elementos/Header';
import Helmet from 'react-helmet';
import BtnRegresar from './../elementos/BtnRegresar';

const ListaDeGastos = () => {
    // const { usuario } = useAuth();

    return (
        <>
            <Helmet>
                <title>Lista de gastos - Penny pinching</title>
            </Helmet>

            <Header>
                <BtnRegresar></BtnRegresar>
                <Titulo>Lista de gastos</Titulo>
            </Header>
        </>
    );
}

export default ListaDeGastos;