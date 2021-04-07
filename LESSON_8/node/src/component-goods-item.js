export default Vue.component('goodsItem', {
    // Создание нового компонента
    template: `<div :data-id="id" class="goods-item">
        <div class="good-item-img-placeholder"></div>
        <h3>{{ title }}</h3>
        <p>{{ price }}</p>
        <button class="good-item-button" @click="addToCart">Купить</button>
      </div>`,
    props: ['title', 'price', 'id'], // задаем параметры компонента
    methods: {
      addToCart() {
        this.$emit('addToCart', this.id);
      },
    },
  });