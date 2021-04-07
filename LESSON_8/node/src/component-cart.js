export default Vue.component('cart', {
    template: `<div class="cartWrapper">
                  <button class="cart-button" @click="openCartHandler" type="button">Корзина ({{totalCount}}|{{totalPrice}}р)</button>
                  <div class="cartPopup" v-if="isVisibleCart">
                    <div class="emptyCartDisclaimer" v-if="!cartItems.length">Корзина пуста</div>
                    <table v-if="cartItems.length" class="cartItemsTable">
                          <tr class="cartTableHeader">
                            <td>Название</td>
                            <td>Количество</td>
                            <td>Цена</td>
                            <td>Сумма</td>
                            <td></td>
                          </tr>
                          <cart-item
                            v-for="good in cartItems"
                            :title="good.title"
                            :price="good.price"
                            :id="good.id"
                            :quantity="good.quantity"
                            @remove="removeHandler"
                            @increaseQuantity="increaseHandler"
                            @decreaseQuantity="decreaseHandler"
                          />
                    </table>
                  </div>
               </div>`,
  
    props: {
      cartItems: Array,
    },
  
    data() {
      return {
        isVisibleCart: false,
      };
    },
  
    computed: {
      totalCount() {
        return this.cartItems.reduce((acc, { quantity }) => acc + quantity, 0);
      },
  
      totalPrice() {
        return this.cartItems.reduce(
          (acc, { price, quantity }) => acc + price * quantity,
          0,
        );
      },
    },
  
    methods: {
      openCartHandler() {
        this.isVisibleCart = !this.isVisibleCart;
      },
  
      increaseHandler(id) {
        this.$emit('increaseQuantity', id);
      },
  
      decreaseHandler(id) {
        this.$emit('decreaseQuantity', id);
      },
  
      removeHandler(id) {
        this.$emit('remove', id);
      },
    },
  });