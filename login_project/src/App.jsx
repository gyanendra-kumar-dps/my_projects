import './App.css'
import {Link,Route,BrowserRouter, Routes} from "react-router-dom"
function SignUp(){
  return(
    <div className='auth_root'>
      <div className="container">
        <h2>Sign Up</h2>
        <form>
            <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" required/>
            </div>

            <div className="input-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" required/>
            </div>

            <button type="submit" class="submit-btn">Login</button>

            <div class="footer-text">
                Already have an account? <Link className='link' to="/">Log In</Link>
            </div>
        </form>
    </div>
</div>
  )
}
function LoginPage(){
  return(
    <div className='auth_root'>
      <div className="container">
        <h2>Login</h2>
        <form>
            <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" required/>
            </div>
            <div className="input-group">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" required/>
            </div>
            <button type="submit" className="submit-btn">Login</button>
            <div className="footer-text">
                Don't have an account? <Link className='link' to="/signup">Sign Up</Link>
            </div>
        </form>
    </div>
</div>
  )
}
function DashBoard(){
  return(
    <div className='dash_root'>
      <div className='navbar'> 
        <h3>
          My App
        </h3>
        <h4>
          Welcome,User
        </h4>
      </div>
    </div>
  )
}
function App() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
