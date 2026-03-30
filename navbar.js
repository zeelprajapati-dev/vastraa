document.addEventListener("DOMContentLoaded", () => {
  const navActions = document.querySelector(".nav-actions");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  navActions.innerHTML = "";

  if(user && user.name){
    const nameSpan = document.createElement("span");
    nameSpan.textContent = `Hi, ${user.name}`;
    nameSpan.style.marginRight = "10px";
    nameSpan.style.fontWeight = "600";

    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";
    logoutBtn.style.padding = "5px 10px";
    logoutBtn.style.cursor = "pointer";
    logoutBtn.style.border = "none";
    logoutBtn.style.borderRadius = "5px";
    logoutBtn.style.backgroundColor = "#333";
    logoutBtn.style.color = "#fff";
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.reload();
    });

    const cartLink = document.createElement("a");
    cartLink.href = "cart.html";
    cartLink.className = "icon";
    cartLink.innerHTML = `<i class="fa fa-shopping-cart"></i>`;

    const heartLink = document.createElement("a");
    heartLink.href = "heart.html";
    heartLink.className = "icon";
    heartLink.innerHTML = `<i class="fa fa-heart"></i>`;

    navActions.append(nameSpan, logoutBtn, cartLink, heartLink);
  } else {
    const signinLink = document.createElement("a");
    signinLink.href = "signin.html";
    signinLink.className = "icon";
    signinLink.innerHTML = `<i class="fa-regular fa-user"></i>`;

    const cartLink = document.createElement("a");
    cartLink.href = "cart.html";
    cartLink.className = "icon";
    cartLink.innerHTML = `<i class="fa fa-shopping-cart"></i>`;

    const heartLink = document.createElement("a");
    heartLink.href = "heart.html";
    heartLink.className = "icon";
    heartLink.innerHTML = `<i class="fa fa-heart"></i>`;

    navActions.append(signinLink, cartLink, heartLink);
  }
});

/* ADD TO CART FUNCTION */
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === name);
  if(existing){
    existing.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = 'cart.html';
}

/* LIKE / HEART FUNCTION */
const hearts = document.querySelectorAll(".heart");
let likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];

hearts.forEach(heart => {
  if(likedProducts.find(p => p.name === heart.dataset.name)){
    heart.classList.add("liked");
  }
});

hearts.forEach(heart => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("liked");
    const product = { name: heart.dataset.name, price: heart.dataset.price, image: heart.dataset.image };
    const index = likedProducts.findIndex(p => p.name === product.name);
    if(index === -1){ likedProducts.push(product); } 
    else { likedProducts.splice(index, 1); }
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const navActions = document.querySelector(".nav-actions");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  navActions.innerHTML = "";

  if (user && user.name) {
    const nameSpan = document.createElement("span");
    nameSpan.textContent = `Hi, ${user.name}`;
    nameSpan.style.marginRight = "10px";
    nameSpan.style.fontWeight = "600";
    nameSpan.style.color = "#333";

    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";
    logoutBtn.style.padding = "5px 10px";
    logoutBtn.style.cursor = "pointer";
    logoutBtn.style.border = "none";
    logoutBtn.style.borderRadius = "5px";
    logoutBtn.style.backgroundColor = "#333";
    logoutBtn.style.color = "#fff";

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.reload();
    });

    const cartLink = document.createElement("a");
    cartLink.href = "cart.html";
    cartLink.className = "icon";
    cartLink.innerHTML = `<i class="fa fa-shopping-cart"></i>`;

    const heartLink = document.createElement("a");
    heartLink.href = "heart.html";
    heartLink.className = "icon";
    heartLink.innerHTML = `<i class="fa fa-heart"></i>`;

    navActions.append(nameSpan, logoutBtn, cartLink, heartLink);
  } else {
    const signinLink = document.createElement("a");
    signinLink.href = "signin.html";
    signinLink.className = "icon";
    signinLink.innerHTML = `<i class="fa-regular fa-user"></i>`;

    const cartLink = document.createElement("a");
    cartLink.href = "cart.html";
    cartLink.className = "icon";
    cartLink.innerHTML = `<i class="fa fa-shopping-cart"></i>`;

    const heartLink = document.createElement("a");
    heartLink.href = "heart.html";
    heartLink.className = "icon";
    heartLink.innerHTML = `<i class="fa fa-heart"></i>`;

    navActions.append(signinLink, cartLink, heartLink);
  }
});
// Example: run this in browser console or in your sign-in submit function
localStorage.setItem(
  "loggedInUser",
  JSON.stringify({ name: fullname, email, password })
);

function searchProducts() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let products = document.querySelectorAll(".product-card");

  products.forEach(product => {
    let name = product.innerText.toLowerCase();
    product.style.display = name.includes(input) ? "block" : "none";
  });
}

document.getElementById("searchInput").addEventListener("keyup", searchProducts);
