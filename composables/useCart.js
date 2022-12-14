import { acceptHMRUpdate, defineStore } from "pinia";
export const useCart = defineStore("cart", {
  state: () => {
    return {
      cartItems: [],
      settings:{
        isOpen: false,
      }
    };
  },
  getters: {
    countCartItems() {
      return this.cartItems.reduce((accumulator, item) => {
        return accumulator + item.quantity;
      }, 0);
    },
    getCartItems() {
      return this.cartItems;
    },
    getCartAmount() {
      return this.cartItems.reduce((accumulator, item) => {
        return accumulator + (item.price * item.quantity);
      }, 0);
    },
    isOpen() {
      return this.settings.isOpen;
    }
  },
  actions: {
    addToCart(item) {
      let index = this.cartItems.findIndex((product) => product._id === item._id);
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
      } else {
        item.quantity = 1;
        this.cartItems.push(item);
      }
    },
    incrementQ(item) {
      let index = this.cartItems.findIndex((product) => product._id === item._id);
      if (index !== -1) {
        this.cartItems[index].quantity += 1;
      }
    },
    decrementQ(item) {
      let index = this.cartItems.findIndex((product) => product._id === item._id);
      if (index !== -1) {
        this.cartItems[index].quantity -= 1;
        if (this.cartItems[index].quantity === 0) {
          this.cartItems = this.cartItems.filter(
            (product) => product._id !== item._id
          );
        }
      }
    },
    removeFromCart(item) {
      this.cartItems = this.cartItems.filter(
        (product) => product._id !== item._id
      );
    },
    open() {
      this.settings.isOpen = true;
    },
    close() {
      this.settings.isOpen = false;
    }
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCart, import.meta.hot));
