import {useEffect,useRef,useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {setStudentType,setConfirmStudentType,setCourse,setConfirmCourse,setEnrolledCourses} from './ReduxConfig.jsx'
import { useNavigate } from 'react-router-dom';
export const StepOne=()=>{
    const dispatchFunction=useDispatch()
    const selector=useSelector((state)=>state.auth.StudentType)
    return(
        <div className="card-container">
        <h2>GRADE PRE K - 5TH STUDENTS (ELEMENTARY SCHOOL)</h2>
        <p className="info">
          Returning Students require the parent to login to complete the registration.
        </p>
        <div className="cards">
          <div
          className={`card ${selector=="Returning"?"card_active":"card"}`} onClick={()=>(dispatchFunction(setStudentType("Returning")))}>
            <h3>Returning Student</h3>
            <p>Already enrolled before</p>
          </div>
  
          <div 
          className={`card ${selector=="New"?"card_active":"card"}`} onClick={()=>(dispatchFunction(setStudentType("New")))}>
            <h3>New Student</h3>
            <p>First time enrolling</p>
          </div>
        </div>
      </div>
    )
}
export const StepTwo=()=>{
    const dispatchFunction=useDispatch()
    const selector=useSelector((state)=>state.auth.StudentTypeConfirmed)
    const currentStep=useSelector((state)=>state.auth.CurStep)
    const refDiv=useRef(null)
    useEffect(()=>{
        if (currentStep === 3 && divRef.current) {
            divRef.current.scrollTo({
              top: divRef.current.scrollHeight,
              behavior: "smooth",})
        }
    },[refDiv])
    return(
        <div className="card-container" ref={refDiv}>
        <h2>GRADE PRE K - 5TH STUDENTS (ELEMENTARY SCHOOL)</h2>
  
        <div className="confirmation-card">
  
          <h2>Confirmation</h2>
        
          <div className="summary">
        
            <div className="row">
              <span>Grade:</span>
              <strong>Pre K - 5</strong>
            </div>
        
            <div className="row">
              <span>School Level:</span>
              <strong>Elementary School</strong>
            </div>
        
          </div>
        
          <div className="checkbox">
            <input type="checkbox" checked={selector} id="confirm" onChange={(e)=>(dispatchFunction(setConfirmStudentType(e.target.checked)))}/>
            <label>
              I confirm that the above information is correct.
            </label>
          </div>
        </div>
        </div>
    )
}
export const StepThree=()=>{
    const dispatchFunction=useDispatch()
    const selector=useSelector((state)=>state.auth.CourseSelected)
    return(
      <div >
          <h2>Course Selection</h2>
          <div class="course_card">

  <div className="course-grid">
    {
        ["Maths","English","Science","Social","Computers"].map((elem)=>(
            <label 
            key={elem} className={`course-item ${elem==selector?"course_active":""}`}>
                <input type="radio" checked={elem==selector} name='course' onChange={()=>dispatchFunction(setCourse(elem))}/>
                <h3>{elem}</h3>
                <p>
                    {elem === "Maths" && "Numbers & logic"}
                    {elem === "English" && "Reading & writing"}
                    {elem === "Science" && "Experiments"}
                    {elem === "Social" && "History"}
                    {elem === "Computers" && "Basics"}
                </p>
            </label>
        ))
    }
  </div>
</div>
      </div>
    )
}
export function StepFour() {
  const dispatchFunction = useDispatch();
  const selectedCourse = useSelector(
    (state) => state.auth.CourseSelected
  );
  const confirmed = useSelector(
    (state) => state.auth.CourseConfirmed
  );
  return (
    <div className="card-container">
    <h2>GRADE PRE K - 5TH STUDENTS (ELEMENTARY SCHOOL)</h2>

    <div className="confirmation-card">

      <h2>Confirmation</h2>
    
      <div className="summary">
    
        <div className="row">
          <span>Course type:</span>
          <strong>{selectedCourse}</strong>
        </div>
    
      </div>
    
      <div className="checkbox">
        <input type="checkbox" id="confirm" checked={confirmed} onChange={(e)=>(dispatchFunction(setConfirmCourse(e.target.checked)))} />
        <label>
          I confirm that the above information is correct.
        </label>
      </div>
    </div>
    </div>
  );
}
export function StepFive() {
    const [error,setError]=useState(false)
    const selector=useSelector((state) => state.auth)
    const navigate=useNavigate()
    const dispatchFunction=useDispatch()
    console.log(selector.curUser)
    const handleSubmit=async ()=>{
        try{
            const res=await fetch("http://localhost:6767/enroll",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username:selector.curUser,course:selector.CourseSelected})
            })
            const jsonResult = await res.json()
            if(jsonResult.message=="User has already enrolled"){
                setError(true)
            }else{
                setError(false)
                dispatchFunction(setEnrolledCourses([...selector.EnrolledCourses,selector.CourseSelected]))
                navigate("/dashboard")
            }
            console.log(jsonResult)
        }catch(err){
          console.log(err)
        }
    }
    const payload={
        Student_Type:selector.StudentType,
        Student_Confirmed:selector.StudentTypeConfirmed,
        Course_Type:selector.CourseSelected,
        Course_Confirmed:selector.CourseConfirmed,
    }
    const is_member_false_null=()=>{
        if(payload.Student_Type==null){return true}
        if(payload.Student_Confirmed==false){return true}
        if(payload.Course_Type==null){return true}
        if(payload.Course_Confirmed==false){return true}
    }
    console.log(payload)
    return (
      <div className="card-container">
      <h2>GRADE PRE K - 5TH STUDENTS (ELEMENTARY SCHOOL)</h2>
  
      <div className="confirmation-card">
  
        <h2>Confirmation</h2>
      
        <div className="summary">
      
          <div className="row">
            <span>Student Type:</span>
            <strong>{payload.Student_Type?payload.Student_Type:"N/A"}</strong>
          </div>

          <div className="row">
            <span>Student Confirmed:</span>
            <strong>{payload.Student_Confirmed?"Yes":"No"}</strong>
          </div>

          <div className="row">
            <span>Course Type:</span>
            <strong>{payload.Course_Type?payload.Course_Type:"N/A"}</strong>
          </div>

          <div className="row">
            <span>Course Confirmed:</span>
            <strong>{payload.Course_Confirmed?"Yes":"No"}</strong>
          </div>
          {
            (()=>{
                if(error){return <p className='error_msg_show'>User has already enrolled</p>}
                else{return <p className='error_msg_hide'></p>}
            })()
          }
        <button className='en_button' disabled={
            is_member_false_null()
        } onClick={handleSubmit}>Submit</button>
        </div>
        </div>
      </div>
    );
  }