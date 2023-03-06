import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  deliveryAddress: localStorage.getItem("deliveryAddress")
    ? JSON.parse(localStorage.getItem("deliveryAddress"))
    : {},
  paymentMethod: localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : "",
  loading: false,
  success: false,
  error: false,
  message: "",
};

// add item to cart
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (id, thunkAPI) => {
    try {
      return await cartService.addItemToCart(id);
    } catch (error) {
      const message = "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItemFromCart: (state, action) => {
      const remainingCartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      state.cartItems = remainingCartItems;

      // save cartItems to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
      localStorage.setItem(
        "deliveryAddress",
        JSON.stringify(state.deliveryAddress)
      );
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(state.paymentMethod)
      );
    },
    reset: (state) => {
      state.cartItems = [];
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const itemIndex = state.cartItems.findIndex(
          (item) => item._id === action.payload._id
        );
        itemIndex >= 0
          ? state.cartItems[itemIndex].quantity++
          : state.cartItems.push({ ...action.payload, quantity: 1 });

        // save cartItems to localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = "Something went wrong";
      });
  },
});

export const {
  removeItemFromCart,
  saveDeliveryAddress,
  savePaymentMethod,
  reset,
} = cartSlice.actions;
export default cartSlice.reducer;
