let menus = [
    {   "amount": 1,
        "title": "Cheeseburger",
        "icon": "icon/plus.svg",
        "description": "mit 100g saftigem Rindfleischpatty, Käse, Hamburgersauce und Ketchup", 
        "basePrice": 5.60,
        "price": 5.60,
    },
    {
        "amount": 1,
        "title": "Pizza Salami",
        "icon": "icon/plus.svg",
        "description": "mit Mozzarella, Tomatensauce und Salami", 
        "basePrice": 7.90,
        "price": 7.90,
    },
    {
        "amount": 1,
        "title": "Gyros",
        "icon": "icon/plus.svg",
        "description": "mit Tzatziki, Oliven und Blattsalat", 
        "basePrice": 12.00,
        "price": 12.00,
    },
    {
        "amount": 1,
        "title": "Mini Frühlingsrollen (6 Stück)",
        "icon": "icon/plus.svg",
        "description": "gefüllter Teig mit Weißkohl, Karotten, Erbsen, Zwiebeln, Glasnudeln und Sesamöl", 
        "basePrice": 3.90,
        "price": 3.90,
    },
    {
        "amount": 1,
        "title": "Mozzarella Sticks (6 Stück)",
        "icon": "icon/plus.svg",
        "description": "mit Chillisauce", 
        "basePrice": 4.50,
        "price": 4.50,
    },
    {
        "amount": 1,
        "title": "Gemischter Salat",
        "icon": "icon/plus.svg",
        "description": "mit Salat, Tomaten, Gurken, Karotten und Mais", 
        "basePrice": 7.95,
        "price": 7.95,
    },
    {
        "amount": 1,
        "title": "Calzone Regina",
        "icon": "icon/plus.svg",
        "description": "mir Vorderschinken und Champignons", 
        "basePrice": 10.95,
        "price": 10.95,
    },
    {
        "amount": 1,
        "title": "Lasagne",
        "icon": "icon/plus.svg",
        "description": "mit Rinderhackfleisch, Bechamelsauce und Käse überbacken", 
        "basePrice": 10.95,
        "price": 10.95,
    },
    {
        "amount": 1,
        "title": "Ofenkartoffel",
        "icon": "icon/plus.svg",
        "description": "mit Butter, Lauch und Sahnesauce", 
        "basePrice": 7.50,
        "price": 7.50,
    },
    {
        "amount": 1,
        "title": "Wakame",
        "icon": "icon/plus.svg",
        "description": "Seealgensalat mit Sesam", 
        "basePrice": 5.50,
        "price": 5.50,
    },
];

let menusDeepCopy = JSON.parse(JSON.stringify(menus));
let menusInCart = [];
loadMenusInCart();

function renderMenus() {
    document.getElementById('menusId').innerHTML = '';

    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        let toFixedPrice = menu['price'].toFixed(2);

        document.getElementById('menusId').innerHTML += `
    <div class="menu-css">
      <div class="menu-info">
          <span class="menu-title">${menu['title']}</span>
          <span class="menu-description">${menu['description']}</span>
          <span class="menu-price">${toFixedPrice} €</span>
      </div>
        <img onclick="addToCart(${i})" class="menu-plus-icon" src="${menu['icon']}">
    </div>
        `;
    }
}

function renderCart() {
    document.getElementById('productsInCart').innerHTML = '';

    for (let i = 0; i < menusInCart.length; i++) {
        const menuInCart = menusInCart[i];
        let toFixedPrice = menuInCart['price'].toFixed(2);

        document.getElementById('productsInCart').innerHTML += `
        <div class="menu-in-cart">
          <div class="title-and-amount-div">
            <span id="amount${i}" class="amount">${menuInCart['amount']}</span>
            <span class="title-in-cart"> ${menuInCart['title']}</span>
          </div>
          <div class="right-cart-side">
            <div class="minus-and-plus">
              <div id="minus" class="plus-minus" onclick="minus(${i})">-</div>
              <div id="plus" class="plus-minus" onclick="plus(${i})">+</div>
            </div>
            <div class="price-and-icon">
              <span class="price-in-cart">${toFixedPrice} €</span>
              <img class="trash-icon" onclick="deleteMenuInCart(${i})" src="icon/trash-can.svg">
            </div>
          </div>
        </div>
        `;
    }
    check();
    emptyCart();
}

function addToCart(i) {

    for (let m = 0; m < menusInCart.length; m++) {

        if (menus[i]['title'] === menusInCart[m]['title']) {
            plus(m);
            return;
        }        
    }
    menusInCart.push(menusDeepCopy[i]);

    renderCart();
    saveMenusInCart();
}

function saveMenusInCart() {
    let cartString = JSON.stringify(menusInCart);
    localStorage.setItem('menusInCart', cartString)
}

function loadMenusInCart() {
    let cartString = localStorage.getItem('menusInCart');
    if (cartString) {
        menusInCart = JSON.parse(cartString);
    }
}

function emptyCart() {
    let empty = document.getElementById('productsInCart');
    if (empty.innerHTML === '') {
        empty.innerHTML = `
        <span class="empty-cart">Füge ein Menü hinzu :D</span>
        `;
    }
}

function plus(i) {
    let currentAmount = menusInCart[i]['amount'];
    let resultAmount = currentAmount + 1;
    menusInCart[i]['amount'] = resultAmount;

    let basePrice = menusInCart[i]['basePrice'];
    let currentPrice = menusInCart[i]['price'];
    let resutPrice = currentPrice + basePrice;
    menusInCart[i]['price'] = resutPrice; 

    renderCart();
    saveMenusInCart();
}

function minus(i) {
    let currentAmount = menusInCart[i]['amount'];
    let resultAmount = currentAmount - 1;
    menusInCart[i]['amount'] = resultAmount;

    let basePrice = menusInCart[i]['basePrice'];
    let currentPrice = menusInCart[i]['price'];
    let resutPrice = currentPrice - basePrice;
    menusInCart[i]['price'] = resutPrice;

    if (resultAmount <= 0) {
        menusInCart[i]['amount'] = 1;
        menusInCart[i]['price'] = basePrice;
        menusInCart.splice(i, 1);
    }

    renderCart();
    saveMenusInCart();
}

function deleteMenuInCart(i) {
    let basePrice = menusInCart[i]['basePrice'];
    menusInCart[i]['price'] = basePrice;

    menusInCart[i]['amount'] = 1;
    menusInCart.splice(i, 1);

    renderCart();
    saveMenusInCart();
}

function check() {
    let subtotal = 0;
    for (let i = 0; i < menusInCart.length; i++) {
        subtotal += parseFloat(menusInCart[i]['price']);
    }

    document.getElementById('subtotal').innerHTML = `
        ${subtotal.toFixed(2)} €
    `;

    if (subtotal === 0) {
        document.getElementById('delivery').innerHTML = `
            0.00 €
        `;        
    } else {
        document.getElementById('delivery').innerHTML = `
            2.00 €
        `;
    }

    if (subtotal === 0) {
        document.getElementById('total').innerHTML = `
            0.00 €
        `;
        cartBtn(subtotal);
    } else {
        let sum = subtotal + 2;
        document.getElementById('total').innerHTML = `
            ${sum.toFixed(2)} €
        `;
        cartBtn(subtotal);
    }
}

function cartBtn(s) {
    let activeBtn = document.getElementById('cartBtn');

    if (s > 0) {
        activeBtn.classList.add('blue-btn');
        
    } else {
        activeBtn.classList.remove('blue-btn');
    }
}

function openOrderedSection() {
    let activeBtn = document.getElementById('cartBtn');
    if (activeBtn.classList.contains('blue-btn')) {
        document.getElementById('menusId').classList.add('d-none');
        document.getElementById('cart').classList.add('d-none');
        document.getElementById('ordered').classList.remove('d-none');

        menusInCart = [];
        menusDeepCopy = JSON.parse(JSON.stringify(menus));
        saveMenusInCart();
    }

}

function cartIcon() {
    let cart = document.getElementById('cartIcon');

    if (cart.classList == ('')) {
        cart.classList.add('icon-filter');
        document.getElementById('menusId').classList.add('d-none');
        document.getElementById('cart').classList.remove('d-none-cart');  
    } else {
        cart.classList.remove('icon-filter');
        document.getElementById('menusId').classList.remove('d-none');
        document.getElementById('cart').classList.add('d-none-cart');
    }

}