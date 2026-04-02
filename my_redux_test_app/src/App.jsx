import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import {faker} from '@faker-js/faker'
import './App.css'
function NavBar({elem}){
  return(
    <nav class="nav">
      {elem.map((item,idx)=>{
          <a id={idx} href="#">{item}</a>
      })}
    </nav>
  )
}
function ProductContainer({product}){
  return(
    <main class="product-grid">
      {product.map((item,idx)=>{
        <div id={idx} class="product-card">
          <img loading="lazy" src={item.image} alt="Product"/>
          <h3>{item.name}</h3>
          <p>{item.price}</p>
        </div>
      })} 
  </main>
  )
}
function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <title>Flipkart Clone</title>
      <header class="header">
        <div class="logo">Flipkart</div>
        <input type="text" placeholder="Search for products" class="search-box"/>
        <div class="cart">Cart</div>
      </header>
    </div>
  )
}

export default App
