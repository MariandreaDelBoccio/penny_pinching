const formatearCantidad = (cantidad) => {
    return new Intl.NumberFormat(
        'en-ES',
        { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }
    ).format(cantidad);
}

export default formatearCantidad;