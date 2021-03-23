const API_URL = '/goods.json';

const vue = new Vue({
    el: "#app",
    data: {
        goods: [],
        filtredGoods: [],
        search: ''
    },
    methods: {
        searchHandler() {
            if (this.search === '') {
                this.filtredGoods = this.goods;
            }
            const regexp = new RegExp(this.search, 'gi');
            this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
        },

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

            xhr.open('GET', API_URL, true);
            xhr.send();
        },
        fetchPromise() {

            return new Promise((resolve, reject) => {
                this.fetch(reject, resolve)
            })
        }
    },
    mounted() {
        this.fetchPromise()
            .then(data => {
                this.goods = data;
                this.filtredGoods = data;
            })
            .catch(err => {
                console.log(err);
            })
    }
}

})

// задание 3* заглушка для пустого списка товаров 
//добавил заголовок, в index.html <h1 v-if="filtredGoods.length = 0">"Шеф, все пропало"</h1>