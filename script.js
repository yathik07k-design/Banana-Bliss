// =========================
// CART
// =========================

let cart = [];
let total = 0;
let customerLocation = "";

// =========================
// ADD TO CART
// =========================

function addToCart(name, price) {

    cart.push({
        name,
        price
    });

    total += price;

    updateCart();

}

// =========================
// UPDATE CART
// =========================

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    const totalAmount = document.getElementById("total");

    const cartCount = document.getElementById("cartCount");

    if(cart.length===0){

        cartItems.innerHTML="<p>Your cart is empty.</p>";

    }

    else{

        cartItems.innerHTML="";

        cart.forEach((item,index)=>{

            cartItems.innerHTML +=`

            <div class="cart-item">

            <div>

            <strong>${item.name}</strong>

            <br>

            ₹${item.price}

            </div>

            <button onclick="removeItem(${index})">

            Remove

            </button>

            </div>

            `;

        });

    }

    totalAmount.innerText=total;

    cartCount.innerText=cart.length;

}

// =========================
// REMOVE ITEM
// =========================

function removeItem(index){

    total -= cart[index].price;

    cart.splice(index,1);

    updateCart();

}

// =========================
// SEARCH PRODUCTS
// =========================

function searchProducts(){

    let input=document.getElementById("searchBox").value.toLowerCase();

    let products=document.querySelectorAll(".product-card");

    products.forEach(function(product){

        let text=product.innerText.toLowerCase();

        if(text.includes(input)){

            product.style.display="block";

        }

        else{

            product.style.display="none";

        }

    });

}

// =========================
// SHOW / HIDE UPI
// =========================

function toggleUPI(){

    let payment=document.getElementById("payment").value;

    let upiBox=document.getElementById("upiBox");

    if(payment==="UPI"){

        upiBox.style.display="block";

    }

    else{

        upiBox.style.display="none";

    }

}

// =========================
// LIVE LOCATION
// =========================

function getLocation(){

    if(navigator.geolocation){

        document.getElementById("locationStatus").innerHTML="Getting location...";

        navigator.geolocation.getCurrentPosition(

            function(position){

                let lat=position.coords.latitude;

                let lng=position.coords.longitude;

                customerLocation="https://www.google.com/maps?q="+lat+","+lng;

                document.getElementById("locationStatus").innerHTML="✅ Location Captured";

            },

            function(){

                document.getElementById("locationStatus").innerHTML="❌ Location Permission Denied";

            }

        );

    }

    else{

        alert("Geolocation not supported.");

    }

}

// =========================
// PLACE ORDER
// =========================

function placeOrder(){

    let name=document.getElementById("name").value;

    let phone=document.getElementById("phone").value;

    let address=document.getElementById("address").value;

    let payment=document.getElementById("payment").value;

    let txn="";

    if(document.getElementById("txnId")){

        txn=document.getElementById("txnId").value;

    }

    if(name==""){

        alert("Enter Name");

        return;

    }

    if(phone==""){

        alert("Enter Phone Number");

        return;

    }

    if(address==""){

        alert("Enter Address");

        return;

    }

    if(cart.length==0){

        alert("Cart is Empty");

        return;

    }

    let message="🍌 Banana Bliss Order\n\n";

    message+="👤 Name : "+name+"\n";

    message+="📞 Phone : "+phone+"\n";

    message+="🏠 Address : "+address+"\n";

    message+="💳 Payment : "+payment+"\n";

    if(payment==="UPI"){

        message+="🧾 Transaction ID : "+txn+"\n";

    }

    if(customerLocation!=""){

        message+="📍 Location : "+customerLocation+"\n";

    }

    message+="\n🛒 Order Items\n\n";

    cart.forEach(function(item){

        message+=item.name+" - ₹"+item.price+"\n";

    });

    message+="\n💰 Total : ₹"+total;

    let url="https://wa.me/919741432959?text="+encodeURIComponent(message);

    window.open(url,"_blank");

}
