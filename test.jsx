//cd temp_app && npm start
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {BrowserRouter,Routes,Route,Link} from "react-router-dom"
function NavBar({number_of_li=[],placeholder}){
  return <div className="nav-bar bg-secondary">
  <div className="logo-nav">
    <img src={logo} alt="skycast" width="40" />
  </div>

  <div className="inp-cont">
    <form onSubmit={(e) => e.preventDefault()} id="SearchForm">
      <button type="submit" className="icon">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
      <input
        type="text"
        name="inp1"
        placeholder={placeholder}
        className="txt"
      />
    </form>
  </div>
    <div className="link-cont">
      {number_of_li.map((item,index)=>(
      <li key={index}><Link className="my_link" to={item.path}>{item.name}</Link></li>
      ))} 
    </div>
</div>
}
function Title({title}){  
  return <div>
    <h1 className="tle">{title}</h1>
  </div>
}
function MainBody({title,body}){
  return <div className="weather border">
    <div className="set1 border-bottom">
      {title}
    </div>
    <div className="sec">
      {body}
    </div>
  </div>
}
function HomePage(){
  return (
    <div>
      <Title title={"SkyCast Weather Website"}/>
      <div className='main'>
        <MainBody title={"SkyCast"} body={"his website can show current temperature humidity wind info sunrise sunset and aqi. It can show upto 6 days of weather info"}/>
        <MainBody title={"API"} body={"This is built on open-meteo api on Python. It returns JSON format. It requires API key"}/>
      </div>
  </div>
  )
}
function AboutPage(){
  return (
    <div>
    <Title title={"This website shows temperature of cities"}/>
    <div className='main'>
        <MainBody title={"About this website"} body={"                    It shows weather of cities by API(Open Meteo). The api data comes from python(flask) and this is sent to react.js. Built on python and react.js. Built by Gyanendra Kumar. Special thanks to ChatGPT, Google, geeksforgeeks, stackoverflow, testdriven.io, w3schools and Youtube"}/>
        <MainBody title={"About me"} body={"I am a 13 y/o programmer. I know Python Html Css Js. I am good in Python Html Css.i mostly make web dev projects. I am a fullstack developer. Frontend:-Html Css Js Backend:-Python(Flask) and I also know the basics of C++."}/>
        <MainBody title={"About the Features of this website"} body={"It has a navbar. There is icon at the left corner which redirect to the main page which is this page. At the middle it has a search bar and a search icon which is a button. There are nav items there which are link which have border bottom animation hover on them to see the animation. In the main area there is a title which shows which city's weather is been shown. There are 3 containers below which shows weather wind info and humidity."}/>
      </div>
  </div>
  )
}
function App() {
  return (
    <div>
      <BrowserRouter>
      <NavBar number_of_li={[{name:"About",path:"/about"},{name:"Home",path:"/"}]} placeholder={"Search your Address, City or Zip Code"}/>
        <Routes>
          <Route path="/" element={
            <HomePage/>
          }/>
          <Route path='/about' element={
            <AboutPage/>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
