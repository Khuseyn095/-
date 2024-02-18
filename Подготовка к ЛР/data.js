let products = [
    {id: 1, title: 'Product1', description: 'Descriprtion1', price: 100},
    {id: 2, title: 'Product2', description: 'Descriprtion2', price: 200},
    {id: 3, title: 'Product3', description: 'Descriprtion3', price: 300},
    {id: 4, title: 'Product4', description: 'Descriprtion4', price: 400},
    {id: 5, title: 'Product5', description: 'Descriprtion5', price: 500},
    {id: 6, title: 'Product6', description: 'Descriprtion6', price: 600},
    {id: 7, title: 'Product7', description: 'Descriprtion7', price: 700},
    {id: 8, title: 'Product8', description: 'Descriprtion8', price: 800},
    {id: 9, title: 'Product9', description: 'Descriprtion9', price: 900},
    {id: 10, title: 'Product10', description: 'Descriprtion10', price: 1000},
]

let users = [
    {id:1, login: 'user1', password: '123', email: 'user1@email.ru'},
    {id:2, login: 'user2', password: '123', email: 'user2@email.ru'},
    {id:3, login: 'user3', password: '123', email: 'user3@email.ru'},
]

let carts = [
    {id:1, user_id: 1, products: [1,2], total_price: 300}
]

export {products, users, carts}