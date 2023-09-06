import { RenderHeader, RenderSidebar, RenderFooter, AddCartItem, RenderProductDetail, RenderRelatedProducts } from "../services/renderServices.js"
import { GetProductoById, GetAllProductos } from "../services/fetchServices.js";
import { ProductoDetailError } from "../services/errorServices.js";
import { getCart } from "../services/storageServices.js";
import { GetParametro } from "../services/auxiliaryServices.js"
import { ProductoOnloadEvents } from "../services/eventServices.js"


export const ProductPageRender = () => {
    RenderHeader();
    RenderSidebar();
    RenderFooter();
    GetProductoById(GetParametro(), RenderProductDetail, ProductoDetailError);
    GetAllProductos(RenderRelatedProducts, () => {});
    let cartItemsList = getCart();
    for(let i=0; i<cartItemsList.length ; i++){
        GetProductoById(cartItemsList[i].id, AddCartItem, () => {})
    }

    ProductoOnloadEvents();
}

ProductPageRender();