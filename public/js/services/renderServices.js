import { ProductoComponent, SortComponent } from "../components/productoComponent.js";
import { FooterComponent } from "../components/footerComponent.js"
import { HeaderComponent } from "../components/headerComponent.js";
import { SidebarComponent } from "../components/sidebarComponent.js";
import { CartItemComponent } from "../components/cartItemComponent.js";
import { ProductDetailComponent } from "../components/productDetailComponent.js";
import { OrdenComponent } from "../components/ordenComponent.js";
import { saveCart, getCart } from "../services/storageServices.js";
import { CarritoCount, GetParametro } from "../services/auxiliaryServices.js"
import { BannerComponent } from "../components/bannerComponent.js";

export const RenderAllProductos = (json) => {
    document.getElementById('prod_cards').innerHTML = "";
    for(let i=0; i<=9; i++){
        let _sectionProd = document.getElementById('prod_cards');
        let name = json[i].productoNombre;
        let img = json[i].productoImage;
        let price = `$${json[i].productoPrecio}`;
        let id = json[i].productoId;
        _sectionProd.innerHTML += ProductoComponent(name, price, img, id);
    }
}

export const RenderRelatedProducts = (json) => {
    let _productSection = document.getElementById('related_products');
    let alreadyRendered = [];
    let random;
    let _relatedSection = document.createElement('div');
    _relatedSection.innerHTML += `<h4 class='related-h4'>Productos relacionados</h4>`
    _relatedSection.classList.add('related-section')
    for(let i=0; i<3; i++){
        do{
            random = Math.floor(Math.random() * 10);
        } while(alreadyRendered.includes(random) || json[random].productoId=== parseInt(GetParametro()))
        let name = json[random].productoNombre;
        let img = json[random].productoImage;
        let price = `$${json[random].productoPrecio}`;
        let id = json[random].productoId;
        _relatedSection.innerHTML += ProductoComponent(name, price, img, id);
        alreadyRendered.push(random);
    }
    _productSection.appendChild(_relatedSection);
}

export const RenderProductosOrdenados = (json) => {
    document.getElementById('prod_cards').innerHTML = "";
    for(let i=0; i<Object.keys(json).length; i++){
        let _sectionProd = document.getElementById('prod_cards');
        let name = json[i].productoNombre;
        let img = json[i].productoImage;
        let price = `$${json[i].productoPrecio}`;
        let id = json[i].productoId;
        _sectionProd.innerHTML += ProductoComponent(name, price, img, id);
    }
}

export const RenderFooter = () => {
    document.getElementById('footer').innerHTML = "";
    document.getElementById('footer').innerHTML += FooterComponent();
}

export const RenderHeader = () => {
    document.getElementById('header').innerHTML = "";
    document.getElementById('header').innerHTML += HeaderComponent();
}

export const RenderBanner = () => {
    document.getElementById('banner').innerHTML = "";
    document.getElementById('banner').innerHTML += BannerComponent();
}

export const RenderSidebar = () => {
    document.getElementById('cart_sidebar').innerHTML = "";
    document.getElementById('cart_sidebar').innerHTML += SidebarComponent();
}

export const RenderSort = () => {
    document.getElementById('sort_div').innerHTML = "";
    document.getElementById('sort_div').innerHTML += SortComponent ();
}

export const RenderProductDetail = (json) => {
    document.getElementById('product_detail').innerHTML = "";
    let id = json.productoId;
    let img = json.productoImage;
    let name = json.productoNombre;
    let descrip = json.productoDescripcion;
    descrip = descrip.replaceAll('•', '<br>‣')
    let marca = json.productoMarca;
    let codigo = json.productoCodigo;
    let price = `$${json.productoPrecio}`;
    document.getElementById('product_detail').innerHTML += ProductDetailComponent(id,img,name,descrip,marca,codigo,price);
}

export const AddCartItem = (json) => {
    let cartItemsList = getCart();
    let id = json.productoId;
    let img = json.productoImage;
    let name = json.productoNombre;
    let marca = json.productoMarca;
    let price = `$${json.productoPrecio}`;
    if(!cartItemsList.some(e => e.id === id)){
        let cantidad = 0;
        if(location.href === 'http://localhost:3000/')
            cantidad = 1;
        else
            cantidad = document.getElementById('quantity').value;
        document.getElementById('main_sidebar').innerHTML += CartItemComponent(id,img,name,marca,price,cantidad);
        cartItemsList.push({id: id, quantity: parseInt(cantidad)});
        saveCart(cartItemsList);
    }
    else{
        let item = cartItemsList.find(e => e.id === id)
        document.getElementById('main_sidebar').innerHTML += CartItemComponent(id,img,name,marca,price,item.quantity);
    }
    CarritoCount();
}

export const RenderOrden = (json) => {
    let cartItemsList = getCart();
    let data = ordenDataCollect(json);
    document.getElementById('main_sidebar').innerHTML = "";
    cartItemsList = [];
    saveCart(cartItemsList);
    document.getElementById('main_sidebar').innerHTML += OrdenComponent(data[0],data[1],data[2],data[3],data[4]);
    document.getElementById('generate_order_sidebar').innerText = 'Orden generada';
    document.getElementById('generate_order_sidebar').disabled = true;
    document.querySelector("div.bottom-sidebar > h4.subtotal-sidebar").innerText = "Subtotal: $0"
}

export const RenderBalance = (json, from, to) => {
    let ordenes = [];
    const _ordenesSection = document.getElementById('ordenes_section');
    const _mensajeOrden = document.getElementById('mensaje_orden');
    _ordenesSection.innerHTML = "";
    _mensajeOrden.innerHTML = "";

    if(from.length > 11)
        _mensajeOrden.innerHTML += `<h4 class="ordenes-mostradas">Se muestran las órdenes del día de hoy.</h4>`
    else if(from === "" && to !== "")
        _mensajeOrden.innerHTML += `<h4 class="ordenes-mostradas">Se muestran todas las órdenes hasta el ${to}.</h4>`
    else if(from !== "" && to === "")
        _mensajeOrden.innerHTML += `<h4 class="ordenes-mostradas">Se muestran todas las órdenes desde el ${from}.</h4>`
    else if(from === "" && to === "")
        _mensajeOrden.innerHTML += `<h4 class="ordenes-mostradas">Se muestran todas las órdenes existentes.</h4>`
    else if(from !== "" && to !== "")
        _mensajeOrden.innerHTML += `<h4 class="ordenes-mostradas">Se muestran las órdenes desde el ${from} hasta el ${to}.</h4>`

    let recaudacion = `<h4 class="recaudacion">Recaudación: $${json.recaudacion}</h4>`;
    _mensajeOrden.innerHTML += recaudacion;
    for(let i=0; i<json.ordenes.length; i++)
        ordenes.push(ordenDataCollect(json.ordenes[i]));
    for(let i=0; i<ordenes.length; i++)
        document.getElementById('ordenes_section').innerHTML += OrdenComponent(ordenes[i][0],ordenes[i][1],ordenes[i][2],ordenes[i][3],ordenes[i][4]);
}

const ordenDataCollect = (json) => {
    let cartItemsList = getCart();
    let data = [];

    let ordenId = `<b>Orden ID:</b> ${json.ordenId}<br>`;
    let clienteInfo = [];
    clienteInfo.push('<b>Cliente:</b>')
    let productosInfo = [];
    clienteInfo.push(`DNI: ${json.clienteResponse.dni}`)
    clienteInfo.push(`Nombre: ${json.clienteResponse.name}`)
    clienteInfo.push(`Apellido: ${json.clienteResponse.lastname}`)
    clienteInfo.push(`Dirección: ${json.clienteResponse.address}`)
    clienteInfo.push(`Teléfono: ${json.clienteResponse.phoneNumber}`)

    for(let i=0; i<json.productosResponse.length; i++){
        productosInfo.push(`<b>Producto ${i+1}:</b>`)
        productosInfo.push(`${json.productosResponse[i].productoNombre}`)
        productosInfo.push(`${json.productosResponse[i].productoMarca}`)
        productosInfo.push(`Cod. ${json.productosResponse[i].productoCodigo}`)
        productosInfo.push(`$${json.productosResponse[i].productoPrecio}`)
        let localItem = cartItemsList.find(e => e.id === parseInt(`${json.productosResponse[i].productoId}`));
        if (localItem !== undefined){
            var cantidad = `Cant. (${localItem.quantity.toString()})`;
            productosInfo.push(cantidad);
        }
    }

    clienteInfo = clienteInfo.join('<br>‣')
    productosInfo = productosInfo.join(', ')
    productosInfo = productosInfo.replaceAll(':</b>,', ':</b>')
    productosInfo = productosInfo.replaceAll(', <b>Producto', '<br><b>Producto')
    let ordenFecha = new Date(json.ordenFecha);
    ordenFecha = `<b>Fecha:</b> ${ordenFecha.toString()}`;
    let ordenTotal = `<b>Total:</b> $${json.ordenTotal}`;

    data.push(ordenId,clienteInfo,productosInfo,ordenFecha,ordenTotal)
    return data;
}