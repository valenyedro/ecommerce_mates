export const OrdenComponent = (ordenId, clienteInfo, productosInfo, ordenFecha, ordenTotal) => `
    <div class="orden">
        <p class="orden-id">${ordenId}</p>
        <p class="orden-cliente">${clienteInfo}</p>
        <p class="orden-productos">${productosInfo}</p>
        <p class="orden-fecha">${ordenFecha}</p>
        <p class="orden-total">${ordenTotal}</p>
    </div>
`