import {createSlice,configureStore} from "@reduxjs/toolkit"
const init_state={
    curUser:null,
    isLogined:false,
    StudentType:null,
    StudentTypeConfirmed:false,
    CourseSelected:null,
    CourseConfirmed:false,
    CurStep:1
}
const authSlice=createSlice({
    name:"auth",
    initialState:init_state,
    reducers:{
        login:(state,action)=>{
            state.curUser=action.payload
            state.isLogined=true
        },
        logout:(state)=>{
            state.curUser=null
            state.isLogined=false
        },setStudentType: (state, action) => {
            state.StudentType = action.payload;
            state.StudentTypeConfirmed = false;
        },   
        setConfirmStudentType: (state,action) => {
        state.StudentTypeConfirmed = action.payload
        },
        setCourse: (state, action) => {
        state.CourseSelected = action.payload;
        state.CourseConfirmed = false;
        },
        setConfirmCourse: (state,action) => {
        state.CourseConfirmed = action.payload;
        },
        resetForm: (state) => {
        state.StudentType = null;
        state.StudentTypeConfirmed = false;
        state.CourseSelected = null;
        state.CourseConfirmed = false;
        },setStep: (state,action) => {
            state.CurStep=action.payload
        },nextStep: (state) => {
            state.CurStep+=1
        },prevStep: (state) => {
            state.CurStep-=1
        }
        }
      });
const reducer=configureStore({
    reducer:{
        auth:authSlice.reducer
    }
})
export const {login,logout,setStudentType,setConfirmStudentType,setCourse,setConfirmCourse,resetForm,setStep, nextStep, prevStep} = authSlice.actions
export default reducer