class ApiMock {
    constructor() {

    }

    fetch() {
        return [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }
}

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    getHtml() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.api = new ApiMock();
        this.$goodsList = document.querySelector('.goods-list');
        this.goods = [];
    }

    fetchGoods() {
        this.goods = this.api.fetch().map(({ title, price }) => new GoodsItem(title, price));
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

const goodsList = new GoodsList();

goodsList.fetchGoods();
goodsList.render();
goodsList.summGoodsList();

//==========================================================================//
// 1) класс список товаров корзины
class goodsListBasket {
    // прототипом будет являться class GoodsList
    //title:
    //price:
    //quantity: - добавим новое свойство (количество)
    // МЕТОДЫ
    // добавление в корзину через обработчик событий .oneklick => prompt("введите количество"), после этого запускаем метод  fetchGoods()
    // удаление из корзины
    //отрисовка наследуется из render

}
// 2) класс - счетчик корзины
class counterBasket {
    //totalSKU:  будет выводить количество наименований товаров(строк списка)в корзине
    //totalSumm:  будет выводить итоговую сумму
}