const translations = {

en: {
    home: "Home",
    menu: "Menu",
    cart: "🛒 Cart",
    checkout: "Checkout",
    contact: "Contact",
    orders: "My Orders",
    orderNow: "🍌 Order Now",
    heroTitle: "Fresh Banana Puddings",
    heroSub: "Creamy • Fresh • Delicious",
    search: "🔍 Search Products...",
},

kn: {
    home: "ಮುಖಪುಟ",
    menu: "ಮೆನು",
    cart: "🛒 ಕಾರ್ಟ್",
    checkout: "ಪಾವತಿ",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    orderNow: "🍌 ಈಗ ಆರ್ಡರ್ ಮಾಡಿ",
    orders: "ನನ್ನ ಆದೇಶಗಳು",
    heroTitle: "ತಾಜಾ ಬಾಳೆಹಣ್ಣಿನ ಪುಡಿಂಗ್‌ಗಳು",
    heroSub: "ಕ್ರೀಮಿ • ತಾಜಾ • ರುಚಿಕರ",
    search: "🔍 ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ...",
    
},

hi: {
    home: "होम",
    menu: "मेनू",
    cart: "🛒 कार्ट",
    checkout: "चेकआउट",
    contact: "संपर्क करें",
    orderNow: "🍌 अभी ऑर्डर करें",
    orders: "मेरे ऑर्डर",
    heroTitle: "ताज़ा केले की पुडिंग",
    heroSub: "क्रीमी • ताज़ा • स्वादिष्ट",
    search: "🔍 उत्पाद खोजें...",
}

};

function changeLanguage(){

    const lang = document.getElementById("language").value;

    localStorage.setItem("language", lang);

    applyLanguage();

}

function applyLanguage(){

    const lang = localStorage.getItem("language") || "en";

    if(document.getElementById("language")){
        document.getElementById("language").value = lang;
    }

    document.querySelectorAll("[data-lang]").forEach(element=>{

        const key = element.getAttribute("data-lang");

       if(translations[lang][key]){

    if(element.hasAttribute("data-placeholder")){
        element.placeholder = translations[lang][key];
    }else{
        element.innerHTML = translations[lang][key];
    }

}
    });
    document.querySelectorAll("[data-placeholder]").forEach(element=>{

    const key = element.getAttribute("data-placeholder");

    if(translations[lang][key]){
        element.placeholder = translations[lang][key];
    }

});

}
applyLanguage();