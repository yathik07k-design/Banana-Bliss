// =========================
// BANANA BLISS
// =========================

// CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;
let customerLocation = "";

// =========================
// ADD TO CART
// =========================

function addToCart(name, price){

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(product => product.name === name);

    if(item){
        item.qty++;
    }else{
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
}


// =========================
// UPDATE CART
// =========================

function updateCart(){

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItems = document.getElementById("cartItems");
    const totalAmount = document.getElementById("total");
    const cartCount = document.getElementById("cartCount");

    total = 0;

    if(cartItems){

        cartItems.innerHTML = "";

        if(cart.length === 0){

            cartItems.innerHTML = "<p>Your cart is empty.</p>";

        }else{

            cart.forEach((item,index)=>{

                total += item.price * item.qty;

                cartItems.innerHTML += `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong><br>
                        ₹${item.price} × ${item.qty} =
                        <strong>₹${item.price * item.qty}</strong>
                    </div>

                    <div class="qty-box">
                        <button onclick="decreaseQty(${index})">➖</button>
                        <span>${item.qty}</span>
                        <button onclick="increaseQty(${index})">➕</button>
                    </div>
                </div>
                `;

            });

        }

    }

    if(totalAmount){
        totalAmount.innerHTML = total;
    }

    if(cartCount){
        let count = 0;

        cart.forEach(item=>{
            count += item.qty;
        });

        cartCount.innerHTML = count;
    }

}

// =========================
// QUANTITY
// =========================

function increaseQty(index){

    cart[index].qty++;

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

}

function decreaseQty(index){

    cart[index].qty--;

    if(cart[index].qty <= 0){
        cart.splice(index,1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();

}
// =========================
// SEARCH PRODUCTS
// =========================

function searchProducts(){

    let input = document.getElementById("searchBox");

    if(!input) return;

    input = input.value.toLowerCase();

    let products = document.querySelectorAll(".product-card");

    products.forEach(function(product){

        let text = product.innerText.toLowerCase();

        if(text.includes(input)){
            product.style.display = "block";
        }else{
            product.style.display = "none";
        }

    });

}

// =========================
// SAVE ADDRESS
// =========================

function saveAddress(){

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if(name==="" || phone==="" || address===""){
        alert("Please fill all details.");
        return;
    }

    const user = {
        name: name,
        phone: phone,
        address: address
    };

    localStorage.setItem("customer", JSON.stringify(user));

    loadAddress();

}

// =========================
// LOAD ADDRESS
// =========================

function loadAddress(){

    const user = JSON.parse(localStorage.getItem("customer"));

    const addressForm = document.getElementById("addressForm");
    const savedAddress = document.getElementById("savedAddress");

    if(!user){

        if(addressForm) addressForm.style.display = "block";
        if(savedAddress) savedAddress.style.display = "none";

        return;
    }

    if(document.getElementById("name")){
        document.getElementById("name").value = user.name;
    }

    if(document.getElementById("phone")){
        document.getElementById("phone").value = user.phone;
    }

    if(document.getElementById("address")){
        document.getElementById("address").value = user.address;
    }

    if(addressForm) addressForm.style.display = "none";
    if(savedAddress) savedAddress.style.display = "block";

    if(document.getElementById("showName")){
        document.getElementById("showName").innerHTML = "👤 " + user.name;
    }

    if(document.getElementById("showPhone")){
        document.getElementById("showPhone").innerHTML = "📞 " + user.phone;
    }

    if(document.getElementById("showAddress")){
        document.getElementById("showAddress").innerHTML = "🏠 " + user.address;
    }
}

// =========================
// EDIT ADDRESS
// =========================

function editAddress(){

    if(document.getElementById("addressForm"))
        document.getElementById("addressForm").style.display = "block";

    if(document.getElementById("savedAddress"))
        document.getElementById("savedAddress").style.display = "none";

}

// =========================
// SHOW / HIDE UPI
// =========================

function toggleUPI(){

    const payment = document.getElementById("payment");
    const upiBox = document.getElementById("upiBox");

    if(payment.value === "UPI"){
        upiBox.style.display = "block";
    }else{
        upiBox.style.display = "none";
    }

}
// =========================
// GO TO PAYMENT
// =========================

function goToPayment(){

    if(cart.length === 0){
        alert("Your cart is empty.");
        return;
    }

    window.location.href = "payment.html";

}
// =========================
// GO TO REVIEW
// =========================

function goToReview(){

    const payment = document.getElementById("payment").value;

    localStorage.setItem("paymentMethod", payment);

    if(document.getElementById("txnId")){
        localStorage.setItem(
            "txnId",
            document.getElementById("txnId").value
        );
    }

    window.location.href = "review.html";

}

// =========================
// PLACE ORDER
// =========================

function placeOrder(){

    const user = JSON.parse(localStorage.getItem("customer"));

    if(!user){
        alert("Please save your address first.");
        return;
    }

    const payment = localStorage.getItem("paymentMethod");
   
    if(cart.length === 0){
        alert("Your cart is empty.");
        return;
    }

    let message = "🍌 Banana Bliss Order\n\n";

    message += "👤 Name : " + user.name + "\n";
    message += "📞 Phone : " + user.phone + "\n";
    message += "🏠 Address : " + user.address + "\n";
    message += "💳 Payment : " + payment + "\n";

    const savedLocation = localStorage.getItem("customerLocation") || "";

if(savedLocation !== ""){
    message += "📍 Location : " + savedLocation + "\n";
}

    message += "\n🛒 Order Items\n\n";

    total = 0;

    cart.forEach(function(item){

        total += item.price * item.qty;

        message += item.name +
        " × " + item.qty +
        " = ₹" + (item.price * item.qty) + "\n";

    });

    message += "\n💰 Total : ₹" + total;

// Save Order
const orders = JSON.parse(localStorage.getItem("orders")) || [];

orders.push({
    id: orders.length + 1,
    date: new Date().toLocaleString(),
    total: total,
    payment: payment,
    items: [...cart]
});

localStorage.setItem("orders", JSON.stringify(orders));

const phoneNumber = "919741432959";

window.open(
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        encodeURIComponent(message),
        "_blank"
    );

    localStorage.removeItem("cart");

    cart = [];

    updateCart();

    setTimeout(function(){

        window.location.href = "success.html";

    },1000);

}
// =========================
// CHECKOUT ORDER SUMMARY
// =========================

function loadCheckout(){

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    const summary = document.getElementById("orderSummary");
    const checkoutTotal = document.getElementById("checkoutTotal");

    if(!summary || !checkoutTotal) return;

    summary.innerHTML = "";

    let grandTotal = 0;

    if(cart.length === 0){
        summary.innerHTML = "<p>Your cart is empty.</p>";
        checkoutTotal.innerHTML = "0";
        return;
    }

    cart.forEach(function(item){

        const itemTotal = item.price * item.qty;

        grandTotal += itemTotal;

        summary.innerHTML += `
        <div class="summary-item">
            <span>${item.name} × ${item.qty} =</span>
            <strong>₹${itemTotal}</strong>
        </div>
        `;
    });

    checkoutTotal.innerHTML = grandTotal;
}

// =========================
// PAGE INITIALIZATION
// =========================

window.onload = function(){

    updateCart();

    loadAddress();

    loadCheckout();

    if(document.getElementById("payment")){
        toggleUPI();
    }

};
function getLocation() {

    const status = document.getElementById("locationStatus");

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    if (status) {
        status.innerHTML = "Getting location...";
    }

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            customerLocation =
                "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lng;

            // Save location
            localStorage.setItem("customerLocation", customerLocation);

            if (status) {
                status.innerHTML = "✅ Location Captured";
            }

        },

        function(error) {

            if (status) {
                status.innerHTML = "❌ " + error.message;
            }

        },

        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }

    );
}
function payUPI(){

    const amount = total;

    const upiURL =
        "upi://pay?pa=9741432959@ybl" +
        "&pn=Banana Bliss" +
        "&am=" + amount +
        "&cu=INR";

    window.location.href = upiURL;

}
