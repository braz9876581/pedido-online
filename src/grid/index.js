let cart = []

function addCartItem (item, price) {
    if (!isCartItem(item)) {
        cart.push({type: 'Cocada', item: item, price: price, qnt: 1})
    } else {
        cart.find( carts => {
            if (carts.item === item) {
                carts.qnt += 1
            }
        } )
    }
}

function takeCartItem (item, qnt) {
    let cartItem = cart.find(carts => carts.item === item);

    if (!cartItem) {
        return false
    }

    if (cartItem.qnt > Number(qnt)) {
        cartItem.qnt -= Number(qnt)
    } 
}

function isCartItem (item) {
    let cartItem = cart.find(carts => carts.item === item);
    if (cartItem) {
        return true
    }
    
    return false
}

function deleteCartItem (item) {
    if (isCartItem(item)) {
        cart = cart.filter(carts => carts.item != item)
    }
}

function getCart () {
    return cart;
}

function getCartTotale () {
    let totale = 0
    cart.map( carts => {
        totale += (carts.price*carts.qnt)
    })
    return totale
}

export const add = addCartItem;
export const take = takeCartItem;
export const carts = getCart;
export const total = getCartTotale;
export const del = deleteCartItem;

const listItems = [
    {type: 'Cocada', item: 'Cocada de Banana', price: 10, qnt: 1},
    {type: 'Cocada', item: 'Cocada de Chocolate', price: 10, qnt: 1},
    {type: 'Cocada', item: 'Cocada de Flocos', price: 13, qnt: 1},
    {type: 'Cocada', item: 'Cocada de Morango', price: 13, qnt: 1},
    {type: 'Cocada', item: 'Cocada de Baunilha', price: 13, qnt: 1},
    {type: 'Cocada', item: 'Cocada Mista', price: 13, qnt: 1},
]

export default listItems;