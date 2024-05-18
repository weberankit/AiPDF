import {createSlice} from "@reduxjs/toolkit"

const userSlice =  createSlice({
    name:"userinfo",
    initialState:{
        value:null,
        preLoading:null,
        textGrab:null,
        darkModes:null
        
    },
    reducers:{
        infoUser:(state,action)=>{
        state.value=action.payload
        },
        loadingState:(state,action)=>{
            state.preLoading=action.payload
        },
        textFile:(state,action)=>{
            state.textGrab=action.payload
        },
        addDarkMode:(state,action)=>{
            state.darkModes=action.payload
        }

    }
})
export default userSlice.reducer
export const {infoUser , loadingState,textFile,addDarkMode} = userSlice.actions