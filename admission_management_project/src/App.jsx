import React, { useState,useEffect} from 'react'
import {Route,Routes,BrowserRouter,Link,useNavigate,Outlet,Navigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import './App.css'
import {StepOne,StepTwo,StepThree,StepFour,StepFive} from './Steps.jsx';
import {setStep, nextStep, prevStep,login,logout,setEnrolledCourses} from './ReduxConfig.jsx'
function LoginPage(){
  const [shake,setShake]=useState(false);
  const dispatchFunction=useDispatch()
  const navigate=useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault()
      const username=e.target.username.value
      const password=e.target.password.value
      if(username=="admin123456" && password=="123456admin"){
        dispatchFunction(login("admin123456"))
        navigate('/admindashboard')
        return ;
      }
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
  const [error,setError]=useState("");
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
        setTimeout(()=>setError(""),1000)
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
function EnrolledCourses(){
  const selector=useSelector((state) => state.auth)
  const dispatchFunction=useDispatch()
  const navigate=useNavigate()
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        if (selector.EnrolledCourses.length === 0) {
          const res = await fetch(
            `http://localhost:6767/enrollments/${selector.curUser}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          )

          const jsonResult = await res.json()
          console.log(jsonResult)
          if (jsonResult.success) {
            dispatchFunction(setEnrolledCourses(jsonResult.enrollments))
          }
        }
      } catch (err) {
        console.log(err)
      }
    }

    fetchEnrollments()
  }, [])
  return(
    <div className="card-container">
      <h2>Your enrolled courses</h2>
      <div className="my_course_grid">
        <div class="table">
          <div class="row header">
          <div class="cell">ID</div>
          <div class="cell">Name</div>
        </div>
        {
          selector.EnrolledCourses.map((course,idx)=>(
              <div class="row" key={idx}>
                <div class="cell">{idx+1}</div>
                <div class="cell">{course}</div>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  );
}
function AdminView(){
  const selector=useSelector((state) => state.auth)
  const dispatchFunction=useDispatch()
  useEffect(()=>{
    const fetchEnrollments=async (dispatch)=>{
      try{
        if(selector.EnrolledCourses.length==0){
          const res=
          await fetch(`http://localhost:6767/allenrollments`,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
          })
          const jsonResult=await res.json()
          console.log(jsonResult)
          if(jsonResult.success){
              dispatch(setEnrolledCourses(jsonResult.enrollments))
              navigate('/dashboard')
          }
        }
      }catch(err){
        console.log(err)
      }
    }
    fetchEnrollments(dispatchFunction)
  })
  return(
    <div className="card-container">
      <h2>User's enrolled courses</h2>
      <div className="my_course_grid">
        <div class="table">
          <div class="row header">
          <div class="cell">ID</div>
          <div class="cell">Name</div>
          <div class="cell">Course</div>
        </div>
        {
          selector.EnrolledCourses.map((course,idx)=>(
              <div class="row" key={idx}>
                <div class="cell">{idx+1}</div>
                <div class="cell">{course.user}</div>
                <div class="cell">{course.course}</div>
            </div>
          ))
        }
        </div>
      </div>
    </div>
  );
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
  const currentStep=useSelector((state) => state.auth);
  const dispatchFunction=useDispatch()
  const logoutUser=()=>{
    dispatchFunction(logout())
  }
  const MainPage=()=>{
    switch(curPage){
      case "Enrollments":
        return <Enrollments/>
      case "Courses":
        return <EnrolledCourses/>
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
          <button className='sidebar-toggle' onClick={logoutUser}>LogOut</button>
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
function AdminDashboard(){
  const [sidebarOpen,setSidebarOpen]=useState(true)
  const [curPage,setcurPage]=useState("Home")
  const sidebar_elems=["Home","Courses","Profile","Settings"]
  const dispatchFunction=useDispatch()
  const logoutUser=()=>{
    dispatchFunction(logout())
  }
  const MainPage=()=>{
    switch(curPage){
      case "Courses":
        return <AdminView/>
      default:
        return (
        <React.Fragment>
            <h1>Hey,There Admin</h1>
            <h4>Click Courses to see user's enrolled courses</h4>
        </React.Fragment>
        )
    }
  }
  return(
    <div className="dashboard-root">
    <nav className="navbar">
      <h2>Admission Admin Dashboard</h2>
      <div className='admin_nav_right'>
        <div className='admin_user_img'>
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile" className="profile-pic" width="40px" loading='lazy'/>
          <h4>Dianne</h4>
        </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
      </div>
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
          <button className='sidebar-toggle' onClick={logoutUser}>LogOut</button>
        </ul>
      </div>
      <main className="main-content">
        <MainPage/>
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
function ProtectionAdmin({children}){
  const selector = useSelector((state) => state.auth);
  const currentUser = selector.isLogined&&selector.isAdmin;
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
            <Route path='/admindashboard' element={
              <ProtectionAdmin>
                <AdminDashboard/>
              </ProtectionAdmin>
            }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
