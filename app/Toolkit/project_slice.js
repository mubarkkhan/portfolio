import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        scrollInto: null,
        isScrolling: false
    }
}

export const proSlice = createSlice({
    name: "proSlice",
    initialState,
    reducers: {
        setScrollInto: (state, action) => {
            state.value.scrollInto = action.payload
        },
        setScrolling: (state, action) => {
            state.value.isScrolling = action.payload;
        },
    }
})

export const { setScrollInto,setScrolling } = proSlice.actions

export default proSlice.reducer