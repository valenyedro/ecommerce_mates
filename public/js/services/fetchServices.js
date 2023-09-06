const UrlBase = 'https://localhost:7035/api'

export const GetAllProductos = (callback, errorCallback) => {
    let success = false;
    fetch(`${UrlBase}/productos`)
    .then((httpResponse) => {
        if (httpResponse.ok)
            return httpResponse.json()
    })
    .then((body) => {
        callback(body);
        success = true
    })
    if (!success)
        errorCallback();
}

export const GetProductosFiltrados = (name, sort, callback, errorCallback) => {
    let UrlFinal = '/productos';
    if(name !== null && sort !== null)
        UrlFinal += `?name=${name}&sort=${sort}`;
    else if(name !== null && sort === null)
        UrlFinal += `?name=${name}`;
    else if(name === null && sort !== null)
        UrlFinal += `?sort=${sort}`;
    fetch(`${UrlBase}${UrlFinal}`)
    .then((httpResponse) => {
        if (httpResponse.ok)
            return httpResponse.json()
    })
    .then((body) => {
        if (body === undefined)
            errorCallback();
        else
            callback(body);
    })
}

export const GetProductoById = (id,callback, errorCallback) => {
    let success = false;
    fetch(`${UrlBase}/productos/${id}`)
    .then((httpResponse) => {
        if (httpResponse.ok)
            return httpResponse.json()
    })
    .then((body) => {
        callback(body);
        success = true;
    })
    if (!success)
        errorCallback();
}

export const AddProductToCart = (idProduct, cantidad, callback, errorCallback) => {
    fetch(`${UrlBase}/carrito`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "clientId": 1,
            "productId": parseInt(idProduct),
            "amount": parseInt(cantidad)
        })
    })
    .then((httpResponse) => {
        if (httpResponse.ok)
            return httpResponse.json()
    })
    .then((body) => {
        if (body === undefined)
            errorCallback();
        else
            callback(body);
    })
}

export const ModifyProductQuantity = (idProduct, cantidad) => {
    fetch(`${UrlBase}/carrito`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "clientId": 1,
            "productId": parseInt(idProduct),
            "amount": parseInt(cantidad)
        })
    })
    .then((httpResponse) => {
        if (httpResponse.ok)
            return httpResponse.json()
    })
}

export const DeleteProductFromCart = (idProduct) => {
    fetch(`${UrlBase}/carrito/${1}/${idProduct}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "clientId": 1,
            "productId": parseInt(idProduct)
        })
    })
    .then((httpResponse) => {
        if (httpResponse.ok)
            return httpResponse.json()
    })
}

export const GenerateOrder = (idCliente, callback, errorCallback) => {
    fetch(`${UrlBase}/orden/${idCliente}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "clientId": idCliente,
        })
    })
    .then((httpResponse) => {
        if (httpResponse.ok)
            return httpResponse.json()
    })
    .then((body) => {
        if(body === undefined)
            errorCallback();
        else
            callback(body);
    })
}

export const GetOrdenes = (from, to, callback, errorCallback) => {
    let UrlFinal = '/orden';
    if(from !== "" && to !== "")
        UrlFinal += `?from=${from.replaceAll('/','%2F')}&to=${to.replaceAll('/','%2F')}`;
    else if(from !== "" && to === "")
        UrlFinal += `?from=${from.replaceAll('/','%2F')}`;
    else if(from === "" && to !== "")
        UrlFinal += `?to=${to.replaceAll('/','%2F')}`;
    fetch(`${UrlBase}${UrlFinal}`)
    .then((httpResponse) => {
        if (httpResponse.ok)
            return httpResponse.json()
    })
    .then((body) => {
        if (body === undefined)
            errorCallback();
        else
            callback(body, from, to);
    })
}
