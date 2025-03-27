//de-duplicating data or normalizing data as with product id, we'll get other details

import { cart, removeFromCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryoptions.js";

//usage of external libraries
console.log(dayjs());
const today = dayjs();
const deliveryDate = today.add(7, "days");
console.log(deliveryDate.format("dddd, MMMM D"));

let checkoutHTML = " ";

cart.forEach(cartItem => {
  const { productId } = cartItem;
  let matchingProduct;
  products.forEach(product => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  checkoutHTML += `
    <div class="cart-item-container
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
          Rs.${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link"
            data-product-id="${matchingProduct.id}">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link"
            data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct)}
          
        </div>
      </div>
    </div>

    
  
`;
});
document.querySelector(".js-order-summary").innerHTML = checkoutHTML;

//deleting the cart quantity from link
document.querySelectorAll(".delete-quantity-link").forEach(link => {
  link.addEventListener("click", () => {
    console.log("delete");
    const productId = link.dataset.productId;

    console.log(cart);

    // const container = document.querySelector(`.js-cart-item-container-${productId}`);
    // if (container) {
    //     container.remove();
    // }

    // calculateCartQuantity(); // Corrected placement
  });
});

//updating the quantity
document.querySelectorAll(".js-update-quantity-link").forEach(link => {
  link.addEventListener("click", () => {
    console.log("update");
    const productId = link.dataset.productId;

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    if (container) {
      container.remove();
    }

    calculateCartQuantity(); // Corrected placement
  });
});
function deliveryOptionsHTML(matchingProduct) {
  let deliveryhtml= '';
  deliveryOptions.forEach(deliveryOption => {
  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'

  );
  const dateString= deliveryDate.format(
    'dddd ,MMMM D'
  );

  const priceString = deliveryOption.priceCents=== 0?'FREE ':`Rs.${formatCurrency(deliveryOption.priceCents)}`;


  deliveryhtml +=
    `
    <div class="delivery-option">
    <input type="radio"
      checked
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.productId}">
    <div>
      <div class="delivery-option-date">
        ${dateString}
      </div>
      <div class="delivery-option-price">
        ${priceString} Shipping
      </div>
    </div>
  </div>
  `;
  });
  return deliveryhtml;
}

let cartQuantity = calculateCartQuantity();
document.querySelector(
  ".js-return-to-home-link"
).innerHTML = `${cartQuantity} items`;
