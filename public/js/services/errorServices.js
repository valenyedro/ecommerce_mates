import { ErrorComponent } from "../components/errorComponent.js"

export const NoProductsFound = () => {
    document.getElementById('prod_cards').innerHTML = "";
    document.getElementById('prod_cards').innerHTML += ErrorComponent();
    document.getElementById('error_h4').innerHTML = "";
    document.getElementById('error_h4').innerHTML += 'Lo sentimos, no encontramos productos que coincidan con la búsqueda.<br><br>¡Puedes intentar de nuevo!';
}

export const IndexProductsError = () => {
    document.getElementById('prod_cards').innerHTML = "";
    document.getElementById('prod_cards').innerHTML += ErrorComponent();
    document.getElementById('error_h4').innerHTML = "";
    document.getElementById('error_h4').innerHTML += 'Lo sentimos, ocurrió un problema al cargar los productos.<br>Estamos trabajando para solucionarlo.';
}
export const ProductoDetailError = () => {
    document.getElementById('product_detail').innerHTML = "";
    document.getElementById('product_detail').innerHTML += ErrorComponent();
    document.getElementById('error_h4').innerHTML = "";
    document.getElementById('error_h4').innerHTML += 'Lo sentimos, ocurrió un problema al cargar el producto.<br>Estamos trabajando para solucionarlo.';
}
export const NoOrdenesFound = (despuesDeBusqueda) => {
    document.getElementById('ordenes_section').innerHTML = "";
    document.getElementById('ordenes_section').innerHTML += ErrorComponent();
    
    if(despuesDeBusqueda){
        document.getElementById('error_h4').innerHTML = "";
        document.getElementById('error_h4').innerHTML += 'Lo sentimos, no encontramos órdenes que coincidan con las fechas ingresadas.<br><br>¡Puedes intentar de nuevo!';
    }
    else{
        document.getElementById('error_h4').innerHTML = "";
        document.getElementById('error_h4').innerHTML += 'Lo sentimos, no se encontraron órdenes todavía.';
    }
}