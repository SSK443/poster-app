import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface userDetails{
  id:string;
  name:string;
  email:string;
  password?:string;
}

interface authState{
  status:boolean;
  userDetails:userDetails|null;
}


const initalState:authState={
  status:false,
  userDetails:null,
}



const authSlice=createSlice({
  name:"auth",
  initialState:initalState,
  reducers:{
    login:(state,action:PayloadAction<userDetails>)=>{
      state.status=true;
      state.userDetails=action.payload
    },
    logout:(state)=>{
      state.status=false;
      state.userDetails=null;
    }
  }
})

export default authSlice.reducer;
export const{login,logout}=authSlice.actions