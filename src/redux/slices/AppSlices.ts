
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

interface AppState {
    userInfo: any | null
}

const initialState:AppState = {
    userInfo:null
};

const appSlice =createSlice({
name:'app',
initialState,
reducers:{
   setProfileDetails: (state, action: PayloadAction<any | null>) => {
      state.userInfo = action.payload;
    },
}
});

export const {
    setProfileDetails,
} = appSlice.actions;

export default appSlice.reducer;


