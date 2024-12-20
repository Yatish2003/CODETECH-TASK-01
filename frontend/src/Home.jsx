// src/Home.js
import React from 'react';
import "./Home.css"
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  let navigate=useNavigate();
  function locateToWomen(){
    navigate('/products/womens')
  }
  function locateToMens(){
    navigate('/products/mens')
  }
  function locateTokids(){
    navigate('/products/kids')
  }
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to  E-Commerce Store</h1>
      <div className="image-gallery">
        <div className="image-item fade-in">
          <img onClick={()=>{locateToWomen()}} src="https://m.media-amazon.com/images/I/81271aov+AL._SY879_.jpg" alt="Product 1" />
          <Link to="/products/womens"><h3>Women's</h3></Link>
        </div>
        <div className="image-item fade-in">
          <img onClick={()=>{locateToMens()}} src="https://m.media-amazon.com/images/I/61ohrT6NnrL._SY879_.jpg" alt="Product 2" />
          <Link to="/products/mens"><h3>Men's</h3></Link>
        </div>
        <div className="image-item fade-in">
          <img  onClick={()=>{locateTokids()}}src="https://m.media-amazon.com/images/I/41oO+JZdEOL.jpg" alt="Product 3" />
          <Link to="/products/kids"><h3>kid's</h3></Link>
        </div>

      </div>
    </div>
  );
}

export default Home;
