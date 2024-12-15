import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User{
    full_name: string;
    email: string;
    role: string;
    user_id: number;
    address: string;
    profile_picture: string;
}

export interface UserState {
    token: string | null;
    user: User | null;
}

const initialState: UserState = {
    token: null,
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<UserState>) {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logOut(state) {
            state.token = null;
            state.user = null;
        }
    }
})

export const { loginSuccess, logOut } = userSlice.actions;
export default userSlice.reducer;





