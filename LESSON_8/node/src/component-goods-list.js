export default Vue.component('goodsList', {
    template: `<div class="goods-list">
                  <goods-item
                    v-for="good in goods"
                    :title="good.title"
                    :price="good.price"
                    :id="good.id"
                    @addToCart="addToCartHandler"
                  />
                </div>`,
    props: {
      goods: Array,
    },
    methods: {
      addToCartHandler(id) {
        this.$emit('addToCart', id);
      },
    },
  });
  