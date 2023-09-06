import { RenderHeader, RenderSidebar, RenderFooter, RenderBalance, AddCartItem } from "../services/renderServices.js"
import { GetOrdenes, GetProductoById } from "../services/fetchServices.js"
import { AdminOnloadEvents } from "../services/eventServices.js"
import { getCart } from "../services/storageServices.js";
import { NoOrdenesFound } from "../services/errorServices.js"

export const OrdenPageRender = () => {
    RenderHeader();
    RenderSidebar();
    RenderFooter();
    GetOrdenes(new Date().toDateString(), new Date().toDateString(), RenderBalance, NoOrdenesFound())
    let cartItemsList = getCart();
    for(let i=0; i<cartItemsList.length ; i++){
        GetProductoById(cartItemsList[i].id, AddCartItem, () => {})
    }

    AdminOnloadEvents();
}

OrdenPageRender();