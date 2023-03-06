import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import favoritesService from "./favoritesService";

const initialState = {
  favoriteItems: localStorage.getItem("favoriteItems")
    ? JSON.parse(localStorage.getItem("favoriteItems"))
    : [],
  loading: false,
  success: false,
  error: false,
  message: "",
};

// add item to favorites
export const addItemToFavorites = createAsyncThunk(
  "favorites/addItemToFavorites",
  async (id, thunkAPI) => {
    try {
      return await favoritesService.addItemToFavorites(id);
    } catch (error) {
      const message = "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    removeItemFromFavorites: (state, action) => {
      const remainingFavoriteItems = state.favoriteItems.filter(
        (item) => item._id !== action.payload
      );
      state.favoriteItems = remainingFavoriteItems;

      // save favoriteItems to localStorage
      localStorage.setItem(
        "favoriteItems",
        JSON.stringify(state.favoriteItems)
      );
    },

    reset: (state) => {
      state.favoriteItems = [];
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemToFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const itemIndex = state.favoriteItems.findIndex(
          (item) => item._id === action.payload._id
        );
        itemIndex >= 0
          ? (state.favoriteItems = [...state.favoriteItems])
          : state.favoriteItems.push(action.payload);

        // save favoriteItems to localStorage
        localStorage.setItem(
          "favoriteItems",
          JSON.stringify(state.favoriteItems)
        );
      })
      .addCase(addItemToFavorites.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.message = "Something went wrong";
      });
  },
});

export const { removeItemFromFavorites, reset } = favoritesSlice.actions;
export default favoritesSlice.reducer;
