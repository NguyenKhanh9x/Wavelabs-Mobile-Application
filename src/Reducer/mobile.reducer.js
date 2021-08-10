import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mobileInfo: [],
};

const MobileInfoSlice = createSlice({
    name: "mobileInfo",
    initialState,
    reducers: {
        saveReview: (state, action) => {
            state.mobileInfo = action.payload;
        },
        resetReview: (state, action) => {
            state.mobileInfo = []
        }
    },
});
export const mobileInfoAction = MobileInfoSlice.actions;
export default MobileInfoSlice.reducer;
