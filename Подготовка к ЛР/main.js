import { products, users, carts } from './data.js';

let isAuth = false;
let user_id = null;

let wrap = document.querySelector('.wrap');

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});

let header = document.createElement('header');
document.body.prepend(header);

let menu = document.createElement('ul');
menu.classList.add('menu');
header.prepend(menu);

let li_login = document.createElement('li');
let li_reg = document.createElement('li');
let li_cart = document.createElement('li');
let li_logout = document.createElement('li');
let li_home = document.createElement('li');
let li_products = document.createElement('li');

function checkAuth(){
    if (isAuth){
        li_home.remove();
        li_reg.remove();
        li_login.remove();
        menu.append(li_home);
        menu.append(li_cart);
        menu.append(li_logout);
    } else {
        li_home.remove();
        li_cart.remove();
        li_logout.remove();
        menu.append(li_home);
        menu.append(li_reg);
        menu.append(li_login);
    }
}
checkAuth();

li_login.innerHTML = "<a href='#' class='menu__item'>Login</a>";
li_reg.innerHTML = "<a href='#' class='menu__item'>Registration</a>";
li_home.innerHTML = "<a href='#' class='menu__item'>Home</a>";
li_logout.innerHTML = "<a href='#' class='menu__item'>Logout</a>";
li_cart.innerHTML = "<a href='#' class='menu__item'>Cart</a>";
li_products.innerHTML = "<a href='#' class='menu__item'>Products</a>";

li_login.addEventListener('click', showLogin);
li_reg.addEventListener('click', showRegistration);
li_home.addEventListener('click', showHome);
li_logout.addEventListener('click', logout);
li_cart.addEventListener('click', showCart);
li_products.addEventListener('click', showProducts);

function showLogin(event){
    event.preventDefault();
    let loginForm = document.createElement('form');
    loginForm.innerHTML = `
        <input type="text" id="login" placeholder="Логин" required>
        <input type="password" id="password" placeholder="Пароль" required>
        <button type="submit">Войти</button>
    `;
    wrap.innerHTML = '';
    wrap.appendChild(loginForm);
    loginForm.addEventListener('submit', login);
}

function showRegistration(event){
    event.preventDefault();
    let regForm = document.createElement('form');
    regForm.innerHTML = `
        <input type="text" id="reg-login" placeholder="Логин" required>
        <input type="password" id="reg-password" placeholder="Пароль" required>
        <input type="email" id="reg-email" placeholder="Email" required>
        <button type="submit">Зарегистрироваться</button>
    `;
    wrap.innerHTML = '';
    wrap.appendChild(regForm);
    regForm.addEventListener('submit', register);
}

function login(event){
    event.preventDefault();
    let login = document.getElementById('login').value;
    let password = document.getElementById('password').value;
    let foundUser = users.find(user => user.login === login && user.password === password);
    if(foundUser){
        isAuth = true;
        user_id = foundUser.id;
        checkAuth();
        document.getElementById('login').value = '';
        document.getElementById('password').value = '';
    } else {
        alert('Неверный логин или пароль');
    }
}

function register(event){
    event.preventDefault();
    let login = document.getElementById('reg-login').value;
    let password = document.getElementById('reg-password').value;
    let email = document.getElementById('reg-email').value;
    let existingUser = users.find(user => user.login === login);
    if(existingUser){
        alert('Пользователь с таким логином уже существует');
    } else {
        let newUserId = users.length + 1;
        users.push({id: newUserId, login: login, password: password, email: email});
        isAuth = true;
        user_id = newUserId;
        checkAuth();
        document.getElementById('reg-login').value = '';
        document.getElementById('reg-password').value = '';
        document.getElementById('reg-email').value = '';
    }
}

function logout(event){
    event.preventDefault();
    isAuth = false;
    user_id = null;
    checkAuth();
}

function showHome(event){
    event.preventDefault();
    wrap.innerHTML = '';
    let row = document.createElement('div');
    row.classList.add('row');
    wrap.append(row);
    products.forEach(product => {
        row.insertAdjacentHTML('beforeend',
            `<div class='product__card'>
                <h4 class='title'> ${product.title}</h4>
                <p class='description'> ${product.description}</p>
                <p class='price'> ${product.price} Руб. </p>
                <button class='btn' data-product-id='${product.id}'>Добавить в корзину</button>
            </div>`
        );
    });
    let btns = row.querySelectorAll('.btn');
    for (let i=0; i<btns.length; i++){
        let btn = btns[i];
        btn.addEventListener('click', () => {
            if (user_id){
                let cartIndex = carts.findIndex(cart => cart.user_id === user_id);
                if (cartIndex !== -1) {
                    carts[cartIndex].products.push(products[i]);
                } else {
                    carts.push({id: carts.length + 1, user_id: user_id, products: [products[i]]});
                }
            }
            console.log(carts);
        });
    }
}

function showCart(event){
    event.preventDefault();
    wrap.innerHTML = '';
    let total = 0;
    let row = document.createElement('div');
    row.classList.add('cart__row');
    wrap.append(row);
    let userCart = carts.find(cart => cart.user_id === user_id);
    if (userCart) {
        userCart.products.forEach(product => {
            row.insertAdjacentHTML('beforeend', 
            `<div class='cart__card'>
                <h4 class='cart__title'> ${product.title}</h4>
                <p class='cart__price'> ${product.price} Руб. </p>
            </div>`);
            total += product.price;
        });
    }
    let prevTotal = document.querySelector('.total__price');
    if(prevTotal) {
        prevTotal.remove();
    }
    wrap.insertAdjacentHTML('afterend',
    `<div class='total__price'> 
        <h4> Общая стоимость </h4>
        <p> ${total} Руб.</p>
    </div>
    `);
}

function showProducts(event){
    event.preventDefault();
    wrap.innerHTML = '';
    let row = document.createElement('div');
    row.classList.add('row');
    wrap.append(row);
    products.forEach(product => {
        row.insertAdjacentHTML('beforeend',
            `<div class='product__card'>
                <h4 class='title'> ${product.title}</h4>
                <p class='description'> ${product.description}</p>
                <p class='price'> ${product.price} Руб. </p>
                <button class='btn' data-product-id='${product.id}'>Добавить в корзину</button>
            </div>`
        );
    });
    let btns = row.querySelectorAll('.btn');
    for (let i=0; i<btns.length; i++){
        let btn = btns[i];
        btn.addEventListener('click', () => {
            if (user_id){
                let cartIndex = carts.findIndex(cart => cart.user_id === user_id);
                if (cartIndex !== -1) {
                    carts[cartIndex].products.push(products[i]);
                } else {
                    carts.push({id: carts.length + 1, user_id: user_id, products: [products[i]]});
                }
            }
            console.log(carts);
        });
    }
}
