//variable to save the data

//object to represent each product-groups multiple values together
//array datastructure was used
let productsHTML='';

products.forEach((product)=>{
    productsHTML+=
    `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            Rs.${((product.priceCents/100)*80).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-name="${product.name}" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    </div>
        `;
        
        
})
let timeoutId;
document.querySelector('.js-products-grid').innerHTML=productsHTML;
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click',()=>{
        console.log('added product');
        let matchingItem;
        
        const {productName} = button.dataset; //destructuring
        const productId= button.dataset.productId;
        // Get the correct quantity dropdown inside the specific product container
        const productContainer = button.closest('.product-container');
        const productQuantity = Number(productContainer.querySelector('.js-quantity-selector').value);
        console.log(productQuantity)
        
        cart.forEach((item)=>{
            if (productId == item.productId){
                matchingItem =item;
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
        let cartQuantity=0;
        cart.forEach((item)=>{
            cartQuantity+=item.quantity;
            
        })
        console.log(cart);
        console.log(cartQuantity);

        document.querySelector('.js-cart-quantity').innerHTML=cartQuantity

        const addedEle=productContainer.querySelector('.added-to-cart');
        addedEle.classList.add("changeOpacity");
        
        clearTimeout(timeoutId);
        timeoutId=setTimeout(()=>{
            addedEle.classList.remove("changeOpacity")
        },2000);
    })
})
//if its in cart update
//not in cart , add to cart