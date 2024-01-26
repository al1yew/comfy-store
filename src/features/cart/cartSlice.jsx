import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;

      const item = state.cartItems.find((i) => i.cartId === product.cartId);

      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;

      cartSlice.caseReducers.calculateTotals(state); // we have to pass in state, as we do not call this reudcer from other components. others are passed from others, and we pass state inside you know

      toast.success("Item added to cart.");
    },
    clearCart: (state) => {
      localStorage.getItem("cart", JSON.stringify(defaultState));

      return defaultState;
    },
    removeItem: (state, action) => {
      const { cartId } = action.payload;
      const product = state.cartId.find((i) => i.cartId === cartId);
      state.cartItems = state.cartItems.filter((i) => i.cartId != cartId);
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state); // we have to pass in state, as we do not call this reudcer from other components. others are passed from others, and we pass state inside you know
      toast.warning("Item deleted from cart.");
    },
    editItem: (state, action) => {
      const { cartId, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartId === cartId);

      state.numItemsInCart += amount - item.amount; //understand the logic

      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;

      cartSlice.caseReducers.calculateTotals(state); // we have to pass in state, as we do not call this reudcer from other components. others are passed from others, and we pass state inside you know
      toast.success("Cart updated.");
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;

/*
vse nacinaetsa s togo shto mi sozdaem cartSlice. tut budut nashi reducer funkcii.
reducer funkcii budut vnutri createSlice
u nas takje est default state, i funkciya getcart from localstorage shto b sayt zagruzka olanda set elemek
vse poxoje na usereducer.
v create slice mi pishem funkcii, eto ti ponimaesh

v singleProduct.jsx mi ispolzuyem dispatch, shto b ispolzovat funkcii iz createSlice
zovem addItem funkciyu, i otpravlayem v neqo product pri najatii na knopku add to cart

shto b vse eto rabotalo, nado obazatelno v main.jsx vse zasunut vnutr <Provider></Provider> 
i otpravit tuda nash store. store.js derjit v sebe nash cartReducer, i mojet vrode derjat vse 
ostalnie reduceri toje, vot eto ya neznayu no mi budem delat User, tam ponatno budet
ya shas na serii 487

znacit ya ponal, shto store.js eto obshak, mi tak ukazivayem vse nashi slice,
i user tam budet, i cart tam budet, vse tam

koroche snachala sozdayem features/user/userSlice
tam vse sozdayem, initial state, createSlice, vnutri reducers,
potom delayem export, eto kak nash usereducer budet
potom idem v store.js i tam dobavlayem svoy noviy reducer
vse na etom gotovo, dalshe ostayetsa tolko delat funkcional
bolshe ne nujno zapixivat <Provider></Provider> nebilim ne, Providere biz
ancag store-mizi pass edirik, toest eto ne kak context, mi tut vse druq v druqa 
ne zapixivayem, vse svoi reduceri xranim v store.js, i oboracivayem nash
main.jsx tolko v odin provider, ktoroiy beret v seba store.js 
*/
