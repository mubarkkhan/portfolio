import { configureStore } from "@reduxjs/toolkit";
import proSlice from "./project_slice";
import themeSlice from "./ThemeSlice";

export const store = configureStore({
    reducer: {
        proSlice: proSlice,
        theme: themeSlice
    }
})