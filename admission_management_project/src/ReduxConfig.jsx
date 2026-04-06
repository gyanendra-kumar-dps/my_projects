import {createSlice,configureStore} from "@reduxjs/toolkit"
const init_state={
    curUser:null,
    isLogined:false,
    isAdmin:false,
    StudentType:null,
    StudentTypeConfirmed:false,
    CourseSelected:null,
    CourseConfirmed:false,
    EnrolledCourses:[],
    CurStep:1
}
const authSlice=createSlice({
    name:"auth",
    initialState:init_state,
    reducers:{
        login:(state,action)=>{
            state.curUser=action.payload
            state.isLogined=true
            if(action.payload==="admin123456"){
                state.isAdmin=true
            }
        },
        logout:(state)=>{
            state.curUser=null
            state.isLogined=false
            state.isAdmin=false
            state.StudentType=null,
            state.StudentTypeConfirmed=false,
            state.CourseSelected=null,
            state.CourseConfirmed=false,
            state.EnrolledCourses=[]
            state.CurStep=1
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
        },setEnrolledCourses: (state,action) => {
            state.EnrolledCourses=action.payload
        }
        }
      });
const reducer=configureStore({
    reducer:{
        auth:authSlice.reducer
    }
})
export const {login,logout,setStudentType,setConfirmStudentType,setCourse,setConfirmCourse,resetForm,setStep, nextStep, prevStep,setEnrolledCourses} = authSlice.actions
export default reducer