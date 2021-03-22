// функция запроса на промисах
function makeGETRequest(url, callback) {

    return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = () => resolve(callback(xhr.responseText));
        xhr.onerror = () => reject(xhr.statusText);
        xhr.open('GET', url, true);
        xhr.send();
    });
}

class api {
    constructor() {
        //получаем список товаров из внешнего источника
        this.url = '/goods.json';
    }
}

fetch(error, success) {
    let xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                success(JSON.parse(xhr.responseText));
            } else if (xhr.status > 400) {
                error('все пропало');
            }
        }
    }

    xhr.open('GET', this.url, true);
    xhr.send();
};

fetchPromise() {
    return new Promise((resolve, reject) => {
        this.fetch(reject, resolve)
    })
};

// класс элемента списка товара
class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
        this.id = id;
    }

    getHtml() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}
// вешаем на конопку корзины обработчик событий
class Header {
    constructor() {
        this.$container = document.querySelector('header');
        this.$button = this.$container.querySelector('.cart-button');
    }

    setButtonHandler(callback) {
        this.$button.addEventListener('click', callback);
    }
}

// класс списка товаров
class GoodsList {
    constructor() {
        //this.api = new ApiMock();
        this.api = new Api();
        this.$goodsList = document.querySelector('.goods-list');
        this.goods = [];
    }

    // fetchGoods() {
    //     this.goods = this.api.fetch().map(({ title, price }) => new GoodsItem(title, price));
    // }

    const fetch = this.api.fetchPromise(){

    fetch.then((data) => { this.onFetchSuccess(data) })
        .catch((err) => { this.onFetchError(err) });

    console.log(fetch);
};


onFetchSuccess(data) {
    this.goods = data.map(({ title, price }) => new GoodsItem(title, price));
    this.render();
}

onFetchError(err) {
    this.$goodsList.insertAdjacentHTML('beforeend', `<h3>${err}</h3>`);
}

render() {
    this.$goodsList.textContent = '';
    this.goods.forEach((good) => {
        this.$goodsList.insertAdjacentHTML('beforeend', good.getHtml());
    })
}

summGoodsList() {
    let summ = 0;
    summ = this.goods.reduce(function (firstValue, secondValue) {
        return firstValue + secondValue.price;
    }, 0);
    console.log(summ);
}
}

function openCart() {
    console.log('cart');
}

const header = new Header();

header.setButtonHandler(cart.openCartHandler);

// Внешняя функция для вызова добавления в корзину
function addBasket(id) {
    cart.addToBasket(id);
};
// Внешняя функция для вызова удаления из корзины
function deleteItem(id) {
    cart.deleteFromBasket(id);
};
// Внешняя функция для вызова рендера корзины
function viewCart() {
    cart.render();
};

// Функция, которая при нажатии кнопки делает запрос по ссылке, указанной в аргументе
function loadBut() {
    const element = event.target;
    const src = element.getAttribute('data-load');
    list.fetchGoods(src);
}

// Класс элемента корзины
class BasketItem {
    constructor(id, title, price,) {
        this.id = id;
        this.title = title;
        this.price = price;

    }
    render() {
        return `<div class="basket-item"><div class="basket-info"><h3>${this.title}</h3><p>${this.price}</p></div><button class='deleteItem' onclick='deleteItem(${this.id})'>&times;</button></div>`;
    }
}

// Класс корзины
class Basket {
    constructor() {
        this.cartGoods = [];
    }
    // Добавление товара в корзину (привязываем на нажатие кнопки)
    addToBasket(id) {
        let toBasket;
        list.goods.forEach(function (item) {
            if (id == item.id) {
                toBasket = {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                }
            }
        });
        this.cartGoods.push(toBasket);
        this.basketCount();
    }

    // Удаление товара из корзины (привязываем на нажатие кнопки)
    deleteFromBasket(id) {
        let getIdElemen;
        this.cartGoods.forEach(function (item, i) {
            let thisId = item.id;
            if (id == thisId) {
                getIdElemen = i;
            }

        });
        this.cartGoods.splice(getIdElemen, 1);
        this.render();
        this.basketCount();
    }

    // Считаем стоимость товаров в корзине
    calcAllGoods() {
        let totalPrice = 0;
        this.cartGoods.forEach((good) => {
            if (good.price !== undefined) {
                totalPrice += good.price;
            }
        });
        let totalGoodsAnswer = "Общая сумма товаров в корзине: $" + totalPrice;
        document.querySelector('.goods-total').innerHTML = totalGoodsAnswer;
    }

    // Считаем количество товаров в корзине и выводим на кнопку
    basketCount() {
        let count = this.cartGoods.length;
        document.getElementById('cartcoint').innerHTML = ' (' + count + ')';
    }

    // Рендер динамического содержимого корзины
    render() {
        let readHtml = '';
        this.cartGoods.forEach((good) => {
            const goodItem = new BasketItem(good.id, good.title, good.price, good.img);
            readHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = readHtml;
        this.calcAllGoods();
    }
}




const list = new GoodsList();
const cart = new Basket();
list.fetchGoods('response.json');