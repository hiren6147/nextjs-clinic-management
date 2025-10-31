import { ROLES } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: ROLES.MANAGER, // 'Clinician' or 'Manager'
  user: {
    name: "John Doe",
    email: "john.doe@clinic.com",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },

    // Hydrate auth from localStorage (client-side only)
    hydrateAuth: (state, action) => {
      const { role, user } = action.payload;
      if (role) {
        state.role = role;
      }
      if (user) {
        state.user = user;
      }
    },
  },
});

export const { setRole, setUser, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
