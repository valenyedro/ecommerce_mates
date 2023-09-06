export const HeaderComponent = () => `
    <nav class="nav"> 
    <ul>
        <li class="prods"><a href="http://localhost:3000/" target="">Productos</a></li>
        <li class="instagram-header"><a href="https://www.instagram.com/matesberazategui/" target="_blank">Instagram</a></li>
        <li class="logo-li"><a href="http://localhost:3000/"><img src="https://i.imgur.com/UIhWZy5.png" alt="Mates Berazategui" class="logo"></a></li>
        <li class="admin"><a href="http://localhost:3000/admin">Administrador</a></li>
        <li class="search">
            <div class="search-div">
                <button class="button-search" id="button_search" ></button>
                <input type="text" class="input-search" id="input_search" value="" placeholder="Buscar...">
                <button class="button-deletesearch" id="button_deletesearch" ></button>
            </div>
        </li>
        <li class="cart">
            <button class="button-cart" id="button_cart"><span class="cart-count" id="cart_count">0</span></button>
        </li>
    </ul>
    </nav>
    
    <div class="buen-mate-div">
        <h4 class="buen-mate-h4">AL MAL TIEMPO, UN BUEN MATE</h4>
    </div>
`