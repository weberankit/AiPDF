import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import userFiles from "./userFiles"
import aiManagment from "./aiManagment"
import userKey from "./userKey"
import  aiResPonse from "./aiResponseSlice"
import giminiResText from "./geminiResponseSlice"
import ErrorSlicing from "./ErrorSlice"
import useStoreDataSlice from "./useStoreDataSlice"
const appStore=configureStore({
reducer:{
userInformation:userSlice,
fileInformation:userFiles,
aiManage:aiManagment,
userskey:userKey,
aiRespond:aiResPonse,
giminiRes:giminiResText,
ErrorSliced:ErrorSlicing,
useDataSlice:useStoreDataSlice,
}

})

export default appStore