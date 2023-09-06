export const ProductDetailComponent = (id, image, nombre, descripcion, marca, codigo, precio) => `
    <div class="main-product" id="mainproduct_${id}">
        <div class="zoom-area" id="zoom_area">
            <img class="main-product--img" src="${image}"></img>
        </div>
        <ul class="main-product--list">
            <li><p class="main-product--title">${nombre}</p></li>
            <li><p class="main-product--price">${precio}</p></li>
            <li><p class="main-product--descrip">${descripcion}</p></li>
            <li><p class="main-product--marcaycod"><b>Marca:</b> ${marca}</p></li>
            <li><p class="main-product--marcaycod"><b>Código:</b> ${codigo}</p></li>
            <li class="quantity-div">
                <p class="main-product--quantity"><b>Cantidad:</b> </p>
                <input type="number" class="quantity" id="quantity" value="1" min="1" max="100" maxlength="3">
                <div>
                    <button class="add-to-cart" id="add_to_cart">Añadir al carrito</button>
                <div>
            </li> 
        </ul>
    </div>
`