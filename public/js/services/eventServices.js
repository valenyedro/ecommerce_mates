import { saveCart, getCart } from "../services/storageServices.js";
import { AddCartItem, RenderOrden, RenderProductosOrdenados, RenderBalance } from "../services/renderServices.js"
import { NoProductsFound, NoOrdenesFound } from "../services/errorServices.js"
import { GetParametro, CarritoCount, showNotification } from "../services/auxiliaryServices.js"
import { DeleteProductFromCart, ModifyProductQuantity, GenerateOrder, AddProductToCart,
         GetProductoById, GetProductosFiltrados, GetOrdenes } from "../services/fetchServices.js";

export const CarritoEvents = () => {
    let cartItemsList = getCart();
    document.getElementById('cart_sidebar').addEventListener('click', function(e) {
        if(e.target && e.target.classList.contains('sumar-producto')){
            let listProduct = e.target.parentNode.parentNode;
            for (let i = 0; i < listProduct.children.length; i++) {
                if(listProduct.children[i].classList.contains('cantidad--li')){
                    let item = listProduct.children[i].firstChild;
                    let idProducto = parseInt(listProduct.parentNode.id.substring(9, listProduct.parentNode.id.length));
                    let cantidad = parseInt(item.innerText.substring(10, item.innerText.length)) + 1;
                    ModifyProductQuantity(idProducto, cantidad);
                    
                    cartItemsList = getCart();
                    let localItem = cartItemsList.find(e => e.id === idProducto);
                    localItem.quantity = parseInt(localItem.quantity) + 1;
                    saveCart(cartItemsList);
    
                    item.innerHTML = `<b>Cantidad:</b> ${cantidad}`;
                }
              }
        }
        else if(e.target && e.target.classList.contains('restar-producto')){
            let listProduct = e.target.parentNode.parentNode;
            for (let i = 0; i < listProduct.children.length; i++) {
                if(listProduct.children[i].classList.contains('cantidad--li')){
                    let item = listProduct.children[i].firstChild;
                    let idProducto = parseInt(listProduct.parentNode.id.substring(9, listProduct.parentNode.id.length));
                    let cantidad = parseInt(item.innerText.substring(10, item.innerText.length)) - 1;
                    if(cantidad >= 1){
                        ModifyProductQuantity(idProducto, cantidad);
                        cartItemsList = getCart();
                        let localItem = cartItemsList.find(e => e.id === idProducto);
                        localItem.quantity = parseInt(localItem.quantity) - 1;
                        saveCart(cartItemsList);
                        item.innerHTML = `<b>Cantidad:</b> ${cantidad}`;
                    }
                }
              }
        }
        else if(e.target && e.target.classList.contains('delete-producto')){
            let mainSidebar = e.target.parentNode.parentNode.parentNode.parentNode;
            let item = e.target.parentNode.parentNode.parentNode;
            let idProduct = item.id.substring(9, item.id.length);
            DeleteProductFromCart(idProduct);
            cartItemsList = getCart();
            cartItemsList = cartItemsList.filter(e => e.id !== parseInt(idProduct));
            saveCart(cartItemsList);
            mainSidebar.removeChild(item);
        }
        else if(e.target && e.target.classList.contains('generate-order-sidebar')){
            GenerateOrder(1, RenderOrden, () => {showNotification('Petición inválida', 'Para generar la orden, primero agregue productos a su carrito.', 'error')});
        }
        CarritoCount();
    })
}

export const ProductZoomEvent = () => {
    document.getElementById('main_product_section').addEventListener('mousemove', function(e) {
        if(e.target && e.target.classList.contains('zoom-area')){
            let div = e.target;
            let image = e.target.children[0];
    
            let mouseX = e.clientX - div.offsetLeft;
            let mouseY = e.clientY - div.offsetTop;
    
            let mWidth = div.offsetWidth;
            let mHeight = div.offsetHeight;
    
            mouseX = mouseX / mWidth * 100;
            mouseY = mouseY / mHeight * 100;
            image.style.transform = `translate(-${mouseX}%,-${mouseY}%) scale(2)`;
    
            div.addEventListener('mouseleave', function(e) {
                if(e.target && e.target.classList.contains('zoom-area')){
                    e.target.children[0].style.transform = `translate(-50%,-50%) scale(1)`;
                }
            })
        }
    })
} 

export const AddToCartEvent = () => {
    if(location.href.includes('http://localhost:3000/producto/')){
        document.getElementById('main_product_section').addEventListener('click', function(e) {
            if(e.target && e.target.classList.contains('add-to-cart')){
                let cantidad = document.getElementById('quantity').value;
                AddProductToCart(GetParametro(), cantidad, () => (GetProductoById(GetParametro(), AddCartItem, () => {showNotification('Producto agregado al carrito', 'El producto fue agregado exitosamente.', 'success')}))
                                ,() => {showNotification('Producto ya existente', 'El producto ya está en el carrito. Puedes modificar allí la cantidad.', 'error')});
                document.getElementById('generate_order_sidebar').innerText = 'Finalizar Compra';
                document.getElementById('generate_order_sidebar').disabled = false;
            }
        })
    }
    else if(location.href === 'http://localhost:3000/'){
        document.getElementById('prod_cards').addEventListener('click', function(e) {
            if(e.target && e.target.classList.contains('card-cart')){
                let idProducto = e.target.parentNode.id.substring(5, e.target.parentNode.id.length);
                AddProductToCart(parseInt(idProducto), 1, () => (GetProductoById(parseInt(idProducto), AddCartItem, () => {showNotification('Producto agregado al carrito', 'El producto fue agregado exitosamente.', 'success')}))
                                ,() => {showNotification('Producto ya existente', 'El producto ya está en el carrito. Puedes modificar allí la cantidad.', 'error')});
                document.getElementById('generate_order_sidebar').innerText = 'Finalizar Compra';
                document.getElementById('generate_order_sidebar').disabled = false;
            }
        })
    }
}

export const LinkCardsEvent = () => {
    let _sectionCards;
    if(location.href === 'http://localhost:3000/')
        _sectionCards = document.getElementById('prod_cards');
    else if(location.href.includes('http://localhost:3000/producto/'))
        _sectionCards = document.querySelector('.main-prod-section')
    _sectionCards.addEventListener('click', function(e) {
        if(e.target && e.target.classList.contains('card')){
            let idProductoACargar = e.target.id;
            idProductoACargar = idProductoACargar.substring(5, idProductoACargar.length);
            e.target.parentNode.setAttribute('href', `/producto/${idProductoACargar}`);
        }
        else if(e.target && e.target.classList.contains('foto-card')){
            let idProductoACargar = e.target.parentNode.id;
            idProductoACargar = idProductoACargar.substring(5, idProductoACargar.length);
            e.target.parentNode.parentNode.setAttribute('href', `/producto/${idProductoACargar}`);
        }
    })
}

export const SubtotalEvent = () => {
    const _sidebar = document.getElementById('cart_sidebar');
    const _buttonCart = document.getElementById('button_cart');
    const _sidebarAndButton = [_sidebar, _buttonCart];
    for(let i=0; i<_sidebarAndButton.length; i++){
        _sidebarAndButton[i].addEventListener('click', function() {
            let _preciosElements = document.querySelectorAll("div.main-sidebar > div.cart-item > ul.cart-item--list > li.precio--li > p.cart-item--precio");
            let _cantidadesElements = document.querySelectorAll("div.main-sidebar > div.cart-item > ul.cart-item--list > li.cantidad--li > p.cart-item--cantidad");
            let subtotal = 0;
            let precios = [];
            let cantidades = []
            for(let i=0; i<_preciosElements.length; i++){
                precios.push(parseInt(_preciosElements[i].innerText.substring(9, _preciosElements[i].innerText.length)))
                cantidades.push(parseInt(_cantidadesElements[i].innerText.substring(10, _cantidadesElements[i].innerText.length)))
            }
            for(let i=0; i<precios.length; i++){
                subtotal += precios[i] * cantidades[i]
            }
            let _subtotalElement = document.querySelector("div.bottom-sidebar > h4.subtotal-sidebar")
            _subtotalElement.innerText = `Subtotal: $${subtotal}`;
        })
    }
}

const GeneralButtonsEvents = () => {
    document.getElementById('button_deletesearch').addEventListener('click', function() {
        document.getElementById('input_search').value = '';
    })
    document.getElementById('input_search').addEventListener('keypress', function(e) {
        if (e.key === 'Enter')
            document.getElementById('button_search').click()
    })
    document.getElementById('button_cart').addEventListener('click', function() {
        document.getElementById('cart_sidebar').classList.toggle('active');
    })
    document.getElementById('exit_cart').addEventListener('click', function() {
        document.getElementById('cart_sidebar').classList.toggle('active');
    })
}

export const IndexOnloadEvents = () => {
    document.getElementById('sort_checkbox').addEventListener('change', function() {
        let name = document.getElementById('input_search').value;
        if (this.checked) {
            GetProductosFiltrados(name, false, RenderProductosOrdenados, NoProductsFound)
            document.getElementById('label_sort_texto').innerHTML = 'Mayor precio primero'
        } else {
            GetProductosFiltrados(name, true, RenderProductosOrdenados, NoProductsFound)
            document.getElementById('label_sort_texto').innerHTML = 'Menor precio primero'
        }   
      });
    
    document.getElementById('button_search').addEventListener('click', function() {
        let name = document.getElementById('input_search').value;
        GetProductosFiltrados(name, true, RenderProductosOrdenados, NoProductsFound)
        window.scrollTo({
            top: 770, 
            behavior: "smooth"
        });
        document.getElementById('label_sort_texto').innerHTML = 'Menor precio primero'
    })
    
    GeneralButtonsEvents();
    LinkCardsEvent();
    CarritoEvents();
    AddToCartEvent();
    SubtotalEvent();
    CarritoCount();
}

export const ProductoOnloadEvents = () => {
    document.getElementById('button_search').addEventListener('click', function() {
        window.location.href = 'http://localhost:3000/';
    })

    GeneralButtonsEvents();
    CarritoEvents();
    ProductZoomEvent();
    AddToCartEvent();
    SubtotalEvent();
    LinkCardsEvent();
    CarritoCount();
}

export const AdminOnloadEvents = () => {
    document.getElementById('button_search').addEventListener('click', function() {
        window.location.href = 'http://localhost:3000/';
    })
    document.getElementById('button_ordenes').addEventListener('click', function() {
        let from = document.getElementById('from');
        let to = document.getElementById('to');
        GetOrdenes(from.value,to.value, RenderBalance, NoOrdenesFound(true))
    })

    GeneralButtonsEvents();
    CarritoEvents();
    SubtotalEvent();
    CarritoCount();
}