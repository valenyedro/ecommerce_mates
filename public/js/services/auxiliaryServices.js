import { getCart } from "../services/storageServices.js";

export const GetParametro = () => {
    let urlParam = window.location.href;
    urlParam = urlParam.substring(31, urlParam.length);
    return urlParam;
}

export const CarritoCount = () => {
    let cantidadProd = getCart().length
    let spanCount = document.querySelector('.header > nav > ul > li.cart > button.button-cart > span.cart-count')
    spanCount.innerText = cantidadProd;
}

export const showNotification = (notiTitle, notiText, notiType) => {
    const notification = document.createElement('div');
    const container = document.querySelector('.notification-container');
    notification.innerHTML = `<b>${notiTitle}</b><br>${notiText}`;
    notification.classList.add('notification');
    container.appendChild(notification);
    if(notiType === 'error')
        notification.style.backgroundColor = 'var(--red-light)';
    else if(notiType === 'success')
        notification.style.backgroundColor = 'var(--green-light)'
    container.addEventListener('click', () => {
        notification.style.animation = 'notiOut 0.2s';
    })
    setTimeout(() => {
      container.removeChild(notification);
    }, 3000)
  }