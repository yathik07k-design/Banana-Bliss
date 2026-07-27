let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById("cartItems");
    let totalPrice = document.getElementById("total");
    let cartCount = document.getElementById("cartCount");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            cartItems.innerHTML += `
                <div style="margin:10px;padding:10px;border-bottom:1px solid #ddd;">
                    <b>${item.name}</b><br>
                    ₹${item.price}
                    <button onclick="removeItem(${index})" style="margin-left:15px;background:red;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;">
                        Remove
                    </button>
                </div>
            `;
        });
    }

    totalPrice.innerText = total;
    cartCount.innerText = cart.length;
}

function removeItem(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

function searchProducts() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let products = document.querySelectorAll(".product-card");

    products.forEach(product => {
        let title = product.querySelector("h3").innerText.toLowerCase();

        if (title.includes(input)) {
            product.style.display = "inline-block";
        } else {
            product.style.display = "none";
        }
    });
}

function placeOrder() {

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let message =
`🍌 Banana Bliss Order

Name: ${name}
Phone: ${phone}
Address: ${address}

Order:
`;

    cart.forEach(item => {
        message += `• ${item.name} - ₹${item.price}\n`;
    });

    message += `\nTotal: ₹${total}`;

    let url = "https://wa.me/919741432959?text=" + encodeURIComponent(message);

    window.open(url, "_blank");
}
