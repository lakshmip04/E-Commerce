export const cart=[
    {
        
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 
        productName:"Black and Gray Athletic Cotton Socks - 6 Pairs",
        quantity:3
        
      },
      {
    
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d", 
        productName:"Intermediate Size Basketball",
        quantity:5
      }
];

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