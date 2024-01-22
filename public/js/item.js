const addToCartBtn = document.querySelector('.item__submit-btn');
const input = document.querySelector('.item__input');

addToCartBtn.addEventListener("click", (event)=> {
    event.preventDefault();
    const quantity = Number(document.forms["item__form"]["item__quantity"].value);
    const item = {
        "product": JSON.parse(sessionStorage.getItem("currentItem")),
        "quantity": quantity
    };
    addToCart(item)
})

const addToCart = (item) => {
    let cart = JSON.parse(sessionStorage.getItem("cart"));
    if (cart) {
        let foundIndex = findItemIndexInCart(item, cart);
        foundIndex != -1 ? 
            cart[foundIndex].quantity = +cart[foundIndex].quantity + +item.quantity : 
            cart.push(item);
    }
    else 
        cart = [item];
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

const findItemIndexInCart = (newItem, cart) => {
    const foundIndex = cart.findIndex( item => item.product.product_id === newItem.product.product_id );
    return foundIndex
}