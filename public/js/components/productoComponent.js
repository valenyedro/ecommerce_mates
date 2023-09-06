export const ProductoComponent = (nombre, precio, image, id) => `
    <a class="producto-link">
        <div class="card" id="card_${id}">
            <img class="foto-card" src="${image}"></img>
            <p class="nombre-card">${nombre}</p>
            <p class="precio-card">${precio}</p>
            <button class="card-cart" id="card_cart"></button>
        </div>
    </a>
`;

export const SortComponent = () => `
    <div class="inside-sort-div">
        <input type="checkbox" class="sort-check" id="sort_checkbox">
        <label for="sort_checkbox" class="label-sort"></label>
        <label for="sort_checkbox" class="label-sort-texto" id="label_sort_texto">Menor/Mayor precio</label>
    </div>
`