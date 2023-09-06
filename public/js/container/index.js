import { RenderAllProductos, RenderFooter, RenderHeader, RenderSidebar, RenderSort, AddCartItem, RenderBanner } from "../services/renderServices.js"
import { GetAllProductos, GetProductoById } from "../services/fetchServices.js";
import { getCart } from "../services/storageServices.js";
import { IndexProductsError } from "../services/errorServices.js"
import { IndexOnloadEvents } from "../services/eventServices.js"

export const IndexRender = () => {

    GetAllProductos(RenderAllProductos, IndexProductsError);
    RenderHeader();
    RenderBanner();
    RenderSidebar();
    RenderFooter();
    RenderSort();
    let cartItemsList = getCart();
    for(let i=0; i<cartItemsList.length ; i++){
        GetProductoById(cartItemsList[i].id, AddCartItem, () => {})
    }

    IndexOnloadEvents();
}


