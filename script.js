// Scroll Reveal

AOS.init();

// HAMBURGER TOGGLE

var hamburger = document.querySelector(".hamburger");
var mobileMenu = document.querySelector(".mobile-menu");
var overlay = document.getElementById("overlay");

overlay.addEventListener("click", () => {
  mobileMenu.classList.remove("mobile-menu-active");
  overlay.style.display = "none";
  hamburger.innerHTML = `<i class="fa-solid fa-bars"></i>`;
});

hamburger.addEventListener("click", (e) => {
  const isActive = mobileMenu.classList.contains("mobile-menu-active");

  if (isActive) {
    hamburger.innerHTML = `<i class="fa-solid fa-bars"></i>`;
    overlay.style.display = "none";
    e.preventDefault();
  } else {
    hamburger.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    overlay.style.display = "block";
    e.preventDefault();
  }

  mobileMenu.classList.toggle("mobile-menu-active");
});

// CART ITEM

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeCartBtn = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");
const cartValue = document.querySelector(".cart-value");

cartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cartTab.classList.toggle("cart-tab-active");
});

closeCartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cartTab.classList.remove("cart-tab-active");
});

hamburger.addEventListener("click", () => {
  cartTab.classList.remove("cart-tab-active");
});

let productList = [];
let cartProduct = [];

const updateTotal = () => {
  let totalPrice = 0;
  let totalQuantity = 0;

  document.querySelectorAll(".item").forEach((item) => {
    const quantity = parseInt(
      item.querySelector(".quantity-value").textContent
    );
    const price = parseFloat(
      item
        .querySelector(".item-total")
        .textContent.replace("₹", "")
        .replace(",", "")
    );
    totalPrice += price;
    totalQuantity += quantity;
  });

  cartTotal.textContent = `₹${totalPrice.toFixed(2)}`;
  cartValue.textContent = totalQuantity;
};

const showCards = () => {
  productList.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");

    orderCard.innerHTML = `<div class="card-image">
                <img src="${product.image}" alt="">
              </div>
              <h4>${product.name}</h4>
              <h4 class="price">₹${parseFloat(
                product.price.replace("₹", "").replace("$", "")
              ).toFixed(2)}</h4>
              <a href="#" class="btn card-btn" >Add to Cart</a>`;

    cardList.appendChild(orderCard);

    const cardBtn = orderCard.querySelector(".card-btn");

    cardBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
};

const addToCart = (product) => {
  const existingProduct = cartProduct.find((item) => item.id === product.id);
  if (existingProduct) {
    alert("Item already in your Cart");
    return;
  }

  cartProduct.push(product);

  let quantity = 1;
  let price = parseFloat(product.price.replace("₹", "").replace("$", ""));

  const cartItem = document.createElement("div");
  cartItem.classList.add("item");

  cartItem.innerHTML = `<div class="item-image">
                  <img src="${product.image}" alt="">
                </div>
                <div class="detail">
                  <h4>${product.name}</h4>
                  <h4 class="item-total">₹${price.toFixed(2)}</h4>
                </div>
                <div class="flex">
                <a href="#" class="quantity-btn minus"><i class="fa-solid fa-minus"></i></a>
                <h4 class="quantity-value">${quantity}</h4>
                <a href="#" class="quantity-btn plus"><i class="fa-solid fa-plus"></i></a>
                </div>`;

  cartList.appendChild(cartItem);
  updateTotal();

  const plusBtn = cartItem.querySelector(".plus");
  const minusBtn = cartItem.querySelector(".minus");
  const quantityValue = cartItem.querySelector(".quantity-value");
  const itemTotal = cartItem.querySelector(".item-total");

  plusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `₹${(price * quantity).toFixed(2)}`;
    updateTotal();
  });

  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `₹${(price * quantity).toFixed(2)}`;
      updateTotal();
    } else {
      cartItem.classList.add("slide-out");
      setTimeout(() => {
        cartItem.remove();
        cartProduct = cartProduct.filter((item) => item.id !== product.id);
        updateTotal();
      }, 200);
    }
  });
};

const initApp = () => {
  fetch("products.json")
    .then((Response) => Response.json())
    .then((data) => {
      productList = data;
      showCards();
    });
};

initApp();

// SWIPER JS

var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next-review-btn",
    prevEl: "#prev-review-btn",
  },
});
