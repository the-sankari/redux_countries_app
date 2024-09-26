import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async aciton to fetch countries from the API
export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data; // return the data to the reducer
  }
);

// Initial state
const initialState = {
  countries: [],
  status: "idle",
  error: null,
};

// Create a slice for countries
const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = "loading";
        console.log("loading");
      })
      .addCase(fetchCountries.fulfilled, (state, aciton) => {
        state.status = "succedded";
        state.countries = aciton.payload;
      })
      .addCase(fetchCountries.rejected, (state, aciton) => {
        state.status = "failed";
        state.error = aciton.error.message;
      });
  },
});

export default countriesSlice.reducer;
