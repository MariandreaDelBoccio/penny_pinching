import { useState, useEffect } from 'react';
import { db } from './../firebase/firebaseConfig';
import { startOfMonth, endOfMonth, getUnixTime } from 'date-fns';
import { useAuth } from './../contextos/AuthContext';

const useObtenerGastosDelMes = () => {
    const [gastos, establecerGastos] = useState([]);
    const { usuario } = useAuth();

    useEffect(() => {
        const inicioMes = getUnixTime(startOfMonth(new Date()));
        const FinMes = getUnixTime(endOfMonth(new Date()));

        if (usuario) {
            const unsuscribe = db.collection('gastos')
                .orderBy('fecha', 'desc')
                .where('fecha', '>=', inicioMes)
                .where('fecha', '<=', FinMes)
                .where('uidUsuario', '==', usuario.uid)
                .onSnapshot((snapshot) => {

                    establecerGastos(snapshot.docs.map((documento) => {
                        return { ...documento.data(), id: documento.id }
                    }))
                })
            return unsuscribe;
        }
    }, [usuario]);

    return gastos;
}

export default useObtenerGastosDelMes;