export const cart=[];

//data attribute- is just another html attribute
//allows us to attach any info to an element
//syntax for data attribute
// is just html attribute
// name=${value}
// have to start with "data-" then any name
// Eg data-product-name=${product.name}
// inside event listener function
// button.dataset.productName - here convert from kebab case to camel case

//addtoCart function
export function addToCart(productId,productName,productQuantity){
    let matchingItem;
    cart.forEach((cartItem)=>{
        if (productId === cartItem.productId){
            matchingItem =cartItem;
        }
    })
    if(matchingItem){
        matchingItem.quantity+=productQuantity;
    }else{
        cart.push({
            productId, //destructuring
            productName:productName,
            quantity:productQuantity
        })
    }
}