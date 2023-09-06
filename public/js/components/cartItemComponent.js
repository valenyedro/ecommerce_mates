export const CartItemComponent = (id,image,nombre,marca,precio,cantidad) => `
    <div class="cart-item" id="cart_item${id}">
        <img class="cart-item--img" src="${image}"></img>
        <ul class="cart-item--list">
            <li><p class="cart-item--descrip"><b>Producto:</b> ${nombre}</p></li>
            <li><p class="cart-item--descrip"><b>Marca:</b> ${marca}</p></li>
            <li class="precio--li"><p class="cart-item--precio"><b>Precio:</b> ${precio}</p></li>
            <li class="cantidad--li"><p class="cart-item--cantidad"><b>Cantidad:</b> ${cantidad}</p></li>
            <li class="cart-item--buttons">
                <button class="restar-producto" id="restar_producto"></button>
                <button class="sumar-producto" id="sumar_producto" ></button>
                <button class="delete-producto" id="delete_producto"></button>
            </li>
        </ul>
    </div>
`