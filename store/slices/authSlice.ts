import { ROLES, type Role } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  email: string;
}

export interface AuthState {
  role: Role;
  user: User;
}

const initialState: AuthState = {
  role: ROLES.MANAGER, // 'Clinician' or 'Manager'
  user: {
    name: "John Doe",
    email: "john.doe@clinic.com",
  },
};

interface HydrateAuthPayload {
  role?: Role;
  user?: User;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    // Hydrate auth from localStorage (client-side only)
    hydrateAuth: (state, action: PayloadAction<HydrateAuthPayload>) => {
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
