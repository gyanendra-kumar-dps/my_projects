import React, { useState,useEffect } from 'react'
import {Route,Routes,BrowserRouter,Link,useNavigate,Outlet,Navigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import './App.css'
import {StepOne,StepTwo,StepThree,StepFour,StepFive} from './Steps.jsx';
import {setStep, nextStep, prevStep,login,logout} from './ReduxConfig.jsx'
function LoginPage(){
  const [shake,setShake]=useState(false);
  const dispatchFunction=useDispatch()
  const navigate=useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault()
      const username=e.target.username.value
      const password=e.target.password.value
      const json_payload={username,password}
      const res=await fetch("http://localhost:6767/login",{
        method:"POST",
        headers:{ "Content-Type": "application/json" },
        body:JSON.stringify(json_payload)
      })
      const jsonresult=await res.json()
      if(jsonresult.success){
        dispatchFunction(login(jsonresult.user))
        navigate('/dashboard')
      }else{
        setShake(true)
        setTimeout(()=>setShake(false),100)
      }
    }
  return(
    <div className={`app_root ${shake?"shake":""}`}>
        <div className="login-container">
            <h2>Admission Login</h2>
            <form onSubmit={handleSubmit} >
                <div className="input-group">
                    <label >Student ID / Email</label>
                    <input type="text" name="username" placeholder="Enter your ID or Email" required/>
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Enter your password" required/>
                </div>
                <button type="submit" className="login-btn">Login</button>
                <div className="extra-links">
                    <p><Link to='/signup'>Don't have an account? Sign Up</Link></p>
                </div>
            </form>
          </div>
      </div>
  )
}
function SignUp(){
  const [error,setError]=useState(null);
  const dispatchFunction=useDispatch()
    const handleSubmit = async (e) => {
      e.preventDefault()
      const username=e.target.username.value
      const password=e.target.password.value
      const json_payload={username,password}
      const res=await fetch("http://localhost:6767/signup",{
        method:"POST",
        headers:{ "Content-Type": "application/json" },
        body:JSON.stringify(json_payload)
      })
      const jsonresult=await res.json()
      if(jsonresult.result){
        console.log(jsonresult)
      }else{
        setError(jsonresult.message)
      }
    }
  return(
    <div className="app_root">
        <div className="login-container">
            <h2>Admission SignUp</h2>
            <form onSubmit={handleSubmit} >
                <div className="input-group">
                    <label >Student ID / Email</label>
                    <input type="text" name="username" placeholder="Enter your ID or Email" required/>
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Enter your password" required/>
                </div>
                {error?<p className='error_msg_show'>{error}</p>:<p className='error_msg_hide'></p>}
                <button type="submit" className="login-btn">SignUp</button>
                <div className="extra-links">
                    <p><Link to='/'>Login</Link></p>
                </div>
            </form>
          </div>
      </div>
  )
}
function Enrollments(){
  const totalSteps = 5;
  const currentStep=useSelector((state) => state.auth.CurStep);
  const dispatchFunction=useDispatch()
  const cur_form=()=>{
    if(currentStep==1){return <StepOne/>}
    else if(currentStep==2){return (<StepTwo />)}
    else if(currentStep==3){return <StepThree/>}
    else if(currentStep==4){return <StepFour/>}
    else if(currentStep==5){return <StepFive/>}
  }
  return (
    <div>
      <div className="container">
    <h2>Enrollment Steps</h2>
    <div className="stepper">
      {[1,2,3,4,5].map((elem,idx)=>(
        <React.Fragment key={idx}>
        <div className={`step ${elem <= currentStep ? "active" : ""}`}>{elem}</div>
        {elem<5 && <div className={`line ${elem < currentStep ? "active" : ""}`}></div>}
        </React.Fragment>
      ))
      }
    </div>
    {
      cur_form()
    }
    <div>
        <button 
        className="en_button" 
        id="prevBtn"
        onClick={()=>{
          if(currentStep>1){dispatchFunction(prevStep())}
        }}
        disabled={currentStep===1}
        >Back</button>
        <button 
        className="en_button" 
        id="nextBtn"
        onClick={()=>{
          if(currentStep<totalSteps){dispatchFunction(nextStep())}
        }}
        disabled={currentStep===5}
        >Next</button>
    </div>
    </div>

    </div>
  )
}
function Dashboard(){
  const [sidebarOpen,setSidebarOpen]=useState(true)
  const [curPage,setcurPage]=useState("Home")
  const sidebar_elems=["Home","Courses","Enrollments","Profile","Settings"]
  const currentStep=useSelector((state) => state.auth.CurStep);
  const MainPage=()=>{
    switch(curPage){
      case "Enrollments":
        return <Enrollments/>
      default:
        return (
        <React.Fragment>
            <h1>Hey,There</h1>
            <h4>Click Enrollments to enroll for a course</h4>
            <h4>Click Courses to see your enrolled courses</h4>
        </React.Fragment>
        )
    }
  }
  return(
    <div className="dashboard-root">
    <nav className="navbar">
      <h2>Admission Dashboard</h2>
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>
    </nav>
    <div className="dashboard-body">
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <ul>
          {
            sidebar_elems.map((elem,idx)=>(
              <li 
              key={idx} 
              onClick={() => setcurPage(elem)}
              >{elem}</li>
            ))
          }
        </ul>
      </div>
      <main className="main-content">
        <MainPage/>
        {/* <h3>Welcome to your Dashboard</h3>
        <p>Select an option from the sidebar to get started.</p> */}
      </main>
    </div>
  </div>
  )
}
function Protection({children}){
  const currentUser = useSelector((state) => state.auth.isLogined);
  if (currentUser === undefined) return null;
  if (currentUser===false) {
    return <Navigate to="/" replace />;
  }
  return children
}
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
            <Route path='/dashboard' element={
              <Protection>
                <Dashboard/>
              </Protection>
            }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
